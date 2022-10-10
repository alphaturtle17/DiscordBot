const { Client, MessageAttachment } = require('discord.js');
const Discord = require('discord.js');
const bot = new Client();
const urban = require('urban-dictionary');

//#region (Tall Grass)
const token = 'NzAzNDk3ODA3MzI3Mzk1OTAx.Xq91hA.5kExtYA6L9xeyvfl0_OVbV52z0U'; 
const hook = new Discord.WebhookClient('704918099480019055', 'yykY_BKMD5zdwgcRSV2mQcNoJecxqQvFQdId7OFXu47PMi85ceX1QLsLuTuhodS5SNI7');
//#endregion
const PREFIX = '!';
const version = "1.0.7";
const developers = "Currently, Heather Quacknamara is only being developed by Thor Long, your 1-man army with the sexiest right leg, and a load of curiosity. Possibly used for an AP project to get a 5, probably the first of many projects.";
const admincommands = "(!__) kick, ban";
const commands = "(!__) help, commands, admincommands, define, sliddy, sendflowers, honk, clonk, link, info (version, developers)";

bot.on('ready', () => {
    console.log('We have power!');
    var rando = Math.floor(Math.random() * 5);
    if (rando == 0) {
        bot.user.setActivity("In the tall grass");
    } else if (rando == 1) {
        bot.user.setActivity("Gracefully near a stream");
    } else if (rando == 2) {
        bot.user.setActivity("Pachebel's 'Canon in D'");
    } else if (rando == 3) {
        bot.user.setActivity("Sadly, by herself, as the lone beetlegoose");
    } else {
        bot.user.setActivity("Volleyball with her friends");
    }
})

//Experimental code/concepts -- Basically a 'holding ground' I keep seperate from my code, for ease-of-use, so in case I mess something up really bad, I can just delete this section.

bot.on('message', msg=>{
    let args = msg.content.substring(PREFIX.length).split(" ");
    if(!msg.guild) return;

    const user = msg.mentions.users.first();
    const member = msg.guild.member(user);
    var permission;
    function whitelist(){
        if(msg.member.roles.cache.some(role => role.name === 'Developer')){
            permission = true;
        }
    }

    //

    switch (args[0]) {
        case 'among':
            whitelist();
            if(whitelist){
                let role = msg.guild.roles.cache.some(role => role.name === "Developer");
                console.log(role);
                
            }



        break;
    }



})






//All the commands that need the 'Admin' permission in my discord server.
//This is to prevent obvious abuse of power, and to keep order within my server.
bot.on('message', msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");
    if (!msg.guild) return;

    const user = msg.mentions.users.first();
    const member = msg.guild.member(user);
    var permission;
    function whitelist(){
        if(msg.member.roles.cache.some(role => role.name === 'Verified' || role.name == 'Developer' || role.name === 'Admin')){
            permission = true;
        }
    }

    switch (args[0]) {

        //Kick (logged)
        case 'kick':
            whitelist();
            if (permission == true){
                if (user) {
                    if (member) {
                        member
                            .kick(`${user.tag} failed the vibe check`)
                            .then(() => {
                                msg.reply(`Successfully kicked ${user.tag}`);
                                hook.send(`${msg.author.tag} kicked ${user.tag}`);
                            })
                            .catch(err => {
                                msg.reply(`Unable to kick ${user.tag}`);
                                hook.send(`${msg.author.tag} was unable to kick ${user.tag}`);
                                console.log(err);
                            });
                    } else {
                        msg.reply("That user isn't in this server!");
                    }
                } else {
                    msg.reply("You didn't mention anyone to kick!");
                }
            }else{
                msg.reply("You cannot use the bot, human!");
            }
            
            break;

        //Ban (logged)
        case 'ban':
            if (permission == true){
                if (user) {
                    if (member) {
                        member
                            .ban({
                                reason: "Isn't welcome here anymore.",
                            })
                            .then(() => {
                                msg.reply(`Successfully banned ${user.tag}`);
                                hook.send((msg.author.tag) + " banned " + user.tag);
                            })
                            .catch(err => {
                                msg.reply(`I was unable to ban ${user.tag}`);
                                hook.send(`${msg.author.tag} was unable to ban ${user.tag}`);
                                console.log(err);
                            });
                    } else {
                        msg.reply("That user isn't in this server!");
                    }
                } else {
                    msg.reply("You didn't mention anyone to ban!");
                }
            }else{
                msg.reply("You cannot use the bot, human!");
            }
            
            break;
    }
})

//The commands that everyone can use, yay, mostly simple textback commands 
//Some more complex, such as !sendflowers, require the user to have the 'Verified' permission or higher, in which a whitelist is provided.
bot.on('message', msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");
    const user = msg.mentions.users.first();
    if (!msg.guild) return;

    const wink = new MessageAttachment('./_michaelscott.gif'); 
    var letter = ("Are you from Tennessee? Because you're the only ten I see. ;)");

    const flowers = new MessageAttachment('./_flowers.jpg'); 
    var letter = ('Hey, ' + msg.author.username + ' sent you these beautiful flowers!');

    var permission;
    function whitelist(){
        if(msg.member.roles.cache.some(role => role.name === 'Verified' || role.name == 'Developer' || role.name === 'Admin')){
            permission = true;
        }
    }

    switch (args[0]) {

        //Urban dictionary (logged)
        case 'define':
            var definition = (args[1]);
            urban.term(definition, (error, entries, tags, sounds) => {
                if (error) {
                    console.error(error.message)
                } else {
                    msg.channel.send(entries[0].word)
                    msg.channel.send(entries[0].definition)
                    msg.channel.send(entries[0].example)
                    hook.send(`${msg.author.tag} defined ${definition}`)
                }
            })
            break;

        //Flirty to recipient, no tag left behind (except in logs)
        case 'sliddy':
            whitelist();
            if (permission == true){
                if (user) {
                    const member = msg.guild.member(user);
                    if (member) {
                        msg.delete();
                        user.send(letter, wink);
                        hook.send((msg.author.tag) + " sliddy " + user.tag);
                    } else {
                        msg.reply("That user isn't in this server!");
                    }
                } else {
                    msg.delete();
                    msg.reply("You didn't mention anyone to send your flirt to!");
                }
            } else{
                return msg.reply('You cannnot use the bot, human')
            }

            break;

        //Sends flowers to recipient (logged)
        case 'sendflowers':
            whitelist();
            if (permission == true){
                if (user) {
                    const member = msg.guild.member(user);
                    if (member) {
                        msg.delete();
                        user.send(letter, flowers);
                        hook.send((msg.author.tag) + " sendflowers " + user.tag);
                    } else {
                        msg.reply("That user isn't in this server!");
                    }
                } else {
                    msg.delete();
                    msg.reply("You didn't mention anyone to send your flowers to!");
                }
            } else{
                msg.reply('You cannnot use the bot, human')
            } 

            break;

        case 'honk':
            msg.channel.send('HONCLICK');
            break;
        case 'clonk':
            msg.channel.send('CLONK');
            break;
        case 'link':
            msg.reply('https://discord.gg/uzCbYUJ')
            break;
        case 'commands':
            msg.reply(commands)
            break;;
        case 'admincommands':
            msg.reply(admincommands)
            break;
        case 'help':
            msg.reply('What would you like too learn about? !info ____ (version/developers), !commands, !admincommands');
            break;
        case 'info':
            if (args[1] === 'version') {
                msg.reply('Version ' + version);
            }
            if (args[1] === 'developers') {
                msg.reply(developers);
            }
            break;
    }
})

bot.login(token);