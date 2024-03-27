import React from "react";
import { Button, Grid, Paper, Typography, Container } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ArticleIcon from "@mui/icons-material/Article";
import QuizIcon from "@mui/icons-material/Quiz";

enum ActivityType {
  Exercise = "exercise",
  Video = "video",
  Article = "article",
  Quiz = "quiz",
}

interface ActivityProps {
  name: string;
  description: string;
  type: ActivityType;
  started: boolean;
  onStart: () => void;
}

const iconMap = {
  [ActivityType.Exercise]: FitnessCenterIcon,
  [ActivityType.Video]: YouTubeIcon,
  [ActivityType.Article]: ArticleIcon,
  [ActivityType.Quiz]: QuizIcon,
};

const ActivityIcon = ({ type }: { type: ActivityType }) => {
  const IconComponent = iconMap[type];
  return IconComponent ? (
    <IconComponent sx={{ fontSize: 40 }} aria-label={type} />
  ) : null;
};

export default function Activity({
  name,
  description,
  type,
  started,
  onStart,
}: ActivityProps) {
  return (
    <Container
      component={Paper}
      sx={{
        padding: 4,
        gap: 4,
        maxWidth: "md",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <ActivityIcon type={type} />
        </Grid>
        <Grid item>
          <Typography variant="h4" sx={{ textAlign: "center", ml: 2 }}>
            {name}
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
        {description}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={onStart}
        sx={{ marginTop: 2 }}
      >
        {started ? "Continue" : "Start"}
      </Button>
    </Container>
  );
}
