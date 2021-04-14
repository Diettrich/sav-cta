import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { CancelModal, RefusModal, RepairerModal, CloseModal } from "../../../components";

export default function AntPopupsRequest(props) {
  const classes = useStyles();

  const icon = props.idstatus === "1";
  const icon_1 = props.idstatus === "5";
  const icon_2 = props.idstatus === "2";
  const icon_3 = props.idstatus === "15";

  const style_btn_acc_ref = {
    display: icon ? "block" : "none",
  };
  const style_btn_ann_mis = {
    display: icon_1 ? "block" : "none",
  };
  const style_btn_ann = {
    display: icon_2 ? "block" : "none",
  };
  const style_btn_close = {
    display: icon_3 ? "block" : "none",
  };
  const handleCreateQuoteClick = () => {
    localStorage.setItem("requestId", props.id);
  };

  return (
    <div>
      <div style={style_btn_acc_ref}>
        <Box
          display="flex"
          justifyContent="center"
          m={1}
          style={{ margin: "8px 0" }}
        >
          <RefusModal id={props.id}/>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          m={1}
          style={{ margin: "8px 0" }}
        >
          <RepairerModal id={props.id} />
        </Box>
      </div>

      <div style={style_btn_ann_mis}>
        <Box
          display="flex"
          justifyContent="center"
          m={1}
          style={{ margin: "8px 0" }}
        >
          <Link
            to={`/dashboard/quote/${props.id}`}
            style={{ textDecoration: "none" }}
          >
            <Button className={classes.btn} onClick={handleCreateQuoteClick}>
              Mise à jour devis
            </Button>
          </Link>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          m={1}
          style={{ margin: "8px 0" }}
        >
          <CancelModal id={props.id} />
        </Box>
      </div>

      <div style={style_btn_ann}>
        <CancelModal id={props.id} />
      </div>
      <div style={style_btn_close}>
        <CloseModal id={props.id} />
      </div>
    </div>
  );
}

export const useStyles = makeStyles((theme) => ({
  btn: {
    width: "150px",
    backgroundColor: "#E10000",
    color: "#FFFFFF",
    fontSize: "15px",
    fontWeight: "600",
    textTransform: "inherit",
    float: "left",
    "&:hover": {
      color: "#E10000",
      border: "1px solid #E10000",
      backgroundColor: "#FFFFFF",
    },
  },
}));
