import { Injectable } from '@angular/core';
import { DateService } from './date.service';
import { environment } from 'src/environments/environment';
import dividendData from '../data/dividends';
import priceData from '../data/eod';
import { UtilitiesService } from './utilities.service';
import { Stock } from '../models/stock';

@Injectable({
  providedIn: 'root'
})
export class MarketStackService {

  constructor(private dateService: DateService, private utilitiesService: UtilitiesService) { }

  getPriceAndDividendData(storedData: Stock[]){
    // const fiveYearsAgo = this.dateService.getFiveYearsAgo();
    // console.log(environment.marketStackUrl);
    // console.log(dividendData.data);
    //console.log("storedData", storedData);

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

    //console.log('updatedArray', updatedArray);

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

    //console.log('mergedArray', newArrayWithoutField);
    return newArrayWithoutField;
    
  }

}
