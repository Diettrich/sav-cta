import React from "react";
import { Navbar, AntFilters, AntRequestsTable } from "../../components";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import "./styles.css";
import { RequestContextProvider } from "../../contexts/RequestContext";

const RequestDetails = () => {
  return (
    <RequestContextProvider>
      <Navbar />
      <Container maxWidth={false}>
        <Typography
          variant="h5"
          style={{
            fontSize: "18px",
            textAlign: "left",
            margin: "30px 0",
            fontWeight: "700",
          }}
        >
          Suivi des demandes
        </Typography>
        <Divider style={{marginBottom: "30px"}} />
        <AntFilters />
        <Typography
          variant="h6"
          style={{
            fontSize: "15px",
            textAlign: "left",
            fontWeight: "700",
            margin: "20px 0px 30px 0px",
          }}
        >
          Liste des demandes
        </Typography>
        <AntRequestsTable />
      </Container>
    </RequestContextProvider>
  );
};
export default RequestDetails;
