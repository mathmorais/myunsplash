import React, { useState } from "react";
import { modalAction, successAction } from "../actions/modalActions";
import { useSelector, useDispatch } from "react-redux";

function Modal() {
  const [labelField, setLabelField] = useState();
  const [urlField, seturlField] = useState();

  const modalState = useSelector((state) => state.modalReducer);

  const dispatch = useDispatch();

  function checkStateModal(elem) {
    return modalState ? `${elem} show` : elem;
  }

  function handleInputValue(ev) {
    if (ev.target.name === "label") {
      setLabelField(ev.target.value);
    } else {
      seturlField(ev.target.value);
    }
  }

  function saveImageOnProfile() {
    const user = {
      username: localStorage.getItem("name_unsplash"),
      label: labelField,
      url: urlField,
    };

    fetch("http://localhost:3000/api/add/image", {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(user),
    }).then((res) => {
      if (res.ok) {
        dispatch(successAction());
        dispatch(modalAction());
      } else {
        console.log(res);
      }
    });
  }

  return (
    <div className={checkStateModal("modal-container")}>
      <div className={checkStateModal("modal-content")}>
        <h1>Add a new photo</h1>
        <div className="inputs-modal">
          <label htmlFor="label-field">Label</label>
          <input
            id="label-field"
            type="text"
            placeholder="Suspendisse elit massa"
            name="label"
            onInput={handleInputValue}
            value={labelField}
          ></input>
          <label htmlFor="url-field">Photo </label>
          <input
            id="url-field"
            name="url"
            type="text"
            onInput={handleInputValue}
            value={urlField}
            placeholder="https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r..."
          ></input>
        </div>
        <div className="confirm-buttons">
          <button
            onClick={() => {
              dispatch(modalAction());
            }}
          >
            Cancel
          </button>
          <button className="confirm-button" onClick={saveImageOnProfile}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
