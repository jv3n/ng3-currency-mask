import {
  AfterViewInit,
  Directive,
  DoCheck,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  Inject,
  Input,
  input,
  KeyValueDiffer,
  KeyValueDiffers,
  OnInit,
  Optional,
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig } from './currency-mask.config';
import { InputHandler } from './input.handler';

@Directive({
  selector: '[currencyMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyMaskDirective),
      multi: true,
    },
    { provide: NG_VALIDATORS, useExisting: CurrencyMaskDirective, multi: true },
  ],
  standalone: true,
})
export class CurrencyMaskDirective implements AfterViewInit, ControlValueAccessor, DoCheck, OnInit, Validator {
  readonly elementRef = inject(ElementRef);
  readonly keyValueDiffers = inject(KeyValueDiffers);

  max = input<number>();
  min = input<number>();
  @Input() options: any = {};

  inputHandler: InputHandler;
  keyValueDiffer: KeyValueDiffer<any, any>;

  optionsTemplate = {
    align: 'right',
    allowNegative: true,
    decimal: '.',
    precision: 2,
    prefix: '$ ',
    suffix: '',
    thousands: ',',
  } as CurrencyMaskConfig;

  constructor(@Optional() @Inject(CURRENCY_MASK_CONFIG) private currencyMaskConfig: CurrencyMaskConfig) {
    if (currencyMaskConfig) {
      this.optionsTemplate = currencyMaskConfig;
    }

    this.keyValueDiffer = this.keyValueDiffers.find({}).create();
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.style.textAlign = this.options.align
      ? this.options.align
      : this.optionsTemplate.align;
  }

  ngDoCheck() {
    if (this.keyValueDiffer.diff(this.options)) {
      this.elementRef.nativeElement.style.textAlign = this.options.align
        ? this.options.align
        : this.optionsTemplate.align;
      this.inputHandler.updateOptions((<any>Object).assign({}, this.optionsTemplate, this.options));
    }
  }

  ngOnInit() {
    this.inputHandler = new InputHandler(
      this.elementRef.nativeElement,
      (<any>Object).assign({}, this.optionsTemplate, this.options),
    );
  }

  @HostListener('blur', ['$event'])
  handleBlur(event: any) {
    this.inputHandler.getOnModelTouched().apply(event);
  }

  @HostListener('click', ['$event'])
  handleClick(event: any) {
    this.inputHandler.handleClick(event, this.isChromeAndroid());
  }

  @HostListener('cut', ['$event'])
  handleCut(event: any) {
    if (!this.isChromeAndroid()) {
      this.inputHandler.handleCut(event);
    }
  }

  @HostListener('input', ['$event'])
  handleInput(event: any) {
    if (this.isChromeAndroid()) {
      this.inputHandler.handleInput(event);
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeydown(event: any) {
    if (!this.isChromeAndroid()) {
      this.inputHandler.handleKeydown(event);
    }
  }

  @HostListener('keypress', ['$event'])
  handleKeypress(event: any) {
    if (!this.isChromeAndroid()) {
      this.inputHandler.handleKeypress(event);
    }
  }

  @HostListener('keyup', ['$event'])
  handleKeyup(event: any) {
    if (!this.isChromeAndroid()) {
      this.inputHandler.handleKeyup(event);
    }
  }

  @HostListener('paste', ['$event'])
  handlePaste(event: any) {
    if (!this.isChromeAndroid()) {
      this.inputHandler.handlePaste(event);
    }
  }

  isChromeAndroid(): boolean {
    return /chrome/i.test(navigator.userAgent) && /android/i.test(navigator.userAgent);
  }

  registerOnChange(callbackFunction: Function): void {
    this.inputHandler.setOnModelChange(callbackFunction);
  }

  registerOnTouched(callbackFunction: Function): void {
    this.inputHandler.setOnModelTouched(callbackFunction);
  }

  setDisabledState(value: boolean): void {
    this.elementRef.nativeElement.disabled = value;
  }

  validate(abstractControl: AbstractControl): { [key: string]: any } {
    let result: any = {};

    if (abstractControl.value > this.max()) {
      result.max = true;
    }

    if (abstractControl.value < this.min()) {
      result.min = true;
    }

    return result ? result : null;
  }

  writeValue(value: number): void {
    this.inputHandler.setValue(value);
  }
}
