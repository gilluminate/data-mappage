import { createContext, useContext, useMemo } from "react";
import sampleData from '../lib/sample_data.json';
import { System } from "../react-app-env";

type SystemsContextProps = {
  systems: System[];
};

const SystemsContext = createContext<Partial<SystemsContextProps>>({});
SystemsContext.displayName = 'SystemContext';
const SystemsProvider = (props: { children: React.ReactNode }): JSX.Element => {
  const providerValues = useMemo(
    () => ({ systems: sampleData }),
    [sampleData],
  );
  return <SystemsContext.Provider value={providerValues} {...props} />;
}

const useSystems = (): Partial<SystemsContextProps> => {
  const context = useContext(SystemsContext);
  if (context === undefined || Object.keys(context).length === 0) {
    throw new Error(`useSystems must be used within ${SystemsContext.displayName}`);
  }
  return context;
};

export { SystemsProvider, useSystems };
