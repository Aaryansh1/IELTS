const { sign, verify } = require("jsonwebtoken");
const generateAccessTokens = (user) => {
    const accessToken = sign({
        email:user.email , id:user.id , username:user.username
    },
    "SmvxJDsB1JcY8sncN0Nn2bH4kJAZ3ZDHdSr3qgYiqL4ium5VVzcyIOi5sOEcIcPberDhL4MPYpthQUcy"
    );
    return accessToken;
  
};

const createTokens =(user)=>{
    const refreshToken = sign({
        email:user.email , id:user.id , username:user.username
    },
    "SmvxJDsB1JcY8sncN0Nn2bH4kJAZ3ZDHdSr3qgYiqL4ium5VVzcyIOi5sOE1123FEADcPberDhL4MPYpthQUcy"
    );
    return refreshToken;
}
const validateRefreshToken = (req , res , next)=>{
    const refreshToken = req.cookies["token"];
    if(!refreshToken)
    return res.status(400).json({error: "User not Authenticated"});
    try{
        const validToken = verify(refreshToken,"SmvxJDsB1JcY8sncN0Nn2bH4kJAZ3ZDHdSr3qgYiqL4ium5VVzcyIOi5sOE1123FEADcPberDhL4MPYpthQUcy")
        req.user = validToken
        if (validToken){
            createTokens(req.user);
            generateAccessTokens(req.user);
            return next();
        }}
        catch(err){
            return res.status(400).json({error:err});
        }
}
const validateToken = (req, res, next) =>{
 
    const accessToken = req.body.accessToken;
    if(!accessToken)
    return res.status(400).json({error: "User not Authenticated"});
       try{
        const validToken = verify(accessToken,"SmvxJDsB1JcY8sncN0Nn2bH4kJAZ3ZDHdSr3qgYiqL4ium5VVzcyIOi5sOEcIcPberDhL4MPYpthQUcy")
        req.user = validToken;
        if (validToken){
            req.authenticated = true;
            return next();
        }}
        catch(err){
            validateRefreshToken();
            return res.status(400).json({error:err});
        }
};


module.exports = { generateAccessTokens, createTokens };