import { axios, apiConfig } from "../Config";

export const statuslist = async (dispatch, data) => {
 
  axios
    .create({
      baseURL: apiConfig.BaseUrl,
      timeout: 15000,
      headers: {'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`},
    })
    .get(apiConfig.Status, {})
    .then(async function (response) {  
      dispatch({ type: "FETCH_STATUS_FULFILLED", payload: response.data.data });
      
      // 
    })
    .catch(function (error) {
      console.log("error : " + error);
      dispatch({ type: "FAILED_GET_STATUS" });
      // alert(error.response.data.error.message);
    });
};
