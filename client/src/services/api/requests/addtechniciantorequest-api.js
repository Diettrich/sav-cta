import { axios, apiConfig } from "../Config";

export const addtechniciantorequest = async (dispatch, data) => {
  // console.log(data.technicianToRequest);

  axios
    .create({
      baseURL: apiConfig.BaseUrl,
      timeout: 15000,
      headers: {'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`},
     
    })
    .post(apiConfig.AddTechnician, {
      RequestId: data.technicianToRequest.requestId,
      CTAId: data.technicianToRequest.ctaId,
      RepairerId: data.technicianToRequest.repairerId
    })
    .then(async function (response) {
      dispatch({
        type: "SUCCESS_ADD_TECHNICIAN_REQUEST"        
      });
      // console.log(response.data);
    })
    .catch(function (error) {
      console.log("error : " + error);
      dispatch({ type: "FAIL_ADD_TECHNICIAN_TO_REQUEST" });
      // alert(error.response.data.error.message);
    });
};