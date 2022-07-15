const Flight = require('../models/flight');

module.exports = {
    index,
    new: newFlight,
    create,
};

function create(req, res) {
    const flight = new Flight(req.body);
    flight.save(function(err) {
        // if we dont redirect, new page will
        // be shown with /flights in the address bar
        if (err) {
            console.log(err);
            return res.redirect('/flights/new');
        }
        // for successful create/save
        // redirect back to new.ejs
        res.redirect('/flights');
    });
}

function newFlight(req, res) {
    res.render('flights/new');
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', { flights });
    });
}

