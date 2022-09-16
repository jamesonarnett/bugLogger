import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import { ipcRenderer } from "electron";

import LogItem from "./components/LogItem.jsx";
import AddLogItem from "./components/AddLogItem.jsx";

const App = () => {
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success",
  });
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    ipcRenderer.send("logs:load");

    ipcRenderer.on("logs:get", (e, logs) => {
      setLogs(JSON.parse(logs));
    });
  }, []);

  const addItem = (item) => {
    if (item.text === "" || item.user === "" || item.priority === "") {
      showAlert("Please enter all fields", "danger");
      return false;
    }

    // item._id = Math.floor(Math.random() * 90000) + 10000;
    // item.created = new Date().toString();
    // setLogs([...logs, item]);

    ipcRenderer.send("logs:add", item);

    showAlert("Log added");
  };

  const deleteItem = (_id) => {
    // setLogs(logs.filter((log) => log._id !== _id));

    ipcRenderer.send("logs:delete", _id);
    showAlert("Log deleted");
  };

  const showAlert = (message, variant = "success", seconds = 3000) => {
    setAlert({
      show: true,
      message,
      variant,
    });

    setTimeout(() => {
      setAlert({
        show: false,
        message: "",
        variant: "success",
      });
    }, seconds);
  };

  return (
    <Container>
      <AddLogItem addItem={addItem} />

      {alert.show && (
        <Alert
          variant={alert.variant}
          onClose={() => setAlert({ show: false })}
          dismissible
        >
          {alert.message}
        </Alert>
      )}

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
            <LogItem log={log} key={log._id} deleteItem={deleteItem} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default App;
