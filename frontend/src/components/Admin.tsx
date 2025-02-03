import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { CreateProblem } from "./CreateProblem";
import { QuizControls } from "./QuizControls";
import { CurrentQuestion } from "./CurrentQuestion";
import { Problem } from "../../../common/types";

export const Admin = () => {
  const [socket, setSocket] = useState<null | any>(null);
  const [quizId, setQuizId] = useState(() => {
    return localStorage.getItem("quizId") || "";
  });
  const [roomId, setRoomId] = useState("");
  const [start, setStart] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Problem | null>(null);

  useEffect(() => {
    const webSocket = io("http://localhost:3000");

    webSocket.on("connect_error", (err) => {
      console.error("Connection Error:", err);
    });

    setSocket(webSocket);
    return () => {
      webSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log(socket.id);
        socket.emit("joinAdmin", {
          password: "ADMIN_PASSWORD",
        });
      });

      return () => {
        socket.off("connect");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("problem", (problem: Problem) => {
        console.log("Received problem:", problem);
        setCurrentQuestion(problem);
      });

      return () => {
        socket.off("problem");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (quizId) {
      localStorage.setItem("quizId", quizId);
    }
  }, [quizId]);

  if (!quizId) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-y-7">
        <div className="flex flex-col gap-y-2.5">
          <span className="text-xl font-semibold text-black font-mono">
            Enter the code to join
          </span>
          <input
            type="text"
            onChange={(e) => {
              setRoomId(e.target.value);
            }}
            placeholder="123 456"
            className="border-[#6C5BA8] border-2 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E9EBFE] focus:ring-offset-1"
          />
        </div>
        <button
          onClick={() => {
            socket.emit("createQuiz", {
              roomId,
            });
            setQuizId(roomId);
          }}
          className="bg-black text-white font-semibold font-mono p-4 rounded-full"
        >
          Create room
        </button>
      </div>
    );
  }
  if (!start) {
    return (
      <div>
        <CreateProblem roomId={quizId} socket={socket} setStart={setStart} />
      </div>
    );
  }

  return (
    <div>
      <CurrentQuestion question={currentQuestion} />
      <QuizControls socket={socket} roomId={roomId} />
    </div>
  );
};
