import React, { createContext, useContext, useState } from 'react';

const ToolContext = createContext();

export const ToolProvider = ({ children }) => {
  const [selectedTool, setSelectedTool] = useState('select');

  return (
    <ToolContext.Provider value={{ selectedTool, setSelectedTool }}>
      {children}
    </ToolContext.Provider>
  );
};

export const useTool = () => useContext(ToolContext);
