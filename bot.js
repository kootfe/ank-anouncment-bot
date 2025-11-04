import { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

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
        switch (msg.content) {
            case "!ping":
                msg.channel.send("Pong!");
                break;
            case "!info":
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

