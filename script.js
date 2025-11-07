function calculateAndShow() {
  const price = parseFloat(document.getElementById("sellingPrice").value) || 0;
  const cost = parseFloat(document.getElementById("productCost").value) || 0;
  const qty = parseInt(document.getElementById("quantity").value) || 1;
  const voucher = parseFloat(document.getElementById("voucherValue").value) || 0;
  const buyerShippingFee = parseFloat(document.getElementById("buyerShippingFee").value) || 0;
  const commissionRate = parseFloat(document.getElementById("commissionRate").value) / 100;
  const transactionRate = parseFloat(document.getElementById("transactionRate").value) / 100;
  const serviceFeeRate = parseFloat(document.getElementById("serviceFeeRate").value) / 100;
  const platformFee = parseFloat(document.getElementById("platformFee").value) || 0;
  const sstRate = parseFloat(document.getElementById("sstRate").value) / 100;

  const grossRevenue = price * qty;

  const commissionFee = Math.max(0, price - voucher) * commissionRate;
  const transactionFee = (price - voucher + buyerShippingFee) * transactionRate;
  const serviceFee = (price - voucher) * serviceFeeRate;
  const platformFeeTotal = platformFee * qty;

  const subtotalShopeeFeesBeforeSST = commissionFee + transactionFee + serviceFee + platformFeeTotal;
  const sstAmount = subtotalShopeeFeesBeforeSST * sstRate;
  const totalShopeeFees = subtotalShopeeFeesBeforeSST + sstAmount;

  const totalExpense = totalShopeeFees + voucher + (cost * qty);
  const netProfit = grossRevenue - totalExpense;
  const profitMargin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;

  const set = (id, val) => document.getElementById(id).innerText = "RM" + val.toFixed(2);
  set("grossRevenue", grossRevenue);
  set("voucherCost", voucher);
  set("commissionFee", commissionFee);
  set("transactionFee", transactionFee);
  set("serviceFee", serviceFee);
  set("platformFeeResult", platformFeeTotal);
  set("sstAmount", sstAmount);
  set("totalShopeeCosts", totalShopeeFees);
  set("productCostResult", cost * qty);
  set("totalExpense", totalExpense);

  const netProfitEl = document.getElementById("netProfit");
  netProfitEl.innerText = "RM" + netProfit.toFixed(2);
  netProfitEl.style.color = netProfit >= 0 ? "green" : "red";

  document.getElementById("profitMargin").innerText = profitMargin.toFixed(2) + "%";
}

function resetToDefaults() {
  document.getElementById("sellingPrice").value = 100;
  document.getElementById("productCost").value = 60;
  document.getElementById("quantity").value = 1;
  document.getElementById("voucherValue").value = 0;
  document.getElementById("buyerShippingFee").value = 0;
  document.getElementById("commissionRate").value = 8.0;
  document.getElementById("transactionRate").value = 3.5;
  document.getElementById("serviceFeeRate").value = 0.0;
  document.getElementById("platformFee").value = 0.50;
  document.getElementById("sstRate").value = 8.0;
  calculateAndShow();
}
