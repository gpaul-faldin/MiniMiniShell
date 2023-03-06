import React, { useEffect, useState } from "react";
const Command = require("../commands/index");

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [command, setCommand] = useState("");
  const [result, setResult] = useState("");

  const clearSubmit = () => {
    if ((result || command) && result !== "0") {
      if (result.length === 0) setHistory([...history, command]);
      else setHistory([...history, command + " \n " + result]);
    }
    if (result === "0" && command !== "") {
      setHistory([...history, command + ": command not found"]);
    }
    setCommand("");
    setResult("0");
  };

  const parser = (str, setResult) => {
    let parsed = str.toLowerCase().split(" ");
    let command = parsed[0];
    parsed.shift();

    try {
      Command[command](parsed, setResult);
    } catch (e) {
      clearSubmit();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);
    parser(command, setResult);
  };

  useEffect(() => {
    clearSubmit();
  }, [result]);

  function handleChange(event) {
    event.preventDefault(event);
    setCommand(event.target.value);
  }

  return (
    <div className="Main-div">
      <h1>MiniMiniShell</h1>
      <div className="histo-list">
        {history.length > 0
          ? history.map((item, i) => (
              <p className="histo-list-item" key={i}>
                {item}
              </p>
            ))
          : ""}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={command}
          name="name"
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default Dashboard;
