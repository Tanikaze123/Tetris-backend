// Import required modules
// e.g. const Ama = require('./logic/ama');

// Create required middleware
// e.g. app.use(cors());
// e.g. app.use(express.json());

// Add error handler
// e.g. app.use(function(err, req, res, next) { ... })

// Start server on port 8080
// e.g. app.listen(8080, function() { ... });

const express = require('express');
const cors = require('cors');
const { nanoid } = require('nanoid')

const app = express();
app.use(cors());
app.use(express.json());

const sessions = {};

const Ama = require('./logic/ama');

// session stuff -- Host is P1
// fetch('localhost', { method: 'POST' })
app.post('/', function (req, res) {
    const sessionId = nanoid(10);
    sessions[sessionId] = new Ama() //error
    const AMA = sessions[sessionId]
    console.log(sessions)
    console.log({ session_id: sessionId, "PlayerNo": 1 })
    res.status(201).send({ session_id: sessionId, "PlayerNo": 1 });
});

// enter session -- Guest is P2
// fetch(`localhost/session?session_id=${sessionId}`, { method: 'GET' })
app.post('/session', function (req, res) {
    console.log("P2 join")
    const sessionId = req.body.session_id[sessionIdInput];
    console.log(sessionId)
    const Ama = sessions[sessionId]
    if (Ama == undefined) {
        return res.status(400).json({
            error: "Wrong"
        })
    } else if (Ama.checkRdyI(2) == true) {
        return res.status(400).json({
            error: "Full: 2/2"
        })
    }
    return res.json({ session_id: sessionId, "PlayerNo": 2});
});

// set player status to ready
// fetch(`localhost/session?session_id=${sessionId}&player=${p}&action=ready`, { method: 'PUT' })
app.put('/session', function (req, res, next) {
    const sessionId = req.query.session_id;
    const player = req.query.player;
    const intP = parseInt(player)
    action = req.query.action;
    const Ama = sessions[sessionId]
    if (action == "ready") {
        progress = Ama.rdy(intP, true);
    } else {
        progress = Ama.startedTF(intP, false);
    }
    console.log(sessions)
    console.log(intP+" is ready");
    return res.status(201).json("");
});

// check and GET start time
// fetch(`localhost/session/time?session_id=${sessionId}`, { method: 'GET' })
app.get('/session/time', function (req, res, next) {
    const sessionId = req.query.session_id;
    const Ama = sessions[sessionId]
    if (Ama.checkRdy()){ //both ready, sends start time
        if (Ama.getStart() == null) { // no one started yet
            Ama.setStart();
        } else {
            start = Ama.getStart();
            return res.status().json({Time: start})
        }
        return res.status(201).json("ready"); 
    }
});

// get other player's lines
// fetch(`localhost/session?session_id=${sessionId}&player=${p}`, { method: 'GET' })
app.get('/session/line', function (req, res, next) {
    const sessionId = req.query.session_id;
    const Ama = sessions[sessionId]
    const player = req.query.player;
    const p = parseInt(player)
    NumLines = Ama.checkLine(p)
    return res.status().json({"num_of_lines": NumLines});
});

// set player's lines
// fetch(`localhost/session?session_id=${sessionId}&player=${p}`, { method: 'PUT' })
app.put('/session/setLine', function (req, res, next) {
    const sessionId = req.query.session_id;
    const Ama = sessions[sessionId]
    const player = req.query.player;
    const p = parseInt(player)
    const lines = req.query.lines;
    const L = parseInt(lines)
    Ama.addLine(player, L)
    return res.status()
});

// set dead
// fetch(`localhost/session?session_id=${sessionId}&player=${p}`, { method: 'PUT' })
app.put('/session/died', function (req, res, next) {
    const sessionId = req.query.session_id;
    const Ama = sessions[sessionId]
    const player = req.query.player;
    const p = parseInt(player)
    Ama.setDead(p)
    return res.status()
});

// get win/lose
// fetch(`localhost/session?session_id=${sessionId}&player=${p}`, { method: 'GET' })
app.get('/session/died', function (req, res, next) {
    const sessionId = req.query.session_id;
    const Ama = sessions[sessionId]
    const player = req.query.player;
    const p = parseInt(player)
    result = Ama.getDead()
    if (result["p1"] == true && result["p2"] == false) {
        return res.status().json({"p1": true, "p2": false});
    } else if (result["p2"] == true && result["p1"] == false) {
        return res.status().json({"p1": false, "p2": true});
    }
});

// start the app by running "node ./app.js"
app.listen(process.env.PORT || 5000, function () {
    console.log('app listening');
});