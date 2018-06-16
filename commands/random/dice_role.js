const commando = require('discord.js-commando');

class DiceRollCommand extends commando.Command{
    constructor(client){
        super(client, {
            name: 'roll',
            group: 'random',
            memberName: 'roll',
            description: 'Rolls a dice'
        });
    }

    async run(message, args1){
        var valid = 1
        if(args1 == ""){
            message.reply("Please specify the number of sides with **!roll <number>**.")
            valid = 2
        }else if(args1 == 0){
            valid = 0
        }
        for (var i = 0; i < args1.length; i++) {
            if("1234567890".includes(args1.charAt(i))){
            }else{
                valid = 0
            }}
        if(valid == 1){
            var roll = Math.floor(Math.random() * args1) + 1;
            message.reply("You rolled a " + roll + " using a " + String(Number(args1)) + " sided dice.");
        }else if(valid == 0){
            message.reply("Please enter a positive integer.")
    }}
}

module.exports = DiceRollCommand;