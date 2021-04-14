import { axios, apiConfig } from "../Config";

export const requestquoteupdate = async (dispatch, data) => {
  // console.log("id request : " + data.idrequest);

  axios
    .create({
      baseURL: apiConfig.BaseUrl + apiConfig.RequestQuoteUpdate,
      timeout: 15000,
      headers: {'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`},
    })
    .post("", {
      RequestId: data.requestId,
      CTAId: data.ctaId,
      PriceCustomer: data.priceCustomer,
      ListPiece: [data.listPiece],
      UserId: data.userId,
    })
    .then(async function (response) {
      dispatch({
        type: "SUCCESS_QUOTE_UPDATE_REQUEST",
      });
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("error : " + error);
      dispatch({ type: "FAIL_QUOTE_UPDATE_REQUEST" });
      // alert(error.response.data.error.message);
    });
};
