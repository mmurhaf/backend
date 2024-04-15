const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user-controller');


router.get('/',userCtrl.getListOfUsers);

router.post('/signup', userCtrl.signup);
router.post('/login',userCtrl.login) ;
router.delete('/:uid', userCtrl.deleteUser);


module.exports = router;