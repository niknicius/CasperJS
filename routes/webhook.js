const express = require("express"),  router = express.Router(), request = require("request");

const News = require('../models/News');

async function parse_msg(msg, sender_psid){
    let newsA = await News.find({theme: new RegExp('^'+msg+'$', "i")}).limit(20).then((news) => {
        let newsList = [];
        news.forEach(function (n) {
            let news_item = {
                title: n.title,
                image_url: n.img,
                subtitle: n.description,
                default_action: {
                    type: "web_url",
                    url: "https://niknicius.tk/news/" + n.link,
                    messenger_extensions: false
                },
                buttons: [
                    {
                        type: "web_url",
                        url: "https://niknicius.tk/news/" + n.link,
                        title: "Ler Notícia"
                    }
                ]
            };
            newsList.push(news_item);
        });

        if(newsList.length === 0){
            response = reply_themes("Desculpe-me! Não existem notícias cadastradas para esse tema!");
            callSendApi(sender_psid, response);
        }else{
            let response = {
                attachment: {
                    type: "template",
                    payload: {
                        template_type: "generic",
                        elements: newsList
                    }
                }
            };
            console.log(response);
            callSendApi(sender_psid, response);
        }
    });
}

function reply_themes(msg){
    return {
        "text": msg,
        "quick_replies": [
            {
                "content_type": "text",
                "title": "Esportes",
                "payload": "esportes"
            }, {
                "content_type": "text",
                "title": "Política",
                "payload": "politica"
            },
            {
                "content_type": "text",
                "title": "Entretenimento",
                "payload": "entretenimento"
            },
            {
                "content_type": "text",
                "title": "Famosos",
                "payload": "famosos"
            },
        ]
    };
}

async function handleMessage(sender_psid, received_message){
    let response;

    if(received_message.quick_reply){
        await parse_msg(received_message.quick_reply.payload, sender_psid);
    }
    else if(received_message.text){
        response = reply_themes("Olá, Selecione um tema para ficar sabendo das novidades:");
        callSendApi(sender_psid, response);
    }
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

    console.log("req_b" + JSON.stringify(request_body));

    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": "EAAiOpSlpuyQBAFLQM2ZArQlIuuEfBw4IlQ4ZBZAu2bjcw6VqhHWUVUZA5hn0QZC7xnmzfKffdpkAGsLXgi7YKNRR1EvLxZAah4KMm6KhJ2LJuOYlpZAiH93gXsqIvZBapOwIfO5Gx5ETzlSxlJQRCtLTxbQRLZCzgAkbDZCXyYuujCBgZDZD" },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('Mensagem Enviada!!')
        } else {
            console.error("Erro ao enviar mensagem:" + err);
        }
    });
}



router.post('/', (req, res) => {
    let body = req.body;
    //console.log(body);
    if(body.object === 'page'){
        body.entry.forEach(function(entry){

            let webhook_event = entry.messaging[0];
            //console.log(webhook_event);

            let sender_psid = webhook_event.sender.id;

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
        res.sendStatus(402);
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
