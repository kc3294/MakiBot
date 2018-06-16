//const Discord = require('discord.js');
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

const prefix = '?';


//CountDown
var currentPerson;
var timer = 10800;
var x = setInterval(countDown,1000);
var pause = false

function countDown(){
    if(!pause){
        fs.readFile("current.txt", 'utf8', function(err, data){//read file
            if (err) {
                return console.log(err)
            }
            fs.readFile("list.txt", 'utf8', function(err, lidata){//read file
                if (err) {
                    return console.log(err)
                }
                var list = lidata.split("\r\n");//split text into list
                list.splice(list.length-1)
                if(list.length>1){
                    var timeAndOrder = data.split(",");
                    timeAndOrder[0] = Number(timeAndOrder[0]) - 1
                    if(timeAndOrder[0]<=0){

                        timeAndOrder[0] = timer
                        timeAndOrder[1] = Number(timeAndOrder[1]) + 1
                        if (Number(timeAndOrder[1])>list.length){
                            timeAndOrder[1] = 1
                        }
                        printNext(Number(timeAndOrder[1]))

                    }


                    all = timeAndOrder[0] + "," + timeAndOrder[1]
                    fs.writeFile("current.txt", all, function(err){//save to file
                        if (err){
                            return console.log(err);
                        }
                    })
                    console.log(list.length)
                    console.log(timeAndOrder)
                }
            })
        })
    }
}


function printNext(index){
    fs.readFile("list.txt", 'utf8', function(err, lidata){//read file
        if (err) {
            return console.log(err)
        }
        var list = lidata.split("\r\n");//split text into list
        next = (list[Number(index-1)]).split(", ")
        let embed = new Discord.RichEmbed()
            .setTitle('Next Person')
            .setDescription(next[1])
            .setColor(0x00FFFF)
        bot.channels.get("450870199478910977").send(embed);
    })
}


