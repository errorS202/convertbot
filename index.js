const { Telegraf, Extra } = require('telegraf');
const https = require('https');
const express = require('express');
const app = express();
const token = process.env.token;

const bot = new Telegraf(token);
app.use(express.json());
app.use(bot.webhookCallback('/bot'))

app.get('/', (req, res) => { res.sendStatus(200) });

app.get('/ping', (req, res) => { res.status(200).json({ message: 'Ping successful' }); });


function keepAppRunning() {
    setInterval(() => {
        https.get(`${process.env.RENDER_EXTERNAL_URL}/ping`, (resp) => {
            if (resp.statusCode === 200) {
                console.log('Ping successful');
            } else {
                console.error('Ping failed');
            }
        });
    }, 5 * 60 * 1000);
}


bot.command(['start', 'help'], async (ctx) => {
    const messages = `
تم تغيير البوت السابق 😔، ونأسف لذلك. تم إطلاق بوت جديد يتمتع بنفس الصفات والخصائص السابقة. نأمل أن تجدوا البوت الجديد مفيدًا وممتعًا كما كان السابق. شكرًا لدعمكم وتفهمكم.    `
    const replyMarkup2 = {
        inline_keyboard: [
            [{ text: 'جرب البوت الان', url: "https://t.me/LktTrackBot" }],
        ],
    };
    ctx.reply(messages, { reply_markup: replyMarkup2 });
});

bot.on('text', (ctx) => {
    const messages = `
تم تغيير البوت السابق 😔، ونأسف لذلك. تم إطلاق بوت جديد يتمتع بنفس الصفات والخصائص السابقة. نأمل أن تجدوا البوت الجديد مفيدًا وممتعًا كما كان السابق. شكرًا لدعمكم وتفهمكم.    `
    const replyMarkup2 = {
        inline_keyboard: [
            [{ text: 'جرب البوت الان', url: "https://t.me/LktTrackBot" }],
        ],
    };
    ctx.reply(messages, { reply_markup: replyMarkup2 });
});

app.listen(3000, () => {
    bot.telegram.setWebhook(`${process.env.RENDER_EXTERNAL_URL}/bot`)
        .then(() => {
            console.log('Webhook Set ✅ & Server is running on port 3000 💻');
            keepAppRunning();
        });
});
