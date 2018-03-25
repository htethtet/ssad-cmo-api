var express = require('express');

var router = express.Router();

// Getting the Crisis Controller that we just created

var CrisisController = require('../controllers/crisis.controller');


// Map each API to the Controller FUnctions

router.get('/', CrisisController.getCrisises);

router.get('/:id', CrisisController.getCrisis);

router.post('/', CrisisController.createCrisis);

router.put('/:id', CrisisController.updateCrisis);

router.put('/updateStatus/:id', CrisisController.updateCrisisStatus)

router.delete('/:id',CrisisController.removeCrisis);


// Export the Router

module.exports = router;