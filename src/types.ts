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

export enum FinancialStatements {
    IncomeStatement = 'income-statement',
    BalanceSheet = 'balance-sheet',
    CashFlowStatement = 'cash-flow-statement'
}
