import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { MarketStackService } from '../services/marketStack.service';
import { CalculatedStockData } from '../models/stock';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  stockArray: any[] = [];

  constructor(private dataService: DataService, private marketStackService: MarketStackService){}

  ngOnInit(): void {
    const storedData = this.dataService.getStockData();
    if (storedData) {
      //console.log(storedData);
    }
    
    this.stockArray = this.marketStackService.getPriceAndDividendData(storedData.stocks);

    console.log(this.stockArray);
  }



}
