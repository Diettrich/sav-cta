import React, { createContext, useReducer } from "react";
import { quoteslist, pieceslist, updatequote } from "../services/api";
export const RequestDetailsContext = createContext();

// const defaultPieceList = {
//   PieceId: 0,
//   PieceName: "",
//   PieceQte: 0,
//   PieceRef: "",
//   PieceSupplierPrice: 0,
//   PriceCTA: 0,
// };

const defaultQuoteRequest = {
  ctaId: "",
  requestId: 0,
  listPiece: [],
  priceCustomer: 0,
  userId: "",
};

const initialState = {
  pieces: [],
  piecesPopup: [],
  GrandTotal: 0,
  selectPieceRef: 0,
  selectIdPiece: "",
  priceCTA: "",
  requestId: 0,
  quoteRequest: defaultQuoteRequest,
  qty: 0,
  openPopup: false,
  redirect: false,
  backdropLoading: true 
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_QUOTE_FULFILLED": {
      return {
        ...state,
        pieces: action.payload ? action.payload : [],
        errors: {},
      };
    }

    case "SUCCESS_FETCH_QUOTE_FULFILLED": {
      let priceCustomer = 0;
      state.pieces.forEach((element) => {
        priceCustomer += parseInt(element.priceCTA);
      });
      return {
        ...state,
        GrandTotal: priceCustomer,
        errors: {},
      };
    }

    case "FAIL_GET_QUOTES":
      return { ...state };

    case "FETCH_PIECE_FULFILLED": {
      return {
        ...state,
        piecesPopup: action.payload ? action.payload : [],
        errors: {},
      };
    }

    case "FAIL_GET_PIECE":
      window.location.reload();
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("ctaId");
      localStorage.removeItem("requestId");

      return { ...state };

    case "POST_QUOTE_REQUEST": {
      let priceCustomer = 0;
      let listPiece = [];
      state.pieces.forEach((element) => {
        var defaultPieceListItem = {
          PieceId: element.pieceId,
          PieceName: element.pieceName,
          PieceQte: parseInt(element.pieceQte),
          PieceRef: element.pieceRef,
          PieceSupplierPrice: element.pieceSupplierPrice,
          PriceCTA: parseFloat(element.priceCTA),
        };

        listPiece.push(defaultPieceListItem);
        priceCustomer += parseFloat(element.priceCTA);
      });
      // console.log(listPiece)

      defaultQuoteRequest.ctaId = localStorage.getItem("ctaId");
      defaultQuoteRequest.requestId = parseInt(
        localStorage.getItem("requestId")
      );
      defaultQuoteRequest.priceCustomer = priceCustomer;
      defaultQuoteRequest.userId = localStorage.getItem("ctaId");
      defaultQuoteRequest.listPiece = listPiece;

      return {
        ...state,
        quoteRequest: defaultQuoteRequest,
        errors: {},
      };
    }
    case "SUCCESS_POST_QUOTE_REQUEST":
       
      return { ...state, quoteRequest: defaultQuoteRequest, redirect: true, backdropLoading: false };

    case "FAIL_POST_QUOTE_REQUEST":
      return { ...state };

    case "DELETE_PRODUCT":
      const piecesIndex = state.pieces.findIndex(
        (item) => item.pieceId === action.payload
      );
      if (piecesIndex < 0) {
        return state;
      }
      const updateList = [...state.pieces];
      updateList.splice(piecesIndex, 1);

      var total = 0;
      for (var p = 0; p < updateList.length; p++) {
        total += parseInt(updateList[p].priceCTA);
      }
      return {
        ...state,
        pieces: updateList,
        GrandTotal: total,
      };

    case "TOTAL_PRICE":
      const listProducts = [...state.pieces];
      var sum = 0;
      for (var i = 0; i < listProducts.length; i++) {
        sum += parseInt(listProducts[i].priceCTA);
      }
      return {
        ...state,
        GrandTotal: sum,
      };

    case "SELECT_REFPRODUCT_CHANGED":
      //console.log(action.payload);
      return { ...state, selectPieceRef: action.payload };

    case "SELECT_IDPIECE_CHANGED":
      // alert(action.payload)
      return { ...state, selectIdPiece: action.payload };

    case "PRICE_CTA_CHANGED":
      // alert(action.payload)
      return { ...state, priceCTA: action.payload };

    case "QTY_CHANGED":
      // alert(action.payload)
      return { ...state, qty: action.payload };

    case "ADD_ROW": {
      const list = [...state.pieces];
      const listSku = [...state.piecesPopup];   
     
      // console.log("-------------------"+parseInt(state.selectPieceRef))
      const pIndex = listSku.findIndex(
        (item) => item.pieceId === parseInt(state.selectPieceRef)
      );

      

      const obj = list.findIndex(
        (item) => item.pieceId === listSku[pIndex].pieceId
      );

      

      if (obj >= 0) {       
        const a = parseInt(list[obj].pieceQte) + parseInt(state.qty);
        list[obj].pieceQte = a;
      } 
      else {
        const defaultObject = {
          pieceId: 0,
          pieceRef: 0,
          pieceLibelle: "",
          pieceQte: "",
          priceFournisseur: "",
          priceCTA: "",
        };
        defaultObject.pieceId = state.piecesPopup[pIndex].pieceId;
        defaultObject.pieceRef = state.piecesPopup[pIndex].pieceRef;
        defaultObject.pieceLibelle = state.piecesPopup[pIndex].pieceName;
        defaultObject.priceFournisseur =
          state.piecesPopup[pIndex].pieceSupplierPrice;
        defaultObject.pieceQte = state.qty;
        defaultObject.priceCTA = 0;
        list.push(defaultObject);

        // console.log(list);
      }

      if (pIndex < 0) {
        return state;
      }

      return {
        ...state,
        pieces: list,
        selectRefProduct: "",
        priceCTA: 0,
        qty: 0,
      };
    }

    case "ONCHANGE_PRICE_CTA":
      const listPiece = [...state.pieces];
      const indexPiece = listPiece.findIndex(
        (item) => item.pieceId === state.selectIdPiece
      );
      listPiece[indexPiece].priceCTA = action.payload;
      // eslint-disable-next-line no-redeclare
      var total = 0;
      // eslint-disable-next-line no-redeclare
      for (var p = 0; p < listPiece.length; p++) {
        total += parseInt(listPiece[p].priceCTA);
      }

      //console.log(listPiece);
      return {
        ...state,
        pieces: listPiece,
        GrandTotal: total,
        selectIdPiece: "",
      };
    case "OPEN_SEND_POPUP":
      return {
        ...state,
        openPopup: true,
      };
    case "CLOSE_SEND_POPUP":
      return {
        ...state,
        openPopup: false,
      };
    default:
      break;
  }
  return state;
};

