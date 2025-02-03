import { Socket } from "socket.io-client";
interface QuizControlsProps {
  socket: Socket;
  roomId: string;
}

export const QuizControls: React.FC<QuizControlsProps> = ({
  socket,
  roomId,
}) => {
  return (
    <div>
      Quiz controls
      <button
        className="bg-black text-white font-semibold font-mono p-4 rounded-full"
        onClick={() => {
          socket.emit("next", {
            roomId,
          });
        }}
      >
        Next problem
      </button>
    </div>
  );
};
