import React, { useEffect, useRef } from "react";
import LearningPathNode from "./LearningPathNode";
import { animateScroll as scroll, scroller } from "react-scroll";

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

  useEffect(() => {
    const containerId = "learning-path-container";

    const currentNodeIndex = nodes.findIndex((node) => node.current);
    if (currentNodeIndex !== -1 && containerRef.current) {
      scroller.scrollTo(`node-${nodes[currentNodeIndex].id}`, {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        containerId: containerId,
        offset: -containerRef.current.offsetHeight / 2 + 60,
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
      {nodes.map((node) => (
        <div name={`node-${node.id}`} key={node.id}>
          <LearningPathNode
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
