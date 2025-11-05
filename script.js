function toggleFreeShip() {
  document.getElementById("freeShipInput").style.display =
    document.getElementById("freeShipChk").checked ? "block" : "none";
}

function toggleCoins() {
  document.getElementById("coinsInput").style.display =
    document.getElementById("coinsChk").checked ? "block" : "none";
}

function calculateAndShow() {
  const price = parseFloat(document.getElementById("sellingPrice").value) || 0;
  const cost = parseFloat(document.getElementById("productCost").value) || 0;
  const qty = parseInt(document.getElementById("quantity").value) || 1;
  const voucher = parseFloat(document.getElementById("voucherValue").value) || 0;
  const commissionRate = parseFloat(document.getElementById("commissionRate").value) / 100;
  const transactionRate = parseFloat(document.getElementById("transactionRate").value) / 100;
  const platformFee = parseFloat(document.getElementById("platformFee").value) || 0;
  const sstRate = parseFloat(document.getElementById("sstRate").value) / 100;

  const coinsEnabled = document.getElementById("coinsChk").checked;
  const coinsRate = coinsEnabled ? parseFloat(document.getElementById("coinsRate").value) / 100 : 0;
  const freeShipEnabled = document.getElementById("freeShipChk").checked;
  const shipContribution = freeShipEnabled ? parseFloat(document.getElementById("sellerShipContribution").value) : 0;

  const grossRevenue = price * qty;
  const commissionFee = (price - voucher) * commissionRate;
  const transactionFee = price * transactionRate;
  const platformFeeTotal = platformFee * qty;
  const sstAmount = (commissionFee + transactionFee + platformFeeTotal) * sstRate;
  const coinsCost = price * coinsRate;
  const shipSubsidy = shipContribution;

  const totalShopeeCosts = commissionFee + transactionFee + platformFeeTotal + sstAmount + coinsCost + shipSubsidy + voucher;
  const totalExpense = totalShopeeCosts + (cost * qty);
  const netProfit = grossRevenue - totalExpense;
  const profitMargin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;

  const set = (id, val) => document.getElementById(id).innerText = "RM" + val.toFixed(2);
  set("grossRevenue", grossRevenue);
  set("voucherCost", voucher);
  set("commissionFee", commissionFee);
  set("transactionFee", transactionFee);
  set("platformFeeResult", platformFeeTotal);
  set("sstAmount", sstAmount);
  set("coinsCost", coinsCost);
  set("shipSubsidy", shipSubsidy);
  set("totalShopeeCosts", totalShopeeCosts);
  set("productCostResult", cost * qty);
  set("totalExpense", totalExpense);
const netProfitEl = document.getElementById("netProfit");
netProfitEl.innerText = "RM" + netProfit.toFixed(2);

// Add green if positive, red if negative
netProfitEl.classList.remove("positive", "negative");
if (netProfit > 0) netProfitEl.classList.add("positive");
else if (netProfit < 0) netProfitEl.classList.add("negative");
  document.getElementById("profitMargin").innerText = profitMargin.toFixed(2) + "%";
}

function resetToDefaults() {
  document.getElementById("sellingPrice").value = 100;
  document.getElementById("productCost").value = 60;
  document.getElementById("quantity").value = 1;
  document.getElementById("voucherValue").value = 0;
  document.getElementById("commissionRate").value = 3.0;
  document.getElementById("transactionRate").value = 2.12;
  document.getElementById("platformFee").value = 0.50;
  document.getElementById("sstRate").value = 8.0;
  document.getElementById("coinsChk").checked = false;
  document.getElementById("freeShipChk").checked = false;
  toggleCoins();
  toggleFreeShip();
  calculateAndShow();
}
