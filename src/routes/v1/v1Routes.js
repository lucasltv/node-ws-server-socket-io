var express = require('express'),
    router = express.Router(),
    healhController = require('../../controllers/health/healthController')

// auth = require('../../middlewares/auth')

/*
* PUBLIC USER ROUTES
*/
router.get('/health', healhController.serverOnline);//AWS LOAD BALANCE HEALTH

/*
 * PRIVATE ROUTES... //TODO:
 */
// router.get('/users', [auth], userController.paginatedList);
// router.post('/users', [auth], userController.create);


module.exports = router;