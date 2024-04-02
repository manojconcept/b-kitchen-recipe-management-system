import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const {jwtSecretKey} = process.env

//-------------------> no of rounds
const rounds = 10;

//---------> generating password
const genPassword = async (password) =>{
    const salt = await bcrypt.genSalt(rounds) 
    const hashedPassword = await bcrypt.hash(password,salt)
    return hashedPassword;
}

//------>compare password.
const compairePassword = async (password,storedPassword) =>{
    const isPasswordMatch = await bcrypt.compare(password,storedPassword);
    return isPasswordMatch
}

//Generating Tokens
//// unique should be an object***
const tokenGenerator = (unique,secretKey=jwtSecretKey) => jwt.sign(unique,secretKey); 
///verification
const tokenVerifier = (token,secretKey=jwtSecretKey) =>jwt.verify(token,secretKey)



export {
    genPassword,
    compairePassword,
    tokenGenerator,
    tokenVerifier
    
}