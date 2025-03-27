const { default: axios } = require("axios");

class currencyService {
    constructor() {
        this.rates = null;
        this.lastUpdated = null;
        this.API_KEY = '4a2aed6655950a4c74c8d67d';
        this.BASE_URL = 'https://v6.exchangerate-api.com/v6';
      }
      async initializeRates () {
        try{
            const response = await axios.get(`${this.BASE_URL}/${this.API_KEY}/latest/INR`)            
            this.rates = response.data.conversion_rates;
            this.lastUpdated = new Date();
            console.log('Exchange rates initialized successfully');
        }
        catch (error) {
          console.error("Error initializing rates:", error);
          throw error;
        }
      }
      converter(amount, sourceCurrency, targetCurrency){
        if(!this.rates){
            throw new Error('Exchange rates not initialized');
        }
        const sourceRate = this.rates[sourceCurrency];
        const targetRate = this.rates[targetCurrency];

        if(!sourceRate || !targetRate) {
            throw new Error('Invalid currency');
          }
          return (amount / sourceRate) * targetRate;
      }
}

module.exports = new currencyService(); 