import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const Table = () => {
  const [rows, setRows] = useState([
    { id: '1', name: 'Row 1' },
    { id: '2', name: 'Row 2' },
    { id: '3', name: 'Row 3' },
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedRows = Array.from(rows);
    const [movedRow] = reorderedRows.splice(result.source.index, 1);
    reorderedRows.splice(result.destination.index, 0, movedRow);

    setRows(reorderedRows);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <table>
        <thead>
          <tr>
            <th>Drag</th>
            <th>Name</th>
          </tr>
        </thead>
        <Droppable droppableId="table-body" type="ROWS">
          {(provided) => (
            <tbody
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {rows.map((row, index) => (
                <Draggable key={row.id} draggableId={row.id} index={index}>
                  {(provided) => (
                    <tr
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <td>
                        <img
                          src="drag-icon.png"
                          alt="Drag"
                          style={{ cursor: 'grab', width: '16px' }}
                        />
                      </td>
                      <td>{row.name}</td>
                    </tr>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </tbody>
          )}
        </Droppable>
      </table>
    </DragDropContext>
  );
};

export default Table;
