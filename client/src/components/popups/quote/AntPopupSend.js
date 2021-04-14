import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { RequestDetailsContext } from "../../../contexts";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 500,
    textAlign: "center",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #FFF",
    borderRadius: "8px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  btn: {
    width: "170px",
    backgroundColor: "#757575",
    color: "#FFFFFF",
    fontSize: "15px",
    fontWeight: "600",
    textTransform: "inherit",
    margin: "15px 8px",
    height: "50px",
    "&:hover": {
      color: "#757575",
      border: "1px solid #757575",
      backgroundColor: "#FFFFFF",
    },
  },
  btnConfirme: {
    width: "170px",
    backgroundColor: "#E10000",
    color: "#FFFFFF",
    fontSize: "15px",
    fontWeight: "600",
    textTransform: "inherit",
    margin: "15px 8px",
    height: "50px",
    "&:hover": {
      color: "#E10000",
      border: "1px solid #E10000",
      backgroundColor: "#FFFFFF",
    },
  },
  field: {
    marginTop: "15px",
  },
}));

export default function PopupPiece(props) {
  const classes = useStyles();
  const history = useHistory();
  const { collectPieces, updatequoteApi } = useContext(
    RequestDetailsContext
  );

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSendQuote = () => {
    collectPieces(localStorage.getItem("ctaId")); 
    updatequoteApi();
    setTimeout(() => { 
      history.push("/dashboard/requests");
    }, 2000);
  };
  const handleClose = () => {
    setOpen(false);
  };
  

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div style={{ height: "64px" }}>
        <ErrorOutlineIcon style={{ fontSize: "4pc" }} />
      </div>
      <h3
        id="simple-modal-title"
        style={{ fontWeight: "bold", fontSize: "18px", margin: "30px 0" }}
      >
        êtes-vous sûr d'envoyer ceci?
      </h3>
      <Button type="button" onClick={handleClose} className={classes.btn}>
        Annuler
      </Button>
      <Button
        type="button"
        onClick={handleSendQuote}
        className={classes.btnConfirme}
      >
        Confirmer
      </Button>
    </div>
  );

  return (
    <>
      <Button
        type="button"
        onClick={handleOpen}
        className={classes.btnConfirme}
      >
        Envoyer
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
}
