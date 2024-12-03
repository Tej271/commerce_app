import React, { useState } from "react";
import { dragIcon, editIcon } from "../../assets/images";
import "./styles.css";
import Button from "../Button";
import ReadDiscount from "../ReadDiscount";

function SelectProduct({
  product,
  index,
  toggleModal,
  addProdDiscount,
  addVarDiscount,
  innerRef,
  draggableProps,
  dragHandleProps,
}) {
  const [showDiscount, setShowDiscount] = useState(false);
  const [showVariants, setShowVariants] = useState(false);

  const handleDiscount = () => {
    setShowDiscount(!showDiscount);
  };

  const handleVariant = () => {
    setShowVariants(!showVariants);
  };

  return (
    <>
      <tr className="select-product-tr" ref={innerRef} {...draggableProps} {...dragHandleProps}>
        <td>
          <img alt="drag" src={dragIcon} className="drag-icon" style={{ cursor: "grab" }} />
          <span>{index + 1}.</span>
        </td>
        <td>
          <div className="input-container">
            <input
              className="search"
              placeholder="Select Product"
              onFocus={toggleModal}
              value={product.title}
              readOnly
            />
            <img
              alt="edit"
              className="edit-img"
              src={editIcon}
              width="16"
              height="16"
              onClick={toggleModal}
            />
          </div>
        </td>
        <td>
          {!showDiscount || product.discount ? (
            <Button title={"Add Discount"} onClick={handleDiscount} type={"filled"} />
          ) : (
            <ReadDiscount addDiscount={addProdDiscount} discount={product.discount} />
          )}
        </td>
      </tr>
      {product.variants.length ? (
        <>
          <tr>
            <td />
            <td />
            <td align="right">
              <span className="variants-indicator" onClick={handleVariant}>
                {showVariants ? "Hide variants" : "Show variants"}
              </span>
            </td>
          </tr>
          {showVariants
            ? product.variants.map((variant) => (
                <tr>
                  <td></td>
                  <td>
                    <img alt="drag" src={dragIcon} className="drag-icon" />
                    <span className="variant-title">{variant.title}</span>
                  </td>
                  <td>
                    <ReadDiscount
                      rounded
                      addDiscount={addVarDiscount}
                      discount={variant.discount}
                    />
                  </td>
                </tr>
              ))
            : null}
        </>
      ) : null}
    </>
  );
}

export default SelectProduct;
