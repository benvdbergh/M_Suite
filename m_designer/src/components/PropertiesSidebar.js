// src/components/PropertiesSidebar.js
import './PropertiesSidebar.css';

import NodeProperties from './NodeProperties';

const PropertiesSidebar = ({ selectedElement, updateElement }) => {


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
    </div>
  );
};

export default PropertiesSidebar;
