export var axios = require("axios");

export const apiConfig = {
  BaseUrl: "https://sav-cta-api-recette.azurewebsites.net/",

  BaseAuthUrl: "api/Account/authenticate",
  Technicians: "api/cta/repairer/list/",
  Requests: "api/cta/request/list/",
  RefusRequest: "api/cta/request/refuse",
  CancelRequest: "api/cta/request/cancel",
  CloseRequest: "api/cta/request/close",
  AddTechnician: "api/cta/repairertorequest/post",
  Historiques: "api/cta/historique/list/",
  Products: "api/cta/typeproduct/list",
  Suppliers: "api/cta/supplier/list",
  Status: "api/cta/status/list",

  // 

  Pieces: "api/cta/piece/list/",
  RequestQuote: "api/cta/request/detail/",
  RequestQuoteUpdate: "api/cta/request/quote/update",
  // 

};

export const client = axios.create({
  baseURL: apiConfig.BaseUrl,
  timeout: 2000,
});
