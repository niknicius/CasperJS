const express = require("express"),  router = express.Router(), request = require("request");

function handleMessage(sender_psid, received_message){
    let response;

    if(received_message.text){
        response = {
            "text" : `Você enviou "${received_message.text}" agora me envie uma imagem`
        }
    }

    callSendApi(sender_psid, response);
}

function handlePostback(sender_psid, received_postback){

}

function callSendApi(sender_psid, response){
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    };

    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": "EAAiOpSlpuyQBAFLQM2ZArQlIuuEfBw4IlQ4ZBZAu2bjcw6VqhHWUVUZA5hn0QZC7xnmzfKffdpkAGsLXgi7YKNRR1EvLxZAah4KMm6KhJ2LJuOYlpZAiH93gXsqIvZBapOwIfO5Gx5ETzlSxlJQRCtLTxbQRLZCzgAkbDZCXyYuujCBgZDZD" },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('Mensagem Enviada!!')
            console.log(res);
        } else {
            console.error("Erro ao enviar mensagem:" + err);
        }
    });
}



router.post('/', (req, res) => {
    let body = req.body;

    if(body.object === 'page'){
        body.entry.forEach(function(entry){

            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

            if(webhook_event.message){
                handleMessage(sender_psid, webhook_event.message);
            }
            else if(webhook_event.postback){
                handlePostback(sender_psid, webhook_event.postback);
            }

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
