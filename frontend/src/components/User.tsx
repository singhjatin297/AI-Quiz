import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface UserProps {
  socket: Socket;
}

interface UserLoggedInProps {
  socket: Socket;
  roomId: string;
  name: string;
}

export const User: React.FC<UserProps> = ({ socket }) => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (!submitted) {
    return (
      <div>
        <div>Enter Room ID</div>
        <input value={roomId} onChange={(e) => setRoomId(e.target.value)} />

        <div>Enter Name</div>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <button type="submit" onClick={handleSubmit}>
          JOIN
        </button>
      </div>
    );
  }

  return <UserLoggedIn roomId={roomId} socket={socket} name={name} />;
};

export const UserLoggedIn: React.FC<UserLoggedInProps> = ({
  socket: globalSocket,
  roomId,
  name,
}) => {
  const [socket, setsocket] = useState<Socket | null>();
  const [userId, setUserId] = useState("");
  const [currentState, setCurrentState] = useState("not_started");
  const [leaderboard, setLeaderboard] = useState([]);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    setsocket(globalSocket);

    socket?.on("connect", () => {
      socket?.emit("join", { roomId, name });
    });

    socket?.on("init", ({ state, userId }) => {
      setUserId(userId);

      if (state.leaderboard) {
        setLeaderboard(state.leaderboard);
      }

      if (state.problem) {
        setQuestion(state.problem);
      }

      setCurrentState(state.type);
    });

    socket?.on("leaderboard", (data) => {
      setCurrentState("leaderboard");
      setLeaderboard(data.leaderboard);
    });

    socket?.on("problem", (data) => {
      setCurrentState("problem");
      setQuestion(data.problem);
    });
  }, [socket, globalSocket, name, roomId]);

  if (currentState === "not_started") {
    return <span>Not Started Page</span>;
  } else if (currentState === "problem") {
    return (
      <div>
        <span>Quiz</span>
        {/* <Quiz /> */}
      </div>
    );
  } else if (currentState === "leaderboard") {
    return (
      <div>
        <span>LeaderBoard</span>
        {/* <Leaderboard /> */}
      </div>
    );
  }

  return (
    <div>
      <span>Quiz has ended {currentState}</span>
    </div>
  );
};
