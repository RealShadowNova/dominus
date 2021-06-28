import { OWNER } from '#config';
import { Precondition } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class UserPrecondition extends Precondition {
	public run(message: Message) {
		return OWNER === message.author.id ? this.ok() : this.error({ message: 'This command can only be used by my owner.' });
	}
}
