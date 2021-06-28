import { CLIENT_OPTIONS, TOKEN } from '#config';
import { DominusClient } from '#root/lib/DominusClient';

const client = new DominusClient(CLIENT_OPTIONS);

try {
	await client.login(TOKEN);
} catch (error) {
	client.logger.fatal(error);
	await client.destroy();
	process.exit(1);
}
