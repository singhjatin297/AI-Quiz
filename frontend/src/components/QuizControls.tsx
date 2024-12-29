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
