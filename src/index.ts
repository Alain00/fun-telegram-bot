import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot("1348684083:AAF9r7ujg0xJvDnCMwBKj6fkLy81vsRsBZw", {polling: true});

bot.onText(/@all/, async (msg) =>{
    const admins = await bot.getChatAdministrators(msg.chat.id);
    let message = ""
    const me = await bot.getMe()
    admins.forEach((admin, index) => {
        if (admin.user.id == me.id) return;
        message += `[${admin.user.first_name}](tg://user?id=${admin.user.id})`+ (index != admins.length - 1 ?  ", " : "")
    })
    bot.sendMessage(msg.chat.id, message, {
        parse_mode: 'Markdown'
    });
})

bot.on('text', async (msg) => {
    const prob = Math.random();
    if (prob > 0.8){
        bot.sendMessage(msg.chat.id, `${msg.from.first_name} no te cansas de hablar tanta 💩?`, {
            reply_to_message_id: msg.message_id
        })
    }
})