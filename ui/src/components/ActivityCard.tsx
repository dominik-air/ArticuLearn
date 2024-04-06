import React from "react";
import {
  Paper,
  Typography,
  Button,
  Box,
  SvgIcon,
  useTheme,
  Grid,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { styled, keyframes } from "@mui/system";
import { PaperProps } from "@mui/material/Paper";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ArticleIcon from "@mui/icons-material/Article";
import QuizIcon from "@mui/icons-material/Quiz";

export enum ActivityType {
  Exercise = "exercise",
  Video = "video",
  Article = "article",
  Quiz = "quiz",
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

interface AnimatedPaperProps extends PaperProps {
  current?: boolean;
}

const createColorTransition = (
  primaryColor: string,
  secondaryColor: string,
) => keyframes`
  0% {
    box-shadow: 0 0 8px 2px ${primaryColor};
  }
  50% {
    box-shadow: 0 0 8px 2px ${secondaryColor};
  }
  100% {
    box-shadow: 0 0 8px 2px ${primaryColor};
  }
`;

interface ActivityCard {
  id: number;
  name: string;
  description: string;
  type: ActivityType;
  unlocked: boolean;
  current: boolean;
  finished: boolean;
}

const ActivityCard = ({
  id,
  name,
  description,
  type,
  unlocked,
  current,
  finished,
}: ActivityCard) => {
  const theme = useTheme();

  const colorTransition = React.useMemo(
    () =>
      createColorTransition(
        theme.palette.primary.main,
        theme.palette.secondary.main,
      ),
    [theme.palette.primary.main, theme.palette.secondary.main],
  );

  const AnimatedPaper = styled(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ current, ...otherProps }: AnimatedPaperProps) => (
      <Paper {...otherProps} />
    ),
  )<AnimatedPaperProps>(({ theme, current }) => ({
    padding: theme.spacing(4),
    width: 300,
    height: 150,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
    position: "relative",
    ...(current
      ? {
          animation: `${colorTransition} 2s infinite alternate`,
        }
      : {}),
  }));

  let buttonAction: string;

  if (unlocked && finished) {
    buttonAction = "Revisit";
  } else if (unlocked && current) {
    buttonAction = "Start";
  } else {
    buttonAction = "Locked";
  }

  return (
    <Box position="relative" display="inline-flex" id={`node-${id}`}>
      <AnimatedPaper current={current}>
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
          data-testid="button-learning-path-node"
          variant="contained"
          disabled={!unlocked}
          onClick={() => console.log(`clicked ${buttonAction}`)}
        >
          {buttonAction}
        </Button>
      </AnimatedPaper>
      <SvgIcon
        data-testid="star-icon"
        component={StarIcon}
        sx={{
          color: finished ? "gold" : "silver",
          position: "absolute",
          top: 8,
          right: 8,
          fontSize: "2rem",
          zIndex: 2,
        }}
      />
    </Box>
  );
};

export default ActivityCard;
