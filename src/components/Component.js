import React, { useRef, useState } from 'react'
import Moveable from 'react-moveable';


const Component = ({
    updateMoveable,
    top,
    left,
    width,
    height,
    index,
    backgroundImage,
    backgroundSize,
    id,
    setSelected,
    isSelected = false,
    updateEnd,
  }) => {
    
    const ref = useRef();

    const [frame, setFrame] = useState({
      translate: [0,0],
  });

const onResize = async (e) => {
    const beforeTranslate = e.drag.beforeTranslate;

    frame.translate = beforeTranslate;
    e.target.style.width = `${e.width}px`;
    e.target.style.height = `${e.height}px`;
    e.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
  }

  

const onResizeEnd = async (e) => {
    e.setOrigin(["%", "%"]);
    e.dragStart && e.dragStart.set(frame.translate);
}

  
const handleDelet = (e)=>{
    e.stopPropagation()
    const cord = e.target.value
    const element = document.querySelector(".draggable");
    const button = document.querySelector(".button");
   
    if(element.id === "component-" + cord) {
      element.remove();
      button.remove();
    }
  }

    
    
    
  
  
    return (
      <>
        <div
          ref={ref}
          className="draggable"
          id={"component-" + id}
          style={{
            position: "absolute",
            top: top,
            left: left,
            width: width,
            height: height,
            backgroundImage: `url(${backgroundImage})` ,
            backgroundSize: backgroundSize,
          }}
          onClick={() => setSelected(id)}
        />
      
  
        <Moveable
         
          target={isSelected && ref.current}
          draggable={true}
          resizable={true}
          onDrag={(e) => {
            updateMoveable(id, {
              top: e.top,
              left: e.left,
              width,
              height,
              backgroundImage,
              backgroundSize
            });
          }}
          onResizeStart={onResizeEnd}
          onResize={onResize}
          keepRatio={false}
          throttleResize={1}
          renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
          edge={true}
          zoom={1}
          origin={false}
          padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
         
        />
  
        <button className="button button-gen" onClick={handleDelet} value={id}>Remove</button>
      </>
    );
  };
  

export default Component