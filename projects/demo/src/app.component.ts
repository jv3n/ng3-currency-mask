import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyMaskDirective } from 'ng3-currency-mask';

@Component({
  selector: 'app-root',
  styles: `
    :host {
      padding: 4em 8rem 4rem;
      display: flex;

      mat-card {
        margin: 1rem;
        width: 50%;
      }

      .config-content {
        display: flex;
        flex-direction: column;
        width: max-content;
      }

      .error {
        color: var(--mat-form-field-error-text-color);
      }

      mat-card-subtitle {
        padding: 1rem;
      }
    }
  `,
  template: `
    <mat-card appearance="outlined">
      <mat-card-content>
        <mat-card-title>Demo</mat-card-title>

        <mat-card-subtitle>Template Driven (ngModel) Example</mat-card-subtitle>
        <mat-card-content>
          <input currencyMask [(ngModel)]="ngModelExample" [options]="optionForm.value" />
          <span> --> {{ ngModelExample }}</span>
        </mat-card-content>

        <mat-card-subtitle>Reactive Forms (formControl) Example</mat-card-subtitle>
        <mat-card-content>
          <input currencyMask [formControl]="formControlExample" [options]="optionForm.value" />
          <span> --> {{ formControlExample.value }}</span>
        </mat-card-content>

        <mat-card-subtitle>Reactive Forms (formArray) Example</mat-card-subtitle>
        <mat-card-content>
          <form [formGroup]="fg">
            <div formArrayName="formArrayExample">
              @for (control of fg.controls.formArrayExample.controls; track control; let i = $index) {
                <input currencyMask [formControlName]="i" [options]="optionForm.value" [min]="5" [max]="100" />
                <span> --> {{ control.value }}</span>
                @if (control.hasError('max') || control.hasError('min')) {
                  <span class="error"> --> Error: should be between 5 & 100</span>
                }
                <br />
                <br />
              }
            </div>
          </form>
        </mat-card-content>

        <mat-card-subtitle>Angular Material Example</mat-card-subtitle>
        <mat-card-content>
          <mat-form-field appearance="outline">
            <mat-label>Value</mat-label>
            <input currencyMask matInput [(ngModel)]="angularMaterialExample" [options]="optionForm.value" />
          </mat-form-field>
          <span> --> {{ angularMaterialExample }}</span>
        </mat-card-content>

        <mat-card-subtitle>Angular Material with error Example</mat-card-subtitle>
        <mat-card-content>
          <mat-form-field appearance="outline">
            <mat-label>Value</mat-label>
            <input
              currencyMask
              matInput
              [formControl]="formControl2Example"
              [options]="optionForm.value"
              [min]="5"
              [max]="100"
            />
            @if (formControl2Example.hasError('max') || formControl2Example.hasError('min')) {
              <mat-error class="error">Error: should be between 5 & 100</mat-error>
            }
          </mat-form-field>
          <span> --> {{ formControl2Example.value }}</span>
        </mat-card-content>
      </mat-card-content>
    </mat-card>

    <mat-card appearance="outlined">
      <mat-card-content class="config-content">
        <mat-card-title>Config </mat-card-title>
        <mat-card-subtitle>Fields</mat-card-subtitle>

        <mat-form-field appearance="outline">
          <mat-label>Align</mat-label>
          <mat-select [formControl]="optionForm.controls.align">
            <mat-option value="right">right</mat-option>
            <mat-option value="left">left</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-checkbox [formControl]="optionForm.controls.allowNegative">Allow negative</mat-checkbox>

        <mat-form-field appearance="outline">
          <mat-label>Decimal</mat-label>
          <input matInput [formControl]="optionForm.controls.decimal" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Precision</mat-label>
          <mat-select [formControl]="optionForm.controls.precision">
            <mat-option [value]="0">0</mat-option>
            <mat-option [value]="1">1</mat-option>
            <mat-option [value]="2">2</mat-option>
            <mat-option [value]="3">3</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Prefix</mat-label>
          <input matInput [formControl]="optionForm.controls.prefix" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Suffix</mat-label>
          <input matInput [formControl]="optionForm.controls.suffix" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Thousands</mat-label>
          <input matInput [formControl]="optionForm.controls.thousands" />
        </mat-form-field>
      </mat-card-content>
    </mat-card>
  `,
  standalone: true,
  imports: [
    CurrencyMaskDirective,
    FormsModule,
    MatCardModule,
    MatCardContent,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  #fb = inject(FormBuilder);

  angularMaterialExample = 60;
  formControlExample = new FormControl(20);
  formControl2Example = new FormControl(70);
  ngModelExample = 10;

  fg = this.#fb.group({
    formArrayExample: this.#fb.array([this.#fb.control(30), this.#fb.control(40), this.#fb.control(50)]) as FormArray,
  });

  optionForm = new FormGroup({
    align: new FormControl<'right' | 'left'>('right'),
    allowNegative: new FormControl<boolean>(true),
    decimal: new FormControl<string>('.'),
    precision: new FormControl<number>(0),
    prefix: new FormControl<string>(''),
    suffix: new FormControl<string>(''),
    thousands: new FormControl<string>(','),
  });
}
