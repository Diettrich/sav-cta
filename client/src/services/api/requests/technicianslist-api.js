import { axios, apiConfig } from "../Config";

export const technicianslist = async (dispatch, data) => {
  // console.log(data)
  axios
    .create({
      baseURL: apiConfig.BaseUrl,
      timeout: 15000,
      headers: {'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`},
    })
    .get(apiConfig.Technicians + localStorage.getItem("ctaId"), {})
    .then(async function (response) {
      dispatch({
        type: "FETCH_TECHNICIANS_FULFILLED",
        payload: response.data.data,
      });
    })
    .catch(function (error) {
      console.log("error : " + error);
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("ctaId")
      window.location.reload();
      dispatch({ type: "FAIL_GET_TECHNICIANS" });
    });
};
