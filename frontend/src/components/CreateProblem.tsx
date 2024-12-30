import { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface CreateProblemProps {
  roomId: string;
  socket: Socket;
}

export const CreateProblem: React.FC<CreateProblemProps> = ({
  roomId,
  socket,
}) => {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState<string[]>(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(0);

  const createProblem = () => {
    socket.emit("createProblem", {
      roomId,
      problem: {
        description: title,
        options,
        correctIndex: correctOption,
      },
    });
  };

  useEffect(() => {
    socket.on("problemAdded", () => {
      toast.success("Problem added");
      setTitle("");
      setOptions(["", "", "", ""]);
      setCorrectOption(0);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("problemAdded");
    };
  }, [socket]);

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Question title"
      />
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="text"
            value={option}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
            placeholder={`Option ${index + 1}`}
          />
          <input
            type="radio"
            checked={correctOption === index}
            onChange={() => setCorrectOption(index)}
          />
        </div>
      ))}
      <button onClick={createProblem}>Create Problem</button>
    </div>
  );
};
