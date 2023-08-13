import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const Loader = () => {
  return (
    <>
     <ThreeCircles
      height={60}
      width={60}
      color="#02E37A"
      visible={true}
      ariaLabel="three-circles-rotating"
    />
    </>
  );
};

export default Loader;
