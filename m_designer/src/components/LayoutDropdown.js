import React from 'react';
import styles from'./LayoutDropdown.module.css';

const LayoutDropdown = ({ layouts, onLayoutChange, onCreateNewLayout }) => {
  return (
    <div className={styles['layout-dropdown']}>
      <select onChange={(e) => onLayoutChange(e.target.value)}>
        {layouts.map((layout, index) => (
          <option key={index} value={layout.layoutId}>
            {layout.layoutName}
          </option>
        ))}
        <option value="create-new">Create New Layout</option>
      </select>
    </div>
  );
};

export default LayoutDropdown;