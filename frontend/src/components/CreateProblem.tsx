import { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface CreateProblemProps {
  roomId: string;
  socket: Socket;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateProblem: React.FC<CreateProblemProps> = ({
  roomId,
  socket,
  setStart,
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
    if (!socket) return;

    socket.on("problemAdded", () => {
      toast.success("Problem added");
      setTitle("");
      setOptions(["", "", "", ""]);
      setCorrectOption(0);
    });

    return () => {
      socket.off("problemAdded");
    };
  }, [socket]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Question title"
          className="border-cyan-400 border-2 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-1 mb-7"
        />
        {options.map((option, index) => (
          <div key={index} className="mb-2.5">
            <input
              type="radio"
              checked={correctOption === index}
              onChange={() => setCorrectOption(index)}
            />
            <input
              type="text"
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
              placeholder={`Option ${index + 1}`}
              className="border-amber-500 border-2 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-100 focus:ring-offset-1"
            />
          </div>
        ))}
        <div className="flex space-x-4">
          <button
            type="submit"
            onClick={createProblem}
            className="bg-black text-white font-semibold font-mono p-4 rounded-full"
          >
            Create Problem
          </button>
          <button
            type="button"
            onClick={() => {
              socket.emit("start", roomId);
              setStart(true);
            }}
            className="bg-blue-500 text-white font-semibold font-mono p-4 rounded-full"
          >
            Start
          </button>
        </div>
      </form>
    </div>
  );
};
