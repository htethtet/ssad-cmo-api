var express = require('express');

var router = express.Router();

// Getting the Crisis Controller that we just created

var APIController = require('../controllers/api.controller');

// Map each API to the Controller FUnctions

router.post('/createCrisis/', APIController.createCrisis);

router.put('/approveAction/:id', APIController.approveAction);

router.put('/rejectAction/:id', APIController.rejectAction);

router.put('/siteUpdate/:id', APIController.siteUpdate);

router.put('/closeCrisis/:id', APIController.closeCrisis);


// Export the Router

module.exports = router;