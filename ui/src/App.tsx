import React from "react";
import { ThemeProvider } from "@emotion/react";
import useCustomTheme from "./components/Theme";
import LearningPath from "./components/LearningPath";

const learningPathData = [
  { id: 1, name: "Node 1", unlocked: true, current: false, finished: true },
  { id: 2, name: "Node 2", unlocked: true, current: false, finished: true },
  { id: 3, name: "Node 3", unlocked: true, current: false, finished: true },
  { id: 4, name: "Node 4", unlocked: true, current: false, finished: true },
  { id: 5, name: "Node 5", unlocked: true, current: false, finished: true },
  { id: 6, name: "Node 6", unlocked: true, current: false, finished: true },
  { id: 7, name: "Node 7", unlocked: true, current: false, finished: true },
  { id: 8, name: "Node 8", unlocked: true, current: true, finished: false },
  { id: 9, name: "Node 9", unlocked: false, current: false, finished: false },
  { id: 10, name: "Node 10", unlocked: false, current: false, finished: false },
  { id: 11, name: "Node 11", unlocked: false, current: false, finished: false },
  { id: 12, name: "Node 12", unlocked: false, current: false, finished: false },
  { id: 13, name: "Node 13", unlocked: false, current: false, finished: false },
  { id: 14, name: "Node 14", unlocked: false, current: false, finished: false },
  { id: 15, name: "Node 15", unlocked: false, current: false, finished: false },
];

const App = () => {
  return (
    <ThemeProvider theme={useCustomTheme}>
      <LearningPath nodes={learningPathData}></LearningPath>
    </ThemeProvider>
   
  );
};

export default App;
