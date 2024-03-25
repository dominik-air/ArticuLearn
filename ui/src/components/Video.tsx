import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface VideoProps {
  videoId: string;
  title: string;
  description: string;
}

const Video: React.FC<VideoProps> = ({ videoId, title, description }) => {
  const videoSrc = `https://www.youtube-nocookie.com/embed/${videoId}?si=PtGLoHTljGH5rrz0`;

  return (
    <Card sx={{ maxWidth: 600, margin: "auto" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>

        <iframe
          width="100%"
          height="315"
          src={videoSrc}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>

        <Typography variant="body2" color="text.secondary" marginTop={2}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Video;
