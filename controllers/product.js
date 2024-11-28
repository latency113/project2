const prisma = require("../config/prisma")

exports.create = async(req,res)=>{
    try{
        const { title, description,price,quantity,categoryId,images } = req.body
        const product = await prisma.product.create({
            data:{
                title: title,
                description: description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId : parseInt(categoryId),
                images:{
                    create: images.map((item)=> ({
                       asset_id: item.asset_id,
                       public_id: item.public_id,
                       url: item.url_id,
                       secure_url: item.secure_url
                    }))
                }
            }
        })
        res.send(product)
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server Error"})
    }
}

exports.list = async(req,res)=>{
    try{
        const {count} = req.params
        const products = await prisma.product.findMany({
            take: parseInt(count),
            orderBy:{ createdAt: "desc"},
            include:{
                category:true,
                images:true
            }
        })
        res.send(products)
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server Error"})
    }
}

exports.update = async(req,res)=>{
    try{

        res.send("Hello Update Product")
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server Error"})
    }
}

exports.remove = async(req,res)=>{
    try{
        const { id } = req.params
        await prisma.product.delete({
            where : {
                id: Number(id)
            }
        })
        res.send("deleted Success")
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server Error"})
    }
}

exports.listby = async(req,res)=>{
    try{

        res.send("Hello listby Product")
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server Error"})
    }
}

exports.searchfilter = async(req,res)=>{
    try{

        res.send("Hello searchfilter Product")
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server Error"})
    }
}