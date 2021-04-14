import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { Form } from "antd";
import Button from "@material-ui/core/Button";
import { RequestContext } from "../../../contexts";

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
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #FFF",
    borderRadius: "8px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  btn: {
    width: "150px",
    backgroundColor: "#DDE2E6",
    color: "#000000",
    fontSize: "15px",
    fontWeight: "600",
    textTransform: "inherit",
    float: "left",
    "&:hover": {
      color: "#000000",
      border: "1px solid #DDE2E6",
      backgroundColor: "#FFFFFF",
    },
  },
  btnConfirme: {
    width: "150px",
    marginTop: "15px",
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
  field: {
    "&:focus-visible": {
      border:"none", 
    },
  }
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  const { state, cancelrequestApi } = useContext(RequestContext);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [valueMessageCancel, getValueMessageCancel] = React.useState("");
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeCancelMessage = (e) => {
    getValueMessageCancel(e.target.value);
  };

  const handleCancelClick = () => {
    if (valueMessageCancel !== "") {
      const data = (state.cancelRequest = {
        requestId: parseInt(props.id),
        ctaId: localStorage.getItem("ctaId"),
        messageCancel: valueMessageCancel,
        userId: localStorage.getItem("ctaId"),
      });

      cancelrequestApi(data);
      getValueMessageCancel("");
      setOpen(false);
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h3 id="simple-modal-title" style={{ fontWeight: "bold" }}>
        Veuillez confirmer l'annulation de l'intervention
      </h3>
      <Form name="control-ref-cancel">
        <Form.Item name="message annuler" rules={[{ required: true }]}>
          <div id="simple-modal-description">
            <TextareaAutosize
              aria-label="minimum height"
              style={{
                width: "100%",
                borderRadius: "8px",
                padding: "6px",
                marginTop: "15px",
                borderWidth:"1px"
              }}
              className={classes.field}
              rowsMin={6}
              placeholder="Motif"
              onChange={handleChangeCancelMessage}
              value={valueMessageCancel}
            />
          </div>
        </Form.Item>
        <Form.Item>
          <Button
            type="submit"
            onClick={handleCancelClick}
            className={classes.btnConfirme}
          >
            Confirmer
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <div>
      <Button type="button" onClick={handleOpen} className={classes.btn}>
        Annuler
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
