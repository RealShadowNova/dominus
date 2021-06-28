import { DominusCommand } from '#lib/structures';
import { ApplyOptions } from '@sapphire/decorators';
import type { Message } from 'discord.js';

@ApplyOptions<DominusCommand.Options>({
	description: 'Ping Pong!'
})
export class UserCommand extends DominusCommand {
	public async run(message: Message) {
		const msg = await message.channel.send('Ping?');
		const [diff, ping] = [
			(msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp),
			Math.round(this.context.client.ws.ping)
		];

		return msg.edit(`Pong! (Roundtrip took: ${diff}ms. Heartbeat: ${ping}ms.)`);
	}
}
