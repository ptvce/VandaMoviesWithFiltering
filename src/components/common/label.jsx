import React from "react";

const Label = ({ text }) => {
  return (
    <div className="form-group">
      { text.map((tag) => (
             <div key={tag} >{tag}</div>
           ))} 
    </div>
  );
 
};

export default Label;