import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import HistoryIcon from "@material-ui/icons/History";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow"; 
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
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #FFF",
    borderRadius: "8px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 3),
  },
  container: {
    maxHeight: 440,
  },
  btn: { 
    height:"40px",
    backgroundColor: "#DDE2E6",
    color: "#000000",
    fontSize: "15px",
    fontWeight: "600",
    marginLeft:"10px",
    textTransform: "inherit", 
    borderRadius: "4px",
    position:"relative",
    bottom:"2px",
    "&:hover": {
      color: "#000000",
      border: "1px solid #DDE2E6",
      backgroundColor: "#FFFFFF",
    },
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  const { state, historiqueslistApi } = useContext(RequestContext);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    state.requestId = props.id;
    historiqueslistApi();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const rows = state.historiques;

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h3 id="simple-modal-title" style={{ color: "#757575" }}>
        Dossier N°{props.id}
      </h3>
      <h3 id="simple-modal-title" style={{ fontWeight: "bold" }}>
        Historique de la demande
      </h3>
      <TableContainer className={classes.container}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography style={{ color: "#757575", fontSize: "14px" }}>
                  Date et heure
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography style={{ color: "#757575", fontSize: "14px" }}>
                  Nom utilisateur
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography style={{ color: "#757575", fontSize: "14px" }}>
                  Commentaire
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <Typography style={{ fontWeight: "bold", fontSize: "14px" }}>
                    {moment(row.dateModif).format("DD/MM/YYYY à hh:mm:ss")}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography style={{ fontWeight: "bold", fontSize: "14px" }}>
                    {row.userName}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography style={{ fontWeight: "bold", fontSize: "14px" }}>
                    {row.message}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

  return (
    <div> 
        <IconButton onClick={handleOpen} className={classes.btn}>
          <HistoryIcon />
        </IconButton> 

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
