(function (root) {
  function calculateEMI({ principal, years, annualRate }) {
    const amount = Number(principal);
    const tenure = Number(years);
    const rate = Number(annualRate);

    if (!Number.isFinite(amount) || amount < 100000 || amount > 100000000) {
      throw new RangeError('Loan amount must be between ₹1 lakh and ₹10 crore.');
    }
    if (!Number.isInteger(tenure) || tenure < 1 || tenure > 30) {
      throw new RangeError('Tenure must be a whole number between 1 and 30 years.');
    }
    if (!Number.isFinite(rate) || rate < 0 || rate > 15) {
      throw new RangeError('Interest rate must be between 0% and 15%.');
    }

    const months = tenure * 12;
    const monthlyRate = rate / 1200;
    const emi = monthlyRate === 0
      ? amount / months
      : (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    const totalAmount = emi * months;
    const totalInterest = Math.max(0, totalAmount - amount);

    return Object.freeze({
      emi,
      principal: amount,
      interest: totalInterest,
      total: totalAmount,
      principalShareDegrees: (amount / totalAmount) * 360,
      months,
    });
  }

  const api = Object.freeze({ calculateEMI });
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else {
    root.EMICalculator = api;
  }
})(globalThis);
