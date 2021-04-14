import { axios, apiConfig } from "../Config";

export const closerequest = async (dispatch, data) => {
  //console.log(data.closeRequest);
  
  axios
    .create({
      baseURL: apiConfig.BaseUrl,
      timeout: 15000,
      headers: {'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`},
    })
    .post(apiConfig.CloseRequest, {
      RequestId: data.closeRequest.requestId,
      CTAId: data.closeRequest.ctaId,
      MessageClose: data.closeRequest.messageClose,
      UserId: data.closeRequest.userId,
    })
    .then(async function (response) {
      dispatch({
        type: "SUCCESS_CLOSE_REQUEST",
      });
      // console.log(response.data);
    })
    .catch(function (error) {
      console.log("error : " + error);
      dispatch({ type: "FAIL_CLOSE_REQUEST" });
      // alert(error.response.data.error.message);
    });
};
