import { axios, apiConfig } from "../Config";

export const signin = async (dispatch, data) => {
  //console.log("entering sign up api : " + data.email);
  dispatch({ type: "REQUEST" });

  axios
    .create({
      baseURL: apiConfig.BaseUrl,
      timeout: 15000,
      headers: {},
    })
    .post(apiConfig.BaseAuthUrl, {
      UserName: data.email,
      Password: data.password,
    })
    .then(async function (response) {
      if (response.data.succeeded) {
        if (checkRole(response.data.data.roles)) {
          dispatch({
            type: "REQUEST_SUCCESS",
            payload: response.data.data,
          });

          // console.log(response.data.data.roles.length);
        } else {
          dispatch({ type: "REQUEST_FAIL_ACCESS", payload: response.data });
        }
      } else if (!response.data.succeeded) {
        dispatch({ type: "REQUEST_FAIL", payload: response.data });
      }
    })
    .catch(function (error) {
      dispatch({ type: "REQUEST_FAIL", payload: error });
    });
};

export const logout = async (dispatch) => {
  dispatch({ type: "LOGOUT" });
};

function checkRole(roles) {
  let flag = false;
  for (let index = 0; index < roles.length; index++) {
    if (roles[index] === "CTA_ADMIN") {
      flag = true;
      break;
    }
  }
  return flag;
}
