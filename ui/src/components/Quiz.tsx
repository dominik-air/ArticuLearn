import React from "react";
import { Paper, Container, Typography, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

interface QuizProps {
  question: string;
  answers: string[];
  correctAnswerIndex: number;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  cursor: "pointer",
  transition: "background-color 0.3s, transform 0.2s",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "scale(1.05)",
  },
}));

const Quiz: React.FC<QuizProps> = ({
  question,
  answers,
  correctAnswerIndex,
}) => {
  const handleItemClick = (index: number) => {
    console.log("Clicked on item: ", index);

    if (index === correctAnswerIndex) {
      console.log("Correct answer!");
    } else {
      console.log("Incorrect answer, try again!");
    }
  };

  return (
    <Container
      component={Paper}
      sx={{
        padding: 4,
        gap: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h3">{question}</Typography>
      <Grid container rowSpacing={4} columnSpacing={{ xs: 2, sm: 4, md: 6 }}>
        {answers.map((answer, index) => (
          <Grid item xs={6} key={index}>
            <Item onClick={() => handleItemClick(index)}>{answer}</Item>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Quiz;
