import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LearningPathNode from "../components/LearningPathNode";

describe("LearningPathNode Component", () => {
  test("renders a node with Revisit button when unlocked and finished", () => {
    render(
      <LearningPathNode
        name="test learning path node"
        unlocked={true}
        current={false}
        finished={true}
      />,
    );
    expect(screen.getByText("test learning path node")).toBeInTheDocument();
    expect(screen.getByTestId("button-learning-path-node")).toBeEnabled();
    expect(screen.getByTestId("button-learning-path-node")).toHaveTextContent(
      "Revisit",
    );
  });

  test("renders a node with Start button when unlocked and current", () => {
    render(
      <LearningPathNode
        name="test learning path node"
        unlocked={true}
        current={true}
        finished={false}
      />,
    );
    expect(screen.getByText("test learning path node")).toBeInTheDocument();
    expect(screen.getByTestId("button-learning-path-node")).toBeEnabled();
    expect(screen.getByTestId("button-learning-path-node")).toHaveTextContent(
      "Start",
    );
  });

  test("renders a node with a disabled Locked button when not unlocked", () => {
    render(
      <LearningPathNode
        name="test learning path node"
        unlocked={false}
        current={false}
        finished={false}
      />,
    );
    expect(screen.getByText("test learning path node")).toBeInTheDocument();
    expect(screen.getByTestId("button-learning-path-node")).toBeDisabled();
    expect(screen.getByTestId("button-learning-path-node")).toHaveTextContent(
      "Locked",
    );
  });
});
