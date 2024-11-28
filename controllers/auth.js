const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')


exports.register = async(req,res)=>{
    try{
        const { email, password} = req.body
        //valiable
        if(!email){
            return res.status(400).json({ message : "Email undefined!!"})
        }
        if(!password){
            return req.status(400).json({ message : "Password undefined!!"})
        }
        
        //Check Email in DB already
        const user = await prisma.user.findFirst({
            where:{
                email: email
            }
        })
        if(user){
            return res.status(400).json({ message : "Email Already Exits!"})
        }

        //step 3 HashPassword
        const hashPassword = await bcrypt.hash(password,10)
        //step 4 Register
        await prisma.user.create({
            data:{
                email : email,
                password : hashPassword
            }
        })

        res.send('Hello Register Success!')
    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.login = async(req,res)=>{
    try{
        const { email, password} = req.body

        // step 1 CheckEmail
        const user = await prisma.user.findFirst({
            where:{
                email : email
            }
        })
        if(!user || !user.enable){
            return req.status(400).json({ message : "User not Found or Not Enabled"})
        }
        // step 2 Check Password
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(500).json({ message : 'Password Invalid!!!'})
        }
        // step 3 Create Payload
        const payload = {
            id : user.id,
            email : user.email,
            role : user.role
        }
        // step 4 Generate Token
        jwt.sign(payload,process.env.SECRET,
            { expiresIn:'1d' },(err,token)=>{
                if(err){
                    return req.status(500).json({ message : "server error"})
                }
                res.json({ payload, token})
            })
            
    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.currentUser = async(req,res)=>{
    try{
        res.send('Hello Current User')
    }catch(err){
        console.log(err)
        req.status(500).json({ message: 'Server Error'})
    }
}