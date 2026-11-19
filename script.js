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
const calculationError = document.getElementById("calculationError");

function formatMoney(num) {
  return "₹" + Math.round(num).toLocaleString("en-IN");
}

function clearResults() {
  emiValue.textContent = "—";
  principalValue.textContent = "—";
  interestValue.textContent = "—";
  totalValue.textContent = "—";
  pieChart.style.background = "none";
  pieChart.setAttribute("aria-label", "No calculation available");
}

function calculateEMI() {
  try {
    const result = window.EMICalculator.calculateEMI({
      principal: amountBox.value,
      years: tenureBox.value,
      annualRate: rateBox.value,
    });

    calculationError.textContent = "";
    emiValue.textContent = formatMoney(result.emi);
    principalValue.textContent = formatMoney(result.principal);
    interestValue.textContent = formatMoney(result.interest);
    totalValue.textContent = formatMoney(result.total);
    pieChart.style.background =
      "conic-gradient(#1a4fa3 0deg " + result.principalShareDegrees +
      "deg, #a9c2e8 " + result.principalShareDegrees + "deg 360deg)";
    pieChart.setAttribute(
      "aria-label",
      "Principal " + formatMoney(result.principal) +
      "; interest " + formatMoney(result.interest)
    );
  } catch (error) {
    clearResults();
    calculationError.textContent = error.message;
  }
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
