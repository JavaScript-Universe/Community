const ascii = require('ascii-table')
const { readdirSync } = require('fs')

let table = new ascii('Bot Commands')
table.setHeading('File', 'Command', 'Category', 'Perm Level');

module.exports = (client) => {
    readdirSync('./commands/').forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, pull.name, pull.category, pull.premLevel);
            } else {
                table.addRow(file, 'Invalid command config.');
                continue;
            }
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    })
}