# Home Loan EMI Calculator

A lightweight browser-based home loan EMI calculator. The calculator supports loan amounts from ₹1 lakh to ₹10 crore, tenures from 1 to 30 years, and annual interest rates from 0% to 15%.

## Run locally

Open `index.html` in a modern browser. No build step or backend is required.

## Run calculation tests

Requires Node.js 18 or newer:

```bash
node --test
```

The test suite covers zero-interest loans, a standard amortizing loan, and invalid amount, tenure, and rate values.

## Calculation

For a positive monthly interest rate, the EMI is calculated using the standard amortization formula:

```
EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
```

Where `P` is principal, `r` is monthly interest rate, and `n` is the number of monthly payments. At 0% interest, EMI is principal divided by the number of months.

This is an estimate for learning and planning; lender fees, insurance, taxes, and changing rates are not included.
