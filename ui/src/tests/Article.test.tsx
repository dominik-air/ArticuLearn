import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Article, { ContentType } from "../components/Article";

describe("Article Component", () => {
  test("renders a pure text article", () => {
    render(
      <Article
        title="test article"
        content={[{ type: ContentType.Text, text: "this is a test" }]}
        tags={["tag1", "tag2", "tag3", "tag4"]}
      ></Article>,
    );
    expect(screen.getByText("test article")).toBeInTheDocument();
    expect(screen.getByText("this is a test")).toBeInTheDocument();
    expect(screen.getAllByText(/^tag\d$/).length).toBe(4);
  });

  test("renders an article with image", () => {
    render(
      <Article
        title="Image article"
        content={[{ type: ContentType.Image, imageURL: "test" }]}
        tags={["tag1"]}
      />,
    );

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test");
  });

  test("renders an article with table", () => {
    const tableContent = {
      type: ContentType.Table,
      table: {
        headers: ["Header1", "Header2"],
        data: [
          ["Row1 Cell1", "Row1 Cell2"],
          ["Row2 Cell1", "Row2 Cell2"],
        ],
      },
    };

    render(
      <Article
        title="Table article"
        content={[tableContent]}
        tags={["tag1"]}
      />,
    );

    expect(screen.getByText("Header1")).toBeInTheDocument();
    expect(screen.getByText("Row1 Cell1")).toBeInTheDocument();
    expect(screen.getByText("Row2 Cell2")).toBeInTheDocument();
    expect(screen.getAllByRole("row").length).toBe(3);
  });

  test("renders an article with text, image, and table", () => {
    const combinedContent = [
      { type: ContentType.Text, text: "Article Introduction" },
      { type: ContentType.Image, imageURL: "test.jpg" },
      {
        type: ContentType.Table,
        table: {
          headers: ["Header1", "Header2"],
          data: [
            ["Row1 Cell1", "Row1 Cell2"],
            ["Row2 Cell1", "Row2 Cell2"],
          ],
        },
      },
    ];

    render(
      <Article
        title="Combined content article"
        content={combinedContent}
        tags={["tag1", "tag2"]}
      />,
    );

    expect(screen.getByText("Article Introduction")).toBeInTheDocument();
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "test.jpg");
    expect(screen.getByText("Header1")).toBeInTheDocument();
    expect(screen.getAllByRole("row").length).toBe(3);
  });

  test("renders correctly with empty content", () => {
    render(<Article title="Empty content article" content={[]} tags={[]} />);

    expect(screen.getByText("Empty content article")).toBeInTheDocument();
    expect(screen.queryByRole("img")).toBeNull();
    expect(screen.queryByRole("row")).toBeNull();
  });
});
