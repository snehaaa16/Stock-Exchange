//1
let {createClient}=require("redis");
let client=createClient();

//3
 async function notify(){
    await client.publish("notify_me",JSON.stringify({event_id:1,message:"iphone back in stock",email:"snehagaba233@gmail.com"}))
}

//.connect function ek promise return krta hai 


//4. ye settimeout isslie rkha ki phle connect hohje uske badh notify hoye alternate ye ki notify function mai phle connect ko call krde connect hone k badh notify hoye 
setTimeout(()=>{
    notify();
},2000);
//2
client.connect()
.then(()=> console.log("redis connected"))