# ng3-currency-mask

A very simple currency mask standalone directive for Angular that allows using a number attribute. Angular 18+.

# Example App
https://stackblitz.com/edit/stackblitz-starters-h6b1cm?file=package.json

## Getting Started

### Installing and Importing

Install the package by command:

```sh
    npm install ng3-currency-mask --save
```

Import the directive in your standalone component

```ts
import { CurrencyMaskDirective } from 'ng3-currency-mask';

@Component({
  selector: 'app-root',
  templateUrl: 'root.html',
  standalone: true,
  imports: [CurrencyMaskDirective],
})
```

### Using

```html
<input currencyMask [(ngModel)]="value" />
```

- `ngModel` An attribute of type number. If is displayed `'$ 25.63'`, the attribute will be `'25.63'`.

### Options

You can set options as follows:

```html
<!-- example for pt-BR money -->
<input currencyMask [(ngModel)]="value" [options]="{ prefix: 'R$ ', thousands: '.', decimal: ',' }" />
```

Available options:

- `align` - Text alignment in input. (default: `right`)
- `allowNegative` - If `true` can input negative values. (default: `true`)
- `decimal` - Separator of decimals (default: `'.'`)
- `precision` - Number of decimal places (default: `2`)
- `prefix` - Money prefix (default: `'$ '`)
- `suffix` - Money suffix (default: `''`)
- `thousands` - Separator of thousands (default: `','`)

### Validation

This directive also provides built-in validation for minimum and maximum values. If the attributes 'min' and / or 'max'
are set, the Angular CSS class 'ng-invalid' will be added to the input to indicate an invalid value.

```html
<input currencyMask [(ngModel)]="value" min="-10.50" max="100.75" />
```
