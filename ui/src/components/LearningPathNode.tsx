import React from "react";
import {
  Paper,
  Container,
  Typography,
  Button,
  Box,
  SvgIcon,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

interface LearningPathNodeProps {
  name: string;
  unlocked: boolean;
  current: boolean;
  finished: boolean;
}

const LearningPathNode = ({
  name,
  unlocked,
  current,
  finished,
}: LearningPathNodeProps) => {
  let buttonAction: string;

  if (unlocked && finished) {
    buttonAction = "Revisit";
  } else if (unlocked && current) {
    buttonAction = "Start";
  } else {
    buttonAction = "Locked";
  }

  return (
    <Box position="relative" display="inline-flex">
      <Container
        component={Paper}
        sx={{
          padding: 4,
          width: 300,
          height: 150,
          maxWidth: "none",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          marginBottom: 2,
          position: "relative",
        }}
      >
        <Typography>{name}</Typography>
        <Button
          data-testid="button-learning-path-node"
          variant="contained"
          disabled={!unlocked}
          onClick={() => console.log(`clicked ${buttonAction}`)}
        >
          {buttonAction}
        </Button>
      </Container>
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
