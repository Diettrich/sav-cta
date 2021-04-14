import React, { createContext, useReducer } from "react";
import moment from "moment";
import { message } from "antd";
import {
  technicianslist,
  requestslist,
  cancelrequest,
  refusrequest,
  requestquoteupdate,
  addtechniciantorequest,
  historiqueslist,
  productslist,
  statuslist,
  supplierslist,
  closerequest
} from "../services/api";

export const RequestContext = createContext();

const defaultQuoteRequest = {
  requestId: "",
  ctaId: "",
  priceCustomer: "",
  listPiece: [
    {
      PieceId: "",
      PieceName: "",
      PieceRef: "",
      PieceQte: "",
      PieceSupplierPrice: "",
      PriceCTA: "",
      PriceClient: "",
    },
  ],
  userId: "",
};

const defaultHistorique = {
  requestId: 0,
  dateModif: moment(Date.now()),
  isCanceled: false,
  isRefused: false,
  message: "",
  userId: "",
};

const defaultRefusRequest = {
  requestId: 0,
  ctaId: "",
  messageRefuse: "",
  userId: "",
};

const defaultCancelRequest = {
  requestId: 0,
  ctaId: "",
  messageCancel: "",
  userId: "",
};

const defaultCloseRequest = {
  requestId: 0,
  ctaId: "",
  messageClose: "",
  userId: "",
};

const defaultTechnician = {
  userId: "",
  fullname: "",
  phone: "",
  email: "",
};

const defaultTechnicianToRequest = {
  requestId: 0,
  ctaId: "",
  repairerId: "",
};

const defaultRequest = {
  requestId: 0,
  requestNumero: "",
  requestDateCreation: moment(Date.now()),
  requestCustomerCompletName: "",
  requestCustomerPhone: "",
  requestCustomerCity: "",
  requestCustomerAddress: "",
  requestTypeInterventionId: "",
  requestStatus: "",
  requestDay: "",
  requestProductName: "",
  requestProductCode: "",
  requestProductSerie: "",
  requestFullNameTechnician: "",
  requestNumeroTechincian: "",
  requestTechincianPhone: "",
};

