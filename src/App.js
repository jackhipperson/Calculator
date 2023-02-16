import React, { useState } from "react";
import Screen from "./components/Screen";
import BoxContainer from "./components/BoxContainer";
import Box from "./components/Box";
import styles from "./App.module.css";

function App() {
  const [calcString, setCalcString] = useState(0);
  const [decimal, setDecimal] = useState(true);

  const maxCharacters = 30
  const maxValue = 999999999999999999999999999999

  const buttonValues = [
    ["C", "+/-", "←", "+"],
    [7, 8, 9, "-"],
    [4, 5, 6, "*"],
    [1, 2, 3, "/"],
    [".", 0, "="],
  ];

  const clearCalc = () => {
    setCalcString(0);
    setDecimal(true);
  };

  const newValue = (newValue) => {
    if (calcString.toString().length >= maxCharacters) {
      return;
    }

    if (
      calcString === 0 &&
      (newValue === "+" || newValue === "*" || newValue === "/")
    ) {
      return;
    }

    setCalcString((preValue) => {
      if (calcString === 0) {
        return newValue;
      } else if (
        (calcString.toString().slice(-1) === "+" ||
          calcString.toString().slice(-1) === "-" ||
          calcString.toString().slice(-1) === "*" ||
          calcString.toString().slice(-1) === "/") &&
        (newValue === "+" || newValue === "*" || newValue === "/")
      ) {
        return calcString.toString().slice(0, -1) + newValue;
      } else if (calcString.toString().slice(-1) === "-" && newValue === "-") {
        return preValue;
      } else if (
        calcString.toString().slice(-1) === "+" ||
        calcString.toString().slice(-1) === "-" ||
        calcString.toString().slice(-1) === "*" ||
        calcString.toString().slice(-1) === "/"
      ) {
        setDecimal(true);
        return preValue + newValue;
      } else {
        return preValue + newValue;
      }
    });
  };

  const calculateResult = () => {
    let result = eval(calcString);
    if (result.toString().indexOf(".") !== -1) {
      setDecimal(false)
    }
    if (
      calcString.toString().slice(-1) === "+" ||
      calcString.toString().slice(-1) === "-" ||
      calcString.toString().slice(-1) === "*" ||
      calcString.toString().slice(-1) === "/"
    ) {
      if (eval(calcString.toString().slice(0, -1)) > maxValue) {
        return maxValue;
      } else if (
        eval(calcString.toString().slice(0, -1)).toString().length >= maxCharacters
      ) {
        return setCalcString(
          eval(calcString.toString().slice(0, -1)).toString().slice(0, maxCharacters-1)
        );
      } else {
        return setCalcString(eval(calcString.toString().slice(0, -1)));
      }
    }
    if (result > maxValue) {
      return maxValue;
    } else if (result.toString().length >= maxCharacters) {
      return setCalcString(result.toString().slice(0, maxCharacters-1));
    } else {
      return setCalcString(result);
    }
  };

  const backspace = () => {
    if (calcString.toString().toString().length === 1) {
      return setCalcString(0);
    }
    return setCalcString(calcString.toString().slice(0, -1));
  };

  const handleDecimal = () => {
    if (calcString.toString().length >= maxCharacters) {
      return;
    }
    if (!decimal) {
      return;
    } else if (calcString === 0) {
      setCalcString("0.");
    } else {
      setCalcString((prevItems) => {
        return prevItems + ".";
      });
    }
    setDecimal(false);
  };

  const plusMinus = () => {
    if (calcString.toString().length >= maxCharacters) {
      return;
  }
  if (calcString.toString().indexOf("+") !== -1 || calcString.toString().indexOf("*") !== -1 || calcString.toString().indexOf("/") !== -1 || calcString.toString().indexOf("-") > 0) {
    return;
  }

    setCalcString((prevItems) => {
      if (calcString.toString().charAt(0) === "-") {
      return prevItems.toString().substring(1);
  } else {
    return "-"+prevItems;
  }})

  }

  return (
    <div className={styles.calculator}>
      <Screen currentVal={calcString} />
      <BoxContainer>
        {buttonValues.flat().map((btn, i) => {
          return (
            <Box
              key={i}
              val={btn}
              className={btn === "=" ? "equals" : btn >= 0 ? "box" : btn === "C" ? "cButton" : "utility"}
              clearCalc={clearCalc}
              newValue={newValue}
              calculateResult={calculateResult}
              backspace={backspace}
              handleDecimal={handleDecimal}
              plusMinus={plusMinus}
            />
          );
        })}
      </BoxContainer>
    </div>
  );
}

export default App;
