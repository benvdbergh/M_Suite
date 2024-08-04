// src/components/PropertiesSidebar.js
import styles from './PropertiesSidebar.module.css';

import NodeProperties from './NodeProperties';
import ExportButton from './ExportButton';

const PropertiesSidebar = ({ selectedElement, updateElement, mapData }) => {
  const isNode = selectedElement?.isNode();
  const elementData = selectedElement?.data();

  return (
    <div className={styles.propertiesSidebar}>
      {selectedElement ? (
        isNode && (
          <NodeProperties
            selectedElement={elementData}
            updateElement={updateElement}
          />
        )
      ) : (
        "No element selected"
      )}
      <ExportButton mapData={mapData} />
    </div>
  );
};

export default PropertiesSidebar;