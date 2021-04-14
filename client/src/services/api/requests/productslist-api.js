import { axios, apiConfig } from "../Config";

export const productslist = async (dispatch, data) => {
 
  axios
    .create({
      baseURL: apiConfig.BaseUrl,
      timeout: 15000,
      headers: {'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`},
    })
    .get(apiConfig.Products, {})
    .then(async function (response) { 
      // console.log(response) 
      dispatch({ type: "FETCH_PRODUCTS_FULFILLED", payload: response.data.data });
      
      // 
    })
    .catch(function (error) {
      console.log("error : " + error);
      dispatch({ type: "FAILED_GET_PRODUCTS" });
      // alert(error.response.data.error.message);
    });
};
