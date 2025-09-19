import React from "react";
import { TreevizReact } from "treeviz-react";
import { Add, BugReport, Cached } from "@material-ui/icons";
import { renderToString } from "react-dom/server";

const data_1 = [
  {
    id: 1,
    product: "Manteau",
    batch: "1234",
    father: null,
    color: null,
    icon: ""
  },
  {
    id: 2,
    father: 1,
    color: "#FF5722",
    actor: "nom",
    activity: "Confection",
    icon: ""
  },
  {
    id: 3,
    father: 2,
    color: "#FF5722",
    component: "Teinture",
    batch: "3456",
    icon: ""
  },
  {
    id: 4,
    father: 2,
    color: "#FF5722",
    component: "Bouton",
    batch: "92347",
    icon: ""
  },
  {
    id: 5,
    father: 2,
    color: "#FF5722",
    component: "Laine",
    batch: "23447",
    icon: ""
  },
  {
    id: 6,
    father: 3,
    color: "#FF5722",
    actor: "Nom",
    activity: "Confection",
    icon: ""
  },
  {
    id: 7,
    father: 4,
    color: "#FF5722",
    actor: "Nom",
    activity: "Confection",
    icon: ""
  },
  {
    id: 8,
    father: 5,
    actor: "Nom",
    activity: "tissage",
    icon: ""
  }
];

const getIcon = (data) => {
  const type = getNodeType(data);
  switch (type) {
    case "product":
      return renderToString(<Add />);
    case "actor":
      return renderToString(<BugReport />);
    case "component":
      return renderToString(<Cached />);
    default:
      return;
  }
};

const getNodeType = (data) => {
  if (data.product && data.product !== null) {
    return "product";
  } else if (data.actor && data.actor !== null) {
    return "actor";
  } else if (data.component && data.component !== null) {
    return "component";
  }
};

const getContent = (data) => {
  const type = getNodeType(data);
  switch (type) {
    case "product":
      return {
        first: "Produit: " + data.product,
        second: "Lot: " + data.batch
      };
    case "actor":
      return {
        first: "Acteur: " + data.actor,
        second: "Activité: " + data.activity
      };
    case "component":
      return {
        first: "Composant: " + data.component,
        second: "Lot: " + data.batch
      };
    default:
      return;
  }
};

export const App = () => {
  return (
    <div style={{ marginLeft: 10 }}>
      <div style={{ display: "flex" }}>
        <TreevizReact
          data={data_1}
          relationnalField={"father"}
          nodeWidth={200}
          nodeHeight={80}
          areaHeight={1000}
          areaWidth={1000}
          mainAxisNodeSpacing={0.7}
          secondaryAxisNodeSpacing={0.7}
          linkShape={"quadraticBeziers"}
          renderNode={(data) => {
            const nodeData = data.data;
            const settings = data.settings;
            let result = "";
            const value = getContent(nodeData);
            const icon = getIcon(nodeData);
            result = `<div class="box"
            style='cursor:pointer;height:${settings.nodeHeight}px; width:${settings.nodeWidth}px;display:flex;flex-direction:row;justify-content:center;align-items:center;background-color:${nodeData.color};border-radius:5px;border: 1px solid black'>
              ${icon}
              <div>
                <div>
                  ${value.first}
                </div>
                <div>
                  ${value.second}
                </div>
              </div>
            </div>`;
            return result;
          }}
          duration={600}
          isHorizontal={false}
          linkWidth={(node) => 10}
        />
      </div>
    </div>
  );
};
export default App;
