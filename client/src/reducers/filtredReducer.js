function filtredReducer(state = [], action) {
  switch (action.type) {
    case "SET_ARR":
      return (state = action.payload);
    default:
      return state;
  }
}

export { filtredReducer };