/*
bot.registry.registerGroup('random', 'Random')
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");
*/



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

    //Stripes command
    if(msg === prefix + 'STRIPES'){
        let embed = new Discord.RichEmbed()
            .setTitle('Nyaa~~')
            .setColor(0x7FFFD4)
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
                message.channel.send(addText + " successfully added to the list."); 
            })
        });
    }

    //Display list
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
                    nameOnly = list[i].split(", ")
                    all += (i+1) + ". " + nameOnly[0] + "\r\n"
                } 
            };
            console.log("List Shown.")
            console.log(all)
            if (all==""){
                all = "List is empty."
            }
            let embed = new Discord.RichEmbed()
                .setTitle('List of Participants')
                .setDescription(all)
                .setColor(0x00FFFF)
                .setFooter('Total Participants: ' + String(Number(list.length)))
            message.channel.send(embed); 
        });
    }

    //Clear List
    if(msg == (prefix + 'AS CLEAR')){
        fs.writeFile("list.txt", "", function(err){//save to file
            if (err){
                return console.log(err);
            }
            console.log("List cleared.")
            message.channel.send("List cleared."); 
        })
    }

    //Remove from list
    if(msg.includes(prefix + 'AS REMOVE')){
        var delText = actualMsg.substring(11);
        var found = 0;
        fs.readFile("list.txt", 'utf8', function(err, data){//read file
            if (err) {
                return console.log(err)
            }
            var list = data.split("\r\n");//split text into list
            list.splice(list.length-1)
            var all = "";
            for(var i = 0; i<list.length; i++){//add each element of list into text
                var member = list[i].split(", ")
                if(member[0]==delText || member[1]==delText){
                    found = 1
                    memberFound = member
                }else{
                    all += list[i] +"\r\n"
                }
            };
            fs.writeFile("list.txt", all, function(err){//save to file
                if (err){
                    return console.log(err);
                }
                if (found==1){
                    console.log(memberFound[0] + " successfully removed to the list.")
                    message.channel.send(memberFound[0] + " successfully removed to the list."); 
                }else{
                    console.log(delText + " cannot be found in the list.")
                    message.channel.send(delText + " cannot be found in the list."); 
                }
            })
        });
    }


    //set time command
    if(msg.includes(prefix + 'AS SETTIME')){
        pause=true;
        setTimeout(function(){pause=false},1100);
        var setTime = actualMsg.substring(12);
        
        setTimeout(function(){
            fs.readFile("current.txt", 'utf8', function(err, data){//read file
                if (err) {
                    return console.log(err)
                }
                var timeAndOrder = data.split(",");
                var valid = true;
                for(var i = 0; i<setTime.length; i++){
                    if("1234567890".includes(setTime[i])){
                    }else{
                        valid = false
                    }
                }
                if(valid==true){
                    var all = setTime + "," + timeAndOrder[1]
                    message.channel.send("Set time to "+setTime+" seconds."); 
                    fs.writeFile("current.txt", all, function(err){//save to file
                        if (err){
                            return console.log(err);
                        }
                    })
                }else{
                    message.channel.send("Invalid input. Please use a positive integer."); 
                }
            })
        },1000);
    }

    //set turn command
    if(msg.includes(prefix + 'AS SETTURN')){
        pause=true;
        setTimeout(function(){pause=false},1100);
        var setTurn = actualMsg.substring(12);
        setTimeout(function(){
            fs.readFile("list.txt", 'utf8', function(err, lidata){//read file
                if (err) {
                    return console.log(err)
                }
                fs.readFile("current.txt", 'utf8', function(err, data){//read file
                    if (err) {
                        return console.log(err)
                    }
                    var list = lidata.split("\r\n");
                    list.splice(list.length-1);
                    var timeAndOrder = data.split(",");
                    if(0<setTurn && setTurn<=list.length){
                        var all = String(timer) + "," + setTurn
                        printNext(setTurn)
                        fs.writeFile("current.txt", all, function(err){//save to file
                            if (err){
                                return console.log(err);
                            }
                        })
                    }else{
                        message.channel.send(setTurn + " cannot be found in the list."); 
                    }
                })
            })
        },1000);
    }

    //Next turn command
    if(msg == (prefix + 'AS NEXT')){
        pause=true;
        setTimeout(function(){pause=false},1100);
        setTimeout(function(){
            fs.readFile("list.txt", 'utf8', function(err, lidata){//read file
                if (err) {
                    return console.log(err)
                }
                fs.readFile("current.txt", 'utf8', function(err, data){//read file
                    if (err) {
                        return console.log(err)
                    }
                    var list = lidata.split("\r\n");
                    list.splice(list.length-1)
                    var timeAndOrder = data.split(",");
                    if (Number(timeAndOrder[1])<list.length){
                        var all = String(timer) + "," + String(Number(timeAndOrder[1])+1)
                        printNext(Number(timeAndOrder[1])+1)
                    }else{
                        var all = String(timer) + "," + String(1)
                        printNext(1)
                    }
                    fs.writeFile("current.txt", all, function(err){//save to file
                        if (err){
                            return console.log(err);
                        }
                    })
                })
            })
        },1000);
    }

    //Status command
    if(msg == (prefix + 'AS STATUS')){
        fs.readFile("list.txt", 'utf8', function(err, lidata){//read file
            if (err) {
                return console.log(err)
            }
            fs.readFile("current.txt", 'utf8', function(err, data){//read file
                if (err) {
                    return console.log(err)
                }
                var list = lidata.split("\r\n")
                list.splice(list.length-1)
                var timeAndOrder = data.split(",")
                var time = Number(timeAndOrder[0])
                var hour = Math.floor(time/3600)
                var min = Math.floor((time-(hour*3600))/60)
                var sec = time - (hour*3600) - (min*60)
                if (list.length>1){
                    var current = list[Number(timeAndOrder[1])-1].split(", ")
                    if (Number(timeAndOrder)<=list.length){
                        var next = list[Number(timeAndOrder[1])].split(", ")
                    }else{
                        var next = list[0].split(", ")
                    }
                    console.log(list)
                    let embed = new Discord.RichEmbed()
                        .setTitle('Turn Status')
                        .setDescription("Current Turn: "+current[0]+
                            "\nNext Turn: "+next[0]+
                            "\n"+hour+" hours - "+min+" minutes - "+sec+" seconds remaining until next person.")
                        .setColor(0x00FF00)
                    message.channel.send(embed); 
                }else{
                    let embed = new Discord.RichEmbed()
                    .setTitle('Turn Status')
                    .setDescription("Not enough participants to start game.")
                    .setColor(0xFF0000)
                    message.channel.send(embed);
                }
            })
        })



    }





/* unneccary since max time will only be set once anyways
    //Set max time
    if(msg == (prefix + 'AS MAXTIME')){
        var maxTime = actualMsg.substring(12);
        timer = maxTime
    }
    //Next person
//when countdown reaches 0 increment current person
//current person taken from file
*/


});

bot.login(process.env.BOT_TOKEN);