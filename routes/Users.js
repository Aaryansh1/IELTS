const express = require('express');
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { generateAccessTokens, createTokens} = require("./JWT")
const { sign,verify } = require("jsonwebtoken");

router.post("/", async (req, res) =>{
    const {email,username ,password,phonenumber} = req.body;
    const emailcheck = await Users.findOne({where:{ email:email }});
    const phoneno = await Users.findOne({where:{ phonenumber:phonenumber }});
    if (emailcheck) 
    {res.json({error:"User exist already"});
}
    else if 
    (phoneno) {res.json({error:"Number already exist already"});
}
    else
   { bcrypt.hash(password,10).then((hash)=>{
        Users.create({
            email: email,
            username: username,
            password: hash,
            phonenumber:phonenumber,
        }).then(()=>{
            res.json("User Registered");
        }).catch((err)=>{
            if(err){
                res.status(400).json({error: err});
            }
        })
    });}
})
router.post("/login",async(req,res) =>{
    const { email, password} = req.body;
    const user = await Users.findOne({where:{ email:email }});
    if (!user)res.status(400).json({error:"User does not exist"});
    bcrypt.compare( password, user.password).then((match)=>{
        if (!match){ 
        res.status(400).json({error:"Wrong password or User name"});
        }
        else {
            const refreshToken = createTokens(user);
            res.status(200).cookie("token", refreshToken,{
                maxAge: 100000000,
                httpOnly: true,
            }).json(true);
         
    }
});
})
router.get("/cookie",(req,res)=>{
    const RT = req.cookies["token"];
    const VT = verify(RT,"SmvxJDsB1JcY8sncN0Nn2bH4kJAZ3ZDHdSr3qgYiqL4ium5VVzcyIOi5sOE1123FEADcPberDhL4MPYpthQUcy")
    req.user = VT
res.cookie("token",RT,{maxAge:100000,httpOnly:true}).json({username:req.user.username,id:req.user.id})
})
router.get("/logout",(req,res)=>{
res.cookie("token","",{maxAge:1,httpOnly:true}).json({success:true})
})
router.post("/auth", (req,res) =>{
    const RT = req.cookies["token"];
    if(RT){
        const VT = verify(RT,"SmvxJDsB1JcY8sncN0Nn2bH4kJAZ3ZDHdSr3qgYiqL4ium5VVzcyIOi5sOE1123FEADcPberDhL4MPYpthQUcy")
        req.user = VT
            if(VT){  
                const refreshToken = createTokens(req.user);
                res.cookie("token", refreshToken,{
                    maxAge: 100000000,
                    httpOnly: true,
                });
               return res.status(200).json(req.user
                );
            }
                else{
                    console.log("error")
                     res.status(401).json("error")
                }
            }
            else{
            return res.status(401).json("User not logged in");
  }  })
router.put("/changepassword",async(req,res) =>{
    const {oldPassword, newPassword ,UserId} = req.body;
    console.log(UserId);
    const user = await Users.findOne({where:{ id:UserId }});
    bcrypt.compare( oldPassword, user.password).then((match)=>{
        if (!match){ 
       return res.status(400).json({error:"Wrong password"});
        }
            bcrypt.hash(newPassword,10).then(async(hash)=>{
            await Users.update ({password:hash},{where:{id:UserId}})
            return res.json("success");
        }) 
}) })
router.put("/changeusername",async(req,res) =>{
    const {oldPassword, username ,UserId} = req.body;
    console.log(UserId);
    const user = await Users.findOne({where:{ id:UserId }});
    bcrypt.compare( oldPassword, user.password).then(async(match)=>{
        if (!match){ 
       return res.status(400).json({error:"Wrong password"});
        }
        await Users.update ({username:username},{where:{id:UserId}})
        return res.json(username);
         
}) })


       
module.exports=router;