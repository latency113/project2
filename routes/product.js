const express = require('express')
const router = express.Router()
const { create,list,update,remove,listby,searchfilter } = require("../controllers/product")

router.post('/product',create)
router.get('/products:count',list)
router.put('/product:id', update)
router.delete('/product:id',remove)
router.post('/productBy',listby)
router.post('/search/filters',searchfilter)



module.exports = router