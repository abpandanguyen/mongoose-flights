const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    },
    arrivals: {
        type: Date,
        default: function() {
        let a = new Date();
            let arrivalsDate = `${a.getFullYear() + 1}-${(a.getMonth() + 1).toString().padStart(2, '0')}`;
            arrivalsDate += `-${a.getDate().toString().padStart(2, '0')}T${a.toTimeString().slice(0, 5)}`;
            // whatever is returned is assigned
            // to date created+1
            return arrivalsDate;
        },
    }
});

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
        type: Date,
        default: function() {
            let d = new Date();
            let departsDate = `${d.getFullYear() + 1}-${(d.getMonth() + 1).toString().padStart(2, '0')}`;
            departsDate += `-${d.getDate().toString().padStart(2, '0')}T${d.toTimeString().slice(0, 5)}`;
            // whatever is returned is assigned
            // to date created+1
            return departsDate;
        }
    },
    destinations: [destinationSchema],
}, {
    timestamps: true
});



module.exports = mongoose.model('Flight', flightSchema);