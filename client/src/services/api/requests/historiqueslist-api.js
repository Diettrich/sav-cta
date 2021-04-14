import { axios, apiConfig } from "../Config";

export const historiqueslist = async (dispatch, data) => {
  axios
    .create({
      baseURL: apiConfig.BaseUrl,
      timeout: 15000,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    })
    .get(apiConfig.Historiques + data.requestId, {})
    .then(async function (response) {
      // console.log(response.data)
      if (response.data.succeeded) {
        dispatch({
          type: "FETCH_HISTORIQUE_FULFILLED",
          payload: response.data.data,
        });
      } else {
        dispatch({ type: "FAIL_GET_HISTORIQUES" });
      }
    })
    .catch(function (error) {
      console.log("error : " + error);
      dispatch({ type: "FAIL_GET_HISTORIQUES" });
    });
};
