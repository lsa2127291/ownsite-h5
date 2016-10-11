var router = require('koa-router')();
router.get('/init', require('../controllers/firstPage'));
module.exports = router;
