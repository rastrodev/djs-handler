const client = require("../index");

client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd) return interaction.followUp({ content: "An error has occured " });

        await interaction.deferReply({ ephemeral: cmd.ephemeral ? cmd.ephemeral : true }).catch(() => {});

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        if (!interaction.member.permissions.has(cmd.userPermissions || []))
            return interaction.followUp({ content: "You do not have permissions to use this command" });

        cmd.run(client, interaction, args);
    }

    if (interaction.isContextMenu()) {
        const command = client.slashCommands.get(interaction.commandName);
        await interaction.deferReply({ ephemeral: command.ephemeral ? command.ephemeral : true });
        if (command) command.run(client, interaction);
    }
});