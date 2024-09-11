import React, { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedLayout } from '../state/reducers/lifReducer';

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const selectedLayout = useSelector((state) => state.lif.selectedLayout);
  const dispatch = useDispatch();

  const setSelectedLayoutHandler = (layout) => {
    dispatch(setSelectedLayout(layout));
  };

  return (
    <LayoutContext.Provider value={{ selectedLayout, setSelectedLayout: setSelectedLayoutHandler }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);