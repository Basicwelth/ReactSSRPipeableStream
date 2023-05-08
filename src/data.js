import { createContext, useContext } from 'react';

const DataContext = createContext(null);
export const DataProvider = ({ data, children }) => {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export function useData() {
  const ctx = useContext(DataContext);
  const fakeData = [
    'Wait, it doesn\'t wait for React to load?',
    'How does this even work?',
    'I like marshmallows',
    'Hello',
    'Any body else!!!',
    'Helloooooooo!!!!!!',
  ];
  return (ctx) ? [ctx] : fakeData;
}
