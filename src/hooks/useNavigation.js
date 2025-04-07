// useNavigation.js
import { useContext } from 'react';

import { NavigationContext } from '../context/navigation-context';

export const useNavigation = () => useContext(NavigationContext);
