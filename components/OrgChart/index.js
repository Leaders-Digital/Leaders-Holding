import React from "react";
import Tree from "react-d3-tree";

const OrgChart = ({ data }) => {
  const containerStyles = { width: "100%", height: "100vh" };

  return (
    <div style={containerStyles}>
      <Tree
        data={data}
        orientation="horizontal"
        translate={{ x: 200, y: 300 }}
        pathFunc="elbow" // Ajuste la forme des branches
        styles={{
          links: { stroke: "#2c3e50", strokeWidth: 1.5 },
          nodes: {
            node: { circle: { stroke: "#007BFF", strokeWidth: 3 } },
            leafNode: { circle: { stroke: "#2ecc71", strokeWidth: 2 } },
          },
        }}
      />
    </div>
  );
};

export default OrgChart;
