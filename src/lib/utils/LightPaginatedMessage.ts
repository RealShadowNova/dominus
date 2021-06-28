import { LazyPaginatedMessage, MessagePage } from '@sapphire/discord.js-utilities';

export class LightPaginatedMessage extends LazyPaginatedMessage {
	public constructor(pages?: MessagePage[]) {
		super({ pages, actions: LazyPaginatedMessage.defaultActions.filter((action) => !['🔢', '⏪', '⏩'].includes(action.id)) });
	}
}
