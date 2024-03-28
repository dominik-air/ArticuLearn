import React, { useState } from "react";
import { Container, Grid } from "@mui/material";
import ActivityNode from "./ActivityNode";
import Activity, { ActivityType } from "./Activity";

interface LearningPathActivity {
  id: string;
  name: string;
  type: ActivityType;
  status: "done" | "current" | "inactive";
}

const activities: LearningPathActivity[] = [
  { id: "1", name: "Introduction", type: ActivityType.Video, status: "done" },
  { id: "2", name: "Exercise 1", type: ActivityType.Exercise, status: "current" },
  { id: "3", name: "Reading Material", type: ActivityType.Article, status: "inactive" },
];

const LearningPath: React.FC = () => {
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(
    null,
  );

  const selectedActivity = activities.find(
    (activity) => activity.id === selectedActivityId,
  );

  return (
    <Container>
      <Grid container justifyContent="center" alignItems="center">
        {activities.map((activity) => (
          <ActivityNode
            key={activity.id}
            activity={activity}
            onSelect={setSelectedActivityId}
          />
        ))}
      </Grid>
      {selectedActivity && (
        <Activity
          name={selectedActivity.name}
          description={
            "This is a placeholder description for " + selectedActivity.name
          }
          type={selectedActivity.type}
          started={selectedActivity.status !== "inactive"}
          onStart={() => console.log("Starting activity...")}
        />
      )}
    </Container>
  );
};

export default LearningPath;
