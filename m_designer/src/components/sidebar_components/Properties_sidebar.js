// src/components/PropertiesSidebar.js
import styles from './Properties_sidebar.module.css';

import NodeProperties from './NodeProperties_card';
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