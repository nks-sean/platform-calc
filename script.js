const categoryRates = {
  "Electronics": 4.5,
  "Mobile & Gadgets": 4.5,
  "Home Appliances": 3.8,
  "Health & Beauty": 4.0,
  "Fashion (Men/Women)": 5.0,
  "Groceries & Pets": 3.0,
  "Sports & Outdoor": 3.5,
  "Baby & Toys": 3.5,
  "Home & Living": 4.0,
  "Automotive": 3.5,
  "Books & Stationery": 3.0,
  "Others": 4.0
};

function populateCategories(){
  const sel = document.getElementById('category');
  for (const [name, rate] of Object.entries(categoryRates)){
    const opt = document.createElement('option');
    opt.value = rate;
    opt.textContent = `${name} — ${rate}%`;
    sel.appendChild(opt);
  }
  onCategoryChange();
}

function onCategoryChange(){
  const sel = document.getElementById('category');
  const rate = parseFloat(sel.value);
  document.getElementById('commissionRate').value = rate.toFixed(2);
  document.getElementById('categoryNote').textContent = 
    `Commission default: ${rate.toFixed(2)}%. Edit if your Seller Centre differs.`;
  calculateAndShow(true);
}

function toggleFreeShip(){
  const chk = document.getElementById('freeShipChk');
  document.getElementById('freeShipInput').style.display = chk.checked ? 'block':'none';
  calculateAndShow(true);
}
function toggleCoins(){
  const chk = document.getElementById('coinsChk');
  document.getElementById('coinsInput').style.display = chk.checked ? 'block':'none';
  calculateAndShow(true);
}

function formatRM(v){ return isNaN(v) ? 'RM0.00' : 'RM'+v.toFixed(2); }

function calculateAndShow(silent=false){
  const sellingPrice = +document.getElementById('sellingPrice').value || 0;
  const qty = +document.getElementById('quantity').value || 1;
  const productCost = +document.getElementById('productCost').value || 0;
  const voucherValue = +document.getElementById('voucherValue').value || 0;
  const commissionRate = (+document.getElementById('commissionRate').value||0)/100;
  const transactionRate = (+document.getElementById('transactionRate').value||0)/100;
  const paymentRate = (+document.getElementById('paymentRate').value||0)/100;
  const platformFeePerOrder = +document.getElementById('platformFee').value || 0;
  const sstRate = (+document.getElementById('sstRate').value||0)/100;
  const freeShipJoined = document.getElementById('freeShipChk').checked;
  const sellerShipContribution = freeShipJoined ? (+document.getElementById('sellerShipContribution').value||0) : 0;
  const coinsJoined = document.getElementById('coinsChk').checked;
  const coinsRate = coinsJoined ? (+document.getElementById('coinsRate').value||0)/100 : 0;

  const netBase = Math.max(0, sellingPrice - voucherValue);
  const commissionFee = netBase * commissionRate;
  const transactionFee = sellingPrice * transactionRate;
  const paymentFee = sellingPrice * paymentRate;
  const platformFee = platformFeePerOrder;
  const coinsCost = sellingPrice * coinsRate;
  const shippingSubsidy = sellerShipContribution;
  const sstAmount = (commissionFee + transactionFee + paymentFee + platformFee) * sstRate;

  const totalShopeeCosts = commissionFee + transactionFee + paymentFee + platformFee + sstAmount + coinsCost + voucherValue + shippingSubsidy;
  const totalExpense = productCost + totalShopeeCosts;

  const grossRevenue = sellingPrice * qty;
  const netProfit = (sellingPrice - totalExpense) * qty;
  const margin = sellingPrice>0 ? ((sellingPrice - totalExpense)/sellingPrice*100) : 0;

  document.getElementById('grossRevenue').textContent = formatRM(grossRevenue);
  document.getElementById('voucherCost').textContent = formatRM(voucherValue);
  document.getElementById('commissionFee').textContent = formatRM(commissionFee);
  document.getElementById('transactionFee').textContent = formatRM(transactionFee);
  document.getElementById('paymentFee').textContent = formatRM(paymentFee);
  document.getElementById('platformFeeResult').textContent = formatRM(platformFee);
  document.getElementById('sstAmount').textContent = formatRM(sstAmount);
  document.getElementById('coinsCost').textContent = formatRM(coinsCost);
  document.getElementById('shipSubsidy').textContent = formatRM(shippingSubsidy);
  document.getElementById('totalShopeeCosts').textContent = formatRM(totalShopeeCosts);
  document.getElementById('productCostResult').textContent = formatRM(productCost);
  document.getElementById('totalExpense').textContent = formatRM(totalExpense);
  document.getElementById('netProfit').textContent = formatRM(netProfit/qty);
  document.getElementById('profitMargin').textContent = margin.toFixed(2)+'%';
}

function resetToDefaults(){
  document.getElementById('sellingPrice').value = 100;
  document.getElementById('quantity').value = 1;
  document.getElementById('productCost').value = 60;
  document.getElementById('voucherValue').value = 0;
  document.getElementById('transactionRate').value = 3.78;
  document.getElementById('paymentRate').value = 2.00;
  document.getElementById('platformFee').value = 0.50;
  document.getElementById('sstRate').value = 8.00;
  document.getElementById('freeShipChk').checked = false;
  document.getElementById('coinsChk').checked = false;
  document.getElementById('sellerShipContribution').value = 4.00;
  document.getElementById('coinsRate').value = 1.0;
  onCategoryChange();
  calculateAndShow(true);
}

populateCategories();
resetToDefaults();

['sellingPrice','productCost','voucherValue','quantity','commissionRate','transactionRate','paymentRate','platformFee','sstRate','sellerShipContribution','coinsRate']
.forEach(id=>{
  const el = document.getElementById(id);
  if(el) el.addEventListener('input', ()=> calculateAndShow(true));
});