export const RequestDetailsContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const quoteslistApi = () => quoteslist(dispatch, state);
  const pieceslistApi = () => pieceslist(dispatch, state);
  const updatequoteApi = () => updatequote(dispatch, state);

  const collectPieces = (data) =>
    dispatch({ type: "POST_QUOTE_REQUEST", payload: data });

  const DeleteProduct = (id) =>
    dispatch({ type: "DELETE_PRODUCT", payload: id });

  const onSelectRefProductChanged = (data) => {
    dispatch({ type: "SELECT_REFPRODUCT_CHANGED", payload: data });
  };

  const onSelectIdPiece = (data) => {
    dispatch({ type: "SELECT_IDPIECE_CHANGED", payload: data });
  };

  const onChangePriceCTA = (data) => {
    dispatch({ type: "ONCHANGE_PRICE_CTA", payload: data });
  };

  const onQtyChanged = (data) => {
    dispatch({ type: "QTY_CHANGED", payload: data });
  };

  const TotalPrice = () => dispatch({ type: "TOTAL_PRICE" });
  const AddRow = () => dispatch({ type: "ADD_ROW" });
  const openCancelPopup = () => dispatch({ type: "OPEN_SEND_POPUP" });
  const closeCancelPopup = () => dispatch({ type: "CLOSE_SEND_POPUP" });
  return (
    <RequestDetailsContext.Provider
      value={{
        state,
        quoteslistApi,
        pieceslistApi,
        updatequoteApi,
        onSelectIdPiece,
        openCancelPopup,
        closeCancelPopup,
        DeleteProduct,
        TotalPrice,
        AddRow,
        onSelectRefProductChanged,
        onChangePriceCTA,
        onQtyChanged,
        collectPieces,
      }}
    >
      {props.children}
    </RequestDetailsContext.Provider>
  );
};
