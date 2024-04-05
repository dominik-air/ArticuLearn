import React from "react";
import { ThemeProvider } from "@emotion/react";
import useCustomTheme from "./components/Theme";
import LearningPath, {
  NodeType,
  ActivityNode,
  BadgeNode,
} from "./components/LearningPath";
import Quiz from "./components/Quiz";

const learningPathData: (ActivityNode | BadgeNode)[] = [
  {
    type: NodeType.Activity,
    props: {
      id: 1,
      name: "Node 1",
      unlocked: true,
      current: false,
      finished: true,
    },
  },
  {
    type: NodeType.Activity,
    props: {
      id: 2,
      name: "Node 2",
      unlocked: true,
      current: false,
      finished: true,
    },
  },
  {
    type: NodeType.Badge,
    props: {
      userName: "User1",
      achievement: "Completed Section 1",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqdeivnU9NUKKk19u8zgwhSHe0HPGUOIh2dAkuVoqqTw&s",
    },
  },
  {
    type: NodeType.Activity,
    props: {
      id: 3,
      name: "Node 3",
      unlocked: true,
      current: true,
      finished: false,
    },
  },
  {
    type: NodeType.Activity,
    props: {
      id: 4,
      name: "Node 4",
      unlocked: false,
      current: false,
      finished: false,
    },
  },
  {
    type: NodeType.Activity,
    props: {
      id: 5,
      name: "Node 5",
      unlocked: false,
      current: false,
      finished: false,
    },
  },
  {
    type: NodeType.Badge,
    props: {
      userName: "User1",
      achievement: "Completed Section 2",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqdeivnU9NUKKk19u8zgwhSHe0HPGUOIh2dAkuVoqqTw&s",
    },
  },
];

const App = () => {
  return (
    <ThemeProvider theme={useCustomTheme}>
      {/* <LearningPath nodes={learningPathData} /> */}
      <Quiz
        question="Which of these is Gremin's favourite?"
        answers={["Harnas", "Zubr", "Perla", "Lomza"]}
        correctAnswerIndex={1}
      ></Quiz>
    </ThemeProvider>
  );
};

export default App;
