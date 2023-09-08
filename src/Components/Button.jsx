import { useContext } from "react";
import "../index.css";
import { CalcContext } from "../Context/CalcContext";

const getStyle = (button) => {
  const className = {
    "=": "equal-button",
    "+-": "math-symbols-button",
    "%": "math-symbols-button",
    "\u00F7": "special-button", // "/"
    "\xd7": "special-button", // "*"
    "\u2212": "special-button", // "-"
    "+": "special-button",
    C: "clear-button",
  };
  return className[button];
};

// const buttonChar = [
//   ["C", "+-", "%", "\u00F7"],
//   [7, 8, 9, "\xd7"],
//   [4, 5, 6, "\u2212"],
//   [1, 2, 3, "+"],
//   [0, ",", "="],
// ];

export function Button({ value }) {
  const { calc, setCalc } = useContext(CalcContext);
  console.log(calc);
  // User click comma
  const commaClick = () => {
    setCalc({
      ...calc,
      number: calc.number.toString().includes(",")
        ? calc.number
        : calc.number + value,
    });
  };

  const clearClick = () => {
    setCalc({
      sign: "",
      number: 0,
      res: 0,
    });
  };
  // User click number
  const handleDigitsOnClick = () => {
    const numberString = value.toString();
    console.log(Number(0 + "8"));
    let numberValue;
    if (numberString === "0" && calc.number === 0) {
      numberValue = "0";
    } else {
      numberValue = Number(calc.number + numberString);
    }

    setCalc({ ...calc, number: numberValue });
  };

  // User click sign
  const signClick = () => {
    setCalc({
      res: !calc.res && calc.number ? calc.number : calc.res,
      sign: value,
      number: 0,
    });
  };

  //  User click equal
  const equalsClick = () => {
    if (calc.res && calc.number) {
      const math = (a, b, sign) => {
        const result = {
          "+": (a, b) => a + b,
          "\u2212": (a, b) => a - b,
          "\u00F7": (a, b) => a / b,
          "\xd7": (a, b) => a * b,
        };
        return result[sign](a, b);
      };
      setCalc({
        res: math(calc.res, calc.number, calc.sign),
        sign: "",
        number: 0,
      });
    }
  };

  // User click precent

  const percentClick = () => {
    setCalc({
      res: calc.res / 100,
      number: calc.number / 100,
      sign: "",
    });
  };

  // User click invert button

  const invertClick = () => {
    setCalc({
      res: calc.res ? -calc.res : 0,
      number: calc.number ? -calc.number : 0,
      sign: "",
    });
  };

  const handleOnClick = () => {
    console.log(value);
    const result = {
      ".": commaClick,
      C: clearClick,
      "\u00F7": signClick, // "/"
      "\xd7": signClick, // "*"
      "\u2212": signClick, // "-"
      "+": signClick,
      "=": equalsClick,
      "%": percentClick,
      "+-": invertClick,
    };
    if (result[value]) {
      return result[value]();
    } else {
      return handleDigitsOnClick();
    }
  };

  return (
    <button onClick={handleOnClick} className={`button ${getStyle(value)}`}>
      {value}
    </button>
  );
}
