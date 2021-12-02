import { buildDataSources, DataSources } from '@datasources/index';

export type Context = {
  dataSources: DataSources;
};

let dataSources: DataSources;

export const createContext = (): Context => {
  if (!dataSources) {
    dataSources = buildDataSources();
  }
  return { dataSources };
};
