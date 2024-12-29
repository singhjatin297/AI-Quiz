import { Socket } from "socket.io-client";
import { useState } from "react";

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
