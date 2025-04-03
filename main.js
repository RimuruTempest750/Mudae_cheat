/**
Created by RimuruTempest750
Github.com/RimuruTempest750
Licence : GNU General Public License v3.0
*/

const { Client } = require('discord.js-selfbot-v13');
const { token, channelId, BotID, timeClaim } = require('./config.json');
const { keywords } = require('./keywords.json');

const client = new Client({ checkUpdate: false });

const lastClicked = {};
let lastMessageTime = 0;
let stopSending = false;

function getRandomDelay() {
    return Math.floor(Math.random() * (1000 - 200 + 1)) + 200;
}

async function sendMessages(channel) {
    if (stopSending) return;
    try {
        await channel.send('$wa');
    } catch (error) {
        if (error.message.includes('Channel verification level is too high')) {
            console.error('Error: The channel\'s verification level is too high. Unable to send the message.');
        } else {
            console.error('Error while sending the message :', error);
        }
    }
}

async function startPeriodicMessages() {
    const channel = client.channels.cache.get(channelId);
    if (!channel) return;

    let count = 0;
    stopSending = false;

    while (count < 8) {
        if (stopSending) {
            console.log('Sending $wa commands stopped due to a detected response.');
            break;
        }
        await sendMessages(channel);
        count++;
        console.log(`$wa message sent (${count}/8).`);

        if (count < 8) {
            const delay = getRandomDelay();
            console.log(`Waiting ${delay}ms before sending the next message.`);
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }

    if (!stopSending) {
        console.log('8 $wa messages sent, waiting for one hour before restarting ...');
        await new Promise((resolve) => setTimeout(resolve, 60 * 60 * 1000));
        startPeriodicMessages();
    }
}

async function handleKeywordDetection(message) {
    if (message.channel.id !== channelId) return;

    const responseTriggers = ["$search slash", "Twitter : @Mudaebot"];
    if (responseTriggers.some((trigger) => message.content.includes(trigger))) {
        stopSending = true;
        console.log('Response detected : Stopping the sending of $wa commands.');
        return;
    }

    if (message.author.id !== BotID) return;
    if (!message.embeds.length) return;

    for (const embed of message.embeds) {
        if (!embed.description) continue;
        const description = embed.description.toLowerCase();
        const matchedKeyword = keywords.find((keyword) => description.includes(keyword.toLowerCase()));

        if (matchedKeyword) {
            const buttons = message.components?.[0]?.components || [];
            for (const button of buttons) {
                if (button.customId) {
                    const currentTime = Date.now();
                    const lastClickTime = lastClicked[button.customId];

                    if (lastClickTime && currentTime - lastClickTime < 3 * 60 * 60 * 1000) {
                        console.log(`Button ${button.customId} cannot be clicked before 3 hours. Detected keyword : "${matchedKeyword}".`);
                    } else {
                        try {
                            await new Promise((resolve) => setTimeout(resolve, timeClaim));
                            await message.clickButton(button.customId);
                            lastClicked[button.customId] = currentTime;
                            console.log(`Button ${button.customId} clicked after ${timeClaim / 1000} seconds. Detected keyword : "${matchedKeyword}".`);
                        } catch (error) {
                            console.error('Error while clicking the button :', error);
                        }
                    }
                }
            }
            break;
        }
    }
}

client.on('ready', async () => {
    console.log(`-----------------------------------------------------------------------`);
    console.log(`                Create by github.com/RimuruTempest750                  `);
    console.log(`                   Mudae Auto-Claim and Auto-Roll                      `);
    console.log(`              License : GNU General Public License v3.0                `);
    console.log(`-----------------------------------------------------------------------`);
    console.log(`   Account ${client.user.username} is connected and ready to operate ! `);
    console.log(`-----------------------------------------------------------------------`);
    console.log(``);
    startPeriodicMessages();
});

client.on('messageCreate', async (message) => {
    if (message.channel.id !== channelId) return;

    handleKeywordDetection(message);
    if (message.content === '$wa') {
        lastMessageTime = Date.now();
    }
});

client.login(token).catch((error) => {
    console.error('Error while connecting the bot :', error);
});
