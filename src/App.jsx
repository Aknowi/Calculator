import "./index.css";
import Wrapper from "./Components/Wrapper";
import Screen from "./Components/Screen";
import { ButtonsBox } from "./Components/ButtonsBox";
import { Button } from "./Components/Button";
import { CalcProvider } from "./Context/CalcContext";

// TO DO:
// - add hover for the buttons - accordingly
// - max 14 digits allowed on screen

const division = "\u00F7";
const multiplication = "\xd7";
const subtraction = "\u2212";

const buttonChar = [
  ["C", "+-", "%", "\u00F7"],
  [7, 8, 9, "\xd7"],
  [4, 5, 6, "\u2212"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

function App() {
  return (
    <CalcProvider>
      <Wrapper>
        <Screen screenChar />
        <ButtonsBox>
          {buttonChar.flat().map((button, index) => (
            <Button value={button} key={index} />
          ))}
        </ButtonsBox>
      </Wrapper>
    </CalcProvider>
  );
}

export default App;
