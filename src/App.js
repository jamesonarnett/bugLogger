import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

import LogItem from "./components/LogItem.jsx";
import AddLogItem from "./components/AddLogItem.jsx";

const App = () => {
  const [logs, setLogs] = useState([
    //insert some dummy data for now
    {
      _id: 1,
      text: "This is a log1",
      priority: "high",
      user: "John",
      created: new Date().toString(),
    },
    {
      _id: 2,
      text: "This is another log2",
      priority: "low",
      user: "Jane",
      created: new Date().toString(),
    },
    {
      _id: 3,
      text: "This is yet another log3",
      priority: "moderate",
      user: "John",
      created: new Date().toString(),
    },
  ]);

  const addItem = (item) => {
    item._id = Math.floor(Math.random() * 90000) + 10000;
    item.created = new Date().toString();
    setLogs([...logs, item]);
  };

  return (
    <Container>
      <AddLogItem addItem={addItem} />
      <Table>
        <thead>
          <tr>
            <th>Priority</th>
            <th>Log Text</th>
            <th>User</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <LogItem log={log} key={log._id} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default App;
