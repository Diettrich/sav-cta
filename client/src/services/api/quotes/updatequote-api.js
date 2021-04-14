import { axios, apiConfig } from "../Config";

export const updatequote = async (dispatch, data) => {
    console.log(data.quoteRequest);

  axios
    .create({
      baseURL: apiConfig.BaseUrl,
      timeout: 15000,
      headers: {'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`},
    })
    .post(apiConfig.RequestQuoteUpdate, {
      RequestId: data.quoteRequest.requestId,
      CTAId: data.quoteRequest.ctaId,
      PriceCustomer: data.quoteRequest.priceCustomer,
      ListPiece: data.quoteRequest.listPiece,
      UserId: data.quoteRequest.userId,
    })
    .then(async function (response) {
      dispatch({
        type: "SUCCESS_POST_QUOTE_REQUEST",
      });
      // console.log(response.data);
    })
    .catch(function (error) {
      console.log("error : " + error);
      dispatch({ type: "FAIL_POST_QUOTE_REQUEST" });
      // alert(error.response.data.error.message);
    });
};
