import { Injectable } from '@angular/core';
import { DateService } from './date.service';
import { environment } from 'src/environments/environment';
import dividendData from '../data/dividends';
import priceData from '../data/eod';
import { UtilitiesService } from './utilities.service';
import { CalculatedStockData, DividendData, DividendFrequency, Stock, StockData } from '../models/stock';
import { MathService } from './math.service';

@Injectable({
  providedIn: 'root'
})
export class MarketStackService {

  constructor(private dateService: DateService, private utilitiesService: UtilitiesService, private mathService: MathService) { }

  getPriceAndDividendData (storedData: Stock[]){

    const uniqueSymbolsArray = [...new Set(dividendData.data.map(item => item.symbol))];
    //console.log(uniqueSymbolsArray);

    const dividendArray = this.utilitiesService.extractFirstObjectsBySymbol(dividendData.data, uniqueSymbolsArray);
    //console.log(dividendArray.sort((a, b) => a.symbol.localeCompare(b.symbol)));

    const priceArray = this.utilitiesService.extractFirstObjectsBySymbol(priceData.data, uniqueSymbolsArray);
    //console.log(priceArray.sort((a, b) => a.symbol.localeCompare(b.symbol)));


    // Create a map for faster lookup
    const symbolCloseMap = new Map(priceArray.map(item => [item.symbol, item.close]));

    // Update the originalArray with the 'close' field
    const updatedArray = dividendArray.map(item => ({
      ...item,
      close: symbolCloseMap.get(item.symbol)
    }));

    // Create a map for faster lookup
    const symbolMap = new Map(storedData.map(item => [item.ticker, item]));

    // Merge arrays based on matching 'symbol' and include all fields
    const mergedArray = updatedArray.map(item => ({
      ...item,
      ...symbolMap.get(item.symbol.toLowerCase()), // Merge fields from secondArray based on 'symbol'
      "amount": symbolMap.get(item.symbol.toLowerCase())?.amount, // Include 'amount' field
      "cost": symbolMap.get(item.symbol.toLowerCase())?.cost, // Include 'cost' field
      "weightTarget": symbolMap.get(item.symbol.toLowerCase())?.weightTarget, // Include 'weightTarget' field
    }));

    const fieldNameToRemove = "ticker";

    // Using map to create new objects without the specified field
    const newArrayWithoutField = mergedArray.map(obj => {
      const { [fieldNameToRemove]: removedField, ...rest } = obj;
      return rest;
    });

    const frequencyArray = this.calculateDividendFrequency(dividendData.data);
    const newArrayWithFrequencyField = this.addFrequencyToStockArray(newArrayWithoutField, frequencyArray);
    //const newArrayWithWeightField = this.addWeightToStockArray(newArrayWithFrequencyField);
    let finalArray = this.calculateWeightStatus(newArrayWithFrequencyField);
    finalArray = this.addAllOtherFields(finalArray);
    return finalArray;
    
  }

  addAllOtherFields(stockData: CalculatedStockData[]): CalculatedStockData[]{
    for(var i = 0; i < stockData.length; i++){
      stockData[i].weight = this.mathService.calculateStockWeight(stockData[i].symbol, stockData);
      stockData[i].marketValue = stockData[i].amount * stockData[i].close;
      stockData[i].overWeight = this.mathService.calculateWeightDifference(stockData[i].weightTarget, stockData[i].amount, stockData[i].close);;
      stockData[i].yieldFwd = this.mathService.calculateForwardYield(stockData[i]);
      stockData[i].yieldOnCost = this.mathService.calculateYielsOnCost(stockData[i]);
    }
    return stockData;
  }

  addWeightToStockArray(stockData: CalculatedStockData[]){
    for(var i = 0; i < stockData.length; i++){
      stockData[i].weight = this.mathService.calculateStockWeight(stockData[i].symbol, stockData);
    }
    return stockData;
  }

  calculateDividendFrequency(dividendData: DividendData[]): DividendFrequency[] {
    const groupedData: Record<string, DividendData[]> = {};

    // Group dividend data by symbol
    dividendData.forEach(item => {
        if (!groupedData[item.symbol]) {
            groupedData[item.symbol] = [];
        }
        groupedData[item.symbol].push(item);
    });

    // Calculate frequency for each symbol
    const result: DividendFrequency[] = [];

    Object.keys(groupedData).forEach(symbol => {
        const symbolData = groupedData[symbol];

        // Sort the array by date in ascending order for each symbol
        symbolData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        let frequency: 'monthly' | 'quarterly' | 'semi-annual' | 'annual' = 'annual';

        for (let i = 0; i < symbolData.length - 1; i++) {
            const currentDate = new Date(symbolData[i].date);
            const nextDate = new Date(symbolData[i + 1].date);

            // Calculate the time difference in months
            const monthsDifference = (nextDate.getFullYear() - currentDate.getFullYear()) * 12 +
                (nextDate.getMonth() - currentDate.getMonth());

            // Determine the frequency based on the time difference
            if (monthsDifference >= 11) {
                frequency = 'annual';
            } else if (monthsDifference >= 5) {
                frequency = 'semi-annual';
            } else if (monthsDifference >= 2) {
                frequency = 'quarterly';
            } else {
                frequency = 'monthly';
            }
        }

        result.push({ symbol, frequency });
    });

    return result;
  }

  addFrequencyToStockArray(stockArray: any[], frequencyData: DividendFrequency[]): CalculatedStockData[] {

    return stockArray.map(stock => {
        const frequencyObj = frequencyData.find(item => item.symbol === stock.symbol);

        if (frequencyObj) {
            return { ...stock, frequency: frequencyObj.frequency };
        } else {
          return { ...stock, frequency: 'unknown' };
        }

        // If no frequency information is available, you can set a default value or leave it undefined.
        // For example: return { ...stock, frequency: 'unknown' };

    });

  }

  calculateWeightStatus(stockData: CalculatedStockData[]): CalculatedStockData[]{
    for(var i = 0; i < stockData.length; i++){

    }
    return stockData;
  }


}
