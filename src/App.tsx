import LearningPath from "./components/LearningPath.tsx";

function App() {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <LearningPath />
    </div>
  );
}

export default App;
