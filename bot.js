var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var fs = require('fs');

//Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

//Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

//Bot login
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as %s - %s\n', bot.username, bot.id)
});

//Sends an audio file to stream on a channel
function sendAudio(channelID, userID, song){
    var serverID = bot.channels[channelID].guild_id;
    var server = bot.servers[serverID];
    VCID = server.members[userID].voice_channel_id;
    bot.joinVoiceChannel(VCID, function(err, events) {
        if (err) return console.error("Joining: " + err);

        bot.getAudioContext(VCID, function(err, stream) {
            if (err) return console.error("Streaming: " + err);
            fs.createReadStream("audio/" + song + ".mp3").pipe(stream);
            stream.on('done', function() {
                bot.leaveVoiceChannel(VCID)
            });
        });
    });
}

//Sends a random audio file to stream on a channel
function sendRandomAudio(channelID, userID, song, n){
    var rnd = Math.floor((Math.random() * n) + 1);
    var serverID = bot.channels[channelID].guild_id;
    var server = bot.servers[serverID];
    VCID = server.members[userID].voice_channel_id;
    bot.joinVoiceChannel(VCID, function(err, events) {
        if (err) return console.error("Joining: " + err);

        bot.getAudioContext(VCID, function(err, stream) {
            if (err) return console.error("Streaming: " + err);
            fs.createReadStream("audio/" + song + rnd + ".mp3").pipe(stream);
            stream.on('done', function() {
                bot.leaveVoiceChannel(VCID)
            });
        });
    });
}

//Message functions
bot.on('message', function(user, userID, channelID, message, evt) {
    //Listen to commands starting with '!'
    if(message.substring(0,1) == '!'){
        var args = message.substring(1).split(' ');
        var cmd = args[0]
        args = args.splice(1);
        var commands = ["!hi - Say hi :D", 
                        "!m+ - Mythic + Affixes", 
                        "!rares1 -Krokuun Rares",
                        "!rares2 - Antoran Wastes Rares",
                        "!mounts - Rares that drop mounts/eggs",
                        "!egg - Egg Meme :D",
                        "!music - Audio files"]
        var cmds = ""
        for (i=0; i < commands.length; i++){
            cmds += commands[i] + "\n"
        }

        var audio = ["comunas", "goodnews", "gratz", "johncena", "mad", "reee", "speedboost",
                     "sad", "cagao", "sorry", "heal", "ryu", "allahu", "flute", "tl", "gg",
                    "nao", "mine", "fernando", "pancake", "bubu", "casaleira", "spaghet",
                    "pascoa", "alcool", "teacher", "patada"]
        var songs = ""
        for (i=0; i < audio.length; i++){
            songs += audio[i] + "\n"
        }

        switch(cmd) {
            case 'sendhelp':
                bot.sendMessage({
                    to: channelID,
                    message: "Commands available: \n" + cmds
                });
            break;
            case 'music':
                bot.sendMessage({
                    to: channelID,
                    message: "Audio available (Followed by !): \n" + songs
                });
            break;
            case 'uwotm8':
                bot.sendMessage({
                    to: channelID,
                    message: "http://ainanas.com/bizarro-2/esta-rapariga-viveu-a-maior-situacao-de-merda-de-sempre/"
                });
            break;
            case 'ayylmao':
                bot.sendMessage({
                    to: channelID,
                    message: "João is the true mega faggot, there's no doubt here! eheh xD",
                    tts: true
             });
            break;
            case 'hi':
                bot.sendMessage({
                    to: channelID,
                    message: "Hello my fellow Mega Faggots! Let's get this party started!",
                    tts: true
                });
            break;
            case 'm+':
                bot.sendMessage({
                    to: channelID,
                    message: "https://mythicpl.us/"
                });
            break;

            //Images
            case 'rares1':
                bot.uploadFile({
                    to: channelID,
                    file: "images/raremap1.jpg"

                });
            break;
            case 'rares2':
                bot.uploadFile({
                    to: channelID,
                    file: "images/raremap2.jpg"
                });
            break;
            case 'mounts':
                bot.uploadFile({
                    to: channelID,
                    file: "images/mounts.png"
                });
            break;
            case 'egg':
                bot.uploadFile({
                    to: channelID,
                    file: "images/egg.jpg"
                });
            break;

            //Audio
            case 'comunas':
                sendAudio(channelID, userID, audio[0]);
            break;

            case 'goodnews':
                sendAudio(channelID, userID, audio[1]);
            break;
            
            case 'gratz':
                sendAudio(channelID, userID, audio[2]);
            break;
            
            case 'johncena':
                sendAudio(channelID, userID, audio[3]);
            break;

            case 'mad':
                sendAudio(channelID, userID, audio[4]);
            break;
            
            case 'reee':
                sendAudio(channelID, userID, audio[5]);
            break;

            case 'speedboost':
                sendAudio(channelID, userID, audio[6]);
            break;

            case 'sad':
                sendAudio(channelID, userID, audio[7]);
            break;

            case 'cagao':
                sendRandomAudio(channelID, userID, audio[8], 2);
            break;

            case 'sorry':
                sendAudio(channelID, userID, audio[9]);
            break;

            case 'heal':
                sendAudio(channelID, userID, audio[10]);
            break;

            case 'ryu':
                sendAudio(channelID, userID, audio[11]);
            break;

            case 'allahu':
                sendAudio(channelID, userID, audio[12]);
            break;

            case 'flute':
                sendAudio(channelID, userID, audio[13]);
            break;

            case 'tl':
                sendRandomAudio(channelID, userID, audio[14], 3);
            break;

            case 'gg':
                sendAudio(channelID, userID, audio[15]);
            break;

            case 'nao':
                sendAudio(channelID, userID, audio[16]);
            break;

            case 'mine':
                sendAudio(channelID, userID, audio[17]);
            break;

            case 'fernando':
                sendAudio(channelID, userID, audio[18]);
            break;
            case 'pancake':
                sendAudio(channelID, userID, audio[19]);
            break;
            case 'bubu':
                sendAudio(channelID, userID, audio[20]);
            break;
            case 'casaleira':
            sendAudio(channelID, userID, audio[21]);
            break;
            case 'spaghet':
            sendAudio(channelID, userID, audio[22]);
            break;
            case 'pascoa':
            sendAudio(channelID, userID, audio[23]);
            break;
            case 'alcool':
            sendAudio(channelID, userID, audio[24]);
            break;
            case 'teacher':
            sendAudio(channelID, userID, audio[25]);
            break;
            case 'patada':
            sendAudio(channelID, userID, audio[26]);
            break;

            case 'exit':
                bot.getAudioContext(VCID, function(err, stream){ 
                    if (err) return console.error("Streaming: " + err);
                    bot.leaveVoiceChannel(VCID)
                });
            break;
        }
    }
})