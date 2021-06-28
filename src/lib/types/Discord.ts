import type { Guild, GuildMember, Message, NewsChannel, TextChannel } from 'discord.js';

export interface GuildMessage extends Message {
	channel: TextChannel | NewsChannel;
	readonly guild: AlwaysGuild;
	readonly member: GuildMember;
}

export interface AlwaysGuild extends Guild {
	me: GuildMember;
}
