import { DominusCommand } from '#lib/structures';
import { LightPaginatedMessage } from '#utils';
import { ApplyOptions } from '@sapphire/decorators';
import { isNewsChannel, isTextChannel } from '@sapphire/discord.js-utilities';
import { Args, CommandContext } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';

@ApplyOptions<DominusCommand.Options>({
	description: 'Display information on commands'
})
export class UserCommand extends DominusCommand {
	public async run(message: Message, args: DominusCommand.Args, context: CommandContext) {
		if (args.finished) return this.helpDisplay(message, context);

		const command = await args.pick(UserCommand.command);

		return this.helpSingle(message, { name: command.name, description: command.description, extended: command.extended }, context);
	}

	private helpSingle(message: Message, command: UserCommand.SingleCommandData, context: CommandContext) {
		const { name, description, extended } = command;
		const embed = new MessageEmbed()
			.setTitle(description)
			.setColor(message.member?.displayHexColor ?? '')
			.setFooter(`Command help for ${name}`);

		if (extended?.usages?.length)
			embed.addField(
				extended.usages.length > 1 ? '**Usages**:' : '**Usage**:',
				extended.usages.map((usage) => `*${context.prefix}${usage}*`).join('\n'),
				true
			);

		if (extended?.detailedDescription) embed.addField('**Detailed Description**:', extended.detailedDescription);

		return message.channel.send(embed);
	}

	private helpDisplay(message: Message, context: CommandContext) {
		if (!isTextChannel(message.channel) && !isNewsChannel(message.channel)) throw 'This method cannot be ran in DMs.';

		const categories = new Set<string>();

		for (const { category } of this.commands.array()) categories.add(category);

		const display = new LightPaginatedMessage(
			[...categories.values()].map((category) => ({
				embed: new MessageEmbed()
					.setTitle(category)
					.setDescription(
						this.commands
							.filter((command) => command.category === category)
							.map((command) => `\`${context.prefix}${command.name}\` > *${command.description}*`)
					)
			}))
		);

		display.run(message.author, message.channel);
	}

	private get commands() {
		return this.context.stores.get('commands');
	}

	private static command = Args.make<DominusCommand>((parameter, context) => {
		const { args, argument } = context;
		const command = args.message.client.stores.get('commands').get(parameter.toLowerCase()) as DominusCommand | undefined;

		return command
			? Args.ok(command)
			: Args.error({
					parameter,
					context,
					argument,
					message: `You must provide a command name.\n\n> **Tip**: Run \`${context.commandContext.prefix}help\` to see all available commands.`
			  });
	});
}

export namespace UserCommand {
	export interface SingleCommandData {
		name: string;
		description: string;
		extended?: DominusCommand.Extended;
	}
}
