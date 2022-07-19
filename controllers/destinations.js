const Flight = require('../models/flight');

module.exports = {
    create,
};

function create(req, res) {
    Flight.findById(req.params.id, function(err, flight){
        flight.destinations.push(req.body);
        flight.destinations.sort((a, b) => b.arrivals - a.arrivals);
        flight.save(function(err) {
            res.redirect(`/flights/${flight._id}`);
        });
    });
}