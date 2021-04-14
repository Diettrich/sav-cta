import { axios, apiConfig } from "../Config";

export const refusrequest = async (dispatch, data) => {
  // console.log(data.refusRequest);
  
  axios
    .create({
      baseURL: apiConfig.BaseUrl,
      timeout: 15000,
      headers: {'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`},
     
    })
    .post(apiConfig.RefusRequest, {
      RequestId: data.refusRequest.requestId,
      CTAId: data.refusRequest.ctaId,
      MessageRefuse: data.refusRequest.messageRefuse,
      UserId: data.refusRequest.userId      
    })
    .then(async function (response) {
      dispatch({
        type: "SUCCESS_REFUS_REQUEST",
      });
      // console.log(response.data);
    })
    .catch(function (error) {
      console.log("error : " + error);
      dispatch({ type: "FAIL_REFUS_REQUEST" });
      // alert(error.response.data.error.message);
    });
};
