import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  box: {
    backgroundColor: "#DC0710",
    display: "grid",
    placeItems: "center",
  },
  subBox: {
    padding: "0 80px",
    marginTop: "12pc",
  },
  paper: {
    display: "grid",
    height: "100vh",
    placeItems: "center",
  },
  form: {
    width: "50%", // Fix IE 11 issue.
    margin: "auto",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#DC0710",
    color: "#ffffff",
    width: "100%",
    height: "56px",
    fontWeight: "bold",
    fontSize: "18px",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#ffffff",
      color: "#DC0710",
      border: "1px solid #DC0710",
    },
  },
  boxPaper: {
    padding: theme.spacing(5),
    width: "100%",
  },
  ourTitles: {
    color: "#ffffff",
  },
}));
