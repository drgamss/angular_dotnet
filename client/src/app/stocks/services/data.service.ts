import { Injectable } from '@angular/core';
import { Stock } from '../models/stock';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  setStockData(data: any): void {
    const jsonData = JSON.stringify(data);
    localStorage.setItem('stockData', jsonData);
  }

  getStockData(): any {
    const jsonData = localStorage.getItem('stockData');
    if(jsonData){
      return JSON.parse(jsonData);
    }
    return [];
  }

}
