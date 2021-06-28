import { CommandErrorPayload, Event, Events, UserError } from '@sapphire/framework';

export class UserEvent extends Event<Events.CommandError> {
	public async run(error: Error, payload: CommandErrorPayload) {
		const { message, piece } = payload;

		if (typeof error === 'string') return message.channel.send(error);
		if (error instanceof UserError) return message.channel.send(error.message);

		this.context.client.logger.error(`Encountered an error on command "${piece.name}" at path "${piece.path}"`, error.stack);

		return message.channel.send('commandError');
	}
}
