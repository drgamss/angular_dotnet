import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksComponent } from './stocks/stocks.component';
import { StocksRoutingModule } from './stocks-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    StocksComponent
  ],
  imports: [
    CommonModule,
    StocksRoutingModule,
    ReactiveFormsModule
  ]
})
export class StocksModule { }
