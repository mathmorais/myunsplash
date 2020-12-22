/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { successAction, setSuccessFalseAction } from "../actions/modalActions";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ImageEl from "./ImageEl";

function Main() {
  const history = useHistory();
  const storage = localStorage.getItem("name_unsplash");

  const successState = useSelector((state) => state.checkSuccessReducer);
  const filtredData = useSelector((state) => state.filtredReducer);

  const dispatch = useDispatch();

  useEffect(async () => {
    if (storage) {
      await getImageData(storage);
      writeDataOnScreen();
    } else {
      history.push("/");
    }
  });

  useEffect(() => {
    dispatch(successAction());
  }, [filtredData]);

  useEffect(() => {
    if (successState) {
      getImageData(storage).then(() => {
        writeDataOnScreen();
        dispatch(setSuccessFalseAction());
      });
    }
  }, [successState]);

  async function getImageData(name) {
    const user = {
      username: name,
    };

    const res = await fetch("http://localhost:3000/api/get", {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(user),
    });
    const data = await res.text();
    localStorage.setItem("userLocalState", data);
    return data;
  }

  function deleteItem(ev) {
    const imageEl = ev.target.parentNode.parentNode;

    const imageToDelete = {
      id: imageEl.dataset.id,
    };

    fetch("http://localhost:3000/api/delete", {
      method: "DELETE",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(imageToDelete),
    }).then(async (res) => {
      if (res.ok) {
        dispatch(successAction());
      }
    });
  }

  function writeFiltredData() {
    if (filtredData) {
      return <ImageEl arr={filtredData} deleteItem={deleteItem}></ImageEl>;
    } else if (filtredData.length < 1) {
      return <h2>No item found</h2>;
    }
  }

  function writeDataOnScreen() {
    const objectData = JSON.parse(localStorage.getItem("userLocalState"));

    if (objectData) {
      return (
        <ImageEl arr={objectData.images} deleteItem={deleteItem}></ImageEl>
      );
    }
  }

  if (filtredData.length < 1) {
    return (
      <main>
        <div className="image-container">{writeDataOnScreen()}</div>
      </main>
    );
  } else {
    return (
      <main>
        <div className="image-container">{writeFiltredData()}</div>
      </main>
    );
  }
}

export default Main;
