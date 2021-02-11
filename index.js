const Discord = require('discord.js');
const client = new Discord.Client();
const PREFIX = ".";
//const puppeteer = require('puppeteer');
const fetch = require("node-fetch");
const foot = "Made by ooops#0001 & Powered#3959";
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

    if (tL(CMD_NAME) === "stats" || tL(CMD_NAME) === "stat") {
      var arg = message.content.substr(".stats ".length);
      if (!args[0]) {
        const failuser = new Discord.MessageEmbed()
          .setTitle(`**Please give me a username to look up**`)
          .setDescription("Example:\n.stats ooops")
          .setColor("2F3136")
        message.channel.send({ embed: failuser })
        return;
      }
      else {
        const evfetch = await fetch("https://ev.io/stats-by-un/" + arg.replace(" ", "%20"))

          .then((res) => res.json())
          .then(async (json) => {
            try {


              const stats = json[0];
              var kps = stats["field_kills"][0]["value"] / stats["field_total_games"][0]["value"];
              kpg = kps.toString();
              kpg = kpg.slice(0, 4);
              console.log(stats["name"][0]["value"]);
              console.log("____________________________");
              console.log(arg + " was requested by " + message.author.tag);
              console.log("https://ev.io/stats-by-un/" + arg);
              console.log("stats fetched for " + arg);
              var date = new Date(stats["created"][0]["value"])
              var now = new Date()
              var Difference_In_Time = now.getTime() - date.getTime();
              var Difference_In_Days = Math.trunc(Difference_In_Time / (1000 * 3600 * 24));
              var timezone = stats["created"][0]["value"].split("+")
              timezone[1] = timezone[1] == "00:00" ? "" : " + " + timezone[1];
              let image;
              const imagefetch = await fetch("https://ev.io" + stats["field_eq_skin"][0]["url"])
                  .then((res) => res.text())
                  .then((body) => {
                      const splitbdy = body.split('<img src="')
                      image = splitbdy[splitbdy.length - 1].substring(0, splitbdy[splitbdy.length - 1].lastIndexOf(".png"))
                  })

              const vengg = new Discord.MessageEmbed()
                .setTitle(`**__Account Stats__**`)
                .setColor("2F3136")
                .setFooter(foot, client.user.avatarURL())
                .setTimestamp()
                //.attachFiles(vengelevels)
                //.setThumbnail("attachment://levels.png")
                //.setThumbnail()
                //.setDescription(`[ev Profile]()\n`)

                .setDescription(`**Username:** [${stats["name"][0]["value"]}](https://ev.io/user/${stats["uid"][0]["value"]})\r\n` +
                  `**Total games:** ${stats["field_total_games"][0]["value"]}\r\n` +
                  `**EvCoins:** ${stats["field_ev_coins"][0]["value"]}\r\n` +
                  `**Kills:** ${stats["field_kills"][0]["value"]}\r\n` +
                  `**Deaths:** ${stats["field_deaths"][0]["value"]}\r\n` +
                  `**KDR:** ${stats["field_k_d"][0]["value"]}\r\n` +
                  `**KPG:** ${kpg}\r\n \r\n` +

                  `**Created:** ${Difference_In_Days} Days ago\r\n`)

              if (stats["field_twitch"][0] !== undefined) {
                let twitch = stats["field_twitch"][0]["value"].split("/")
                twitch = twitch[twitch.length - 1]
                vengg.addField("Twitch:", `[${twitch}](${stats["field_twitch"][0]["value"]})`, true)
              }
              if (stats["field_youtube"][0] !== undefined) {
                try {
                    let ytname;
                    const youtubefetch = await fetch(stats["field_youtube"][0]["value"])
                        .then((res) => res.text())
                        .then((body) => {
                            const splitbdy = body.split(' "name": "')
                            ytname = splitbdy[splitbdy.length - 1].substring(0, splitbdy[splitbdy.length - 1].lastIndexOf('"}}]}</script>'))
                        })
                    if (ytname != "") {
                        vengg.addField("Youtube:", `[${ytname}](${stats["field_youtube"][0]["value"]})`, true)
                    }
                } catch {

                }
            }
            vengg.setThumbnail("https://ev.io" + image + ".png");

            message.channel.send(vengg);
                }
                catch(error) {
                  console.log(arg)
                  console.error("Something went wrong when fetching the message: ", error);
                  const fail = new Discord.MessageEmbed()
                    .setTitle(`:x: **No Such user**`)
                    .setDescription("Please try again")
                    .setColor("2F3136")

                  message.channel.send({ embed: fail })
                }
              });
      }
    }

    if (tL(CMD_NAME) === "id") {
      if (!args[0]) {
        const failuser = new Discord.MessageEmbed()
          .setTitle(`**Please give me an to look up**`)
          .setDescription("Example:\n.ID 2252")
          .setColor("2F3136")
        message.channel.send({ embed: failuser })
        return;
      }
      else {
        console.log('here is good')
        const evfetch = await fetch("https://ev.io/user/" + args[0] + "?_format=json")

          .then((res) => res.json())
          .then((json) => {
            try {
              const stats = json[0];
              console.log(["name"]["value"]);
              console.log("____________________________");
              console.log("id " + args[0] + " was requested by " + message.author.tag);
              console.log("stats fetched for " + args[0]);
              console.log("https://ev.io/user/" + args[0] + "?_format=json");
              message.channel.send("soon tm")
              /*var date = stats["created"][0]["value"]
              var created = date.split("T") 
              var time = created[1]
              var timezone = time.split("+")
    
              
               /*const vengg = new Discord.MessageEmbed()
                .setTitle("Stats for User:" + args[0])
                .setColor("2F3136")
                .setFooter(foot, client.user.avatarURL())
                .setTimestamp()
                //.attachFiles(vengelevels)
                //.setThumbnail("attachment://levels.png")
                //.setThumbnail()
                .setDescription(`[ev Profile](https://ev.io/user/${arg})\n`)
                .addFields({ //
                  name: "**__Account Stats:__**",
                  value: `Name: ${stats["name"][0]["value"]}
                  Rank: ${stats["field_rank"][0]["value"]}
                  KDR: ${stats["field_k_d"][0]["value"]}
                  Kills: ${stats["field_kills"][0]["value"]} 
                  Deaths: ${stats["field_deaths"][0]["value"]}
                  Total Games: ${stats["field_total_games"][0]["value"]}\n
                  Coins: ${stats["field_ev_coins"][0]["value"]}
                  Date Created: ${created[0]}
                  Time Created: ${timezone[0]}`,
                  inline: true,
                });
    
    
              message.channel.send({ embed: vengg });  */
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

    if (tL(CMD_NAME) === "help") {
      const helpchannel = new Discord.MessageEmbed()
        .setTitle(":e_mail:  You've Recieved Mail")
        .setColor(0x2F3136)
      const embed = new Discord.MessageEmbed()
      const vengg = new Discord.MessageEmbed()
        .setTitle("Ev bot Commands")
        .setColor("2F3136")
        .setFooter(foot, client.user.avatarURL())
        .setTimestamp()
        //.attachFiles(vengelevels)
        //.setThumbnail("attachment://levels.png")
        //.setThumbnail()
        .setURL("https://discord.com/api/oauth2/authorize?client_id=804788098286092310&permissions=8&scope=bot")
        .setDescription(`prefix .\n`)
        .addFields({ //
          name: "stats <username>",
          value: `Shows the stats of the given user`,
          inline: true,
        })
        .addFields({ //
          name: ".suggestion <suggestion>",
          value: `can only be done in <#799717973765259305>`,
          inline: true,
        })
        .addFields({ //
          name: ".id <id>",
          value: `coming soon`,
          inline: false,
        })
        .addFields({ //
          name: ".lb <lb>",
          value: `coming soon`,
          inline: false,
        })
        .addFields({ //
          name: "More info",
          value: `You can now invite the bot to your own server Click the blue text at the top of this embed`,
          inline: false,
        });
      message.channel.send({ embed: helpchannel })
      message.author.send({ embed: vengg })
      /* message.channel.send({ embed: helpchannel }).then(m => {
         m.delete(3000) //Deletes the message after 10000 milliseconds (10 seconds)
      })*/

    }
  }

});
//client.login(process.env.token); // heroku
//client.login('NzgyNDA1NzY0Mjk1MTYzOTA2.X8LuJg.-K0Z97NDM-Z20ED5eOfh4oLnyYA'); // real
//client.login('ODA3NzA4ODExMjQyMjQyMDg5.YB77cw.ehGApaZyVlPU6P3rpQCDP1-qr7E'); // ev bot

client.login('ODA0Nzg4MDk4Mjg2MDkyMzEw.YBRbUg.tpxkn-j4vSNf7A0l0-h29odM2T8'); // testing


