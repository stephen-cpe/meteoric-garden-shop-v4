import React from "react";

const StyledShopName = ({ className = "", style = {} }) => {
  return (
    <span 
      style={{ fontFamily: "Boomerang", ...style }} 
      className={`text-orange ${className}`}
    >
      Meteoric Garden Shop
    </span>
  );
};

export default StyledShopName;