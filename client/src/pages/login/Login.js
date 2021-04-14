import React from "react";
import { Login } from "../../components";

const Account = () => {
  const formRender = () => {
    return <Login />;
  };

  return <div>{formRender()}</div>;
};

export default Account;
