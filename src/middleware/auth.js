import { tokenVerifier } from "../config/authUtils.js";

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        tokenVerifier(token)
        next();
    }catch(error){
        res.send({error:error.message})
    }
    
}

export { auth };
