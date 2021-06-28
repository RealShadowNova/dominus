import { CommandDeniedPayload, Event, Events, UserError } from '@sapphire/framework';

export class UserEvent extends Event<Events.CommandDenied> {
	public async run(error: UserError, payload: CommandDeniedPayload) {
		const { message } = payload;

		return message.channel.send(error.message);
	}
}
