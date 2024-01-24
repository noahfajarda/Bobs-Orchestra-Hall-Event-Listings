"use client";

import { createContext, useEffect, useState } from "react";

export const WidgetContext = createContext();

export const UserContext = ({ children }) => {
  // context variables
  const [widgetId, setWidgetId] = useState("");

  useEffect(() => {
    setWidgetId("");
  }, []);

  return (
    // allow user to be manipulated and accessed by other components
    <WidgetContext.Provider value={{ widgetId, setWidgetId }}>
      {children}
    </WidgetContext.Provider>
  );
};
