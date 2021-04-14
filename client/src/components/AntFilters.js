import React, { useContext } from "react";
import "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";
import { RequestContext } from "../contexts";

export default function NestedGrid() {
  const classes = useStyles();
  const { state, onFilters } = useContext(RequestContext);

  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDateChange = (date) => {
    if (date !== null) {
      setSelectedDate(date);
      state.requestDateCreation = moment(date).format("DD/MM/YYYY");
    }
  };
  const handleRequestNumeroChange = (event) => {
    if (event !== null) {
      state.requestNumero = event.target.value.trim().replace(/""/g, "");
    }
  };
  const handleCustomerNameChange = (event) => {
    state.requestCustomerCompletName = event.target.value
      .trim()
      .replace(/""/g, "");
  };
  const handleStatusChange = (event, newValue) => {
    if (newValue !== null) {
      // console.log(newValue);
      state.requestStatus = newValue.statusId;
    }
  };
  const handleProductNameChange = (event, newValue) => {
    if (newValue !== null) {
      console.log(newValue.productId)
      state.requestTypeproduct = newValue.productId;
    }
  };
  const handleTechnicianNameChange = (event, newValue) => {
    if(newValue !== null){
      // console.log(newValue);
      state.requestRepairer = newValue.userId;
    }
     
  };
  const filter = () => {
    onFilters();
  };

  const FormRow = () => {
    return (
      <React.Fragment>
        <Grid item xs={2}>
          <TextField
            size="small"
            className={classes.field}
            id="input-dossier"
            label="Num de dossier"
            variant="outlined"
            onChange={handleRequestNumeroChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" style={{paddingRight:"10px"}}>
                  <SearchIcon className={classes.icon} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            size="small"
            className={classes.field}
            id="input-client"
            label="Nom client"
            variant="outlined"
            onChange={handleCustomerNameChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" style={{paddingRight:"10px"}}>
                  <SearchIcon className={classes.icon} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            size="small"
            className={classes.field}
            id="input-reparateur"
            onChange={handleTechnicianNameChange}
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
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            size="small"
            className={classes.field}
            id="input-produits"
            options={state.products}
            onChange={handleProductNameChange}
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                return option;
              }
              if (option.inputValue) {
                return option.inputValue;
              }
              return option.productName;
            }}
            renderInput={(params) => (
              <TextField {...params} label="Produits" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            size="small"
            className={classes.field}
            id="input-status"
            onChange={handleStatusChange}
            options={state.status}
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                return option;
              }
              if (option.inputValue) {
                return option.inputValue;
              }
              return option.statusName;
            }}
            renderInput={(params) => (
              <TextField {...params} label="Status" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              size="small"
              className={classes.field}
              autoOk
              variant="inline"
              inputVariant="outlined"
              label="Date de demande"
              format="dd/MM/yyyy"
              style={{ width: "75%", float: "left", marginRight: "10px" }}
              value={selectedDate}
              
              InputAdornmentProps={{ position: "end" }}
              
              onChange={(date) => handleDateChange(date)}
            />
          </MuiPickersUtilsProvider>

          <IconButton className={classes.btnRecherche} onClick={filter}>
            <SearchIcon />
          </IconButton>
        </Grid>
      </React.Fragment>
    );
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={2}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  field: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
    "&:placeholder": {
      color: "#DDE4EB",
    },
  },
  icon: {
    color: "#DDE4EB",
  },
  btnRecherche: {
    backgroundColor: "#E10000",
    color: "#FFFFFF",
    fontSize: "15px",
    fontWeight: "600",
    height: "40px",
    borderRadius:"4px",
    textTransform: "capitalize",
    float: "left",
    "&:hover": {
      color: "#E10000",
      border: "1px solid #E10000",
      backgroundColor: "#FFFFFF",
    },
  },
}));
