import React, { useEffect, useContext } from "react";
import { fade, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow"; 
import Button from "@material-ui/core/Button";
import { loadCSS } from "fg-loadcss";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import FormControl from "@material-ui/core/FormControl";
import { useStyles } from "./styles";
import Grid from "@material-ui/core/Grid";
import AntPopupSend from "../popups/quote/AntPopupSend";
import AntPopupPiece from "../popups/quote/AntPopupPiece";
import { RequestDetailsContext } from "../../contexts";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

export default function QuoteTable(props) {
  const {
    state,
    DeleteProduct,
    TotalPrice,
    onSelectIdPiece,
    onChangePriceCTA,
    quoteslistApi,
    pieceslistApi,
  } = useContext(RequestDetailsContext);

  const classes = useStyles();

  useEffect(() => {
    quoteslistApi();
    TotalPrice();
    pieceslistApi();
  }, []);

  useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  });

  const handleDeleteClick = (id) => () => {
    DeleteProduct(id);
  };

  const handlePriceValue = (value) => (e) => {
    onSelectIdPiece(value);
    onChangePriceCTA(e.target.value);
  };

  return (
    <div>
      <Grid container spacing={3} align="left">
        <Grid item xs={6}> 
         
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}> <Typography
            variant="h5"
            style={{
              fontSize: "18px",
              textAlign: "left",
              margin: "30px 0",
              fontWeight: "700",
            }}
          >
            Crée devis
          </Typography></Grid>
        <Grid item xs={6} align="right">
          <AntPopupPiece />
        </Grid>
      </Grid>
      <div style={{ border: "1px solid #DDE4EB", backgroundColor: "#FFF" }}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    padding: "10px 0",
                  }}
                >
                  Pièce
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    padding: "10px 0",
                  }}
                >
                  Ref
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    padding: "10px 0",
                  }}
                >
                  Quantité
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    padding: "10px 0",
                  }}
                >
                  Prix catalogue fournisseur
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    padding: "10px 0",
                  }}
                >
                  Prix CTA
                </Typography>
              </TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.pieces.map((data) => (
              <TableRow key={data.pieceId}>
                {/* Pièce */}
                <TableCell>
                  <Typography>{data.pieceLibelle}</Typography>
                </TableCell>
                {/* Ref */}
                <TableCell align="left">
                  <Typography>{data.pieceRef}</Typography>
                </TableCell>
                {/* Quantité */}
                <TableCell align="left">
                  <Typography>{data.pieceQte}</Typography>
                </TableCell>
                {/* Prix Catalogue Fournisseur */}
                <TableCell align="left">
                  <Typography>{data.priceFournisseur}</Typography>
                </TableCell>
                {/* Prix CTA */}
                <TableCell align="left">
                  <FormControl className={classes.qtewidth}>
                    <BootstrapInput
                      defaultValue={data.priceCTA}
                      onChange={handlePriceValue(data.pieceId)}
                    />
                  </FormControl>
                </TableCell>
                {/* Button */}
                <TableCell align="left">
                  <Button
                    edge="end"
                    aria-label="open drawer"
                    style={{
                      fontSize: "14px",
                      textTransform: "capitalize",
                      fontWeight: "bold",
                    }}
                    onClick={handleDeleteClick(data.pieceId)}
                  >
                    Effacer
                    {/* <Icon className="fas fa-window-close" /> */}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Grid container spacing={3} align="left">
          <Grid item xs={6}></Grid>
          <Grid item xs={6}></Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}></Grid>
          <Grid item xs={6} align="right">
            <Typography
              variant="h5"
              style={{ margin: "20px", color: "#E10000", fontWeight: "600" }}
            >
              <span>Total:</span> <span>{state.GrandTotal} dhs</span>
            </Typography>
          </Grid>
        </Grid>
      </div>
      <Grid container spacing={3} align="left">
        <Grid item xs={6}></Grid>
        <Grid item xs={6}></Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}></Grid>
        <Grid item xs={6} align="right">
          <AntPopupSend />
        </Grid>
      </Grid>
    </div>
  );
}
