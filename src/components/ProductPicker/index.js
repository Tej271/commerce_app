import React from "react";
import SelectProduct from "../SelectProduct";
import Button from "../Button";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./styles.css";

const ProductPicker = ({ toggleModal, addedProducts, setAddedProducts }) => {
  const newProduct = {
    id: -1,
    title: "",
    variants: [],
    image: {},
  };

  const handleAddProduct = () => {
    const newAddedProduct = { ...newProduct, id: addedProducts.length + 1 };
    setAddedProducts([...addedProducts, newAddedProduct]);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedProducts = Array.from(addedProducts);
    const [movedItem] = reorderedProducts.splice(result.source.index, 1);
    reorderedProducts.splice(result.destination.index, 0, movedItem);

    setAddedProducts(reorderedProducts);
  };

  return (
    <div className="picker-container">
      <div className="picker-sub-container">
        <span className="add-title">Add Products</span>
        <DragDropContext onDragEnd={onDragEnd}>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Discount</th>
              </tr>
            </thead>
            <Droppable droppableId="table-body" type="ROWS">
              {(provided) => (
                <tbody ref={provided.innerRef} {...provided.droppableProps}>
                  {addedProducts.map((product, index) => (
                    <Draggable
                      key={product.id.toString()}
                      draggableId={product.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <SelectProduct
                          product={product}
                          index={index}
                          toggleModal={toggleModal}
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}
                </tbody>
              )}
            </Droppable>
          </table>
        </DragDropContext>
        <div className="btn">
          <Button title="Add Product" type="outlined" size="large" onClick={handleAddProduct} />
        </div>
      </div>
    </div>
  );
};

export default ProductPicker;
