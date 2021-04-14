import { axios, apiConfig } from "../Config";

export const cancelrequest = async (dispatch, data) => {
  //console.log(data.cancelRequest);
  
  axios
    .create({
      baseURL: apiConfig.BaseUrl,
      timeout: 15000,
      headers: {'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`},
    })
    .post(apiConfig.CancelRequest, {
      RequestId: data.cancelRequest.requestId,
      CTAId: data.cancelRequest.ctaId,
      MessageCancel: data.cancelRequest.messageCancel,
      UserId: data.cancelRequest.userId,
    })
    .then(async function (response) {
      dispatch({
        type: "SUCCESS_CANCEL_REQUEST",
      });
      // console.log(response.data);
    })
    .catch(function (error) {
      console.log("error : " + error);
      dispatch({ type: "FAIL_CANCEL_REQUEST" });
      // alert(error.response.data.error.message);
    });
};
