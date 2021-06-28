import { CommandSuccessPayload, Event, Events } from '@sapphire/framework';

export class UserEvent extends Event<Events.CommandSuccess> {
	public run(payload: CommandSuccessPayload) {
		const { message, command } = payload;

		return this.context.logger.info(`${message.author.tag} (${message.author.id}) ran command: ${command.name}`);
	}
}
