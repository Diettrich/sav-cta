import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import moment from "moment";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Box from "@material-ui/core/Box";
import { RequestContext } from "../../contexts";
import { PopupHistory, AntPopupsRequest } from "../../components";

export default function RenderHeaderGrid() {
  const columns = [
    {
      field: "id",
      width: 140,
      type: "string",
      renderHeader: () => <strong>{"N° dossier"}</strong>,
      renderCell: (params) => (
        <div>
          <Typography className={classes.ourText} component={"div"}>
            {"#" + params.getValue("id")}
          </Typography>
          <Typography className={classes.ourText} component={"div"}>
            <Chip
              size="small"
              style={{ margin: "6px 0" }}
              icon={<CalendarTodayIcon />}
              component={"span"}
              label={moment(params.row.dateCreation).format("DD/MM/YYYY")}
            />
          </Typography>
        </div>
      ),
    },
    {
      field: "client",
      width: 200,
      type: "string",
      renderHeader: () => <strong>{"Client"}</strong>,
      renderCell: (params) => {
        if (params.row.typeInterventionId === "5") {
          return (
            <div>
              <Typography className={classes.ourText} component={"div"}>
                {params.row.fullNameCustomer}
              </Typography>
              <Typography className={classes.ourText} component={"div"}>
                {params.row.phoneCustomer}
              </Typography>
              <Typography className={classes.ourText} component={"div"}>
                {params.row.cityCustomer}
                <Chip
                  size="small"
                  label="A domicile"
                  style={{
                    backgroundColor: "#ff9dde",
                    display: "table-cell",
                  }}
                  component={"span"}
                />
              </Typography>
            </div>
          );
        } else if (params.row.typeInterventionId === "4") {
          return (
            <div>
              <Typography className={classes.ourText} component={"div"}>
                {params.row.fullNameCustomer}
              </Typography>
              <Typography className={classes.ourText} component={"div"}>
                {params.row.phoneCustomer}
              </Typography>
              <Typography className={classes.ourText} component={"div"}>
                {params.row.cityCustomer}
                <Chip
                  size="small"
                  label="SurPlace"
                  style={{
                    backgroundColor: "rgb(255, 190, 7)",
                    display: "table-cell",
                  }}
                  component={"span"}
                />
              </Typography>
            </div>
          );
        }
      },
    },
    {
      field: "statut",
      width: 300,
      type: "string",
      renderHeader: () => <strong>{"Statut"}</strong>,
      renderCell: (params) => {
        return (
          <div>
            <Typography className={classes.ourText} component={"div"}>
              <Chip
                size="small"
                label={params.row.requestStatusName}
                style={{
                  color: "#FFF",
                  marginRight: "5px",
                  fontSize: "12px",
                  backgroundColor: "#2CDC54",
                }}
                component={"span"}
              />
            </Typography>
            <Typography className={classes.ourText} component={"div"}>
              J+{params.row.requestDay}
            </Typography>
          </div>
        );
      },
    },
    {
      field: "reparateur",
      width: 200,
      type: "string",
      renderHeader: () => <strong>{"Réparateur"}</strong>,
      renderCell: (params) => {
        if (params.row.phoneTechnicien !== "null") {
          return (
            <div>
              <Typography className={classes.ourText} component={"div"}>
                {params.row.fullNameTechnician}
              </Typography>
              <Typography className={classes.ourText} component={"div"}>
                N° {params.row.phoneTechnicien}
              </Typography>
            </div>
          );
        } else {
          return (
            <div>
              <Typography className={classes.ourText} component={"div"}>
                -
              </Typography>
            </div>
          );
        }
      },
    },
    {
      field: "produit",
      width: 250,
      type: "string",
      renderHeader: () => <strong>{"Produit"}</strong>,
      renderCell: (params) => (
        <div>
          <Typography className={classes.ourText} component={"div"}>
            {params.row.requestNameSupplier}
          </Typography>
          <Typography className={classes.ourText} component={"div"}>
            Code:{params.row.productCode}
          </Typography>
          <Typography className={classes.ourText} component={"div"}>
            Lib:{params.row.productName}
          </Typography>
          <Typography className={classes.ourText} component={"div"}>
            Série:{params.row.productSerie}
          </Typography>
        </div>
      ),
    },
    {
      field: "problème(s)",
      width: 520,
      type: "string",
      renderHeader: () => <strong>{"Problème(s)"}</strong>,
      renderCell: (params) => {
        return params.row.listProblems.map((element, indx) => {
          return (
            <Chip
              className={classes.ourText}
              key={indx}
              size="small"
              label={element}
              variant="outlined"
              component={"span"}
              style={{
                color: "#000000",
                marginRight: "5px",
              }}
            />
          );
        });
      },
    },
    {
      field: "buttons",
      width: 230,
      type: "string",
      renderHeader: () => (
        <strong style={{ display: "none" }}>{"buttons"}</strong>
      ),
      renderCell: (params) => (
        <>
          <AntPopupsRequest
            id={params.getValue("id")}
            idstatus={params.row.requestStatus}
          />

          <PopupHistory id={params.getValue("id")} />
        </>
      ),
    },
  ];
  const classes = useStyles();
  const {
    state,
    techniciansApi,
    requestsApi,
    productslistApi,
    statuslistApi,
    supplierslistApi,
  } = useContext(RequestContext);

  
  useEffect(() => {
    function fetchBusinesses() {
      supplierslistApi();
      statuslistApi();
      productslistApi();
      requestsApi();
      techniciansApi();
    }
    fetchBusinesses();
  }, []);
  // console.log(state.isSearchActive);
  const currentRequests = state.isSearchActive
    ? state.foundRequests
    : state.requests;
  const rows = [];
  for (var item of currentRequests) {
    rows.push({
      key: item.requestId,
      id: `${item.requestId}`,
      numero: `${item.requestNumero}`,
      dateCreation: `${item.requestDateCreation}`,
      fullNameCustomer: `${item.requestCustomerCompletName}`,
      phoneCustomer: `${item.requestCustomerPhone}`,
      cityCustomer: `${item.requestCustomerCity}`,
      typeInterventionId: `${item.requestTypeInterventionId}`,
      productName: `${item.requestProductName}`,
      productCode: `${item.requestProductCode}`,
      productSerie: `${item.requestProductSerie}`,
      fullNameTechnician: `${item.requestFullNameTechnician}`,
      numeroTechnician: `${item.requestNumeroTechincian}`,
      phoneTechnicien: `${item.requestPhoneTechincian}`,
      requestStatus: `${item.requestStatus}`,
      requestStatusName: `${item.requestStatusName}`,
      requestNameSupplier: `${item.requestNameSupplier}`,
      requestDay: `${item.requestDay}`,
      listProblems: [...item.listProblemes],
    });
  }
  return (
    <Box style={{ background: "#FFF", height: 800 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={100}
        loading={rows.length === 0}
        pageSize={10}
        autoHeight={true}
        disableColumnMenu
        className={classes.grid}
        disableSelectionOnClick={false}
        disableColumnSelector={false}
      />
    </Box>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  ourText: {
    fontSize: "14px",
  },
  grid: {
    margin: "15px 0",
  },
}));
