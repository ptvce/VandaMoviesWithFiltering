const toast = (store) => (next) => (action) => {
  if (action.type === "error") console.log("toastify", action.payload.message);
  else next(action);
};

export default toast;
