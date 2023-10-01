import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { MarketStackService } from '../services/marketStack.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(private dataService: DataService, private marketStackService: MarketStackService){}

  ngOnInit(): void {
    const storedData = this.dataService.getStockData();
    if (storedData) {
      console.log(storedData);
    }
    this.marketStackService.getPriceAndDividendData(storedData.stocks.length);
  }



}
