import "./index.css";
import Wrapper from "./Components/Wrapper";
import Screen from "./Components/Screen";
import { ButtonsBox } from "./Components/ButtonsBox";
import { Button } from "./Components/Button";

const buttonChar = [
  ["C", "+-", "%", "\u00F7"],
  [7, 8, 9, "\xd7"],
  [4, 5, 6, "\u2212"],
  [1, 2, 3, "+"],
  [0, ",", "="],
];

function App() {
  return (
    <>
      <Wrapper>
        <Screen screenChar />
        <ButtonsBox>
          {buttonChar.flat().map((button, index) => (
            <Button value={button} key={index} />
          ))}
        </ButtonsBox>
      </Wrapper>
    </>
  );
}

export default App;
