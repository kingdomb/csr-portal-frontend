//LoadingContext.jsx
import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

