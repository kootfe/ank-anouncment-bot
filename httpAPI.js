import express from 'express';
import dotenv from 'dotenv';
dotenv.config()

import { client, sendAnounceEmbed, setupBotCommands} from "./bot.js"

const app = express();
app.use(express.json());
setupBotCommands();


client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

const SECRET_TOKEN = process.env.SEC_TOKEN;
app.post("/anc", async(req,res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || authHeader !== `Bearer ${SECRET_TOKEN}`) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    const { type, title, desc, thumbnail, url } = req.body;
    if (!title || !type || !desc || !thumbnail || !url) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields",
        });
    }
    try {
        let channel_id;
        let channel_msg;
        if (type == "ep") {
            channel_id = process.env.EP_ID;
            channel_msg = "Yeni bölüm! ||@everyone||";
        } else if (type == "ser") {
            channel_id = process.env.SERIE_ID;
            channel_msg = "Yeni seri! ||@everyone||";
        } else {
            return res.status(400).json({ success:false, message:"Invalid type" });
        }
        const chn = await client.channels.fetch(channel_id);

        if (!chn) {
            return res.status(400).json({
                success: false,
                message: "Channel not found!"
            });
        }

        await sendAnounceEmbed(channel_msg, chn, title, desc, thumbnail, url);
        res.json({ success:true });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

client.login(process.env.TOKEN);

app.listen(process.env.PORT, () => {
    console.log(`API Listening on ${process.env.PORT}`);
});
