import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { MarketStackService } from '../services/marketStack.service';
import { CalculatedStockData } from '../models/stock';
import { MathService } from '../services/math.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  stockArray: CalculatedStockData[] = [];
  sortColumn: keyof CalculatedStockData = 'symbol';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private dataService: DataService, private marketStackService: MarketStackService, private mathService: MathService) { }

  ngOnInit(): void {
    const storedData = this.dataService.getStockData();
    if (storedData) {
      //console.log(storedData);
    }

    this.stockArray = this.marketStackService.getPriceAndDividendData(storedData.stocks);
    console.log(this.stockArray);

  }

  calculateWeight(symbol: string){
    return this.mathService.calculateStockWeight(symbol, this.stockArray);
  }

  // Function to toggle the sort order
  toggleSortOrder(column: keyof CalculatedStockData): void {
    if (column === this.sortColumn) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.sortArray();
  }

  // Function to sort the array based on the current sort column and order
  sortArray(): void {
    this.stockArray.sort((a, b) => {
      const sortOrder = this.sortDirection === 'asc' ? 1 : -1;
      const valueA = a[this.sortColumn];
      const valueB = b[this.sortColumn];

      return (valueA < valueB ? -1 : 1) * sortOrder;
    });
  }



}
