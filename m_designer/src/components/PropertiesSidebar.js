// src/components/PropertiesSidebar.js
import './PropertiesSidebar.css';

import NodeProperties from './NodeProperties';
import ExportButton from './ExportButton';

const PropertiesSidebar = ({ selectedElement, updateElement, mapData }) => {


  if (!selectedElement) {
    return <div className="properties-sidebar">No element selected</div>;
  }
  
  return (
    <div className="properties-sidebar">
      {selectedElement.group === 'nodes' && (
        <NodeProperties
          selectedElement={selectedElement}
          updateElement={updateElement}
        />
      )}
      <ExportButton mapData={mapData} />
    </div>
  );
};

export default PropertiesSidebar;
