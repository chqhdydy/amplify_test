import React, { useState } from "react";
import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

function AuthButtons() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [serverAddress, setServerAddress] = useState(""); // 서버 주소 상태
  const [output, setOutput] = useState(""); // 출력 결과 상태

  const handleCreate = () => {
    setOutput(`Server Created with Address: ${serverAddress}`);
    setServerAddress(""); // 주소 입력 필드 초기화
  };

  const handleDelete = () => {
    setOutput("Server Deleted");
    setServerAddress(""); // 주소 입력 필드 초기화
  };

  return (
    <div>
      {user ? (
        <>
          <h2>Welcome, {user.username}</h2>
          <button onClick={signOut} style={{ marginBottom: "20px" }}>
            Sign Out
          </button>
          <div style={{ textAlign: "center" }}>
            <h1>Server Maker</h1>
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={handleCreate}
                style={{
                  padding: "10px 20px",
                  margin: "10px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Create
              </button>
              <button
                onClick={handleDelete}
                style={{
                  padding: "10px 20px",
                  margin: "10px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
            <input
              type="text"
              placeholder="Server Address"
              readOnly
              value={serverAddress}
              onChange={(e) => setServerAddress(e.target.value)}
              style={{
                width: "300px",
                padding: "10px",
                marginTop: "20px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
            <div style={{ marginTop: "20px", color: "blue" }}>
              <strong>{output}</strong>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

function App() {
  return (
    <Authenticator>
      {() => (
        <div style={{ textAlign: "center" }}>
          <AuthButtons />
        </div>
      )}
    </Authenticator>
  );
}

export default App;


