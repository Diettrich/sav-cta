import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { Form } from "antd";
import Button from "@material-ui/core/Button";
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
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
    height:"50px",
    float: "left",
    "&:hover": {
      color: "#E10000",
      border: "1px solid #E10000",
      backgroundColor: "#FFFFFF",
    },
  },
  btnConfirme: {
    float:"right",
    width: "170px",
    backgroundColor: "#E10000",
    color: "#FFFFFF",
    fontSize: "15px",
    fontWeight: "600",
    textTransform: "inherit",
    margin:"15px 0",
    height:"50px",
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
function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
}
NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default function PopupPiece(props) {
  const { inputRef, ...other } = props;
  const classes = useStyles();
  const { state, onQtyChanged, AddRow, onSelectRefProductChanged } = useContext(
    RequestDetailsContext
  );
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [valuePiece, setValuePiece] = React.useState(null);
  const [valueQty, setValueQty] = React.useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onChangeSelect = (event, newValue) => {
    if (newValue !== null) {

      setValuePiece(newValue.pieceId);
      onSelectRefProductChanged(newValue.pieceId);
    }
    else{
      setValuePiece(newValue)
    }
  };
  const onChangeQuantity = (event) => {
    console.log(event.target.value)
    setValueQty(event.target.value);
    onQtyChanged(event.target.value);
  };
  const handleConfirmeClick = () => {
    if (valuePiece !== null && valueQty !== 0) {
      // console.log("--------ici"+valuePiece)
      AddRow();
      setOpen(false);
      setValuePiece(null);
      setValueQty(0);
    }
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h3 id="simple-modal-title" style={{ fontWeight: "bold", fontSize:"18px" }}>
        Ajouter une nouveau pièce
      </h3>
      <Form name="control-ref-cancel">
        <Form.Item name="choisir un réference" rules={[{ required: true }]}>
          <div id="simple-modal-description">
            <Autocomplete
              size="small"
              className={classes.field}
              id="input-piece"
              onChange={onChangeSelect}
              options={state.piecesPopup}
              getOptionLabel={(option) => {
                if (typeof option === "string") {
                  return option;
                }
                if (option.inputValue) {
                  return option.inputValue;
                }
                return option.pieceName;
              }}
              renderInput={(params) => (
                <TextField {...params} label="Piéces" variant="outlined" />
              )}
            />
          </div>
        </Form.Item>
        <Form.Item name="choisir une quantité > 0" rules={[{ required: true }]}>
          <TextField
            size="small"
            id="input-qty"
            label="Quantité"
            variant="outlined"
            value={valueQty}
            fullWidth
            onChange={onChangeQuantity}
            name="numberformat"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
          />
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
    <>
      <Button
        type="button"
        onClick={handleOpen}
        className={classes.btnConfirme}
      >
        Ajouter une piéce
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
