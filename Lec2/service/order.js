class OrderBook{
    constructor(symbol="BTCUSD",){
        this.symbol=symbol,
        this.bids=[],
        this.ask=[],
        this._nextId=1,//agli order id ki id generate krne k liye 
        this.lastTradePrice=null // ye null isslie hai kyuki koi bnte thodi khareedlega isslie null initial mai 
    }
    //helper function
    _generateOrderId(){
        return this._nextId++; // ye id increament krega 
    }

    //sort hum bids and ask ko krenge[inko sides khte hai]
    _sort(sides){
        if(sides==="BUY"){
            this.bids.sort((a,b)=>{ // a,b objects hai bids k 
                if(a.price!=b.price){
                    return b.price-a.price
                }
                return a.timestamp-b.timestamp; // jo phle ayega agr unka bid same hai toh 
            }) 
        }else{
            //agr side =ask hai toh ascending order mai sort krenge 
            this.ask.sort((a,b)=>{
                if(a.price!=b.price){
                    return a.price-b.price
                }
                return a.timestamp-b.timestamp
            })
        }
    }
}

//if a function or varibale start with _ (toh dusra developer smjh jaega isse private rkhna hai)
// let orderbook=new OrderBook("BTCUSD")
let BTCUSDorderBook=new OrderBook()
// BTCUSDorderBook.bids.push({orderId:2,side:"BUY",type:"MARKET",price:100,quantity:10,timestamp:Date.now(),user:"Sneha"})

// BTCUSDorderBook.bids.push({orderId:2,side:"BUY",type:"LIMIT",price:99,quantity:10,timestamp:Date.now(),user:"Suneha"})

// BTCUSDorderBook.bids.push({orderId:2,side:"BUY",type:"MARKET",price:98,quantity:10,timestamp:Date.now(),user:"Vanshika"})


// BTCUSDorderBook._sort("BUY")
// console.log(BTCUSDorderBook.bids);

console.log("-----------------------------------------------");

BTCUSDorderBook.ask.push({orderId:2,side:"BUY",type:"MARKET",price:100,quantity:10,timestamp:Date.now(),user:"Sneha1"})

BTCUSDorderBook.ask.push({orderId:2,side:"BUY",type:"LIMIT",price:99,quantity:10,timestamp:Date.now(),user:"Suneha2"})

BTCUSDorderBook.ask.push({orderId:2,side:"BUY",type:"MARKET",price:98,quantity:10,timestamp:Date.now(),user:"Vanshika3"})

BTCUSDorderBook._sort("SELL")
console.log(BTCUSDorderBook.ask);
