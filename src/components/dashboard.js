import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [command, setCommand] = useState("");
  const [pwd, setPwd] = useState("");
  const [chdir, setChdir] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(e);
    setHistory([...history, command]);
    setCommand("");
    //console.log(window.pwd());
    console.log(window.salut);
  };

  useEffect(() => {
    setPwd(window.pwd());
  }, []);

  useEffect(() => {
    if (chdir === true) {
      setPwd(window.pwd());
      setChdir(false);
    }
  }, [chdir]);

  function handleChdir(e) {
    e.preventDefault(e);
    window.chdir("../");
    setChdir(true);
  }

  function handleChange(event) {
    event.preventDefault(event);
    setCommand(event.target.value);
  }

  return (
    <div>
      <h1>{pwd}</h1>
      <ul>
        {history.length > 0
          ? history.map((item, i) => <li key={i}>{item}</li>)
          : ""}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={command}
          name="name"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleChdir}>SALUT</button>
    </div>
  );
};

export default Dashboard;
