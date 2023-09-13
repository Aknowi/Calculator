import { useContext } from "react";
import "../index.css";
import { CalcContext } from "../Context/CalcContext";

const getStyle = (button) => {
  const className = {
    "=": "equal-button",
    "+-": "math-symbols-button",
    "%": "math-symbols-button",
    "\u00F7": "unicode-button", // "/"
    "\xd7": "unicode-button", // "*"
    "\u2212": "unicode-button", // "-"
    "+": "unicode-button",
    C: "clear-button",
  };
  return className[button];
};

export function Button({ value }) {
  const { calc, setCalc } = useContext(CalcContext);

  // User click comma
  const commaClick = () => {
    setCalc({
      ...calc,
      number: calc.number.toString().includes(".")
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
    let result = calc.res;

    if (calc.res !== 0 && calc.sign === "") {
      result = 0;
    }

    const numberString = value.toString();
    let numberValue;
    if (numberString === "0" && calc.number === 0) {
      numberValue = 0;
    } else if (calc.number === 0 && numberString !== "0") {
      numberValue = numberString;
    } else {
      numberValue = calc.number + numberString;
    }

    setCalc({ ...calc, number: numberValue, res: result });
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
    if (typeof calc.res !== "undefined" && typeof calc.number !== "undefined") {
      const math = (a, b, sign) => {
        //no division by 0
        if (sign === "\u00F7" && b === 0) {
          return 0;
        }

        const result = {
          "+": (a, b) => a + b,
          "\u2212": (a, b) => a - b,
          "\u00F7": (a, b) => a / b,
          "\xd7": (a, b) => a * b,
        };
        return result[sign](a, b);
      };

      setCalc({
        res: math(+calc.res, +calc.number, calc.sign),
        sign: "",
        number: 0,
      });
    }
  };

  // User click percent
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
      ...calc,
      number: calc.number ? -calc.number : 0,
    });
  };

  const handleOnClick = () => {
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
