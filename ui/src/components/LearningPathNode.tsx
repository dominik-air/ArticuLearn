import { Paper, Container, Typography, Button } from "@mui/material";

interface LearningPathNodeProps {
  name: string;
  unlocked: boolean;
  current: boolean;
}

const LearningPathNode = ({
  name,
  unlocked,
  current,
}: LearningPathNodeProps) => {
  const buttonAction: string = unlocked
    ? current
      ? "Continue"
      : "Start"
    : "Locked";

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
      <Typography>{name}</Typography>
      <Button
        variant="contained"
        disabled={!unlocked}
        onClick={() => console.log(`clicked ${buttonAction}`)}
      >
        {buttonAction}
      </Button>
    </Container>
  );
};

export default LearningPathNode;
