// Gettign the Newly created Mongoose Model we just created 
var Crisis = require('../models/crisis.model');

// Saving the context of this module inside the _the variable
_this = this;

// Async function to get the To do List
exports.getCrisis = async function (id) {

    // Try Catch the awaited promise to handle the error 

    try {
        var crisis = await Crisis.find({
            caseId: id
        });

        // Return the crisisd list that was retured by the mongoose promise
        return crisis;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating Crisis');
    }
}

// Async function to get the To do List
exports.getCrisises = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    };

    // Try Catch the awaited promise to handle the error 

    try {
        var crisises = await Crisis.paginate(query, options);

        // Return the crisisd list that was retured by the mongoose promise
        return crisises;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating Crisis');
    }
}

exports.createCrisis = async function (crisis) {

    // Creating a new Mongoose Object by using the new keyword
    var newCrisis = new Crisis(crisis);

    try {
        // Saving the Crisis 
        var savedCrisis = await newCrisis.save();
        return savedCrisis;
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Error while Creating Crisis");
    }
}

exports.updateCrisis = async function (crisis) {
    var id = crisis._id;

    try {
        //Find the old Crisis Object by the Id
        var oldCrisis = await Crisis.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the Crisis");
    }

    // If no old Crisis Object exists return false
    if (!oldCrisis) {
        return false;
    }

    //Edit the Crisis Object
    for(var key in oldCrisis){
        if(key !== '_id'){
            oldCrisis[key] = crisis[key];
        }
    }

    try {
        var savedCrisis = await crisis.save();
        return savedCrisis;
    } catch (e) {
        throw Error("And Error occured while updating the Crisis");
    }
}

exports.deleteCrisis = async function (id) {

    // Delete the Crisis
    try {
        var deleted = await Crisis.remove({
            _id: id
        });
        if (deleted.result.n === 0) {
            throw Error("Crisis Could not be deleted");
        }
        return deleted
    } catch (e) {
        throw Error("Error Occured while Deleting the Crisis");
    }
}