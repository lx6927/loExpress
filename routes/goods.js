var express = require('express');
var router = express.Router();
const myQuery = require('../db')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('goods');
});


// 全部商品
router.get('/getGoodsList', function(req, res, next) {
    let user_id=req.params.id;
    console.log(req)
    res.send('goods');
});


module.exports = router;
