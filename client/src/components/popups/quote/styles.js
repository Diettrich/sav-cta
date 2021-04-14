import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 650,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid gray",
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  centerBtn: {
    textAlign: "center",
  },
  bgBtn: {
    backgroundColor: "Red",
    color: "#ffffff",
    padding: theme.spacing(1, 10),
  },
  bgCnf: {
    backgroundColor: "Red",
    color: "#ffffff",
  },
  paperCols: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  clTxt: {
    textAlign: 'center',
  },
  paperSend: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid gray",
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
   
}));
