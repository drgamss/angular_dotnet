import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
  stockForm!: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    this.stockForm = this.fb.group({
      stocks: this.fb.array([]) // This will hold the array of stocks
    });
     // Check local storage for existing data
     const storedData = localStorage.getItem('stockData');
     if (storedData) {
       this.populateForm(JSON.parse(storedData));
     }
  }

  getControls() {
    return (this.stockForm.get('stocks') as FormArray).controls;
  }

  // Add a new stock to the form
  addStock() {
    const stockGroup = this.fb.group({
      ticker: ['', Validators.required],
      cost: ['', Validators.required],
      amount: ['', Validators.required],
      weightTarget: ['', Validators.required]
    });

    (this.stockForm.get('stocks') as any).push(stockGroup);
  }

  // Remove a stock from the form
  removeStock(index: number) {
    (this.stockForm.get('stocks') as any).removeAt(index);
  }

  updateWeightTarget(index: number) {
    const weightTargetControl = (this.stockForm.get('stocks') as any).at(index).get('weightTarget');
    console.log(weightTargetControl);
    if (weightTargetControl.value !== null) {
      weightTargetControl.setValue(weightTargetControl.value + '%');
    }
  }

  private populateForm(data: any) {
    const stocksArray = this.stockForm.get('stocks') as any;

    // Clear existing form controls
    while (stocksArray.length) {
      stocksArray.removeAt(0);
    }

    // Populate the form with data from local storage
    for (const stock of data.stocks) {
      const stockGroup = this.fb.group({
        ticker: [stock.ticker, Validators.required],
        cost: [stock.cost, Validators.required],
        amount: [stock.amount, Validators.required],
        weightTarget: [stock.weightTarget, Validators.required]
      });

      stocksArray.push(stockGroup);
    }
  }

  // Save the form data to local storage
  saveForm() {
    const formData = this.stockForm.value;
    const jsonData = JSON.stringify(formData);
    localStorage.setItem('stockData', jsonData);
    this.dataService.setStockData(this.stockForm.value);
  }
}
