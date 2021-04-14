import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
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
  btnConfirme: {
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
  field: {
      marginTop:"15px"
  }
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  const {
    selectRequest,
    selectTechnician,
    state,
    addtechniciantorequestApi,
  } = useContext(RequestContext);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [valueSelect, setValueSelect] = React.useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onChangeSelect = (event, newValue) => {
    if (newValue !== null) {
      //   console.log(newValue.userId);
      setValueSelect(newValue.userId);
      selectTechnician(newValue.userId);
    } else {
      //   console.log("noting");
      setValueSelect(newValue);
    }
  };

  const handleConfirmeClick = () => {
    if (valueSelect !== null) {
      const data = (state.technicianToRequest = {
        requestId: parseInt(props.id),
        ctaId: localStorage.getItem("ctaId"),
        repairerId: state.selectedTechnician.userId,
      });
      console.log(props.id);
      selectRequest(props.id);
      addtechniciantorequestApi(data);
      setValueSelect(null);
      setOpen(false);
    }
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h3 id="simple-modal-title" style={{ fontWeight: "bold" }}>
        Veuillez choisir un technicien
      </h3>
      <Form name="control-ref-cancel">
        <Form.Item name="choisir un technicien" rules={[{ required: true }]}>
          <div id="simple-modal-description">
            <Autocomplete
              size="small"
              className={classes.field}
              id="input-reparateur"
              onChange={onChangeSelect}
              options={state.technicians}
              getOptionLabel={(option) => {
                if (typeof option === "string") {
                  return option;
                }
                if (option.inputValue) {
                  return option.inputValue;
                }
                return option.fullname;
              }}
              renderInput={(params) => (
                <TextField {...params} label="Réparateurs" variant="outlined" />
              )}
            />
          </div>
        </Form.Item>
        <Form.Item>
          <Button
            type="submit"
            onClick={handleConfirmeClick}
            className={classes.btn}
          >
            Confirmer
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <div>
      <Button
        type="button"
        onClick={handleOpen}
        className={classes.btnConfirme}
      >
        Accepter
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
