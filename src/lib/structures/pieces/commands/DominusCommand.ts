import type { Args as SapphireArgs } from '@sapphire/framework';
import type { PieceContext } from '@sapphire/pieces';
import { SubCommandPluginCommand, SubCommandPluginCommandOptions } from '@sapphire/plugin-subcommands';

export abstract class DominusCommand extends SubCommandPluginCommand<DominusCommand.Args> {
	public constructor(context: PieceContext, options: DominusCommand.Options) {
		super(context, DominusCommand.resolveOptions(options));

		this.fullCategory = options.fullCategory ?? ['General'];
		this.extended = options.extended;
	}

	public get category() {
		return this.fullCategory[0];
	}

	protected static resolveOptions(options: DominusCommand.Options) {
		return options;
	}
}

export namespace DominusCommand {
	export interface Options extends SubCommandPluginCommandOptions {
		fullCategory?: string[];
		extended?: Extended;
	}

	export interface Extended {
		usages?: string[];
		detailedDescription?: string;
	}

	export type Args = SapphireArgs;
}

declare module '@sapphire/framework' {
	interface Command {
		fullCategory: string[];
		category: string;
		extended?: DominusCommand.Extended;
	}

	interface CommandOptions {
		fullCategory?: string[];
		extended?: DominusCommand.Extended;
	}
}
