import React from "react";
import { ThemeProvider } from "@emotion/react";
import Video from "./components/Video";
import useCustomTheme from "./components/Theme";

const App = () => {
  return (
    <ThemeProvider theme={useCustomTheme}>
    <div>
      <Video
        videoId="rrOnk0JnXW4"
        title="3 Ways to Express Your Thoughts So That Everyone Will Understand You"
        description="Tell them what you're gonna tell them.  Then tell them.  Then tell them what you just told them."
      />
    </div>
    </ThemeProvider>
   
  );
};

export default App;
