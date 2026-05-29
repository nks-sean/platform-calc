import { useState } from 'react';

export function useShopeeCalculator() {
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

    return {
        state: {
            sellingPrice,
            productCost,
            quantity,
            voucherValue,
            buyerShippingFee,
            commissionRate,
            transactionRate,
            serviceFeeRate,
            platformFee,
            sstRate,
            results
        },
        actions: {
            setSellingPrice,
            setProductCost,
            setQuantity,
            setVoucherValue,
            setBuyerShippingFee,
            setCommissionRate,
            setTransactionRate,
            setServiceFeeRate,
            setPlatformFee,
            setSstRate,
            calculate,
            resetToDefaults
        }
    };
}
