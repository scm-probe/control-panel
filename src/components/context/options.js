"use client";

import { createContext, useContext, useState } from "react";

const optionsDefault = {
  id: false,
  name: true,
  graph: false,
  metrics: false,
  setOptions: () => {},
};

const OptionsContext = createContext(optionsDefault);


export function useOptions() {
  return useContext(OptionsContext);
}

export function OptionsProvider({ children }) {
  const [options, setOptions] = useState(optionsDefault);
  const value = {
    ...options,
    setOptions: (options) => {
      setOptions(options);
    },
  };

  return (
    <OptionsContext.Provider value={value}>{children}</OptionsContext.Provider>
  );
}
