import React from "react";

function ImageEl(props) {
  return props.arr.map((el, index) => (
    <div
      key={index}
      data-id={el._id}
      className="img-el"
      style={{
        opacity: 1,
        backgroundImage: `url(${el.url})`,
      }}
    >
      <div className="img-overlay">
        <button onClick={props.deleteItem}>Delete</button>
        <div className="label-content">
          <h2>{el.label}</h2>
        </div>
      </div>
    </div>
  ));
}

export default ImageEl;
