export interface Stock {
    ticker: string;
    cost:  number;
    amount:  number;
    weightTarget:  number;
}

export interface DividendData {
    date: string;
    dividend: number;
    symbol: string;
}

export interface DividendFrequency {
    symbol: string;
    frequency: 'monthly' | 'quarterly' | 'semi-annual' | 'annual';
}

export interface StockData {
    symbol: string;
}
export interface CalculatedStockData {
    date: string;
    dividend: number;
    symbol: string;
    close: number;
    cost: number;
    amount: number;
    weightTarget: number;
    frequency: 'monthly' | 'quarterly' | 'semi-annual' | 'annual';
}
