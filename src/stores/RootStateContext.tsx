import React from "react";
import CurrenciesStore from "./currenciesStore";
import ConverterStore from "./converterStore";

type RootStateContextValue = {
  currenciesStore: CurrenciesStore;
  converterStore: ConverterStore;
};
const RootStateContext = React.createContext<RootStateContextValue>(
  {} as RootStateContextValue
);

export const stores = {
  currenciesStore: new CurrenciesStore(),
  converterStore: new ConverterStore(),
};

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <RootStateContext.Provider value={stores}>
      {children}
    </RootStateContext.Provider>
  );
};

export const useRootStore = () => React.useContext(RootStateContext);
