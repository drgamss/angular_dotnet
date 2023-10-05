import { Injectable } from '@angular/core';
import { CalculatedStockData } from '../models/stock';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  constructor() { }

  totalPortfolioValue: number = 0;

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

  getTargetValue(weightTarget: number, amount: number, price: number) {

  }

  calculateTotalPortfolioValue(stockData: CalculatedStockData[]): number {
    // Calculate the total value of the portfolio by summing up the value of each stock
    this.totalPortfolioValue = stockData.reduce((totalValue, stock) => totalValue + stock.close * stock.amount, 0);
    return this.totalPortfolioValue;
  }

  calculateStockUnderWeight(stockData: CalculatedStockData): number {

    var targetValue = this.getTargetValue(stockData.weightTarget, stockData.amount, stockData.close);

    return 0;
  }

  calculateWeightDifference(weightTarget: number, amount: number, close: number) {
    // Calculate the actual weight percentage
    const actualWeight = (amount * close / this.totalPortfolioValue) * 100;

    // Calculate the target value based on the weight target
    const targetValue = (weightTarget / 100) * this.totalPortfolioValue;

    // Calculate the difference between the actual value and the target value
    const difference = amount * close - targetValue;

    // Return the difference as a positive or negative number
    return difference;
  }

  calculateForwardYield(stock: CalculatedStockData) {
    // Map frequency to corresponding multiplier (monthly: 12, quarterly: 4, semi-annual: 2, annual: 1)
    const frequencyMultiplier = {
      monthly: 12,
      quarterly: 4,
      'semi-annual': 2,
      annual: 1,
    };

    // Calculate annual dividend income
    const annualDividendIncome = stock.dividend * frequencyMultiplier[stock.frequency];

    // Calculate forward yield
    const forwardYield = (annualDividendIncome / stock.close) * 100; // multiply by 100 to convert to percentage

    return Number(forwardYield.toFixed(2)); // Round to two decimal places
  }
}





