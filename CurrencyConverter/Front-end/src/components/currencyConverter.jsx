import React, { useEffect, useState } from "react";
import AmountInput from "./AmountInput";
import CurrencySelect from "./CurrencySelect";
import ConversionResult from "./ConversionResult";

const currencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [sourceCurrency, setSourceCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("INR"); 
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!amount || !sourceCurrency || !targetCurrency) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          sourceCurrency,
          targetCurrency,
        }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (amount) {
        handleConvert();
      }
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [amount, sourceCurrency, targetCurrency]);

  return (
    <>
      <AmountInput amount={amount} onChange={setAmount} />
      <CurrencySelect
        label="From"
        value={sourceCurrency}
        onChange={setSourceCurrency}
      />
      <CurrencySelect
        label="To"
        value={targetCurrency}
        onChange={setTargetCurrency}
      />
      {loading ? (
          <div className="flex justify-center mt-5">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <ConversionResult result={result} />
        )}    
    </>
  );
};

export default currencyConverter;
