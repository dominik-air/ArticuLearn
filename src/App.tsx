import Activity from "./components/Activity.tsx";

function App() {
  const handleStart = () => {
    console.log("Redirecting to activity.");
  };

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Activity
        name="Test activity name"
        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam."
        type="exercise"
        started={false}
        onStart={handleStart}
      />
    </div>
  );
}

export default App;
