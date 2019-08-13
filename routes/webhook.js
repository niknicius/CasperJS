const express = require("express"),  router = express.Router();

function handleMessage(sender_psid, received_message){

}

function handlePostback(sender_psid, received_postback){

}

function callSendApi(sender_psid, response){

}

router.post('/', (req, res) => {
    let body = req.body;

    if(body.object === 'page'){
        body.entry.forEach(function(entry){

            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

        });

        res.status(200).send('EVENT_RECEIVED');
    }
    else{
        res.sendStatus(404);
    }
});

router.get('/', (req, res) => {
    let VERIFY_TOKEN = "AaTfMxOn6J";

    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if(mode && token){

        if(mode === 'subscribe' && token === VERIFY_TOKEN){

            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        }
        else {
            res.sendStatus(403);
        }
    }else {
        res.sendStatus(500);
    }
});

module.exports = router;
