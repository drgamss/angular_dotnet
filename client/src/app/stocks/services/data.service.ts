import { Injectable } from '@angular/core';
import { Stock } from '../models/stock';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private stockData: Stock[] = [];

  setStockData(data: Stock[]): void {
    this.stockData = data;
  }

  getStockData(): Stock[] {
    return this.stockData;
  }

}
