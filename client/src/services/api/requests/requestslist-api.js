import { axios, apiConfig } from "../Config";

export const requestslist = async (dispatch, data) => {
  axios
    .create({
      baseURL: apiConfig.BaseUrl,
      timeout: 15000,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    })
    .get(apiConfig.Requests + localStorage.getItem("ctaId"), {})
    .then(async function (response) {
      // console.log(response.data)
      if (response.data.succeeded) {
        // console.log(response.data.data)
        dispatch({
          type: "FETCH_REQUESTS_FULFILLED",
          payload: response.data.data,
        });
      } else if (!response.data.Succeeded) {
        // console.log(response.data.Succeeded)
        dispatch({ type: "FAIL_GET_REQUESTS", payload: response.data });
      }

      //
    })
    .catch(function (error) {
      console.log("error : " + error);
      dispatch({ type: "FAIL_GET_REQUESTS" });
      // alert(error.response.data.error.message);
    });
};
