//1
let {createClient}=require("redis");
let client=createClient();

//3
 async function notify_me(){
    await client.subscribe("notify_me",(message)=>{console.log(message)})
}

//.connect function ek promise return krta hai 

setTimeout(()=>{
    notify_me();
},2000);
//2
client.connect()
.then(()=> console.log("redis connected"))