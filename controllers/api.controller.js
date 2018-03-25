// Accessing the Service that we just created

var CrisisService = require('../services/crisis.service');
var AuthService = require('../services/auth.service');

// Saving the context of this module inside the _the variable

_this = this;


// Async Controller function to get the To do List

exports.createCrisis = async function (req, res, next) {
    // Req.Body contains the form submit values.

    if(!req.body.accessToken || AuthService.verifyUser(accessToken)){
        return res.status(400).json({
            status: 401,
            message: "Unauthorized"
        });
    }

    var crisis = {
        caseId: req.body.caseId,
        location: {
            name: req.body.location,
            latitude: 1.250111,
            longitude: 103.830933
        },
        affectedArea: req.body.affectedArea,
        injuryCount: req.body.injuryCount,
        casualtyCount: req.body.casualtyCount,
        incidentDatetime: req.body.incidentDatetime,
        incidentType: req.body.incidentType,
        description: req.body.description,
        status: 'REPORTED',
        isCrisis: req.body.isCrisis,
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

exports.approveAction = async function (req, res, next) {
    if(!req.body.accessToken || AuthService.verifyUser(accessToken)){
        return res.status(400).json({
            status: 401,
            message: "Unauthorized"
        });
    }

    if (!req.params.id) {
        return res.status(400).json({
            status: 400,
            message: "Id must be present"
        });
    }

    var id = req.params.id;

    try {
        var crisis = (await CrisisService.getCrisis(id))[0];
        crisis.status = "APPROVED";
        
        var updatedCrisis = await CrisisService.updateCrisis(crisis);
        return res.status(200).json({
            status: 200,
            data: updatedCrisis,
            message: "Succesfully Approved"
        });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
}

exports.rejectAction = async function (req, res, next) {
    if(!req.body.accessToken || AuthService.verifyUser(accessToken)){
        return res.status(400).json({
            status: 401,
            message: "Unauthorized"
        });
    }

    if (!req.params.id) {
        return res.status(400).json({
            status: 400.,
            message: "Id must be present"
        });
    }

    var id = req.params.id;

    try {
        var crisis = (await CrisisService.getCrisis(id))[0];
        crisis.status = "REJECTED";
        
        var updatedCrisis = await CrisisService.updateCrisis(crisis);
        return res.status(200).json({
            status: 200,
            data: updatedCrisis,
            message: "Succesfully Rejected"
        });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
}

exports.siteUpdate = async function (req, res, next) {
    if(!req.body.accessToken || AuthService.verifyUser(accessToken)){
        return res.status(400).json({
            status: 401,
            message: "Unauthorized"
        });
    }

    if (!req.params.id) {
        return res.status(400).json({
            status: 400.,
            message: "Id must be present"
        });
    }

    var id = req.params.id;

    try {
        var crisis = (await CrisisService.getCrisis(id))[0];
        crisis.affectedArea = req.params.affectedArea ? req.params.affectedArea : crisis.affectedArea;
        crisis.injuryCount = req.params.injuryCount ? req.params.injuryCount : crisis.injuryCount;
        crisis.casualtyCount = req.params.casualtyCount ? req.params.casualtyCount : crisis.casualtyCount;
        crisis.updateLog.push({
            description: req.params.description,
            updatedTime: new Date()
        });
        
        var updatedCrisis = await CrisisService.updateCrisis(crisis);
        return res.status(200).json({
            status: 200,
            data: updatedCrisis,
            message: "Succesfully Rejected"
        });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
}

exports.closeCrisis = async function (req, res, next) {
    if(!req.body.accessToken || AuthService.verifyUser(accessToken)){
        return res.status(400).json({
            status: 401,
            message: "Unauthorized"
        });
    }

    if (!req.params.id) {
        return res.status(400).json({
            status: 400.,
            message: "Id must be present"
        });
    }

    var id = req.params.id;

    try {
        var crisis = (await CrisisService.getCrisis(id))[0];
        crisis.status = "SUCCESS";
        
        var updatedCrisis = await CrisisService.updateCrisis(crisis);
        return res.status(200).json({
            status: 200,
            data: updatedCrisis,
            message: "Succesfully closed the case"
        });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
}

    