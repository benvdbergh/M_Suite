// src/components/PropertiesSidebar.js
import './PropertiesSidebar.css';

import NodeProperties from './NodeProperties';
import ExportButton from './ExportButton';

const PropertiesSidebar = ({ selectedElement, updateElement, mapData }) => {
  if (!selectedElement) {
    return <div className="properties-sidebar">No element selected</div>;
  }

  // Check if the selected element is a node
  const isNode = selectedElement.isNode();
  const elementData = selectedElement.data();

  return (
    <div className="properties-sidebar">
      {isNode && (
        <NodeProperties
          selectedElement={elementData}
          updateElement={updateElement}
        />
      )}
      <ExportButton mapData={mapData} />
    </div>
  );
};

export default PropertiesSidebar;