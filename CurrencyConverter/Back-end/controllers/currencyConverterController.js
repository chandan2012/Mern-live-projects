const currencyConverter = require("../services/currencyConverter");

exports.convertCurrency = async (req, res, next) => {
    try {
        const {amount, sourceCurrency, targetCurrency} = req.body;        
         if (!amount || !sourceCurrency || !targetCurrency) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const convertedAmount =  currencyConverter.convertCurrency(
            parseFloat(amount),
            sourceCurrency.toUpperCase(),
            targetCurrency.toUpperCase()
        );
        
        res.status(200).json({ 
            success: true,
            result: {
                amount: parseFloat(amount),
                sourceCurrency,
                targetCurrency,
                convertedAmount: Number(convertedAmount.toFixed(2))
            } });
    }
    catch (error) {
        next(error);
    }
}

