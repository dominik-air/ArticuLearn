import React, { useEffect } from "react";
import Video from "./Video";
import axios from "axios";

interface Video {
  id: string;
  title: string;
  description: string;
}

const dummyVideoData: Video[] = [
  {
    id: "dQw4w9WgXcQ",
    title: "Example Video 1",
    description: "This is a sample video description.",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Example Video 2",
    description: "This is a sample video description.",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Example Video 3",
    description: "This is a sample video description.",
  },
];

const VideosPage: React.FC = () => {
  const API_URL = "http://localhost:8000/api/v1/videos/";
  const [videos, setVideos] = React.useState<Video[]>([]);

  const fetchVideos = () => {
    axios
      .get<Video[]>(API_URL)
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.error("Error while fetching videos:", error);
        setVideos(dummyVideoData);
      });
  };

  useEffect(() => {
    fetchVideos();
    const interval = setInterval(() => {
      fetchVideos();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {videos.map((video, index) => (
        <Video
          key={index}
          videoId={video.id}
          title={video.title}
          description={video.description}
        />
      ))}
    </div>
  );
};

export default VideosPage;
