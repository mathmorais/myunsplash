/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Logo from "../assets/images/my_unsplash_logo.svg";
import { setArrAction } from "../actions/filtredActions";
import { searchArrActions } from "../actions/searchActions";
import { modalAction } from "../actions/modalActions";
import { useDispatch } from "react-redux";

function Navbar() {
  const dispatch = useDispatch();

  const [searchField, setSearchField] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    let dataStorage = localStorage.getItem("userLocalState");
    dataStorage = JSON.parse(dataStorage);
    setData(dataStorage);
  }, [searchField]);

  useEffect(() => {
    const dataObject = data;
    if (dataObject) {
      let filtredArray = [];
      dataObject.images.forEach((img) => {
        if (img.label === searchField) {
          filtredArray.push(img);
        }
      });
      dispatch(setArrAction(filtredArray));
    }
    if (searchField === undefined) {
      return;
    } else {
      dispatch(searchArrActions(searchField));
    }
  }, [searchField]);

  let debounce = null;

  function getValueSearch(event) {
    const input = event.target;

    clearTimeout(debounce);
    debounce = setTimeout(() => {
      setSearchField(input.value);
    }, 500);
  }

  return (
    <nav>
      <div className="search-container">
        <img className="logo-name" alt="logo my-unsplash" src={Logo}></img>
        <div className="search-input">
          <input
            aria-label="Search by name"
            type="text"
            onInput={getValueSearch}
            placeholder="Search by name"
          ></input>
          <i className="material-icons">search</i>
        </div>
      </div>
      <div className="add-container">
        <button
          onClick={() => {
            dispatch(modalAction());
          }}
          className="confirm-button"
        >
          Add a photo
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
