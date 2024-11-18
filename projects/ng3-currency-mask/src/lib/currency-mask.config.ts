import { InjectionToken } from '@angular/core';

export type CurrencyMaskConfig = {
  align?: 'right' | 'left';
  allowNegative?: boolean;
  decimal?: string;
  precision?: number;
  prefix?: string;
  suffix?: string;
  thousands?: string;
};

export let CURRENCY_MASK_CONFIG = new InjectionToken<CurrencyMaskConfig>('currency.mask.config');
