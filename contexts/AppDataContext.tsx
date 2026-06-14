import FactoryDTO from '@/models/factoryDTO';
import React, { createContext, useContext, useState } from 'react';

type FactoryContextType = {
  selectedFactory: FactoryDTO | null;
  setSelectedFactory: (factory: FactoryDTO | null) => void;
};

const FactoryContext = createContext<FactoryContextType | undefined>(undefined);

export function AppDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedFactory, setSelectedFactory] =
    useState<FactoryDTO | null>(null);

  return (
    <FactoryContext.Provider
      value={{
        selectedFactory,
        setSelectedFactory,
      }}
    >
      {children}
    </FactoryContext.Provider>
  );
}

export function useFactory() {
  const context = useContext(FactoryContext);

  if (!context) {
    throw new Error(
      'useFactory deve ser usado dentro de FactoryProvider'
    );
  }

  return context;
}