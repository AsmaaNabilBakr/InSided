import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.scss";

function App() {
  const [userKey, setUserKey] = useState("");
  const [keyPAT, setKeyPAT] = useState("");
  const [commitsList, setCommitsList] = useState<any>([]);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  useEffect(() => {
    const userKeyFromLocal = localStorage.getItem("userKey");
    if (userKeyFromLocal) {
      setUserKey(userKeyFromLocal);
      setKeyPAT(userKeyFromLocal);
      setIsInputDisabled(true);
    }
  });
  const handleChange = (key: string) => {
    setUserKey(key);
    console.log(userKey);
  };
  const insertKey = () => {
    localStorage.setItem("userKey", userKey);
    setKeyPAT(userKey);
    setIsInputDisabled(true);
  };
  return (
    <div className="App">
      <div className="keyForm">
        <input
          name="key"
          type="text"
          value={userKey}
          disabled={isInputDisabled}
          onChange={(e) => handleChange(e.target.value)}
        />
        <button className="actionBtn insertBtn" onClick={insertKey}>
          Insert
        </button>
        <button
          className="actionBtn resetBtn"
          onClick={() => {
            localStorage.removeItem("userKey");
            setUserKey("");
            setIsInputDisabled(false);
          }}
        >
          Reset
        </button>
      </div>
      <ul className="commitsList">
        {commitsList?.map((item : any) => (
          <li key={item.node_id} className="commitItem">
            <label>{item.message}</label>
            <div>
              <span className="commitTime">{item.author.date}</span>
              <span className="commitAuther">{item.author.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
