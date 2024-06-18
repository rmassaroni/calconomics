export interface Variable {
  name: string;
  value: number;
  solved: boolean;
  custom: boolean;
}

export enum DefaultVariables {
    AFC = 'afc',
    TFC = 'tfc',
    Q = 'q'
}

