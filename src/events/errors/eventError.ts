import { Event, EventErrorPayload, Events } from '@sapphire/framework';

export class UserEvent extends Event<Events.EventError> {
	public run(error: Error, payload: EventErrorPayload) {
		const { piece } = payload;

		return this.context.client.logger.error(
			`Encountered an error on listener "${piece.name}" for event "${piece.event}" at path "${piece.path}"`,
			error.stack
		);
	}
}
