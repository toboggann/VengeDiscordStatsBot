const Discord = require('discord.js');
const client = new Discord.Client();
const PREFIX = ".";
const puppeteer = require('puppeteer');
const fetch = require("node-fetch");
const foot = "Made by ooops#0001 and Izzibaby#5917";  
const Canvas = require('canvas');

function iN(a) { return /^\d+$/.test(a); } function iO(a) { return a.match('^[/*+-]{1}$') == null ? !1 : !0; } mC = { '/': function(a, b) { return a / b; }, '*': function(a, b) { return a * b; }, '-': function(a, b) { return a - b; }, '+': function(a, b) { return a + b; } };
function cL(a) { return a.replace(/[\[\]]/g, ""); }
function tL(a) { return a.toLowerCase(); }

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
    client.user.setPresence({
      status: "dnd",
      activity: {
        name: "Venge.io",
        //type: "WATCHING"
      }
    });
  });

client.on('message', async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
          .trim()
          .substring(PREFIX.length)
          .split(/\s+/);

/***
 * 
 *  Help
 * 
 */
const helpchannel = new Discord.MessageEmbed()
.setTitle(":e_mail:  You've Recieved Mail")
.setColor(0x2F3136)
const embed = new Discord.MessageEmbed()
.setTitle("OOOPS Stats Commands")
.setColor(0x2F3136)
.setDescription("Prefix: .")
.setFooter("Made by ooops#0001 and Izzibaby#5917 • ", client.user.avatarURL())
//.setImage(message.author.displayAvatarURL())
.setThumbnail(client.user.displayAvatarURL())
.setTimestamp()
.setURL("https://www.youtube.com/ooopsio?sub_confirmation=1")
.addField("Stats <username>", "Shows the stats of the given user")
.addField("Venge", "Shows Information about Venge (Version, Streamer, Featured video etc.)")
.addField("lb <score | daily | popular | clans>", "Shows the given leaderboard")
.addField("shop", "Shows Venge shop")
.addField("invite", "Sends the bot invite")
if (tL(CMD_NAME) === 'help') {
message.author.send({ embed: embed });
message.channel.send({ embed: helpchannel });
}

/***
 * 
 *  invite
 * 
 */
if (tL(CMD_NAME) === 'invite') {
  message.author.send("**__OOOPS Stats Bot invite:__**\nhttps://discord.com/api/oauth2/authorize?client_id=782405764295163906&permissions=8&scope=bot");
  const helpchannel = new Discord.MessageEmbed()
.setTitle(":e_mail:  You've Recieved Mail")
.setColor(0x2F3136)
message.channel.send({ embed: helpchannel });
}

/***
 * 
 *  test canvas
 * 
 */
if (tL(CMD_NAME) === 'test') {

  const canvas = Canvas.createCanvas(750, 500);
  const ctx = canvas.getContext('2d');
  const background = await Canvas.loadImage('./background.jpg');
  ctx.drawImage(background, 0 , 0, canvas.width, canvas.height);
  ctx.font = '30px Impact'
  ctx.rotate(0.1)
  ctx.fillText('Awesome!', 50, 100)
  const test = new Discord.MessageAttachment(canvas.toBuffer(), 'example.png');

  message.channel.send(test);

}

/***
 * 
 *  Shop
 * 
 */
/*if (tL(CMD_NAME) === 'shop') {  
  //embed
const shop = new Discord.MessageEmbed()
.setTitle("Venge Shop")
.setColor("2F3136")
.setFooter("Made by ooops#0001 and Izzibaby#5917 • ", client.user.avatarURL())
.setTimestamp()
.setImage("https://cdn.discordapp.com/attachments/758767922955943997/781963637580628048/soda.jpg")
.addField("________", "**Skin Name:** Gaze of Zues\n **Cost:** ONLY FROM CRATES\n **Rarity:** Legendary" )
.addField("________", "**Skin Name:** Eye\n **Cost:** ONLY FROM CRATES\n **Rarity:** Common" )
.addField("________", "**Skin Name:** Venge Soda\n **Cost:** 1000 VG\n **Rarity:** Common" )
message.channel.send(shop);
};*/
const shopfetch = await fetch(`https://gateway.venge.io/?request=get_offers&version=11`).then(response => response.json())
if(tL(CMD_NAME) === 'shop'){
  const generateEmbed = start => {
    const leaderboardEmbed = new Discord.MessageEmbed()
    .setColor('#2F3136')
    .setTitle('Venge Shop')
    .setTimestamp()


    for (i = start; i <= start; i++) {
        leaderboardEmbed.addFields({name: shopfetch.items[i].name, value: `Price: ` + price + "\n Rarity: " + shopfetch.items[i].rarity + "\n Type: " + shopfetch.items[i].class})
        if(shopfetch.items[i].id == "87"){
        shipimage = "https://cdn.discordapp.com/attachments/771384828503261204/782800603079901194/gaze_of_zues.PNG";
        price = "ONLY IN CRATES";
    }   else if(shopfetch.items[i].id == "86"){
        shipimage = "https://cdn.discordapp.com/attachments/771384828503261204/782800600488083486/eye_of_whoreus.PNG";
        price = "ONLY IN CRATES";
        }else {
        shipimage = "https://cdn.discordapp.com/attachments/771384828503261204/782800604497838100/benge_soda.PNG";
        price = shopfetch.items[i].price;
        }
        leaderboardEmbed.setImage(shipimage)
      }

    return leaderboardEmbed;    
}

const author = message.author
message.channel.send('Searching for user...')
message.channel.send(generateEmbed(0)).then(message => {

message.react('➡️')
const collector = message.createReactionCollector(
    (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === author.id,
    {time: 60000}
)

let currentIndex = 0
collector.on('collect', reaction => {
    message.reactions.removeAll().then(async () => {
    reaction.emoji.name === '⬅️' ? currentIndex -= 1 : currentIndex += 1
    message.edit(generateEmbed(currentIndex))
    if (currentIndex !== 0) await message.react('⬅️')
    if (currentIndex + 1 < 3) message.react('➡️')
        })
    })
});
}
 /***
 * 
 *  Venge stats
 * 
 */
if(tL(CMD_NAME) === 'stats'){
  const load = new Discord.MessageEmbed()
  .setTitle('<a:loading:783003234481602572> Searching for user')
  .setColor("2F3136")
  message.channel.send({ embed : load})
  .then(msg => {
    
    const none = new Discord.MessageEmbed()
    .setTitle(":x: Please enter a valid venge user")
    .setColor("2F3136")
    if(!args[0]) return message.channel.send({ embed : none })
      async function getUserDetails(username) {
        const browser = await puppeteer.launch({
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
          ],
        });
      const page = await browser.newPage();
      const url = `https://social.venge.io/#${username}`;

      await page.goto(url, { waitUntil: 'networkidle0' });
  
      const handle = await page.evaluateHandle(() => app.details);
      const details = await handle.jsonValue();
  
      await browser.close();
  
      return details;
      }
  
      getUserDetails(args[0])
      .then(async details => {
       
        console.log(details.username_raw);
      
        const load = new Discord.MessageEmbed()
        .setTitle(':x: Not enough account info')
        .setColor("2F3136")
        if(details.kills == 0){
        msg.delete()
        return message.channel.send({ embed : load})
        }
        poop = details.username_raw;
        if(details.verified == 1){
          verified = "<:verified:771943589894291467>";
      } else{
          verified = "";
      }
      if(details.clan == false)
        person = verified + details.username_raw;
      else
        person = verified + " [" + details.clan + "] " + details.username_raw;
      
      if(details.clan_social_link == false)
        clanlink = "";
      else
        clanlink = details.clan_social_link;
  
      if(details.clan_social_link === 'https://')
        clanshit = "";
      else
        clanshit = details.clan + " Discord";
  
      if(details.last_match_position == "1")
      placeshiz = "st";
      else if(details.last_match_position == "2")
      placeshiz = "nd";
      else if (details.last_match_position== "3")
      placeshiz = "rd";
      else
      placeshiz = "th";

      if (details.verified === 1) {
        verfied_ = "✔️";
    } 
    else {
        verfied_ = "";
    }
    if(details.clan == false){
    clan = "";
    clanslgg = "#FFFFFF";
  }
  else
    clan = " [" + details.clan + "]";


      var kps = details.kills/details.total_games_played;
      kpg = kps.toString();
      kpg = kpg.slice(0, 5);
      var WLS = details.total_games_won/details.total_games_played;
      WLR = WLS.toString();
      WLR = WLR.slice(0, 4);
      Canvas.registerFont('./fonts/MAKISUPA.TTF', { family: "Makisupa" });
      const canvas = Canvas.createCanvas(3820, 2580);
      const ctx = canvas.getContext('2d');
      ctx.textAlign = "center";
      var background = await Canvas.loadImage('./Background.jpg');
      var clancolor = '#FFFFFF';
      var barcolor = '#237FFF';



      if(details.clan === '/2FLY'){
      clancolor = '#ffffff';
        background = await Canvas.loadImage('./2fly.jpg');
        clancolor = '#1326a1';
         barcolor = '#a86814';
      }
      else if(details.clan === '/KAG'){
        background = await Canvas.loadImage('./KAGSomething.jpg');
        clancolor = '#ff0000';
        barcolor = '#a86814';
      } 
      else if(details.clan === '/ERA'){
        background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/764738896063496222/764738983547764756/era_logo_with_outer_glow.png');
        clancolor = '#ff0000';
        barcolor = '#a86814';
      } 


      clanslgg = details.username.slice(10, 17);
      //console.log(clanslgg)
      ctx.drawImage(background, 0 , 0, canvas.width, canvas.height);

      if(details.clan == false){
        clan = "";
        clanslgg = "#FFFFFF";
      }
      else
        clan = " [" + details.clan + "]";
        ctx.font = '190px MAKISUPA';

/*
        //squares
      
     ctx.beginPath();
     ctx.fillStyle = "#ffffff";
     ctx.fillRect(170, 640, 812, canvas.height / 7.5);
     ctx.stroke();


     ctx.beginPath();
     ctx.fillStyle = "#9c27b0";
     ctx.fillRect(190, 670, 790, canvas.height / 7.95);
     ctx.stroke();

     
     ctx.beginPath();
     ctx.fillStyle = "#9c27b0";
     ctx.fillRect(1715, 655, 510, canvas.height / 9.15);
     ctx.stroke();

     ctx.beginPath();
     ctx.fillStyle = "#ffffff";
     ctx.fillRect(1700, 880, 542, canvas.height / 7.5);
     ctx.stroke();

     ctx.beginPath();
     ctx.fillStyle = "#ffffff";
     ctx.fillRect(1700, 1120, 542, canvas.height / 7.5);
     ctx.stroke();

     ctx.beginPath();
     ctx.fillStyle = "#9c27b0";
     ctx.fillRect(1715, 895, 510, canvas.height / 9.15);
     ctx.stroke();
          ctx.beginPath();
     ctx.fillStyle = "#9c27b0";
     ctx.fillRect(1715, 1135, 510, canvas.height / 9.15);
     ctx.stroke();*/

     //everything else ///////////////////////////////////////////////////////////////

      ctx.fillStyle = clanslgg;
      ctx.fillText(`${verfied_} ${clan} ${details.username_raw}`, canvas.width / 4.1, canvas.height / 7.6);
      ctx.beginPath();
      ctx.fillStyle = barcolor;
      ctx.fillRect(canvas.width/8, canvas.height/6, 2950, 150);
      ctx.fillStyle = '#2A4385';

      ctx.fillRect(canvas.width/7.6, canvas.height/5.8, 2900 * details.experience_bar, 120);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '100px MAKISUPA';
      ctx.fillText(details.experience + " / " + details.experience_next, canvas.width / 2.01, canvas.height / 4.8);
      //console.log(details.experience_bar)
      //console.log(details.experience + " / " + details.experience_next) 
      ctx.stroke();
      ctx.closePath();
      ctx.fillStyle = clancolor;
      ctx.font = '170px MAKISUPA';
      ctx.fillText(details.level, canvas.width / 14, canvas.height / 4.586);
      //ctx.fillText(`___________`, canvas.width / 24, canvas.height / 4.2);

      ctx.textAlign = "center";

      ctx.font = '110px MAKISUPA';
      ctx.fillText("Followers", canvas.width/1.20819571865, 280);
      ctx.textAlign = "right";
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(details.followers, canvas.width/1.33101045296, 280);
      ctx.textAlign = "center";

      ctx.font = '110px MAKISUPA';
      ctx.fillStyle = clancolor;
      ctx.fillText("VG", canvas.width/1.1394137931, 400);
      ctx.textAlign = "right";
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(details.coins, canvas.width/1.17419571865, 400);
      ctx.fillStyle = clancolor;
      ctx.fillText("Following: ", 2570 , 2420);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(details.following, 3170 , 2420);
      ctx.fillStyle = clancolor;
      ctx.fillText("Game Time: ", canvas.width / 24 , 2420);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(details.total_game_time, 750 , 2420);

      // main body

      //KILLS
      ctx.font = '70px MAKISUPA';
      ctx.fillStyle = clancolor;
      ctx.fillText("Kills", canvas.width / 5.74 , 920);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '140px MAKISUPA';
      ctx.fillText(details.kills, canvas.width / 5, 820);

      //games played
      ctx.font = '70px MAKISUPA';
      ctx.fillStyle = clancolor;
      ctx.fillText("Played", canvas.width / 23 , 1300);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '140px MAKISUPA';
      ctx.fillText(details.total_games_played, canvas.width / 15, 1450);

      //Deaths
      ctx.font = '70 MAKISUPA';
      ctx.fillStyle = clancolor;
      ctx.fillText("Deaths", canvas.width / 3.53 , 1300);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '140px MAKISUPA';
      ctx.fillText(details.deaths, canvas.width / 3.28, 1450);
      
      //Wins
      ctx.font = '70px MAKISUPA';
      ctx.fillStyle = clancolor;
      ctx.fillText("Wins", canvas.width / 3.25, 1700);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '140px MAKISUPA';
      ctx.fillText(details.total_games_won, canvas.width / 3.2, 1850);
      
      //KDR
      ctx.font = '70px MAKISUPA';
      ctx.fillStyle = clancolor;
      ctx.fillText("KDR", canvas.width / 2, 920);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '140px MAKISUPA';
      ctx.fillText(details.kdr, canvas.width / 1.9, 820);

      //TOTAL LOSSES
      ctx.font = '70px MAKISUPA';
      ctx.fillStyle = clancolor;
      ctx.fillText("Losses", canvas.width /1.87, 1300);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '140px MAKISUPA';
      ctx.fillText(details.total_games_played - details.total_games_won, canvas.width / 1.732, 1450);
            
      //KPG
      ctx.font = '170px MAKISUPA';
      ctx.fillStyle = clancolor;
      ctx.fillText("KPG", canvas.width / 1.3, 900);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '140px MAKISUPA';
      ctx.fillText(kpg, canvas.width / 1.31, 1050);

      //KPG
      ctx.font = '170px MAKISUPA';
      ctx.fillStyle = clancolor;
      ctx.fillText("W/L", canvas.width / 1.3, 1300);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '140px MAKISUPA';
      ctx.fillText(WLR, canvas.width / 1.285, 1450);




      //beaned players
      const bannedPlayers = ['NeXi2k', 'cringe', 'aimer'];

      if(bannedPlayers.includes(details.username_raw)){
        ctx.fillStyle = '#2A4385';
        ctx.font = '900px MAKISUPA';
        ctx.rotate(0.2)
        ctx.fillStyle = '#FF0000';
        ctx.fillText('BEANED', 2150, 1300)
        console.log("BEANED MAN")
      }

    	const avatar = await Canvas.loadImage(client.user.displayAvatarURL({ format: 'png' })); 
      ctx.drawImage(avatar, 3495, 2270, 300, 300);
      

      

      const test = new Discord.MessageAttachment(canvas.toBuffer(), 'example.png');

          const vengg = new Discord.MessageEmbed()
          .setTitle(person)
          .setColor("2F3136")
          .setFooter(foot, client.user.avatarURL())
          .setTimestamp()
          .setDescription(`[Venge Profile](https://social.venge.io/#${details.username_raw})\n[${clanshit}](${clanlink})`)
          .addFields(      
            {
              name: "__Account Stats__",
              value: `Experience: `  + details.experience 
              +"\nFollowers: " + details.followers
              + "\nFollowing: " + details.following 
              + `\nVG Coins: ` + details.coins,
              inline: true

            },
            {
              name: "__Player Stats__",
              value: `Kills: ` + details.kills 
              + `\nDeaths: ` + details.deaths 
              + `\nKDR: ` + details.kdr 
              + "\nKPG: " + kpg
              + `\nHeadshots: `+ details.headshots,
              inline: true

            },
            {
              name: "__Total Game Stats__",
              value: `Games Played: ` + details.total_games_played 
              + `\nGames Won: ` + details.total_games_won 
              + `\nW/L: ` + WLR
              + "\nTime: " + details.total_game_time,
            },
            {
              name: "__Last Match Stats__",
              value: `Last Match Kills: ` + details.last_match_kills
              + `\nLast Match Headshots: ` + details.last_match_headshots 
              + `\nLast Match Time: ` + details.last_match_time
              + "\nLast Match Place: " + details.last_match_position + placeshiz,
              inline: true
            },

          )
          
          msg.delete()
          message.channel.send(vengg);
          //message.channel.send(test);
      });
  })
}
 /***
 * 
 *  Venge menu
 * 
 */
const menu = await fetch(`https://gateway.venge.io/?request=get_menu`).then(response => response.json())
const onlineplayers = await fetch(`https://gateway.venge.io/online.php`).then(response => response.json())
if(tL(CMD_NAME) === 'venge'){
  const load = new Discord.MessageEmbed()
  .setTitle('<a:loading:783003234481602572> Fetching Menu')
  .setColor("2F3136")
  message.channel.send({ embed : load})
  .then(msg => {
  async function getUserDetails(username) {
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
    });
  const page = await browser.newPage();
  const url = `https://social.venge.io/#${username}`;

  await page.goto(url, { waitUntil: 'networkidle0' });

  const handle = await page.evaluateHandle(() => app.details);
  const details = await handle.jsonValue();

  await browser.close();

  return details;
  }

  getUserDetails(args[0])
  .then((details) => {
    const streamer = menu.username;
      const vengg = new Discord.MessageEmbed()
      .setTitle("__Venge__")
      .setColor("2F3136")
      .setFooter("Venge Version: "+ menu.version +" • Players Online: " + onlineplayers.online, client.user.avatarURL())
      .setTimestamp()
      .setThumbnail("https://social.venge.io/images/logo.png")
      .addFields(      
        {
          name: "Streamer:",
          value: `[${menu.username}](https://www.twitch.tv/${streamer})`,
          inline: true
        },
        {
          name: "Featured Video:",
          value: `[${menu.youtuber.name}](${menu.youtuber.link})`,
          inline: false
        },
      )
      msg.delete()
      message.channel.send(vengg);
  });
})
      }
 /***
 * 
 *  Venge Leaderboard
 * 
 */
