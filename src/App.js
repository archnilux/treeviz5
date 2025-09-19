import React from "react";
import { TreevizReact } from "treeviz-react";
import { renderToString } from "react-dom/server";
const data_1 = [
  {
    id: 1,
    text_1: "Chaos",
    description: "Void",
    father: null,
    color: "#FF5722"
  },
  {
    id: 2,
    text_1: "Tartarus",
    description: "Abyss",
    father: 1,
    color: "#FFC107"
  },
  { id: 3, text_1: "Gaia", description: "Earth", father: 1, color: "#8BC34A" },
  { id: 4, text_1: "Eros", description: "Desire", father: 1, color: "#00BCD4" }
];

export const App = () => {
  return (
    <div style={{ marginLeft: 10 }}>
      <div style={{ display: "flex" }}>
        <TreevizReact
          data={data_1}
          relationnalField={"father"}
          nodeWidth={120}
          nodeHeight={80}
          areaHeight={500}
          areaWidth={1000}
          mainAxisNodeSpacing={2}
          secondaryAxisNodeSpacing={2}
          linkShape={"quadraticBeziers"}
          renderNode={(data) => {
            const nodeData = data.data;
            const settings = data.settings;
            let result = "";
            const tooltip = renderToString(
              <strong
                data-toggle="tooltip"
                data-placement="top"
                title={nodeData.description}
              >
                {nodeData.text_1}
              </strong>
            );
            const popover = renderToString(
              <button
                type="button"
                className="btn btn-secondary"
                data-container="body"
                data-toggle="popover"
                data-placement="top"
                data-content={nodeData.description}
              >
                Popover on top
              </button>
            );
            if (data.depth !== 2) {
              result = `<div className="box" 
              style='cursor:pointer;height:${settings.nodeHeight}px; width:${settings.nodeWidth}px;display:flex;flex-direction:column;justify-content:center;align-items:center;background-color:${nodeData.color};border-radius:5px;'>
              <div>
          ${tooltip}
          ${popover}
          </div></div>`;
            } else {
              result = `<div className="box" style='cursor:pointer;height:${
                settings.nodeHeight
              }px; width:${
                settings.nodeHeight
              }px;display:flex;flex-direction:column;justify-content:center;align-items:center;background-color:${
                nodeData.color
              };border-radius:${settings.nodeHeight / 2}px;'><div><strong>
          ${nodeData.text_1}
          </strong></div></div>`;
            }
            return result;
          }}
          duration={600}
          isHorizontal
          linkWidth={(node) => 10}
        />
      </div>
    </div>
  );
};
export default App;
