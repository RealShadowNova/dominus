import { DominusCommand } from '#lib/structures';
import { ApplyOptions } from '@sapphire/decorators';
import { Stopwatch } from '@sapphire/stopwatch';
import { Type } from '@sapphire/type';
import { codeBlock, isThenable } from '@sapphire/utilities';
import type { Message } from 'discord.js';
import { inspect } from 'util';

@ApplyOptions<DominusCommand.Options>({
	aliases: ['ev'],
	description: 'Evaluate js code.',
	preconditions: ['OwnerOnly'],
	strategyOptions: { flags: ['async', 'json', 'silent', 'showHidden', 'hidden'], options: ['depth'] }
})
export class UserCommand extends DominusCommand {
	public async run(message: Message, args: DominusCommand.Args) {
		const code = await args.rest('string');
		const lang = args.getFlags('json') ? 'json' : 'js';

		const { success, result, time, type } = await this.eval(message, args, code);

		if (args.getFlags('silent'))
			if (!success && result && (result as Error).stack) return this.context.logger.fatal((result as Error).stack);
			else return;

		const output = codeBlock(lang, result);
		const footer = codeBlock('ts', type.toString());

		return message.channel.send(`**Output**:\n${output}\n**Type**:\n${footer}\n${time}`);
	}

	private async eval(_msg: Message, args: DominusCommand.Args, code: string) {
		const stopwatch = new Stopwatch();
		let success: boolean | undefined;
		let syncTime: string | undefined;
		let asyncTime: string | undefined;
		let result: unknown | undefined;
		let thenable = false;
		let type: Type | undefined;

		try {
			if (args.getFlags('async')) code = `(async () => {\n${code}})()`;

			// eslint-disable-next-line no-eval
			result = eval(code);
			syncTime = stopwatch.toString();
			type = new Type(result);

			if (isThenable(result)) {
				thenable = true;
				stopwatch.restart();
				result = await result;
				asyncTime = stopwatch.toString();
			}

			success = true;
		} catch (error) {
			if (!syncTime) syncTime = stopwatch.toString();
			if (thenable && !asyncTime) asyncTime = stopwatch.toString();
			if (!type) type = new Type(error);

			result = error;
			success = false;
		}

		stopwatch.stop();

		if (typeof result !== 'string') {
			result =
				result instanceof Error
					? result.stack
					: args.getFlags('json')
					? JSON.stringify(result, null, 4)
					: inspect(result, { depth: Number(args.getOption('depth') ?? 0), showHidden: args.getFlags('showHidden', 'hidden') });
		}

		return { success, type, time: this.formatTime(syncTime, asyncTime ?? ''), result };
	}

	private formatTime(syncTime: string, asyncTime: string) {
		return `⏱️ ${asyncTime ? `${asyncTime}<${syncTime}>` : `${syncTime}`}`;
	}
}
