import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Quiz from "../components/Quiz";

describe("Quiz Component", () => {
  const question = "What is the capital of France?";
  const answers = ["Paris", "London", "Berlin", "Madrid"];
  const correctAnswerIndex = 0;

  it("renders correctly with question and answers", () => {
    render(
      <Quiz
        question={question}
        answers={answers}
        correctAnswerIndex={correctAnswerIndex}
      />,
    );

    expect(screen.getByText(question)).toBeInTheDocument();

    answers.forEach((answer) => {
      expect(screen.getByText(answer)).toBeInTheDocument();
    });
  });
});
