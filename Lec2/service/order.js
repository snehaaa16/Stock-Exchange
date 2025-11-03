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

    //public function

    /*
        1. create new order{orderId,side,type,price?,originalQuantity,remainingQuantity,remainingQuantity,timestamp,user}
        2. match type if type==market, call marketMatch, else call limit_match
   */
    placeOrder(symbol,side,type,price=null,quantity,user){
        let order={
            orderId:this._genOrderId,
            symbol:this.symbol,
            side:side,
            type:type,
            price:price,
            orignQty:quantity,
            remainQty:quantity,
            exectQty:0,
            timeStamp:Date.now(),
            user:user
        }
        let trades=[]
        if(type==="MARKET"){
            let result=this._marketMatch(order,trades);
            if(result.remainQty>0){
                console.log("order completed"+result.exectQty+" " + "order cancelled " +result.remainQty);
            }
        }else{
            this._limitMatch();
        }
    }
    //execute order if it is a market order
    /*
    bids : [] sorted descending,
    asks : [] sorted ascending
    1. type : buy || sell
    2. if buy start buying from asks array starting from index 0. 
    loop while order.remainingqty > 0 && ans.length
    buy min(order.remainingQty, asks[0].remainingQty)
    update remianingQty and executedQty from both sides  
    */
    _marketMatch(){
        if(order.side=="BUY"){
            let asksArray=this.ask
            while(order.remainQty>0 && asksArray.length>0){
                let top=asksArray[0] //kyuki top se buy krna start krna hai 
                let orderfill=Math.min(order.remainingQty,top.remainQty);
                order.exectQty=order.exectQty+orderfill
                order.remainQty=order.remainQty-orderfill
                top.exectQty=top.exectQty+orderfill
                top.remainQty=top.remainQty-orderfill

                if(top.remainQty<=0){
                    asksArray.shift() // array k first element ko delete krdega
                }
            }
        }
        return order
    }

    _limitMatch(order){
        if(order.side==="BUY"){
            let opposite=this.ask;
            while(order.remainingQty>0 && opposite.length>0){
                let top=opposite[0];
                if(order.price>=top.price){
                    let filledOrder=Math.min(order.remainingQty,top.remainingQty);

                    order.remainingQty-=filledOrder;
                    order.exectQty+=filledOrder;

                    top.remainingQty-=filledOrder;
                    top.exectQty+=filledOrder;

                    if(top.remainingQty<=0){
                        opposite.shift();
                    }
                }
            }
            if(order.remainingQty>0){
                this.bids.push(order);
                this._sort("BUY");
            }
        }else{
            let opposite=this.buy
            while(order.remainingQty>0 && opposite.length>0){
                let top=opposite[0];
                if(order.price>=top.price){
                    let filledOrder=Math.min(order.remainingQty,top.remainingQty);

                    order.remainingQty-=filledOrder;
                    order.exectQty+=filledOrder;

                    top.remainingQty-=filledOrder;
                    top.exectQty+=filledOrder;
                    if(top.remainingQty<=0){
                        opposite.shift();
                    }
                }
            }
        }
    }

    getBookSnapShot(){
        return{
            lastUpdated:Date.now(),
            bids: this.bids.map((o)=>[o.price,o.remainQty]),
            ask: this.ask.map((o)=>[o.price,o.remainQty])
        }
    }
}

//if a function or varibale start with _ (toh dusra developer smjh jaega isse private rkhna hai)
let BTCUSDorderBook=new OrderBook()

BTCUSDorderBook.placeOrder("BUY","LIMIT","1506.00",10,"sneha")
BTCUSDorderBook.placeOrder("BUY","LIMIT","1505.00",10,"mansha")
BTCUSDorderBook.placeOrder("BUY","LIMIT","1509.00",10,"suneha")














// BTCUSDorderBook.bids.push({orderId:2,side:"BUY",type:"MARKET",price:100,quantity:10,timestamp:Date.now(),user:"Sneha"})

// BTCUSDorderBook.bids.push({orderId:2,side:"BUY",type:"LIMIT",price:99,quantity:10,timestamp:Date.now(),user:"Suneha"})

// BTCUSDorderBook.bids.push({orderId:2,side:"BUY",type:"MARKET",price:98,quantity:10,timestamp:Date.now(),user:"Vanshika"})


// // BTCUSDorderBook._sort("BUY") // ye descending mai sort krke print krega 
// // console.log(BTCUSDorderBook.bids);

// // console.log("-----------------------------------------------");

// BTCUSDorderBook.ask.push({orderId:2,side:"BUY",type:"MARKET",price:100,quantity:10,timestamp:Date.now(),user:"Sneha1"})

// BTCUSDorderBook.ask.push({orderId:2,side:"BUY",type:"LIMIT",price:99,quantity:10,timestamp:Date.now(),user:"Suneha2"})

// BTCUSDorderBook.ask.push({orderId:2,side:"BUY",type:"MARKET",price:98,quantity:10,timestamp:Date.now(),user:"Vanshika3"})

// // BTCUSDorderBook._sort("SELL") // ye ascending mai sort krega 
// // console.log(BTCUSDorderBook.ask);

// BTCUSDorderBook.placeOrder("BUY","MARKET",null,10,"sneha")
// console.log(BTCUSDorderBook.getBookSnapShot());