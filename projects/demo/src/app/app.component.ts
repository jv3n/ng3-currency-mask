import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CurrencyMaskDirective } from '../../../ng3-currency-mask/src/index';

@Component({
  selector: 'app-root',
  template: `
    <h3>Template Driven (ngModel) Example</h3>

    <input currencyMask [(ngModel)]="ngModelExample" [options]="{ prefix: 'R$ ', thousands: '.', decimal: ',' }" />
    <span> --> {{ ngModelExample }}</span>

    <h3>Reactive Forms (formControl) Example</h3>

    <input
      currencyMask
      [formControl]="formControlExample"
      [options]="{ prefix: 'R$ ', thousands: '.', decimal: ',' }"
    />
    <span> --> {{ formControlExample.value }}</span>

    <h3>Reactive Forms (formArray) Example</h3>

    <form [formGroup]="formGroupExample">
      <div formArrayName="formArrayExample">
        @for (control of formArrayExample.controls; track control; let i = $index) {
          <input currencyMask [formControlName]="i" />
          <span> --> {{ control.value }}</span>
          <br />
          <br />
        }
      </div>
    </form>

    <h3>Angular Material Example</h3>

    <mat-form-field appearance="outline">
      <mat-label>Value</mat-label>
      <input
        currencyMask
        matInput
        [(ngModel)]="angularMaterialExample"
        [options]="{ prefix: '$ ', thousands: '.', decimal: ',' }"
      />
    </mat-form-field>

    <span> --> {{ angularMaterialExample }}</span>
  `,
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormField, MatInput, CurrencyMaskDirective, MatLabel],
})
export class AppComponent implements OnInit {
  angularMaterialExample: number = 60;
  formControlExample = new FormControl(20);
  formGroupExample: FormGroup;
  ngModelExample: number = 10;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroupExample = this.formBuilder.group({
      formArrayExample: this.formBuilder.array([
        this.formBuilder.control(30),
        this.formBuilder.control(40),
        this.formBuilder.control(50),
      ]),
    });
  }

  get formArrayExample() {
    return this.formGroupExample.get('formArrayExample') as FormArray;
  }
}
