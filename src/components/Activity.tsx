import { Button, Grid, Paper, Typography, Container } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ArticleIcon from "@mui/icons-material/Article";
import QuizIcon from "@mui/icons-material/Quiz";

interface ActivityProps {
  name: string;
  description: string;
  type: "exercise" | "video" | "article" | "quiz";
  started: boolean;
  onStart: () => void;
}

const getIcon = (type: "exercise" | "video" | "article" | "quiz") => {
  switch (type) {
    case "exercise":
      return FitnessCenterIcon;
    case "video":
      return YouTubeIcon;
    case "article":
      return ArticleIcon;
    case "quiz":
      return QuizIcon;
    default:
      return null;
  }
};

export default function Activity({
  name,
  description,
  type,
  started,
  onStart,
}: ActivityProps) {
  const IconComponent = getIcon(type);

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
          {IconComponent ? <IconComponent sx={{ fontSize: 40 }} /> : null}
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
