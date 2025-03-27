import { useEffect, useState } from "react";
import AmountInput from "./AmountInput";
import CurrencySelect from "./CurrencySelect";
import ConversionResult from "./ConversionResult";

// Define the type for the conversion result
interface ConversionResultType {
  amount: number;
  sourceCurrency: string;
  targetCurrency: string;
  finalAmout: number;
}

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [sourceCurrency, setSourceCurrency] = useState<string>("USD");
  const [targetCurrency, setTargetCurrency] = useState<string>("INR");  
  const [result, setResult] = useState<ConversionResultType | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    if (!amount || amount <= 0 || !sourceCurrency || !targetCurrency) {
      setError("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, sourceCurrency, targetCurrency }),
      });

      if (!response.ok) {
        throw new Error(`Conversion failed: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.result) throw new Error("Invalid response from server");

      setResult(data.result);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (amount) {
        handleConvert();
      }
    }, 500); // Debounce API call by 500ms

    return () => clearTimeout(timeoutId);
  }, [amount, sourceCurrency, targetCurrency]);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 m-4">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Currency Exchange
      </h2>

      <div className="space-y-6">
        <AmountInput amount={amount} onChange={setAmount} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <ConversionResult result={result} />
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
