// Accessing the Service that we just created

var CrisisService = require('../services/crisis.service');

// Saving the context of this module inside the _the variable

_this = this;


// Async Controller function to get the To do List


exports.getCrisis = async function (req, res, next) {

    if (!req.params.id) {
        return res.status(400).json({
            status: 400.,
            message: "Id must be present"
        });
    }

    var id = req.params.id;

    try {
        var crisis = await CrisisService.getCrisis(id);
        // Return the crisises list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({
            status: 200,
            data: crisis,
            message: "Succesfully Crisis Recieved"
        });

    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
}

exports.getCrisises = async function (req, res, next) {

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10;

    try {
        var crisises = await CrisisService.getCrisises({}, page, limit);
        // Return the crisises list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({
            status: 200,
            data: crisises,
            message: "Succesfully Crisises Recieved"
        });

    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
}

exports.createCrisis = async function (req, res, next) {

    // Req.Body contains the form submit values.

    var crisis = {
        caseId: req.body.caseId,
        location:{
            name: req.body.locationName,
            latitude: req.body.locationLat,
            longitude: req.body.locationLng
        },
        affectedArea: req.body.affectedArea,
        injuryCount: req.body.injuryCount,
        casualtyCount: req.body.casualtyCount,
        incidentDatetime: req.body.incidentDatetime,
        incidentType: req.body.incidentType,
        description: req.body.description,
        status: 'NEW',
        updateLog: []
    };

    try {
        // Calling the Service function with the new object from the Request Body

        var createdCrisis = await CrisisService.createCrisis(crisis)
        return res.status(201).json({
            status: 201,
            data: createdCrisis,
            message: "Succesfully Created Crisis"
        });
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            status: 400,
            message: "Crisis Creation was Unsuccesful"
        });
    }
}

exports.updateCrisisStatus = async function (req, res, next) {
    if (!req.params.id) {
        return res.status(400).json({
            status: 400.,
            message: "Id must be present"
        });
    }

    var id = req.params.id;

    try {
        var crisis = (await CrisisService.getCrisis(id))[0];
        crisis.status = req.params.status;
        
        var updatedCrisis = await CrisisService.updateCrisis(crisis);
        return res.status(200).json({
            status: 200,
            data: updatedCrisis,
            message: "Succesfully updated status to " + req.params.status
        });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
}

exports.updateCrisis = async function (req, res, next) {

    // Id is necessary for the update

    if (!req.body._id) {
        return res.status(400).json({
            status: 400.,
            message: "Id must be present"
        });
    }

    var id = req.body._id;

    console.log(req.body);

    var crisis = {
        id,
        locationName: req.body.locationName ? req.body.locationName : null,
        locationLat: req.body.locationLat ? req.body.locationLat: null,
        locationLng: req.body.locationLng ? req.body.locationLng : null,
        affectedArea: req.body.affectedArea ? req.body.affectedArea : null,
        injuryCount: req.body.injuryCount ? req.body.injuryCount : null,
        casualtyCount: req.body.casualtyCount ? req.body.casualtyCount : null,
        incidentDatetime: req.body.incidentDatetime ? req.body.incidentDatetime : null,
        incidentType: req.body.incidentType ? req.body.incidentType : null,
        description: req.body.description  ? req.body.description : null,
    };

    try {
        var updatedCrisis = await CrisisService.updateCrisis(crisis);
        return res.status(200).json({
            status: 200,
            data: updatedCrisis,
            message: "Succesfully Updated Crisis"
        });
    } catch (e) {
        return res.status(400).json({
            status: 400.,
            message: e.message
        });
    }
}

exports.removeCrisis = async function (req, res, next) {

    var id = req.params.id;

    try {
        var deleted = await CrisisService.deleteCrisis(id);
        return res.status(204).json({
            status: 204,
            message: "Succesfully Crisis Deleted"
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }

}