import { useState } from 'react';

export default function ShopeeCalculator() {
    // Inputs
    const [sellingPrice, setSellingPrice] = useState<number>(100);
    const [productCost, setProductCost] = useState<number>(60);
    const [quantity, setQuantity] = useState<number>(1);
    const [voucherValue, setVoucherValue] = useState<number>(0);
    const [buyerShippingFee, setBuyerShippingFee] = useState<number>(0);

    // Fees (editable)
    const [commissionRate, setCommissionRate] = useState<number>(8.00);
    const [transactionRate, setTransactionRate] = useState<number>(3.5);
    const [serviceFeeRate, setServiceFeeRate] = useState<number>(0);
    const [platformFee, setPlatformFee] = useState<number>(0.50);
    const [sstRate, setSstRate] = useState<number>(8.00);

    // Results
    const [results, setResults] = useState({
        grossRevenue: 0,
        voucherCost: 0,
        commissionFee: 0,
        transactionFee: 0,
        serviceFee: 0,
        platformFeeTotal: 0,
        sstAmount: 0,
        totalShopeeFees: 0,
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
        const servRate = serviceFeeRate / 100;
        const sst = sstRate / 100;

        const grossRevenue = price * qty;

        const commissionFee = Math.max(0, grossRevenue - voucher) * commRate;
        const transactionFee = Math.max(0, grossRevenue - voucher + shipping) * transRate;
        const serviceFee = Math.max(0, grossRevenue - voucher) * servRate;
        const platformFeeTotal = platformFee * qty;

        const subtotalShopeeFeesBeforeSST = commissionFee + transactionFee + serviceFee + platformFeeTotal;
        const sstAmount = subtotalShopeeFeesBeforeSST * sst;
        const totalShopeeFees = subtotalShopeeFeesBeforeSST + sstAmount;

        const productCostTotal = cost * qty;
        const totalExpense = totalShopeeFees + voucher + productCostTotal;
        const netProfit = grossRevenue - totalExpense;
        const profitMargin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;

        setResults({
            grossRevenue,
            voucherCost: voucher,
            commissionFee,
            transactionFee,
            serviceFee,
            platformFeeTotal,
            sstAmount,
            totalShopeeFees,
            productCostTotal,
            totalExpense,
            netProfit,
            profitMargin,
        });
    };

    const resetToDefaults = () => {
        setSellingPrice(100);
        setProductCost(60);
        setQuantity(1);
        setVoucherValue(0);
        setBuyerShippingFee(0);
        setCommissionRate(8.0);
        setTransactionRate(3.5);
        setServiceFeeRate(0.0);
        setPlatformFee(0.50);
        setSstRate(8.0);
    };

    const formatCurrency = (val: number) => "RM" + val.toFixed(2);

    return (
        <div className="wrap">
            {/* LEFT: Inputs */}
            <div className="card">
                <h1>Shopee Profit Calculator</h1>
                <div className="sub">Malaysia — includes SST (8%) on Shopee fees. Official fee structure (2025).</div>

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
                    <h3>Seller promotion</h3>
                    <label>Seller voucher given (RM)</label>
                    <input
                        type="number"
                        step="0.01"
                        value={voucherValue}
                        onChange={(e) => setVoucherValue(parseFloat(e.target.value))}
                    />

                    <div className="form-group" style={{ marginTop: '8px' }}>
                        <label>Shipping Fee Paid by Buyer (RM)</label>
                        <input
                            type="number"
                            placeholder="e.g. 5.00"
                            step="0.01"
                            value={buyerShippingFee}
                            onChange={(e) => setBuyerShippingFee(parseFloat(e.target.value))}
                        />
                    </div>
                </div>

                {/* Shopee fees */}
                <div className="section">
                    <h3>Shopee fees (editable)</h3>
                    <div className="grid-2">
                        <div>
                            <label>Commission rate (%)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={commissionRate}
                                onChange={(e) => setCommissionRate(parseFloat(e.target.value))}
                            />
                        </div>
                        <div>
                            <label>Transaction fee rate (%)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={transactionRate}
                                onChange={(e) => setTransactionRate(parseFloat(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="grid-2" style={{ marginTop: '8px' }}>
                        <div>
                            <label>Shopee service fee (%)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={serviceFeeRate}
                                onChange={(e) => setServiceFeeRate(parseFloat(e.target.value))}
                            />
                        </div>
                        <div>
                            <label>Platform support fee (RM)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={platformFee}
                                onChange={(e) => setPlatformFee(parseFloat(e.target.value))}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '8px' }}>
                        <label>SST rate (%)</label>
                        <input
                            type="number"
                            step="0.01"
                            value={sstRate}
                            onChange={(e) => setSstRate(parseFloat(e.target.value))}
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="section" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <button className="primary" onClick={calculate}>Calculate / Refresh</button>
                    <button className="ghost" onClick={resetToDefaults}>Reset</button>
                </div>
            </div>

            {/* RIGHT: Results */}
            <div className="card">
                <h3>Result — breakdown</h3>
                <div className="results">
                    <div className="result-line"><div className="muted">Gross revenue</div><div>{formatCurrency(results.grossRevenue)}</div></div>
                    <div className="result-line"><div className="muted">Seller voucher</div><div>{formatCurrency(results.voucherCost)}</div></div>
                    <div className="result-line"><div className="muted">Commission</div><div>{formatCurrency(results.commissionFee)}</div></div>
                    <div className="result-line"><div className="muted">Transaction fee</div><div>{formatCurrency(results.transactionFee)}</div></div>
                    <div className="result-line"><div className="muted">Shopee service fee</div><div>{formatCurrency(results.serviceFee)}</div></div>
                    <div className="result-line"><div className="muted">Platform support fee</div><div>{formatCurrency(results.platformFeeTotal)}</div></div>
                    <div className="result-line"><div className="muted">SST on Shopee fees</div><div>{formatCurrency(results.sstAmount)}</div></div>

                    <div className="result-line total danger"><div>Total Shopee & program costs</div><div>{formatCurrency(results.totalShopeeFees)}</div></div>
                    <div className="result-line danger"><div>Product cost</div><div>{formatCurrency(results.productCostTotal)}</div></div>
                    <div className="result-line total danger"><div>Total expenses</div><div>{formatCurrency(results.totalExpense)}</div></div>

                    <div className="result-line">
                        <div>Net profit</div>
                        <div className={`big ${results.netProfit >= 0 ? 'green' : 'red'}`}>{formatCurrency(results.netProfit)}</div>
                    </div>
                    <div className="result-line"><div>Profit margin</div><div>{results.profitMargin.toFixed(2)}%</div></div>
                </div>
            </div>
        </div>
    )
}
