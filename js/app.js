var app = new Vue({
    el: '#app',
    data: {
        personalInformations: {
            capital:500,
            risk: 0.5
        },
        stopLoss:'',
        allPrices: '',
        selectedPaire: '',
        paires : [
            {
                name :"ETHUSDT",
                value : ''
            },
            {
                name :"SOLUSDT",
                value : ''
            },
            {
                name :"DOGEUSDT",
                value : ''
            },
            {
                name :"ADAUSDT",
                value : ''
            },
            {
                name :"MATICUSDT",
                value : ''
            },
            {
                name :"ATOMUSDT",
                value : ''
            },
            {
                name :"LTCUSDT",
                value : ''
            },
            {
                name :"AVAXUSDT",
                value : ''
            },
            {
                name :"FTMUSDT",
                value : ''
            },
            {
                name :"DOTUSDT",
                value : ''
            },
            {
                name :"APEUSDT",
                value : ''
            },
            {
                name :"AXSUSDT",
                value : ''
            },
            {
                name :"BNBUSDT",
                value : ''
            },
            {
                name :"XRPUSDT",
                value : ''
            },
            {
                name :"NEARUSDT",
                value : ''
            },
            {
                name :"LINKUSDT",
                value : ''
            },
            {
                name :"SANDUSDT",
                value : ''
            },
            {
                name :"OPUSDT",
                value : ''
            },
            {
                name :"DYDXUSDT",
                value : ''
            },
            {
                name :"THETAUSDT",
                value : ''
            },
            {
                name :"CHZUSDT",
                value : ''
            }
        ]
    },
    //when the page is loaded
    created: function () {
        this.getDatas();
    },
    mounted() {
        setInterval(() => {
            this.getDatas();
        }, 5000);
        if (this.paires.length > 0) {
            this.selectedPaire = this.paires[0].name;
            getSelectedPrice(this.selectedPaire)
          }
    },
    methods: {
        getDatas: function(){
            axios.get('https://api.bybit.com/v2/public/tickers?')
                .then (response  => {
                    this.allPrices = response.data
                }
            );
        },
        getSelectedPrice: function(){
            for (const item of this.allPrices.result) {
                if (item.symbol.includes(this.selectedPaire)) {
                  return item.last_price;
                }
              }
        },
        getAmountToRisk: function(){
            return (this.personalInformations.capital * this.personalInformations.risk / 100)
        },
        quantityToInvest: function(){
            return (
                this.getAmountToRisk() / ( Math.max(this.getSelectedPrice(),this.stopLoss) - Math.min(this.getSelectedPrice(),this.stopLoss))
            )
        }
    },
});
