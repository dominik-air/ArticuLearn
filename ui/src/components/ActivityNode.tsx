import React from "react";
import { Box } from "@mui/material";
import { LearningPathActivity, ActivityStatus } from "./LearningPath";

interface ActivityNodeProps {
  activity: LearningPathActivity;
  onSelect: (id: string | null) => void;
}

const ActivityNode: React.FC<ActivityNodeProps> = ({ activity, onSelect }) => {
  const nodeStyle = {
    width: 50,
    height: 50,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:
      activity.status === ActivityStatus.Done
        ? "green"
        : activity.status === ActivityStatus.Current
          ? "blue"
          : "grey",
    cursor: "pointer",
    margin: "0 20px",
  };

  return <Box sx={nodeStyle} onMouseEnter={() => onSelect(activity.id)}></Box>;
};

export default ActivityNode;
