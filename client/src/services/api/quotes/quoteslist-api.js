import { axios, apiConfig } from "../Config";

export const quoteslist = async (dispatch, data) => {
  axios
    .create({
      baseURL: apiConfig.BaseUrl,
      timeout: 15000,
      headers: {'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`},
    })
    .get(apiConfig.RequestQuote + localStorage.getItem("requestId")+"/"+localStorage.getItem("ctaId"), {})
    .then(async function (response) {     
      // console.log(response.data.data.listPiece) 
      dispatch({ type: "FETCH_QUOTE_FULFILLED", payload: response.data.data.listPiece });
      dispatch({type: "SUCCESS_FETCH_QUOTE_FULFILLED"})
      // 
    })
    .catch(function (error) {
      console.log("error : " + error);
      dispatch({ type: "FAIL_GET_QUOTE" });
      // alert(error.response.data.error.message);
    });
};
