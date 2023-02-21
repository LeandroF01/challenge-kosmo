import React, { useState } from "react";
import { useFetch } from "./hook/useFetch";
import Component from "./components/Component";

const App = () => {
  const [moveableComponents, setMoveableComponents] = useState([]);
  const [selected, setSelected] = useState(null);
  const imageBackground =  useFetch()
  

  const addMoveable = () => {
    // Create a new moveable component and add it to the array
    const site = ["contain", "cover", "auto"];
    const image = imageBackground.map(el => el.url);

    setMoveableComponents([
      ...moveableComponents,
      {
        id: Math.floor(Math.random() * Date.now()),
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        backgroundImage: image[Math.floor(Math.random() * image.length)],
        backgroundSize: site[Math.floor(Math.random() *2)],
        updateEnd: true
      },
    ]);
  };

  const updateMoveable = (id, newComponent, updateEnd = false) => {
    const updatedMoveables = moveableComponents.map((moveable, i) => {
      if (moveable.id === id) {
        // return { id, ...newComponent, updateEnd };
         moveable.style = {...moveable.style, with:newComponent.width, height: newComponent.height}
         return { id, ...newComponent, updateEnd };
      }
      return moveable;
    });
    setMoveableComponents(updatedMoveables);
  };

  const handleResizeStart = (index, e) => {
    console.log("e", e.direction);
    // Check if the resize is coming from the left handle
    const [handlePosX, handlePosY] = e.direction;
    // 0 => center
    // -1 => top or left
    // 1 => bottom or right

    // -1, -1
    // -1, 0
    // -1, 1
    if (handlePosX === -1) {
      console.log("width", moveableComponents, e);
      // Save the initial left and width values of the moveable component
      const initialLeft = e.left;
      const initialWidth = e.width;

      // Set up the onResize event handler to update the left value based on the change in width
    }
  };

  

  return (
    <main style={{ height : "100vh", width: "100vw" }}>
      <button onClick={addMoveable}>Add Moveable1</button>
      <div
        id="parent"
        style={{
          position: "relative",
          background: "black",
          height: "80vh",
          width: "80vw",
          overflow:'hidden',
        }}
      >
    
         {moveableComponents.map((item, index) => (
          <Component
            {...item}
            key={index}
            updateMoveable={updateMoveable}
            handleResizeStart={handleResizeStart}
            setSelected={setSelected}
            isSelected={selected === item.id}
          />
        ))}
     
       
        </div>
      
    </main>
  );
};

export default App;

