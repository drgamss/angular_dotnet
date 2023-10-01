
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StocksComponent } from './stocks/stocks.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  { path: '', component: StocksComponent },
  { path: 'table', component: TableComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class StocksRoutingModule { }
