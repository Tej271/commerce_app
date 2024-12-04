import "./App.css";
import React, { useState } from "react";
import ProductPicker from "./components/ProductPicker";
import ProductListModal from "./components/ProductListModal";
import Header from "./components/Header";

function App() {
  const newProduct = {
    id: -1,
    title: "",
    variants: [],
    image: {},
  };
  const [displayList, setDisplayList] = useState(false);
  const [addedProducts, setAddedProducts] = useState([newProduct]);

  const toggleModal = () => {
    setDisplayList(!displayList);
  };

  const handleAddProduct = (productState) => {
    let temp = [];
    Object.keys(productState).forEach((key) => {
      if (productState[key].checked) {
        temp.push(productState[key]);
      }
    });
    setAddedProducts([...addedProducts.slice(0, addedProducts.length - 1), ...temp]);
  };

  return (
    <div className="App">
      <Header />
      <ProductPicker
        toggleModal={toggleModal}
        addedProducts={addedProducts}
        setAddedProducts={setAddedProducts}
      />
      {displayList ? (
        <ProductListModal toggleModal={toggleModal} addProduct={handleAddProduct} />
      ) : null}
    </div>
  );
}

export default App;