const vengeFetch = await fetch(`https://gateway.venge.io/?request=leaderboard&sort=score`).then(response => response.json())
const dailyFetch = await fetch(`https://gateway.venge.io/?request=leaderboard&sort=rank`).then(response => response.json())
const popFetch = await fetch(`https://gateway.venge.io/?request=leaderboard&sort=followers`).then(response => response.json())
const clanFetch = await fetch(`https://gateway.venge.io/?request=leaderboard&sort=clans`).then(response => response.json())
if(tL(CMD_NAME) === 'lb'|| tL(CMD_NAME) === 'leaderboard'){
  const load = new Discord.MessageEmbed()
  .setTitle(`<a:loading:783003234481602572> Fetching Leadboard ${args[0]}`)
  .setColor("2F3136")
  message.channel.send({ embed : load})
  .then(msg => {
  if(args[0] === "score"){     // SCORE
    const generateEmbed = start => {
        const current = vengeFetch.result.slice(start, start + 8);

        const leaderboardEmbed = new Discord.MessageEmbed()
        .setColor('#2F3136')
        .setTitle("#" + (1 + start) + "-" + (8 + start) + ' Leaderboard:')
        .setTimestamp()
        
        for (i = start; i < start + 8; i++) {
            leaderboardEmbed.addFields({name: '#' + (i+1) + " " + vengeFetch.result[i].username, value: `[Profile](https://social.venge.io/#${vengeFetch.result[i].raw_username})` + '\n Score: ' + vengeFetch.result[i].experience})
        }
        msg.delete()
        return leaderboardEmbed;    
    }

    const author = message.author

    message.channel.send(generateEmbed(0)).then(message => {

    message.react('➡️')
    const collector = message.createReactionCollector(
        (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === author.id,
        {time: 60000}
    )

    let currentIndex = 0
    collector.on('collect', reaction => {
        message.reactions.removeAll().then(async () => {
        reaction.emoji.name === '⬅️' ? currentIndex -= 8 : currentIndex += 8
        message.edit(generateEmbed(currentIndex))
        if (currentIndex !== 0) await message.react('⬅️')
        if (currentIndex + 8 < 48) message.react('➡️')
            })
        })
    });
} else if(args[0] === "daily"){       // DAILY
  const generateEmbed = start => {
      const current = dailyFetch.result.slice(start, start + 8);

      const leaderboardEmbed = new Discord.MessageEmbed()
      .setColor('#2F3136')
      .setTitle("#" + (1 + start) + "-" + (5 + start) + ' Leaderboard:')
      .setTimestamp()
      
      for (i = start; i < start + 5; i++) {
          leaderboardEmbed.addFields({name: '#' + (i+1) + " " + dailyFetch.result[i].raw_username, value: `[Profile](https://social.venge.io/#${dailyFetch.result[i].raw_username})` + '\n Score: ' + dailyFetch.result[i].experience + '\n Kills: ' + dailyFetch.result[i].kills + '\n Deaths: ' + dailyFetch.result[i].deaths})
      }
      msg.delete()
      return leaderboardEmbed;    
  }

  const author = message.author

  message.channel.send(generateEmbed(0)).then(message => {

  message.react('➡️')
  const collector = message.createReactionCollector(
      (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === author.id,
      {time: 60000}
  )

  let currentIndex = 0
  collector.on('collect', reaction => {
      message.reactions.removeAll().then(async () => {
      reaction.emoji.name === '⬅️' ? currentIndex -= 5 : currentIndex += 5
      message.edit(generateEmbed(currentIndex))
      if (currentIndex !== 0) await message.react('⬅️')
      if (currentIndex + 5 < 50) message.react('➡️')
          })
      })
  });
}
else if(args[0] === "popular"){       // POPULAR
  const generateEmbed = start => {
      const current = popFetch.result.slice(start, start + 8);

      const leaderboardEmbed = new Discord.MessageEmbed()
      .setColor('#2F3136')
      .setTitle("#" + (1 + start) + "-" + (7 + start) + ' Leaderboard:')
      .setTimestamp()
      
      for (i = start; i < start + 7; i++) {
          leaderboardEmbed.addFields({name: '#' + (i+1) + " " + popFetch.result[i].username, value: `[Profile](https://social.venge.io/#${popFetch.result[i].raw_username})` + '\n Followers: ' + popFetch.result[i].followers})
      }
      msg.delete()
      return leaderboardEmbed;    
  }

  const author = message.author

  message.channel.send(generateEmbed(0)).then(message => {

  message.react('➡️')
  const collector = message.createReactionCollector(
      (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === author.id,
      {time: 60000}
  )

  let currentIndex = 0
  collector.on('collect', reaction => {
      message.reactions.removeAll().then(async () => {
      reaction.emoji.name === '⬅️' ? currentIndex -= 5 : currentIndex += 5
      message.edit(generateEmbed(currentIndex))
      if (currentIndex !== 0) await message.react('⬅️')
      if (currentIndex + 7 < 77) message.react('➡️')
          })
      })
  });
}
else if(args[0] === "clans"){       // CLANS
  const generateEmbed = start => {
      const current = clanFetch.result.slice(start, start + 8);

      const leaderboardEmbed = new Discord.MessageEmbed()
      .setColor('#2F3136')
      .setTitle("#" + (1 + start) + "-" + (5+ start) + ' Leaderboard:')
      .setTimestamp()
      
      for (i = start; i < start + 5; i++) {
          leaderboardEmbed.addFields({name: '#' + (i+1) + " " + clanFetch.result[i].clan_name, value: ' Owner: ' + clanFetch.result[i].owner_username + '\n KDR: ' + clanFetch.result[i].kdr + '\n XP: ' + clanFetch.result[i].experience + '\n Members: ' + clanFetch.result[i].members_count})
      }

      return leaderboardEmbed;    
  }

  const author = message.author
  msg.delete()
  message.channel.send(generateEmbed(0)).then(message => {

  message.react('➡️')
  const collector = message.createReactionCollector(
      (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === author.id,
      {time: 60000}
  )

  let currentIndex = 0
  collector.on('collect', reaction => {
      message.reactions.removeAll().then(async () => {
      reaction.emoji.name === '⬅️' ? currentIndex -= 7 : currentIndex += 7
      message.edit(generateEmbed(currentIndex))
      if (currentIndex !== 0) await message.react('⬅️')
      if (currentIndex + 5 < 50) message.react('➡️')
          })
      })
  });
}

else{
message.channel.send("**Please give a leaderboard to fetch score | daily | popular | clans**")
}
})
    }

  }
});

client.login(token.process.env);