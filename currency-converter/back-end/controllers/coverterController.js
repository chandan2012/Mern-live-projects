const currencyConverter = require("../service/currencyService")

exports.convert = async (req, res, next) => {
    try{
        const {amount, sourceCurrency, targetCurrency} = req.body;
        console.log(req.body)

        if(!amount || !sourceCurrency || !targetCurrency){
            return res.status(400).json({ message: "Missing required fields" });
        }

        const finalAmout = currencyConverter.converter(
            parseFloat(amount),
            sourceCurrency.toUpperCase(),
            targetCurrency.toUpperCase()
        )
        res.status(200).json({
            success: true,
            result: {
                amount: parseFloat(amount),
                sourceCurrency,
                targetCurrency,
                finalAmout: Number(finalAmout.toFixed(2))
            }
        })
    }
    catch(err){
        next(err)
    }
}