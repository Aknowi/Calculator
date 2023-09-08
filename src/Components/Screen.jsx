import { useContext } from "react";
import "../index.css";
import { CalcContext } from "../Context/CalcContext";

function Screen() {
  const { calc } = useContext(CalcContext);
  return (
    <div className="screen">
      <p>{calc.number ? calc.number : calc.res}</p>
    </div>
  );
}

export default Screen;
