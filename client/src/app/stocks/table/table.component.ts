import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(private dataService: DataService){}

  ngOnInit(): void {
    const storedData = localStorage.getItem('stockData');
    if (storedData) {
      console.log(JSON.parse(storedData));
    }
  }



}
