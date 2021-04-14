import React, { useContext } from "react";
import { RequestContext } from "../contexts";
import { Input } from "antd";

export default function CustomizedInputBase() {
  const { Search } = Input;
  const { state, onGlobalSearch } = useContext(RequestContext);
  const onSearch = (value) => {
    state.searchRequestId = value;
    onGlobalSearch();
  };
  return (
    <>
      <Search
        bordered={false}
        placeholder="Rechercher par numéro dossier"
        onSearch={onSearch}
        style={{
          width: "75%",
          borderRadius: "15px",
          backgroundColor: "#b70606",
        }}
      />
    </>
  );
}
