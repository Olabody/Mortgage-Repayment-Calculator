import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Mortgage-Repayment-Calculator';
  myform = new FormGroup({
    amount: new FormControl('', [Validators.required]),
    term: new FormControl('', [Validators.required]),
    rate: new FormControl('', [Validators.required]),
    selectedOption: new FormControl('', [Validators.required]),
  });
  monthlyRepayment: number | null = null;
  totalRepayment: number | null = null;
  showResult: boolean = false;

  get ramount() {
    return this.myform.controls.amount;
  }
  get rterm() {
    return this.myform.controls.term;
  }
  get rrate() {
    return this.myform.controls.rate;
  }
  get rselectedOption() {
    return this.myform.controls.selectedOption;
  }
  onReactiveSubmit(data: FormGroup) {
    if (data.valid) {
      const amount = data.value.amount;
      const term = data.value.term;
      const rate = data.value.rate;

      const monthlyRate = rate / 100 / 12;
      const numberOfPayments = term * 12;
      const monthlyPayment =
        (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      const totalPayment = monthlyPayment * 12 * term;

      this.monthlyRepayment = monthlyPayment;
      this.totalRepayment = totalPayment;
      this.showResult = true;
    }

    console.log(data);
  }

  VisibilityStates: { [key: string]: boolean } = {
    onFormNotSubmitted: true,
    onFormSubmitted: false,
  };
  toggleVisiblilty(elementkey1: string, elementkey2: string) {
    this.VisibilityStates[elementkey1] = !this.VisibilityStates[elementkey1];
    this.VisibilityStates[elementkey2] = !this.VisibilityStates[elementkey2];
  }
}