const initialState = {
  technicians: [],
  selectedTechnician: defaultTechnician,
  requests: [],
  selectedRequest: defaultRequest,
  refusRequest: defaultRefusRequest,
  cancelRequest: defaultCancelRequest,
  closeRequest: defaultCloseRequest,
  quoteRequest: defaultQuoteRequest,
  technicianToRequest: defaultTechnicianToRequest,
  historiques: [],
  openHistoryPopup: false,
  requestId: 0,
  user: "",
  errors: {},
  products: [],
  status: [],
  suppliers: [],
  isSearchActive: false,
  foundRequests: [],

  //
  searchRequestId: 0,
  requestNumero: "",
  requestDateCreation: "",
  requestCustomerCompletName: "",
  requestTypeproduct: "",
  requestSupplier: "",
  requestRepairer: "",
  requestStatus: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUESTS_FULFILLED": {
      return {
        ...state,
        requests: action.payload ? action.payload : [],
        errors: {},
      };
    }

    case "SEARCH_GLOBAL_REQUESTS": {
      const searchRequestId = parseInt(action.payload);
      const requestList = state.requests;
      const searchResult = state.requests.filter((item) => {
        return item.requestId === searchRequestId;
      });
      if (
        searchResult.length <= 0 ||
        searchResult.length === requestList.length
      ) {
        message.info({
          content: "l'élément que vous recherchez n'existe pas!!",
          className: "custom-class",
          style: {
            marginTop: "15vh",
          },
        });
      }
      return {
        ...state,
        requests: requestList,
        isSearchActive: !!searchResult.length > 0 || false,
        foundRequests: searchResult,
        errors: {},
      };
    }

    case "SEARCH_REQUESTS": {
      const fRequestStatus = parseInt(state.requestStatus);
      const fRequestProduct = parseInt(state.requestTypeproduct);
      const fRequestRepairer = parseInt(state.requestRepairer);
      const fRequestDate = state.requestDateCreation;
      const fRequestCutomer = state.requestCustomerCompletName.toLowerCase()
        ? state.requestCustomerCompletName.toLowerCase()
        : null;
      const fRequestNumero = parseInt(state.searchRequestId);

      const requestList = state.requests;

      const resultList = state.requests.filter((item) => {
        return (
          item.requestCustomerCompletName
            .toLowerCase()
            .search(fRequestCutomer) !== -1 ||
          item.requestCustomerFirstName
            .toLowerCase()
            .search(fRequestCutomer) !== -1 ||
          item.requestCustomerLastName.toLowerCase().search(fRequestCutomer) !==
            -1 ||
          item.requestTypeproduct === fRequestProduct ||
          (item.requestNumeroTechincian !== null &&
            item.requestNumeroTechincian === fRequestRepairer) ||
          item.requestStatus === fRequestStatus ||
          moment(item.requestDateCreation).format("DD/MM/YYYY") ===
            fRequestDate ||
          item.requestId === fRequestNumero
        );
      });
      if (resultList.length <= 0 || resultList.length === requestList.length) {
        message.info({
          content:
            "l'élément que vous recherchez n'existe pas par ce filtre ou ce filtre existe en tout",
          className: "custom-class",
          style: {
            marginTop: "15vh",
          },
        });
      }

      return {
        ...state,
        requests: requestList,
        isSearchActive: !!resultList.length > 0 || false,
        foundRequests: resultList,
        requestStatus: "",
        requestTypeproduct: "",
        requestDateCreation: "",
        requestCustomerCompletName: "",
        searchRequestId: "",
        errors: {},
      };
    }

    case "SELECT_REQUEST_TO_ADD_TECHNICIAN": {
      const requestIndex = state.requests.findIndex(
        (item) => item.requestId === parseInt(action.payload)
      );

      if (requestIndex < 0) {
        return state;
      }
      const updateRequest = [...state.requests];
      const technician = [state.selectedTechnician];
      updateRequest[requestIndex].requestStatus = "2";
      updateRequest[requestIndex].requestStatusName = "ACCEPTEE CTA";
      updateRequest[requestIndex].requestPhoneTechincian = technician[0].phone;
      updateRequest[requestIndex].requestFullNameTechnician =
        technician[0].fullname;
      return {
        ...state,
        requests: updateRequest,
      };
    }

    case "SUCCESS_ADD_TECHNICIAN_REQUEST":
      return { ...state, technicianToRequest: defaultTechnicianToRequest };

    case "FAIL_ADD_TECHNICIAN_TO_REQUEST":
      return { ...state };

    case "FAIL_GET_REQUESTS":
      return { ...state };

    case "SUCCESS_REFUS_REQUEST": {
      const requestIndex = state.requests.findIndex(
        (item) => item.requestId === state.refusRequest.requestId
      );
      if (requestIndex < 0) {
        return state;
      }
      const updateRequest = [...state.requests];
      updateRequest[requestIndex].requestStatus = "9";
      updateRequest[requestIndex].requestStatusName = "REFUSEE CTA";
      updateRequest[requestIndex].requestPhoneTechincian = "null";
      updateRequest[requestIndex].requestFullNameTechnician = "null";

      return {
        ...state,
        refusRequest: defaultRefusRequest,
        requests: updateRequest,
      };
    }

    case "FAIL_REFUS_REQUEST":
      window.location.reload();
      return { ...state, refusRequest: defaultRefusRequest };

    case "SUCCESS_CANCEL_REQUEST":
      const requestIndex = state.requests.findIndex(
        (item) => item.requestId === state.cancelRequest.requestId
      );
      if (requestIndex < 0) {
        return state;
      }
      const updateRequest = [...state.requests];
      updateRequest[requestIndex].requestStatus = "10";
      updateRequest[requestIndex].requestStatusName = "ANNULEE CTA";
      updateRequest[requestIndex].requestPhoneTechincian = "null";
      updateRequest[requestIndex].requestFullNameTechnician = "null";
      return {
        ...state,
        cancelRequest: defaultCancelRequest,
        requests: updateRequest,
      };

    case "FAIL_CANCEL_REQUEST":
      window.location.reload();
      return { ...state, cancelRequest: defaultCancelRequest };
    //Bigen Close
    case "SUCCESS_CLOSE_REQUEST":
      const requestIdx = state.requests.findIndex(
        (item) => item.requestId === state.closeRequest.requestId
      );
      if (requestIdx < 0) {
        return state;
      }
     
      const updateRequestIdx = [...state.requests];
      updateRequestIdx[requestIdx].requestStatus = "11";
      updateRequestIdx[requestIdx].requestStatusName = "CLOTUREE";
      updateRequestIdx[requestIdx].requestPhoneTechincian = "null";
      updateRequestIdx[requestIdx].requestFullNameTechnician = "null";
      return {
        ...state,
        closeRequest: defaultCloseRequest,
        requests: updateRequestIdx,
      };

    case "FAIL_CLOSE_REQUEST":
      window.location.reload();
      return { ...state, closeRequest: defaultCancelRequest };
    //End Close
    case "SUCCESS_QUOTE_UPDATE_REQUEST":
      return { ...state, quoteRequest: defaultQuoteRequest };

    case "FAIL_QUOTE_UPDATE_REQUEST":
      window.location.reload();
      return { ...state, quoteRequest: defaultQuoteRequest };

    case "FETCH_TECHNICIANS_FULFILLED": {
      return {
        ...state,
        technicians: action.payload ? action.payload : [],
        errors: {},
      };
    }

    case "FAIL_GET_TECHNICIANS":
      window.location.reload();
      return { ...state };

    case "SUCCESS_GET_TECHNICIANS":
      return {
        ...state,
        technicians: action.payload,
      };

    case "SELECT_TECHNICIAN": {
      var users = state.technicians.find((user) => {
        return user.userId === action.payload;
      });
      return {
        ...state,
        selectedTechnician: users,
      };
    }

    case "ADD_NEW_TECHNICIAN":
      return {
        ...state,
        technicians: [...state.technicians, state.selectTechnician],
        selectedTechnician: defaultTechnician,
      };

    case "OPEN_HISTORY_POPUP":
      return {
        ...state,
        openHistoryPopup: true,
        requestId: action.payload,
      };

    case "CLOSE_HISTORY_POPUP":
      return {
        ...state,
        openHistoryPopup: false,
        requestId: 0,
        historiques: defaultHistorique,
      };

    case "FETCH_HISTORIQUE_FULFILLED":
      return {
        ...state,
        historiques: action.payload ? action.payload : [],
      };

    case "FAIL_GET_HISTORIQUES":
      window.location.reload();
      return { ...state };

    case "FETCH_PRODUCTS_FULFILLED":
      return { ...state, products: action.payload ? action.payload : [] };

    case "FAIL_GET_PRODUCTS":
      window.location.reload();
      return { ...state };

    case "FETCH_STATUS_FULFILLED":
      return { ...state, status: action.payload ? action.payload : [] };

    case "FAIL_GET_STATUS":
      window.location.reload();
      return { ...state };

    case "FETCH_SUPPLIERS_FULFILLED":
      return { ...state, suppliers: action.payload ? action.payload : [] };

    case "FAILED_GET_SUPPLIERS":
      window.location.reload();
      return { ...state };

    default:
      break;
  }
  return state;
};

