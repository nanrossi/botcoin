require("dotenv-safe").load();

const {MercadoBitcoin} = require("./api/monitoring");
const {MercadoBitcoinTrade} = require("./api/trade");
const {Utils} = require("./utils/quantity");

var infoApi = new MercadoBitcoin({ currency: 'BTC' });
var tradeApi = new MercadoBitcoinTrade({ 
    currency: 'BTC', 
    key: process.env.KEY, 
    secret: process.env.SECRET, 
    pin: process.env.PIN 
});

setInterval(() => 
   infoApi.ticker((response) => {
       console.log(response.ticker);
    //    if(response.ticker.sell <= 50000) {
    //         Utils.getQuantity('BRL', response.ticker.sell, true, (qty) => {
    //             tradeApi.placeBuyOrder(qty, response.ticker.sell, 
    //                 (data) => {
    //                     console.log('Ordem de compra inserida no livro. ' + data);
    //                     //operando em STOP
    //                     tradeApi.placeSellOrder(data.quantity, response.ticker.sell * parseFloat(process.env.PROFITABILITY), 
    //                         (data) => console.log('Ordem de venda inserida no livro. ' + data),
    //                         (data) => console.log('Erro ao inserir ordem de venda no livro. ' + data))
    //                 },
    //                 (data) => console.log('Erro ao inserir ordem de compra no livro. ' + data))
    //         })
    //     }
    //     else {
    //         console.log('Ainda muito alto, vamos esperar pra comprar depois.')
    //     }
   }),
   process.env.CRAWLER_INTERVAL
)