import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import useCustomTheme from "./components/Theme";
import LearningPath, {
  NodeType,
  ActivityNode,
  BadgeNode,
} from "./components/LearningPath";
import { ActivityType } from "./components/ActivityCard";
import NavigationBar from "./components/NavigationBar";
import VideosPage from "./components/VideosPage";
import BadgesPage from "./components/BadgesPage";

const learningPathData: (ActivityNode | BadgeNode)[] = [
  {
    type: NodeType.Activity,
    props: {
      id: 1,
      name: "Article",
      description: "Article about something interesting",
      type: ActivityType.Article,
      unlocked: true,
      current: false,
      finished: true,
    },
  },
  {
    type: NodeType.Activity,
    props: {
      id: 2,
      name: "Exercise",
      description: "Exercise about something interesting",
      type: ActivityType.Exercise,
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
      name: "Quiz",
      description: "Quiz about something interesting",
      type: ActivityType.Quiz,
      unlocked: true,
      current: true,
      finished: false,
    },
  },
  {
    type: NodeType.Activity,
    props: {
      id: 4,
      name: "Video",
      description: "Video about something interesting",
      type: ActivityType.Video,
      unlocked: false,
      current: false,
      finished: false,
    },
  },
  {
    type: NodeType.Activity,
    props: {
      id: 5,
      name: "Exercise",
      description: "Exercise about something interesting",
      type: ActivityType.Exercise,
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
    <Router>
      <ThemeProvider theme={useCustomTheme}>
        <NavigationBar></NavigationBar>
        <Routes>
          <Route path="/" element={<LearningPath nodes={learningPathData} />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/badges" element={<BadgesPage />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;
