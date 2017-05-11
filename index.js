'use strict';

const TelegramBot = require('node-telegram-bot-api'),
      request = require('request'),
      fs = require('fs'),
      token = '313591533:AAENOGsanqy30l8yPx1mrhSYQx700mA_hE4',
      bot = new TelegramBot(token,{polling:true});

bot.on('message',function(msg){
   const id = msg.from.id,
         messageText = msg.text.toLowerCase();

    if(messageText === 'привет'){
        bot.sendMessage(id, 'Привет я бот!');
    }else if (messageText === 'песня') {
        let file = __dirname + `/audio/agata_kristi__bi-2_-_a_mi_ne_angeli__paren_(zvukoff.ru).mp3`;
        bot.sendAudio(id, file);
    }else if (messageText === 'курс') {
        let answer = 'Покупка            Продажа\n';
        request('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',function(error,response,info){
            if(!error && response.statusCode === 200) {
                const data = JSON.parse(info);
                data.forEach(function(value, index){
                    answer +=(`${value.buy} - ${value.ccy} - ${value.sale}\n`);
                });
                bot.sendMessage(id,answer); 
            }
        });
    }
    
    
});