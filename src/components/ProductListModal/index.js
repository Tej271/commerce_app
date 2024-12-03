import React, { useState, useEffect, useRef } from "react";
import Button from "../Button";
import { btnClose, btnSearch } from "../../assets/images";
import "./styles.css";

const data = [
  {
    id: 77,
    title: "Fog Linen Chambray Towel - Beige Stripe",
    variants: [
      {
        id: 1,
        product_id: 77,
        title: "XS / Silver",
        price: "49",
      },
      {
        id: 2,
        product_id: 77,
        title: "S / Silver",
        price: "49",
      },
      {
        id: 3,
        product_id: 77,
        title: "M / Silver",
        price: "49",
      },
    ],
    image: {
      id: 266,
      product_id: 77,
      src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/77/images/266/foglinenbeigestripetowel1b.1647248662.386.513.jpg?c=1",
    },
  },
  {
    id: 80,
    title: "Orbit Terrarium - Large",
    variants: [
      {
        id: 64,
        product_id: 80,
        title: "Default Title",
        price: "109",
      },
    ],
    image: {
      id: 272,
      product_id: 80,
      src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/80/images/272/roundterrariumlarge.1647248662.386.513.jpg?c=1",
    },
  },
];

const ProductListModal = ({ toggleModal, addProduct }) => {
  const productRefs = useRef({});
  const [searchTerm, setSearchTerm] = useState("");
  const [checkedState, setCheckedState] = useState(() => {
    let initialState = {};
    initialState = data.reduce((acc, product) => {
      acc[product.id] = {
        ...product,
        checked: false,
        variants: product.variants.map((variant) => ({
          ...variant,
          checked: false,
        })),
      };
      return acc;
    }, {});
    console.log(initialState);
    return initialState;
  });

  const handleModalClick = (e) => {
    if (e.target.className === "modal show") {
      toggleModal();
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleProductChange = (productId) => {
    setCheckedState((prevState) => {
      const productState = prevState[productId];
      const isChecked = !productState.checked;

      const updatedVariants = productState.variants.map((variant) => ({
        ...variant,
        checked: isChecked,
      }));

      return {
        ...prevState,
        [productId]: {
          ...productState,
          checked: isChecked,
          variants: updatedVariants,
        },
      };
    });
  };

  const handleVariantChange = (productId, variantId) => {
    setCheckedState((prevState) => {
      const productState = prevState[productId];
      const updatedVariants = productState.variants.map((variant) =>
        variant.id === variantId ? { ...variant, checked: !variant.checked } : variant
      );

      const allChecked = updatedVariants.every((v) => v.checked);
      const noneChecked = updatedVariants.every((v) => !v.checked);

      return {
        ...prevState,
        [productId]: {
          ...productState,
          checked: allChecked,
          variants: updatedVariants,
        },
      };
    });
  };

  const selectedProductCount = Object.values(checkedState).filter(
    (product) => product.checked || product.variants.some((variant) => variant.checked)
  ).length;

  useEffect(() => {
    Object.keys(checkedState).forEach((productId) => {
      const productState = checkedState[productId];
      const ref = productRefs.current[productId];

      if (ref) {
        const variantStates = productState.variants.map((v) => v.checked);
        const allChecked = variantStates.every(Boolean);
        const noneChecked = variantStates.every((v) => !v);

        ref.indeterminate = !allChecked && !noneChecked && variantStates.length > 0;
      }
    });

  }, [checkedState]);

  return (
    <div className={`modal`} onClick={handleModalClick}>
      <div className="modal-list-container">
        <div className="list-header">
          <span className="title">Select Products</span>
          <img alt="close" src={btnClose} width="17px" height="17px" onClick={toggleModal} />
        </div>
        <div className="list-search">
          <div className="search-container">
            <img alt="search" src={btnSearch} className="search-icon" />
            <input
              type="search"
              className="search-input"
              placeholder="Search product"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div>
          {Object.values(checkedState)
            .filter((x) => x.title.toLowerCase().includes(searchTerm))
            .map((product) => (
              <div key={product.id}>
                <div key={product.id} className="product-main">
                  <input
                    type="checkbox"
                    className="checkbox"
                    ref={(el) => (productRefs.current[product.id] = el)}
                    checked={product.checked}
                    onChange={() => handleProductChange(product.id)}
                  />
                  <img
                    alt="shirt"
                    src={product.image.src}
                    className="prod-img"
                    width={"36"}
                    height={"36"}
                  />
                  <span>{product.title}</span>
                </div>

                {product.variants.map((variant) => (
                  <div key={variant.id} className="product-variant-main">
                    <div className="variant-container">
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={variant.checked}
                        onChange={() => handleVariantChange(product.id, variant.id)}
                      />
                      <label>{variant.title}</label>
                    </div>
                    <div className="price-container">
                      <span>{variant.product_id} available</span>
                      <span>${variant.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}

          <div className="footer">
            <span>{selectedProductCount} product selected</span>
            <div className="footer-buttons">
              <Button title={"Cancel"} type={"outlined"} size={"normal"} />
              <div className="add">
                <Button
                  title={"Add"}
                  type={"filled"}
                  onClick={() => {
                    addProduct(checkedState);
                    toggleModal();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListModal;
