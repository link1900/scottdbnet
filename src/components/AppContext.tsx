import React, { useState, createContext, useContext } from 'react';

export interface User {
  id: string;
}

export interface IContext {
  isAuthenticated?: boolean;
  user?: User | null;
  menuOpen?: boolean;
}

export interface IAppContext {
  context: IContext;
  setContext(context: Partial<IContext>): void;
}

export const AppContext = createContext<IAppContext>({
  context: {},
  setContext: () => undefined
});

export const mergeContext = ({ setContext, context }: IAppContext) => (nextContext: Partial<IContext>): void =>
  setContext({
    ...context,
    ...nextContext
  });

export const useAppContext = (): IAppContext => useContext<IAppContext>(AppContext);

export const AppContextProvider: React.FC = ({ children }) => {
  const [context, setContext] = useState<IContext>({});
  return (
    <AppContext.Provider
      value={{
        context,
        setContext: mergeContext({ setContext, context })
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const AppContextConsumer = AppContext.Consumer;
export { AppContextConsumer };
