import React from "react";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

const LogItem = ({ log: { _id, text, priority, user, created } }) => {
  const setVariant = () => {
    if (priority === "high") {
      return "danger";
    } else if (priority === "moderate") {
      return "warning";
    } else {
      return "success";
    }
  };

  return (
    <tr>
      <td>
        <Badge className={`p-2 badge bg-${setVariant()}`}>
          <span>{priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
        </Badge>
      </td>
      <td>{text}</td>
      <td>{user}</td>
      <td>{created}</td>
      <td>
        <Button variant="danger" size="sm">
          x
        </Button>
      </td>
    </tr>
  );
};

export default LogItem;
