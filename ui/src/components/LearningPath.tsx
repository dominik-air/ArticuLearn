import React, { useEffect, useRef } from "react";
import LearningPathNode from "./LearningPathNode";

interface LearningPathNodeProps {
  id: number;
  name: string;
  unlocked: boolean;
  current: boolean;
  finished: boolean;
}

interface LearningPathProps {
  nodes: LearningPathNodeProps[];
}

const LearningPath: React.FC<LearningPathProps> = ({ nodes }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>(new Array(nodes.length));

  useEffect(() => {
    const currentNodeIndex = nodes.findIndex((node) => node.current);
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
      {nodes.map((node, index) => (
        <div ref={(el) => (nodeRefs.current[index] = el)} key={node.id}>
          <LearningPathNode
            id={node.id}
            name={node.name}
            unlocked={node.unlocked}
            current={node.current}
            finished={node.finished}
          />
        </div>
      ))}
    </div>
  );
};

export default LearningPath;
