function modalReducer(state = false, action) {
  switch (action.type) {
    case "TOGGLE":
      return !state;

    default:
      return state;
  }
}
function checkSuccessReducer(state = false, action) {
  switch (action.type) {
    case "SUCCESS":
      return (state = true);
    case "FALSE":
      return (state = false);
    default:
      return state;
  }
}

export { checkSuccessReducer, modalReducer };
