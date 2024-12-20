const express = require('express')
const router = express.Router()
const { create, list, read,remove, update, listby, searchFilter } = require("../controllers/product")

router.post('/product',create)
router.get('/products/:count',list)
router.put('/product/:id', update)
router.get('/product/:id', read)
router.delete('/product/:id',remove)
router.post('/productBy',listby)
router.post('/search/filters',searchFilter)



module.exports = router