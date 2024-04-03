import React, { useEffect, useRef } from "react";
import ActivityCard from "./ActivityCard";
import Badge from "./Badge";

interface ActivityCardProps {
  id: number;
  name: string;
  unlocked: boolean;
  current: boolean;
  finished: boolean;
}

interface BadgeProps {
  userName: string;
  achievement: string;
  imageUrl?: string;
}

export enum NodeType {
  Activity = "activity",
  Badge = "badge",
}

export type ActivityNode = {
  type: NodeType.Activity;
  props: ActivityCardProps;
};

export type BadgeNode = {
  type: NodeType.Badge;
  props: BadgeProps;
};

type Node = ActivityNode | BadgeNode;

interface LearningPathProps {
  nodes: Node[];
}

const LearningPath: React.FC<LearningPathProps> = ({ nodes }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>(new Array(nodes.length));

  useEffect(() => {
    const currentNodeIndex = nodes.findIndex(
      (node) => node.type === NodeType.Activity && node.props.current,
    );
    if (currentNodeIndex !== -1 && nodeRefs.current[currentNodeIndex]) {
      nodeRefs.current[currentNodeIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [nodes]);

  return (
    <div
      ref={containerRef}
      id="learning-path-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "auto",
        height: "100vh",
        gap: "20px",
        padding: "20px 0",
      }}
    >
      {nodes.map((node, index) =>
        node.type === NodeType.Activity ? (
          <div ref={(el) => (nodeRefs.current[index] = el)} key={node.props.id}>
            <ActivityCard
              id={node.props.id}
              name={node.props.name}
              unlocked={node.props.unlocked}
              current={node.props.current}
              finished={node.props.finished}
            />
          </div>
        ) : (
          <div key={node.props.achievement}>
            <Badge
              userName={node.props.userName}
              achievement={node.props.achievement}
              imageUrl={node.props.imageUrl}
            ></Badge>
          </div>
        ),
      )}
    </div>
  );
};

export default LearningPath;
