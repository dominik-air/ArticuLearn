import Article from "./components/Article.tsx";

const articleData = {
  title: "Exploring React with TypeScript and MUI",
  content: [
    {
      type: "text",
      text: "React, TypeScript, and Material-UI (MUI) offer a powerful combination for building robust and visually appealing web applications. This article explores how to leverage these technologies effectively.",
    },
    {
      type: "image",
      imageURL:
        "https://www.wikihow.com/images_en/thumb/2/20/Enunciate-Step-7-Version-3.jpg/v4-460px-Enunciate-Step-7-Version-3.jpg.webp",
    },
    {
      type: "text",
      text: "Tables are an important element for displaying structured data. Here's an example of how to render a table in React using Material-UI:",
    },
    {
      type: "table",
      table: {
        headers: ["Name", "Type", "Default"],
        data: [
          ["useEffect", "Hook", "N/A"],
          ["useState", "Hook", "undefined"],
          ["Container", "Component", "N/A"],
        ],
      },
    },
    {
      type: "image",
      imageURL:
        "https://www.wikihow.com/images_en/thumb/2/20/Enunciate-Step-7-Version-3.jpg/v4-460px-Enunciate-Step-7-Version-3.jpg.webp",
    },
    {
      type: "text",
      text: "Integrating TypeScript with React allows developers to write safer code with less bugs. TypeScript's static typing adds a layer of reliability that's invaluable during development.",
    },
  ],
  tags: ["React", "TypeScript", "MUI", "Web Development"],
};

function App() {
  return (
    <div
    // style={{
    //   position: "absolute",
    //   left: "50%",
    //   top: "50%",
    //   transform: "translate(-50%, -50%)",
    // }}
    >
      <Article
        title={articleData.title}
        content={articleData.content}
        tags={articleData.tags}
      />
    </div>
  );
}

export default App;
