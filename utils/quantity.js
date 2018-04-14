class Utils {
    static getQuantity(coin, price, isBuy, callback) {
        price = parseFloat(price);
        coin = isBuy ? 'brl' : coin.toLowerCase();
    
        tradeApi.getAccountInfo((response_data) => {
            var balance = parseFloat(response_data.balance[coin].available).toFixed(5);
            balance = parseFloat(balance);
            
            if(isBuy && balance < 50) {
                return console.log('Sem saldo disponível para comprar!');
            }
            console.log(`Saldo disponível de ${coin}: ${balance}`);
            
            if(isBuy) {
                balance = parseFloat((balance / price).toFixed(5));
            } 

            callback(parseFloat(balance) - 0.00001); //tira a diferença que se ganha no arredondamento
        }, 
        (data) => console.log(data));
    }
}

module.exports = {Utils}