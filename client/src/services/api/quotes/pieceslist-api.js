import { axios, apiConfig } from "../Config";

export const pieceslist = async (dispatch, data) => {
  axios
    .create({
      baseURL: apiConfig.BaseUrl,
      timeout: 15000,
      headers: {'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`},
    })
    .get(apiConfig.Pieces + localStorage.getItem("requestId"), {})
    .then(async function (response) { 
      dispatch({ type: "FETCH_PIECE_FULFILLED", payload: response.data.data });
      // 
    })
    .catch(function (error) {
      console.log("error : " + error);
      dispatch({ type: "FAIL_GET_PIECE" });
    });
};
