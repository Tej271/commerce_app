import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "../Button";
import { btnClose, btnSearch } from "../../assets/images";
import "./styles.css";
const API_KEY = process.env.MONK_APP_API_KEY;

const ProductListModal = ({ toggleModal, addProduct }) => {
  const productRefs = useRef({});
  const [searchTerm, setSearchTerm] = useState("");
  const [checkedState, setCheckedState] = useState({});
  const [products, setProducts] = useState([]);
  console.log(products)
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
    const url = "https://stageapi.monkcommerce.app/task/products/search";
    const headers = {
      "x-api-key": API_KEY,
    };

    const getProducts = async () => {
      try {
        const response = await axios.get(url, {
          headers,
          params: {
            search: searchTerm,
            page: 2,
          },
        });

        const productsData = response.data;
        setProducts(productsData);

        // Initialize checkedState based on fetched products
        const newCheckedState = productsData?.reduce((acc, product) => {
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
        setCheckedState(newCheckedState);
      } catch (error) {
        console.error("Error occurred:", error.response?.data || error.message);
      }
    };

    getProducts();
  }, [searchTerm]);

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

        <div className="product-list-container">
          {Object.values(checkedState).map((product) => (
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
                    {variant.inventory_quantity > 0 ? (
                      <span>{variant.inventory_quantity} available</span>
                    ) : null}
                    <span>${variant.price}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
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
  );
};

export default ProductListModal;
