import { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import fs from "fs";

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

export const prefix = '!';

export const sendAnounceEmbed = async (msg, channel, title, desc, iurl, eurl) => {
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(desc)
        .setFooter({ text: "Anikagai Forever" })
        .setThumbnail(iurl)
        .setTimestamp()
        .setColor(0x000000);

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setLabel("OKU!")
            .setStyle(ButtonStyle.Link)
            .setURL(eurl)
    );

    await channel.send({ embeds: [embed], components: [row], content: msg });
};

export const setupBotCommands = () => {
    client.on("messageCreate", (msg) => {
        if (msg.author.bot) return;
        if (!msg.content.startsWith(prefix));
        const cmdname = msg.content.slice(prefix.length).split(' ')[0];
        switch (cmdname) {
            case "ping":
                msg.channel.send("Pong!");
                break;
            case "info":
                const embed = new EmbedBuilder()
                    .setTitle("Anikagai Anime ve Webtoon!")
                    .setColor(0x000000)
                    .setDescription("Türkiyenin en kaliteli anime & webtoon sitesi!")
                    .setFooter({ text: "Anikagai Forever" })
                    .setThumbnail("https://anikagai.com/user/img/logo/logo.png")
                    .setTimestamp();

                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setURL("https://anikagai.com")
                        .setStyle(ButtonStyle.Link)
                        .setLabel("Anikagai"),
                    new ButtonBuilder()
                        .setURL("https://anikagai.com/contact")
                        .setStyle(ButtonStyle.Link)
                        .setLabel("Bize ulaş")
                );

                msg.channel.send({ embeds: [embed], components: [row], content: "_ _" });
                break;
        }
    });
};

const commands = JSON.parse(fs.readFileSync('./commands.json', 'utf-8'));

client.on('messageCreate', async message => {
    console.log("test");
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const cmdname_t = message.content.slice(prefix.length).split(' ')[0];
    const command = commands[cmdname_t];

    if (!command) return;

    const embed = new EmbedBuilder();

    if (command.title) embed.setTitle(command.title);
    if (command.desc) embed.setDescription(command.desc);
    if (command.color) embed.setColor(command.color);
    if (command.foot) embed.setFooter({ text: command.foot }); // must be object, not string
    if (command.thumb) embed.setThumbnail(command.thumb);
    if (command.time) embed.setTimestamp();
    if (command.fields) embed.addFields(command.fields);

    message.channel.send({ embeds: [embed] });
});
