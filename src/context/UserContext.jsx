import React, { createContext, useContext } from 'react';
import { useUser } from '@clerk/clerk-react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { user, isLoaded } = useUser();
  const userData = isLoaded ? user : null; // Handle loading state
  return <UserContext.Provider value={userData}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);