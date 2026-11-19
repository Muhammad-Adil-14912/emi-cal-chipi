const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateEMI } = require('../emi-calculator');

test('calculates a zero-interest loan without division by zero', () => {
  const result = calculateEMI({ principal: 120000, years: 1, annualRate: 0 });
  assert.equal(result.emi, 10000);
  assert.equal(result.interest, 0);
  assert.equal(result.total, 120000);
});

test('calculates a standard amortizing loan', () => {
  const result = calculateEMI({ principal: 120000, years: 1, annualRate: 12 });
  assert.ok(Math.abs(result.emi - 10661.85) < 0.02);
  assert.ok(result.interest > 0);
  assert.ok(result.total > result.principal);
});

test('rejects a loan amount outside the supported range', () => {
  assert.throws(
    () => calculateEMI({ principal: 99999, years: 10, annualRate: 8 }),
    { name: 'RangeError' }
  );
});

test('rejects fractional or out-of-range tenure', () => {
  assert.throws(
    () => calculateEMI({ principal: 100000, years: 1.5, annualRate: 8 }),
    { name: 'RangeError' }
  );
  assert.throws(
    () => calculateEMI({ principal: 100000, years: 31, annualRate: 8 }),
    { name: 'RangeError' }
  );
});

test('rejects negative and excessive interest rates', () => {
  assert.throws(
    () => calculateEMI({ principal: 100000, years: 10, annualRate: -1 }),
    { name: 'RangeError' }
  );
  assert.throws(
    () => calculateEMI({ principal: 100000, years: 10, annualRate: 15.1 }),
    { name: 'RangeError' }
  );
});

test('accepts supported boundary values and numeric input strings', () => {
  const minimum = calculateEMI({ principal: '100000', years: '1', annualRate: '0' });
  const maximum = calculateEMI({ principal: 100000000, years: 30, annualRate: 15 });
  assert.equal(minimum.principal, 100000);
  assert.equal(minimum.months, 12);
  assert.equal(maximum.principal, 100000000);
  assert.equal(maximum.months, 360);
  assert.ok(Number.isFinite(maximum.emi));
});

test('rejects non-finite and missing numeric inputs', () => {
  assert.throws(
    () => calculateEMI({ principal: '', years: 10, annualRate: 8 }),
    { name: 'RangeError' }
  );
  assert.throws(
    () => calculateEMI({ principal: 100000, years: 10, annualRate: 'NaN' }),
    { name: 'RangeError' }
  );
  assert.throws(
    () => calculateEMI({ principal: 100000, years: 10, annualRate: 16 }),
    { name: 'RangeError' }
  );
});
