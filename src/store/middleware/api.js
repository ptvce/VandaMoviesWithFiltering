import axios from "axios";
import * as actions from "../api";
import { apiUrl } from "../../config.json";

// const action = {
//   type: "apiCallBegan",
//   payload: {
//     url: "/bugs",
//     method: "get",
//     data: {},
//     onSuccess: "bugsReceived",
//     onError: "apiRequestFailed",
//   },
// };

const api =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) {
      next(action);
      return;
    }
    const { url, method, data, onSuccess, onError } = action.payload;
    try {
      const response = await axios.request({
        baseURL: apiUrl,
        url,
        method,
        data,
      });
      //General
      dispatch(actions.apiCallSuccess(response.data));
      //Specific
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (ex) {
      //General
      dispatch(actions.apiCallFailed(ex.message));
      //Specific
      if (onError) dispatch({ type: onError, payload: ex.message });
    }
  };

export default api;
