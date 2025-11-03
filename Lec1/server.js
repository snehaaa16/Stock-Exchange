const express=require("express")
const app=express();
app.get("/",(req,res)=>{
    res.send("Server initialized");
})
app.listen(3000,()=>{
    console.log("Server listen on port 3000");
})