const modalAction = () => {
  return { type: "TOGGLE" };
};
const successAction = () => {
  return { type: "SUCCESS" };
};
const setSuccessFalseAction = () => {
  return { type: "FALSE" };
};

export { modalAction, successAction, setSuccessFalseAction };
