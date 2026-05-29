import { useState } from 'react';

export default function TikTokCalculator() {
    // Inputs
    const [sellingPrice, setSellingPrice] = useState<number>(100);
    const [productCost, setProductCost] = useState<number>(40);
    const [quantity, setQuantity] = useState<number>(1);
    const [voucherValue, setVoucherValue] = useState<number>(0);
    const [buyerShippingFee, setBuyerShippingFee] = useState<number>(0);

    // Fees (editable) - Defaults based on 2024/2025 research
    const [commissionRate, setCommissionRate] = useState<number>(8.00); // Increased in 2024
    const [transactionRate, setTransactionRate] = useState<number>(3.78); // 3.78% (SST inclusive)
    const [affiliateRate, setAffiliateRate] = useState<number>(0); // Affiliate commission

    // Results
    const [results, setResults] = useState({
        grossRevenue: 0,
        voucherCost: 0,
        commissionFee: 0,
        transactionFee: 0,
        affiliateFee: 0,
        totalTikTokFees: 0,
        productCostTotal: 0,
        totalExpense: 0,
        netProfit: 0,
        profitMargin: 0,
    });

    const calculate = () => {
        const price = sellingPrice || 0;
        const cost = productCost || 0;
        const qty = quantity || 1;
        const voucher = voucherValue || 0;
        const shipping = buyerShippingFee || 0;

        const commRate = commissionRate / 100;
        const transRate = transactionRate / 100;
        const affRate = affiliateRate / 100;

        const grossRevenue = price * qty;

        // TikTok Commission is usually on (Price - Seller Discount)
        // Note: Some regions calculate on Price + Shipping, but usually Commission is on Item Price.
        // Transaction Fee is on (Price + Shipping - Seller Discount)

        const priceAfterVoucher = Math.max(0, price - voucher);

        const commissionFee = priceAfterVoucher * commRate * qty;

        // Transaction fee applies to the total amount paid by buyer (Price + Shipping - Voucher)
        // Assuming shipping is paid by buyer and part of the transaction sum
        const transactionBase = (priceAfterVoucher + shipping) * qty;
        const transactionFee = transactionBase * transRate;

        const affiliateFee = priceAfterVoucher * affRate * qty;

        const totalTikTokFees = commissionFee + transactionFee + affiliateFee;

        const productCostTotal = cost * qty;
        const totalExpense = totalTikTokFees + (voucher * qty) + productCostTotal;
        const netProfit = grossRevenue - totalExpense;
        const profitMargin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;

        setResults({
            grossRevenue,
            voucherCost: voucher * qty,
            commissionFee,
            transactionFee,
            affiliateFee,
            totalTikTokFees,
            productCostTotal,
            totalExpense,
            netProfit,
            profitMargin,
        });
    };

    const resetToDefaults = () => {
        setSellingPrice(100);
        setProductCost(40);
        setQuantity(1);
        setVoucherValue(0);
        setBuyerShippingFee(0);
        setCommissionRate(8.00);
        setTransactionRate(3.78);
        setAffiliateRate(0);
    };

    const formatCurrency = (val: number) => "RM" + val.toFixed(2);

    return (
        <div className="wrap tiktok-theme">
            {/* LEFT: Inputs */}
            <div className="card" style={{ borderTop: '4px solid #000' }}>
                <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#000' }}>TikTok Shop Calculator</span>
                </h1>
                <div className="sub">Malaysia — Fee structure (2024/2025). Default Transaction 3.78% (SST inc).</div>

                {/* Product details */}
                <div className="section">
                    <h3>Product details</h3>
                    <div className="grid-2">
                        <div>
                            <label>Selling price (RM)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={sellingPrice}
                                onChange={(e) => setSellingPrice(parseFloat(e.target.value))}
                            />
                        </div>
                        <div>
                            <label>Cost price (RM)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={productCost}
                                onChange={(e) => setProductCost(parseFloat(e.target.value))}
                            />
                        </div>
                    </div>
                    <div style={{ marginTop: '8px' }}>
                        <label>Quantity</label>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                        />
                    </div>
                </div>

                {/* Program participation */}
                <div className="section">
                    <h3>Discounts & Shipping</h3>
                    <div className="grid-2">
                        <div>
                            <label>Seller Voucher (RM)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={voucherValue}
                                onChange={(e) => setVoucherValue(parseFloat(e.target.value))}
                            />
                        </div>
                        <div>
                            <label>Buyer Shipping Paid (RM)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={buyerShippingFee}
                                onChange={(e) => setBuyerShippingFee(parseFloat(e.target.value))}
                            />
                        </div>
                    </div>
                </div>

                {/* TikTok fees */}
                <div className="section">
                    <h3>TikTok Shop Fees</h3>
                    <div className="grid-2">
                        <div>
                            <label>Commission Rate (%)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={commissionRate}
                                onChange={(e) => setCommissionRate(parseFloat(e.target.value))}
                            />
                        </div>
                        <div>
                            <label>Transaction Fee (%)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={transactionRate}
                                onChange={(e) => setTransactionRate(parseFloat(e.target.value))}
                            />
                        </div>
                    </div>
                    <div style={{ marginTop: '8px' }}>
                        <label>Affiliate Commission (%)</label>
                        <input
                            type="number"
                            step="0.01"
                            value={affiliateRate}
                            onChange={(e) => setAffiliateRate(parseFloat(e.target.value))}
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="section" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <button className="primary" onClick={calculate}>Calculate</button>
                    <button className="ghost" onClick={resetToDefaults}>Reset</button>
                </div>
            </div>

            {/* RIGHT: Results */}
            <div className="card" style={{ borderTop: '4px solid #ff0050' }}>
                <h3>Result — Breakdown</h3>
                <div className="results">
                    <div className="result-line"><div className="muted">Gross revenue</div><div>{formatCurrency(results.grossRevenue)}</div></div>
                    <div className="result-line"><div className="muted">Seller voucher cost</div><div>{formatCurrency(results.voucherCost)}</div></div>

                    <div className="result-line"><div className="muted">Commission Fee</div><div>{formatCurrency(results.commissionFee)}</div></div>
                    <div className="result-line"><div className="muted">Transaction Fee</div><div>{formatCurrency(results.transactionFee)}</div></div>
                    <div className="result-line"><div className="muted">Affiliate Fee</div><div>{formatCurrency(results.affiliateFee)}</div></div>

                    <div className="result-line total danger"><div>Total TikTok Fees</div><div>{formatCurrency(results.totalTikTokFees)}</div></div>
                    <div className="result-line danger"><div>Product Cost</div><div>{formatCurrency(results.productCostTotal)}</div></div>
                    <div className="result-line total danger"><div>Total Expenses</div><div>{formatCurrency(results.totalExpense)}</div></div>

                    <div className="result-line" style={{ marginTop: '10px', padding: '10px', background: '#f9f9f9', borderRadius: '8px' }}>
                        <div style={{ fontWeight: 700 }}>Net Profit</div>
                        <div className={`big ${results.netProfit >= 0 ? 'green' : 'red'}`}>{formatCurrency(results.netProfit)}</div>
                    </div>
                    <div className="result-line"><div>Profit Margin</div><div>{results.profitMargin.toFixed(2)}%</div></div>
                </div>
            </div>
        </div>
    )
}
