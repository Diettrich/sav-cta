import { axios, apiConfig } from "../Config";

export const supplierslist = async (dispatch, data) => { 
  axios
    .create({
      baseURL: apiConfig.BaseUrl,
      timeout: 15000,
      headers: {'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`},
    })
    .get(apiConfig.Suppliers, {})
    .then(async function (response) {  
      dispatch({ type: "FETCH_SUPPLIERS_FULFILLED", payload: response.data.data });
      
      // 
    })
    .catch(function (error) {
      console.log(error);
      dispatch({ type: "FAILED_GET_SUPPLIERS", payload: error });
      // alert(error.response.data.error.message);
    });
};
