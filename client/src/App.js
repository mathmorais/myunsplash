import Main from "./Components/Main";
import Modal from "./Components/Modal";
import Navbar from "./Components/Navbar";
import "./css/root.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Components/Login";
import { modalReducer, checkSuccessReducer } from "./reducers/modalReducer";
import { filtredReducer } from "./reducers/filtredReducer";
import { searchReducer } from "./reducers/searchReducer";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import Footer from "./Components/Footer";

function App() {
  const allReducers = combineReducers({
    modalReducer,
    checkSuccessReducer,
    filtredReducer,
    searchReducer,
  });

  const store = createStore(allReducers);

  return (
    <Router>
      <div className="container">
        <Route exact path="/">
          <Login></Login>
        </Route>
        <Route path="/images">
          <Provider store={store}>
            <Navbar></Navbar>
            <Modal></Modal>
            <Main></Main>
            <Footer></Footer>
          </Provider>
        </Route>
      </div>
    </Router>
  );
}

export default App;
