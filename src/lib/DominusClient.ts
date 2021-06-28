import '@sapphire/plugin-logger/register';

import { Piece, SapphireClient, Store } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';

export class DominusClient extends SapphireClient {
	public constructor(options?: ClientOptions) {
		super(options);

		Store.defaultStrategy.onLoad = (store: Store<Piece>, piece: Piece) =>
			this.logger.debug(`Loaded '${piece.name}' ${store.name.slice(0, store.name.length - 1)}`);
		Store.defaultStrategy.onLoadAll = (store: Store<Piece>) => this.logger.info(`Loaded ${store.size} ${store.name}`);
		Store.defaultStrategy.onUnload = (store: Store<Piece>, piece: Piece) =>
			this.logger.debug(`Unloaded '${piece.name}' ${store.name.slice(0, store.name.length - 1)}`);
	}
}

declare module 'discord.js' {
	interface Client {}
}
