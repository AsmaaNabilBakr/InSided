import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import { Octokit } from "octokit";

function App() {
  const [userKey, setUserKey] = useState("");
  const [keyPAT, setKeyPAT] = useState<string>();
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
  useEffect(() => {
    if (keyPAT) {
      getAllCommits();
    }
  }, [keyPAT]);
  const getAllCommits = async () => {
    const octokit = new Octokit({
      auth: keyPAT,
    });
    const AllData = await octokit.request(
      "GET /repos/AsmaaNabilBakr/Insided/commits"
    );
    setCommitsList(AllData.data);
  };
  const handleChange = (key: string) => {
    setUserKey(key);
  };
  const insertKey = () => {
    localStorage.setItem("userKey", userKey);
    setKeyPAT(userKey);
    setIsInputDisabled(true);
  };
  const resetInput = () => {
    localStorage.removeItem("userKey");
    setUserKey("");
    setKeyPAT("");
    setIsInputDisabled(false);
    setCommitsList([]);
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
        <button
          className="actionBtn insertBtn"
          disabled={userKey.length == 0}
          onClick={insertKey}
        >
          Insert
        </button>
        <button className="actionBtn resetBtn" onClick={resetInput}>
          Reset
        </button>
        {keyPAT && (
          <button className="actionBtn refreshBtn" onClick={getAllCommits}>
            Refresh
          </button>
        )}
      </div>

      <ul className="commitsList">
        {commitsList.length > 0 &&
          commitsList.map((item: any) => (
            <li key={item.sha} className="commitItem">
              <label>{item.commit.message}</label>
              <div>
                <span className="commitTime">
                  {new Date(item.commit.author.date).toDateString()}
                  {", "}
                  {new Date(item.commit.author.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span className="commitAuther">{item.commit.author.name}</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