export const RequestContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const selectTechnician = (UserId) =>
    dispatch({ type: "SELECT_TECHNICIAN", payload: UserId });

  const onFilters = () => dispatch({ type: "SEARCH_REQUESTS" });
  const onGlobalSearch = (id) =>
    dispatch({ type: "SEARCH_GLOBAL_REQUESTS", payload: id });

  const selectRequest = (RequestId) =>
    dispatch({
      type: "SELECT_REQUEST_TO_ADD_TECHNICIAN",
      payload: RequestId,
    });

  const refusRequestReducer = (data) =>
    dispatch({ type: "SUCCESS_REFUS_REQUEST", payload: data });

  const openHistoryPopup = (requestId) =>
    dispatch({ type: "OPEN_HISTORY_POPUP", payload: requestId });

  const closeHistoryPopup = () => dispatch({ type: "CLOSE_HISTORY_POPUP" });

  const techniciansApi = () => technicianslist(dispatch, state);
  const requestsApi = () => requestslist(dispatch, state);
  const refusrequestApi = () => refusrequest(dispatch, state);
  const cancelrequestApi = () => cancelrequest(dispatch, state);
  const closerequestApi = () => closerequest(dispatch, state);
  const addtechniciantorequestApi = () =>
    addtechniciantorequest(dispatch, state);
  const historiqueslistApi = () => historiqueslist(dispatch, state);
  const requestquoteupdateApi = () => requestquoteupdate(dispatch, state);
  const productslistApi = () => productslist(dispatch, state);
  const statuslistApi = () => statuslist(dispatch, state);
  const supplierslistApi = () => supplierslist(dispatch, state);
  return (
    <RequestContext.Provider
      value={{
        state,
        selectTechnician,
        selectRequest,
        refusRequestReducer,
        openHistoryPopup,
        closeHistoryPopup,
        techniciansApi,
        requestsApi,
        refusrequestApi,
        requestquoteupdateApi,
        cancelrequestApi,
        addtechniciantorequestApi,
        historiqueslistApi,
        productslistApi,
        statuslistApi,
        supplierslistApi,
        onFilters,
        onGlobalSearch,
        closerequestApi,
      }}
    >
      {props.children}
    </RequestContext.Provider>
  );
};
