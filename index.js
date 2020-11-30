const Discord = require('discord.js');
const client = new Discord.Client();
const PREFIX = ".";
const puppeteer = require('puppeteer');
const fetch = require("node-fetch");
const foot = "Made by ooops#0001 and Izzibaby#5917";

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
      const browser = await puppeteer.launch();
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
  
      var kps = details.kills/details.total_games_played;
      kpg = kps.toString();
      kpg = kpg.slice(0, 5);
      var WLS = details.total_games_won/details.total_games_played;
      WLR = WLS.toString();
      WLR = WLR.slice(0, 4);
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
              + "\nGame Time: " + details.total_game_time,
              inline: false
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
  const browser = await puppeteer.launch();
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

client.login("process.env.token");