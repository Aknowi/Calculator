import { useContext } from "react";
import "../index.css";
import { CalcContext } from "../Context/CalcContext";

function Screen() {
  const { calc } = useContext(CalcContext);

  const screenNumber = (number) => {
    if (number >= Math.pow(10, 9)) {
      return number.toExponential(9);
    }
    return number;
  };

  return (
    <div className="screen">
      <p>{calc.number ? screenNumber(calc.number) : screenNumber(calc.res)}</p>
    </div>
  );
}

export default Screen;
