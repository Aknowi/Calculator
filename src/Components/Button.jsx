import "../index.css";

export function Button({ value }) {
  const getStyle = (button) => {
    const className = {
      "=": "equal-button",
      "+-": "math-symbols-button",
      "%": "math-symbols-button",
      "\u00F7": "special-button",
      "\xd7": "special-button",
      "\u2212": "special-button",
      "+": "special-button",
      C: "clear-button",
    };
    return className[button];
  };

  return <button className={`button ${getStyle(value)}`}>{value}</button>;
}
