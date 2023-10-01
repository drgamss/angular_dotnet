import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksComponent } from './stocks/stocks.component';
import { StocksRoutingModule } from './stocks-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';



@NgModule({
  declarations: [
    StocksComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    StocksRoutingModule,
    ReactiveFormsModule
  ]
})
export class StocksModule { }
