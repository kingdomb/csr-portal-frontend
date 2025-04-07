// useNavigation.js
import { useContext } from 'react';

import { NavigationContext } from '../context/NavigationContext.jsx';

export const useNavigation = () => useContext(NavigationContext);
