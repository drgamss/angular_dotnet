import { Injectable } from '@angular/core';
import { CalculatedStockData } from '../models/stock';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  constructor() { }

  calculateStockWeight(symbol: string, stockData: CalculatedStockData[]): number {
    // Find the stock with the given symbol
    const selectedStock = stockData.find(stock => stock.symbol === symbol);

    if (!selectedStock) {
      // If the stock with the given symbol is not found, return undefined or handle the case accordingly.
      console.error(`Stock with symbol '${symbol}' not found.`);
      return 0;
    }
    // Calculate the weight of the selected stock
    let stockWeight = (selectedStock.close * selectedStock.amount) / this.calculateTotalPortfolioValue(stockData);
    stockWeight = stockWeight * 100;
    const roundedStockWeight = Number(stockWeight.toFixed(2));

    return roundedStockWeight;
  }

  calculateTotalPortfolioValue(stockData: CalculatedStockData[]): number {
    // Calculate the total value of the portfolio by summing up the value of each stock
    return stockData.reduce((totalValue, stock) => totalValue + stock.close * stock.amount, 0);
  }

}
