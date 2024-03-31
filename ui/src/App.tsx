import React from "react";
import { ThemeProvider } from "@emotion/react";
import useCustomTheme from "./components/Theme";
import LearningPathNode from "./components/LearningPathNode";

const App = () => {
  return (
    <ThemeProvider theme={useCustomTheme}>
    <div>
      <LearningPathNode name="test" current={false} unlocked={true}></LearningPathNode>
    </div>
    </ThemeProvider>
   
  );
};

export default App;
