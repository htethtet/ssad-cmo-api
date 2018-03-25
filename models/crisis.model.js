var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var CrisisSchema = new mongoose.Schema({
    caseId: Number,
    location: {
        name: String,
        latitude: Number,
        longitude: Number
    },
    affectedArea: Number,
    injuryCount: String,
    casualtyCount: String,
    incidentDatetime: Date,
    incidentType: [String],
    description: String,
    status: String,
    isCrisis: Boolean,
    updateLog: [{
        description: String,
        updatedTime: Date
    }]
});

CrisisSchema.plugin(mongoosePaginate);
const crisis = mongoose.model('Crisis', CrisisSchema);

module.exports = crisis;