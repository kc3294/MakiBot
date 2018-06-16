//const Discord = require('discord.js');
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

const prefix = '?';
const token = 'NDU1NTM0OTQ4MjEyODAxNTM2.Df9lYQ.QUfX8hrSd_a0B1JiR-dNecAgJnY';

/*
bot.registry.registerGroup('random', 'Random')
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");
*/

//Clean list
function cleanArray(actual) {
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}

bot.on('message', (message) => {
    let actualMsg = message.content;
    let msg = message.content.toUpperCase();
    let sender = message.author;
    
    if(msg == 'PING'){
        //message.reply('pong');   //Send message with @name
        //message.channel.sendMessage('pong'); //Send message without @name
        message.channel.send('pong'); 
    }

    //Ping command
    if(msg === prefix + 'PING'){
        let embed = new Discord.RichEmbed()
            .setTitle('Ping')
            .setDescription(`\`\`\`md\nPing: ${bot.ping} ms\`\`\``)
            .setColor(0x4caf50)
            .setFooter('Bot pinged')
            .setTimestamp()
        message.channel.send(embed); 
    }
    
    //Xarniel command
    if(msg === prefix + 'XARNIEL'){
        let embed = new Discord.RichEmbed()
            .setTitle('Xarniel is an alcoholic. :tumbler_glass:')
            .setColor(0xff0000)

        message.channel.send(embed); 
    }

    //Maki command
    if(msg == prefix + 'MAKI'){
        message.channel.send('Maki'); 
    }

    //Roll command
    if(msg.includes(prefix + 'ROLL')){
        var rollNum = msg.replace(prefix+'ROLL','').replace(' ','');
        var valid = 1
        for (var i = 0; i < rollNum.length; i++) {
            if("1234567890".includes(rollNum.charAt(i))){
            }else{
                valid = 0
            }
        }
        if(rollNum == ""){
            rollNum = 6
            //message.reply("Please specify the number of sides with **!roll <number>**.")
            //valid = 2
            valid = 1
        }else if(rollNum == 0){
            valid = 0
        }
        if(valid == 1){
            var roll = Math.floor(Math.random() * rollNum) + 1;
            message.reply("You rolled a " + roll + " using a " + String(Number(rollNum)) + " sided dice.");
        }else if(valid == 0){
            message.reply("Please enter a positive integer.")
        }
        console.log('Rolled ' + rollNum + ' sided dice')
    }
    
    //Add to list command
    if(msg.includes(prefix + 'AS ADD')){
        var addText = actualMsg.substring(8);
        fs.readFile("list.txt", 'utf8', function(err, data){//read file
            if (err) {
                return console.log(err)
            }
            var list = data.split("\r\n");//split text into list
            list.splice(list.length-1)
            list.push(addText)
            var all = "";
            for(var i = 0; i<list.length; i++){//add each element of list into text
                if(list[i]!=""){
                    all += list[i] +"\r\n"
                }
            };
            fs.writeFile("list.txt", all, function(err){//save to file
                if (err){
                    return console.log(err);
                    
                }
                console.log(addText + " successfully added to the list.")
                message.channel.sendMessage(addText + " successfully added to the list."); 
            })
        });
    }

    //show list
    if(msg == (prefix + 'AS LIST')){
        fs.readFile("list.txt", 'utf8', function(err, data){//read file
            if (err) {
                return console.log(err)
            }
            var list = data.split("\r\n");//split text into list
            list.splice(list.length-1)
            console.log(list)

            var all = "";
            for(var i = 0; i<list.length; i++){//add each element of list into text
                if(list[i]!=""){
                    all += (i+1)+". "+list[i] +"\r\n"
                }
            };

            console.log("List Shown.")
            console.log(all)
            if (all==""){
                all = "List is empty."
            }
            message.channel.send(all); 
            
        });
    }
});



bot.login(token);