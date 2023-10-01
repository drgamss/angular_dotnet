import { Injectable } from '@angular/core';
import { DateService } from './date.service';
import { environment } from 'src/environments/environment';
import dividendData from '../data/dividends';
import priceData from '../data/eod';

@Injectable({
  providedIn: 'root'
})
export class MarketStackService {

  constructor(private dateService: DateService) { }

  getPriceAndDividendData(amountOfStocks: number){
    console.log(amountOfStocks);
    const fiveYearsAgo = this.dateService.getFiveYearsAgo();
    // http://api.marketstack.com/v1/dividends?access_key=7ba739820c19fdacb190137d3e4a7e11&symbols=AAPL,T,MPW&date_from=2018-10-01
    // http://api.marketstack.com/v1/eod?access_key=7ba739820c19fdacb190137d3e4a7e11&symbols=AAPL,T,MPW
    // console.log(environment.marketStackUrl);
    // console.log(dividendData.data);
    // console.log(priceData.data);
    const firstNDividendItems = dividendData.data.slice(0, amountOfStocks);
    console.log(firstNDividendItems);
    const firstNPriceItems = priceData.data.slice(0, amountOfStocks);
    console.log(firstNPriceItems);
  }

}
