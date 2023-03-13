import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
const Command = require("../commands/index");

const Terminal = styled.div`
  background-color: #1e1e1e;
  font-family: monospace;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
  height: 538px;
`;

const Prompt = styled.span`
  color: #78dce8;
`;

const InputLine = styled.div`
  display: flex;
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  color: #ffffff;
  flex: 1;
  font-size: 1rem;
  outline: none;
  font-family: monospace;
  width: 830px;
`;

const HistoryList = styled.div`
  overflow-y: scroll;
  height: calc(100% - 2rem);
`;

const HistoryItem = styled.p`
  color: #ffffff;
  margin: 0;
  white-space: pre-wrap;
`;

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [command, setCommand] = useState("");
  const [result, setResult] = useState("");
  const [PromptStr, setPromptStr] = useState("Zakaaaaaaa: ");
  const historyListRef = useRef(null);

  const clearSubmit = () => {
    if ((result || command) && result !== "0") {
      if (result.length === 0 && command !== "clear")
        setHistory([...history, command]);
      else if (command === "clear") {
        setHistory([]);
      } else setHistory([...history, `${PromptStr} ${command}\n${result}`]);
    }
    if (result === "0" && command !== "") {
      setHistory([...history, command + ": command not found"]);
    }
    setResult("0");
    setCommand("");
  };

  const launcher = (str, setResult) => {
    let parsed = str.toLowerCase().split(" ");
    let command = parsed[0];
    parsed.shift();

    try {
      Command[command](parsed, setResult);
    } catch (e) {
      clearSubmit();
    }
  };

  const parser = (str, setResult) => {
    let parsed = str.split("&&");
    for (let x = 0; x < parsed.length; x++) {
      launcher(String(parsed[x]).trim(), setResult);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);
    parser(command, setResult);
  };

  useEffect(() => {
    clearSubmit();
    historyListRef.current.scrollTop = historyListRef.current.scrollHeight;
  }, [result, history]);

  function handleChange(event) {
    event.preventDefault(event);
    setCommand(event.target.value);
  }

  return (
    <Terminal>
      <HistoryList ref={historyListRef}>
        {history.map((item, i) => (
          <HistoryItem key={i}>{item}</HistoryItem>
        ))}
      </HistoryList>
      <InputLine>
        <Prompt>{PromptStr}</Prompt>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={command}
            name="name"
            onChange={handleChange}
          />
        </form>
      </InputLine>
    </Terminal>
  );
};

export default Dashboard;
