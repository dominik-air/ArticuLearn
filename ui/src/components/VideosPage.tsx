import React from "react";
import Video from "./Video";

const videoData = [
  {
    videoId: "dQw4w9WgXcQ",
    title: "Example Video 1",
    description: "This is a sample video description.",
  },
  {
    videoId: "dQw4w9WgXcQ",
    title: "Example Video 2",
    description: "This is a sample video description.",
  },
  {
    videoId: "dQw4w9WgXcQ",
    title: "Example Video 3",
    description: "This is a sample video description.",
  },
];

const VideosPage: React.FC = () => {
  return (
    <div>
      {videoData.map((video, index) => (
        <Video
          key={index}
          videoId={video.videoId}
          title={video.title}
          description={video.description}
        />
      ))}
    </div>
  );
};

export default VideosPage;
