const Discord = require('discord.js');
const logger = require('../util/logging')
const fs = require('fs')
// const botRootCommand = require('./commands/root/root.js')

// Show unhandled rejections
process.on('unhandledRejection', function(reason, promise) {
    console.log(promise);
});

class Bot {
    setup() {
        // this.cmd = botRootCommand
        this.client = new Discord.Client();
        this.client.commands = new Discord.Collection();
        this.prefix = "$"

        const commandFiles = fs.readdirSync('./commands').filter(file => { return file.endsWith('.js') && ! file.endsWith('test.js')} );

        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            this.client.commands.set(command.name, command);
        }

        this.registerEventHandlers()
    }

    login (token) {
        this.client.login(token);
        // this.prefix = this.client.user
    }

    registerEventHandlers() {
        this.client.once('ready', () => {
            logger.info('Bot Ready!')
        });

        this.client.on('message', message => {
            if (!message.content.startsWith(this.prefix) || message.author.bot) return;
        
            const args = message.content.slice(this.prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();
        
            if (!this.client.commands.has(command)) return;
        
            try {
                this.client.commands.get(command).execute(message, args);
            } catch (error) {
                logger.warn(error)
                message.reply(error)
            }
        });
    }
}

const main = () => {
    var bot = new Bot()
    bot.setup()
    bot.login(process.env.TOKEN)
}

try {
    main()
} catch (error) {
    console.log(error)
}

module.exports = {
    Bot
}