import React from "react";
import { QuoteTable, Navbar } from "../../components";
import "./styles.css";
import Container from "@material-ui/core/Container"; 
import {
  RequestDetailsContextProvider,
  RequestContextProvider,
} from "../../contexts";
const QuoteDetails = () => {
  return (
    <RequestContextProvider>
      <RequestDetailsContextProvider>
        <Navbar />
        <Container maxWidth={false}> 
          <QuoteTable />
        </Container>
      </RequestDetailsContextProvider>
    </RequestContextProvider>
  );
};
export default QuoteDetails;
