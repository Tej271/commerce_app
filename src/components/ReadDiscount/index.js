import React, { useState } from "react";
import { closeIcon } from "../../assets/images";
import "./styles.css";

function ReadDiscount({ rounded, addDiscount, discount: discountDetails }) {
  const [discount, setDiscount] = useState(
    discountDetails || {
      discount: 0,
      type: "",
    }
  );

  const handleSelect = (e) => {
    setDiscount({ ...discount, type: e.target.value });
    addDiscount(discount);
  };

  const handleValue = (e) => {
    setDiscount({ ...discount, discount: e.target.value });
    addDiscount(discount);
  };

  return (
    <div className="read-discount-container">
      <input
        type="text"
        className={`discount-input ${rounded ? "radius" : ""}`}
        value={discount.discount}
        onChange={handleValue}
      />
      <select
        className={`discount-select ${rounded ? "radius" : ""}`}
        value={discount.type}
        onChange={handleSelect}
      >
        <option value="percent">% off</option>
        <option value="flat">flat off</option>
      </select>
      <img alt="edit" className="close-img" src={closeIcon} width="12" height="12" />
    </div>
  );
}

export default ReadDiscount;
