const Discord = require('discord.js');
const client = new Discord.Client();
const PREFIX = ".";
//const puppeteer = require('puppeteer');
const fetch = require("node-fetch");
const foot = "Made by ooops#0001";
//const Canvas = require('canvas');
const fs = require('fs');
//client.msgs = require("./msgs.json");
const v = "1.0";
function iN(a) { return /^\d+$/.test(a); } function iO(a) { return a.match('^[/*+-]{1}$') == null ? !1 : !0; } mC = { '/': function (a, b) { return a / b; }, '*': function (a, b) { return a * b; }, '-': function (a, b) { return a - b; }, '+': function (a, b) { return a + b; } };
function cL(a) { return a.replace(/[\[\]]/g, ""); }
function tL(a) { return a.toLowerCase(); }

client.on('ready', () => {
  console.log(`${client.user.tag} has logged in.`);
  client.user.setPresence({
    status: "dnd",
    activity: {
      name: "ev.io",
      //type: "WATCHING"
    }
  });
});
client.on('message', async (message) => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;

  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;



  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    /***
    * 
    *  Venge stats
    * 
    */

    if (tL(CMD_NAME) === "stats"|| tL(CMD_NAME) === "stat") {
      var arg = message.content.substr(".stats ".length);
      if (!args[0]) {
        const failuser = new Discord.MessageEmbed()
        .setTitle(`**Please give me a username to look up**`)
        .setDescription("Example:\n.stats ooops")
        .setColor("2F3136")
      message.channel.send({ embed: failuser })
        return;
      }
      else{
        const evfetch = await fetch("https://ev.io/stats-by-un/" + arg.replace(" ", "%20"))

        .then((res) => res.json())
        .then((json) => {
          try {
            const stats = json[0];
            console.log(stats["name"][0]["value"]);
            console.log("____________________________");
            console.log(arg + " was requested by " + message.author.tag);
            console.log("https://ev.io/stats-by-un/" + arg);
            console.log("stats fetched for " + arg);
            var date = stats["created"][0]["value"]
            var created = date.split("T") 
            var time = created[1]
            var timezone = time.split("+")

            
            const vengg = new Discord.MessageEmbed()
              .setTitle(stats["name"][0]["value"])
              .setColor("2F3136")
              .setFooter(foot, client.user.avatarURL())
              .setTimestamp()
              //.attachFiles(vengelevels)
              //.setThumbnail("attachment://levels.png")
              //.setThumbnail()
              .setDescription(`[ev Profile](https://ev.io/stats-by-un/${arg})\n`)
              .addFields({
                name: "**__Account Stats:__**",
                value: `Rank: ${stats["field_rank"][0]["value"]}
                KDR: ${stats["field_k_d"][0]["value"]}
                Kills: ${stats["field_kills"][0]["value"]} 
                Deaths: ${stats["field_deaths"][0]["value"]}
                Total Games: ${stats["field_total_games"][0]["value"]}\n
                Coins: ${stats["field_ev_coins"][0]["value"]}
                Date Created: ${created[0]}
                Time Created: ${timezone[0]}
                
                User ID: ${stats["uid"][0]["value"]} `,
                inline: true,
              });


            message.channel.send({ embed: vengg });
          } 
          catch {
            console.log(arg)
            const fail = new Discord.MessageEmbed()
            .setTitle(`:x: **No Such user**`)
            .setDescription("Please try again")
            .setColor("2F3136")
            
          message.channel.send({ embed: fail })
          }
        });
    }
  }

  if (tL(CMD_NAME) === 'suggestion') {

    if (message.channel.id === '799717973765259305') {

      //message.delete({ timeout: 2000 })

      let text = args.join(' ')

      if (!text) return message.author.send("You need to write a suggestion").then(message => {
        message.delete({ timeout: 2000 })
        console.log("here works")
      })

      const schannel = message.guild.channels.cache.get('808736273043816480')

      const sembed = new Discord.MessageEmbed()
      .setTitle(`Suggestion sent by ${message.author.username}`)
      .setColor("RANDOM")
      .addField('Suggestion: ', `${text}`)
      .addField('Suggestion Author ID', `${message.author.id}`)
      .setFooter("Suggestion", client.user.displayAvatarURL())
      .setTimestamp() 

 
      schannel.send(sembed)

      
      if (message.content.startsWith('.suggestion') && message.channel.id === '799717973765259305') {
        return message.channel.send('Your suggestion has been submited').then((message) => {
          message.delete({ timeout: 2000 })
        })
      }

    } else {
      message.author.send("You only can use the command in <#799717973765259305>").then((message) => {
        message.delete({ timeout: 3000 })
      })
    }
  }

  }

});
client.login(process.env.token); // heroku
//client.login('NzgyNDA1NzY0Mjk1MTYzOTA2.X8LuJg.-K0Z97NDM-Z20ED5eOfh4oLnyYA'); // real
//client.login('ODA3NzA4ODExMjQyMjQyMDg5.YB77cw.ehGApaZyVlPU6P3rpQCDP1-qr7E'); // ev bot

//client.login('ODA0Nzg4MDk4Mjg2MDkyMzEw.YBRbUg.tpxkn-j4vSNf7A0l0-h29odM2T8'); // testing


