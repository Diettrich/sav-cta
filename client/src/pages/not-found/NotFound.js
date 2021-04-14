import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>404 - Not Found!</h1>
      <Link to="/dashboard/requests">Tableau de bord</Link>
    </div>
  );
};

export default NotFound;
