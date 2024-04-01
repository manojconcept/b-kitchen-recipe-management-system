import bcrypt from "bcrypt"

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


export {
    genPassword,
    compairePassword,
}