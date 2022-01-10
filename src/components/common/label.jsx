import React from "react";

const Label = ({ text }) => {
  return (
    <div className="form-group" id="text">
      {text.map((tag) => (
             <div className="item" key={tag} >{tag}</div>
           ))}
    </div>
    
  );
 
};

export default Label;