const amountBox = document.getElementById("amountBox");
const amountSlider = document.getElementById("amountSlider");
const tenureBox = document.getElementById("tenureBox");
const tenureSlider = document.getElementById("tenureSlider");
const rateBox = document.getElementById("rateBox");
const rateSlider = document.getElementById("rateSlider");

const emiValue = document.getElementById("emiValue");
const principalValue = document.getElementById("principalValue");
const interestValue = document.getElementById("interestValue");
const totalValue = document.getElementById("totalValue");
const pieChart = document.getElementById("pieChart");

function formatMoney(num) {
  return "₹" + Math.round(num).toLocaleString("en-IN");
}

function calculateEMI() {
  const principal = Number(amountBox.value);
  const years = Number(tenureBox.value);
  const annualRate = Number(rateBox.value);
  const months = years * 12;

  if (
    !Number.isFinite(principal) ||
    !Number.isFinite(years) ||
    !Number.isFinite(annualRate) ||
    principal <= 0 ||
    years <= 0 ||
    annualRate < 0 ||
    months <= 0
  ) {
    emiValue.textContent = "—";
    principalValue.textContent = "—";
    interestValue.textContent = "—";
    totalValue.textContent = "—";
    pieChart.style.background = "none";
    return;
  }

  const monthlyRate = annualRate / 12 / 100;
  // The standard EMI expression divides by zero when the interest rate is 0%.
  const emi = monthlyRate === 0
    ? principal / months
    : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

  const totalAmount = emi * months;
  const totalInterest = Math.max(0, totalAmount - principal);
  const principalShare = (principal / totalAmount) * 360;

  emiValue.textContent = formatMoney(emi);
  principalValue.textContent = formatMoney(principal);
  interestValue.textContent = formatMoney(totalInterest);
  totalValue.textContent = formatMoney(totalAmount);
  pieChart.style.background =
    "conic-gradient(#1a4fa3 0deg " + principalShare + "deg, #a9c2e8 " + principalShare + "deg 360deg)";
}

function syncAndCalculate(box, slider) {
  box.addEventListener("input", function () {
    slider.value = box.value;
    calculateEMI();
  });
  slider.addEventListener("input", function () {
    box.value = slider.value;
    calculateEMI();
  });
}

syncAndCalculate(amountBox, amountSlider);
syncAndCalculate(tenureBox, tenureSlider);
syncAndCalculate(rateBox, rateSlider);

calculateEMI();
