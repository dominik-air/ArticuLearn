import React from "react";
import {
  Paper,
  Typography,
  Button,
  Box,
  SvgIcon,
  useTheme,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { styled, keyframes } from "@mui/system";
import { PaperProps } from "@mui/material/Paper";

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

interface LearningPathNodeProps {
  id: number;
  name: string;
  unlocked: boolean;
  current: boolean;
  finished: boolean;
}

const LearningPathNode = ({
  id,
  name,
  unlocked,
  current,
  finished,
}: LearningPathNodeProps) => {
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
        <Typography>{name}</Typography>
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

export default LearningPathNode;
