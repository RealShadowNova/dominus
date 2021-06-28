// Remove `.example` from the file extension to configure Dominus.

import { LogLevel } from '@sapphire/framework';
import { ClientOptions, Intents } from 'discord.js';

export const PREFIX = 'd!';

export const OWNER = '';

export const CLIENT_ID = '';

export const DEV = true;

export const CLIENT_OPTIONS: ClientOptions = {
	shards: 'auto',
	ws: {
		intents: new Intents([Intents.NON_PRIVILEGED, Intents.FLAGS.GUILD_MEMBERS])
	},
	presence: {
		activity: {
			type: 'LISTENING',
			name: 'Dominus, help'
		}
	},
	caseInsensitiveCommands: true,
	loadDefaultErrorEvents: false,
	logger: {
		level: LogLevel.Info
	}
};

// #region secrets
export const TOKEN = '';
// #endregion
