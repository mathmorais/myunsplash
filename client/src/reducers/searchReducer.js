function searchReducer(state = "", action) {
  switch (action.type) {
    case "SET_FIELD":
      return (state = action.payload);
    default:
      return null;
  }
}

export { searchReducer };
