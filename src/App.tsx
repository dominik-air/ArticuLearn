import Badge from "./components/Badge.tsx";

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
      <Badge userName="Test user" achievement="Test achievement" imageUrl="https://uxwing.com/wp-content/themes/uxwing/download/sport-and-awards/achievement-award-medal-icon.svg" />
    </div>
  );
}

export default App;
