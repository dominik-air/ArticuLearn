import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Video from "../components/Video";

describe("Video component", () => {
  it("renders the video with provided title and description", () => {
    const videoProps = {
      videoId: "rrOnk0JnXW4",
      title:
        "3 Ways to Express Your Thoughts So That Everyone Will Understand You",
      description:
        "Tell them what you're gonna tell them. Then tell them. Then tell them what you just told them.",
    };

    render(<Video {...videoProps} />);

    expect(screen.getByText(videoProps.title)).toBeInTheDocument();

    expect(screen.getByText(videoProps.description)).toBeInTheDocument();

    const iframe = screen.getByTitle("YouTube video player");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      "src",
      expect.stringContaining(videoProps.videoId),
    );
  });
});
