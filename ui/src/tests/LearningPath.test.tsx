import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LearningPath, { NodeType } from "../components/LearningPath";

describe("LearningPath", () => {
  const mockActivityNodes = [
    {
      type: NodeType.Activity,
      props: {
        id: 1,
        name: "Activity One",
        unlocked: true,
        current: false,
        finished: true,
      },
    },
    {
      type: NodeType.Activity,
      props: {
        id: 2,
        name: "Activity Two",
        unlocked: true,
        current: true,
        finished: false,
      },
    },
  ];

  const mockBadgeNodes = [
    {
      type: NodeType.Badge,
      props: {
        userName: "John Doe",
        achievement: "Completed 5 Activities",
        imageUrl: "image_url",
      },
    },
  ];

  const allNodes = [...mockActivityNodes, ...mockBadgeNodes];

  it("renders without crashing", () => {
    render(<LearningPath nodes={[]} />);
    expect(screen.getByTestId("learning-path-container")).toBeInTheDocument();
  });

  it("renders ActivityCard components for each activity node", () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    render(<LearningPath nodes={mockActivityNodes} />);
    expect(screen.getAllByText(/Activity/).length).toBe(
      mockActivityNodes.length,
    );
  });

  it("renders a Badge component for each badge node", () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    render(<LearningPath nodes={mockBadgeNodes} />);
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/Completed/)).toBeInTheDocument();
  });

  it("correctly renders a mix of ActivityCard and Badge components", () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    render(<LearningPath nodes={allNodes} />);
    expect(screen.getAllByText(/Activity/).length).toBe(
      mockActivityNodes.length,
    );
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/Completed/)).toBeInTheDocument();
  });

  it("scrolls to the current activity on mount", async () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    render(<LearningPath nodes={mockActivityNodes} />);
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });
});
