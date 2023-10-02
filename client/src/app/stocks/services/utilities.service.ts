import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  extractFirstObjectsBySymbol(originalArray: any[], flatArrayOfSymbols: any[]) {
    const resultMap = new Map();
  
    // Populate the map with the first occurrence of each symbol
    originalArray.forEach(item => {
      const symbol = item.symbol;
      if (!resultMap.has(symbol) && flatArrayOfSymbols.includes(symbol)) {
        resultMap.set(symbol, item);
      }
    });
  
    // Convert the map values to an array
    const resultArray = Array.from(resultMap.values());
  
    return resultArray;
  }

}
