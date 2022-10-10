const { Client, MessageAttachment } = require('discord.js');
const bot = new Client();
const PREFIX = '!';

//#region (Tall Grass) 
const token = ''; 
//#endregion

bot.on('ready', () => {
    console.log('We have power!');

    var rando = Math.floor(Math.random() * 5);
    if (rando == 0) {
        bot.user.setActivity("In the tall grass");
    } else if (rando == 1) {
        bot.user.setActivity("Gracefully near a stream");n
    } else if (rando == 2) {
        bot.user.setActivity("Pachebel's 'Canon in D'");
    } else if (rando == 3) {
        bot.user.setActivity("Snip snip");
    } else {
        bot.user.setActivity("Dead");
    }
})

bot.on('message', msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");
    if(!msg.member.roles.cache.some(role => role.name === 'Developer')) return;
    const user = msg.mentions.users.first();

    switch(args[0]){
        case 'test': 
            msg.delete();
            break;
        case 'silly':
            for (i = 0; i < 3; i++){
            msg.channel.send("silly silly");
            }
            break;
        case 'spam':
            for(i = 0; i < 500; i++){
                msg.channel.send("Searching for Pokemon...");
            }
            break;
    }
}) 

bot.on('message', msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");
    if(!msg.author.bot) return;

    switch(args[0]){

        case '<@&713063147837194251>': //NotificationSquad
            msg.delete();
            break;
    }  
})

bot.login(token);