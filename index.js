const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv =require('dotenv').config();
const cors= require('cors')
const UserModel=require("./models/userModel");
const bcrypt=require('bcrypt');
app.use(express.json());
app.use(cors())
app.get('/',(req,res)=>{
    res.send('Welcome to my API');
});
app.post("/signin",async(req,res)=>{
    const password=req.body.password;
    
    const username=req.body.username;
    UserModel.findOne({username:username})
    .then((user)=>{
        if(user){
           bcrypt.compare(password,user.password,function(err,result){
            
                if(result){
                    res.send({message:"Login Successfull"});
                    }
                    else{
                        res.status(400).send({message:"Invalid Credentials"});
                        }
         });
            }else{
                res.json({message:"User Not Found"});
                }
                });

});

app.post("/signup",async(req,res)=>{
    try {
        const password=req.body.password;
        const hashedPassword=await bcrypt.hash(password,10);
        req.body.password=hashedPassword;
        const newUser = await UserModel.create(req.body);
        res.status(201).send("User created successfully");
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})
mongoose.connect(`mongodb+srv://${process.env.MongoDB_Username}:${process.env.MongoDB_Password}@cluster0.5fqpmdr.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{
    console.log('Connected to MongoDB');
}).catch(()=>{
    console.log('Error connecting to MongoDB');
})
app.listen(3000,()=>{
console.log('http://localhost:3000');
})

app.delete('/user/:id',async(req,res)=>{
    try{
        const deleteUser=await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).send("User deleted successfully");
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
    
});
app.put('/user/:id',async(req,res)=>{
    try{
        const password=req.body.password;
        const hashedPassword=await bcrypt.hash(password,10);
        req.body.password=hashedPassword;
        const updateUser=await UserModel.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).send("User updated successfully");
        }
        catch(error){
    res.status(400).json({message:error.message})
        }
})
