const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United'],
    },
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    },
    flightNo: {
        type: Number,
        min: 10,
        max: 9999,
    },
    departs: {
        type: String,
        default: function() {
            let d = new Date();
            let departsDate = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`;
            departsDate += `-${d.getDate().toString().padStart(2, '0')}T${d.toTimeString().slice(0, 5)}`;
            // whatever is returned is assigned
            // to date created+1
            return departsDate;
        }
    }
});



module.exports = mongoose.model('Flight', flightSchema);