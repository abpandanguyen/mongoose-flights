const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    index,
    new: newFlight,
    create,
    show,
};

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({flight: flight._id}, function (err, tickets) {
            res.render('flights/show', { title: 'Flight Detail', flight, tickets});
        });
    });
}

function create(req, res) {
    for (let key in req.body) { //guard comes first
        if (req.body[key] === '') delete req.body[key];
    }
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
    const newFlight = new Flight();    
    const d = newFlight.departs;
    let departsDate = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${d.getDate().toString().padStart(2, '0')}T${d.toTimeString().slice(0, 5)}`;
    res.render('flights/new', { departsDate });
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
        flights.sort((a, b) => a.departs - b.departs);
        res.render('flights/index', { flights });
    });
}

