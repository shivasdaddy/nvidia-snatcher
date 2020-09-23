import {Config} from '../config';
import {Logger} from '../logger';
import {TelegramClient} from 'messaging-api-telegram';

const telegram = Config.notifications.telegram;

const client = new TelegramClient({
	accessToken: telegram.accessToken
});

export function sendTelegramMessage(cartUrl: string) {
	(async () => {
		try {
			await client.sendMessage(telegram.chatId, cartUrl);
			Logger.info(`↗ telegram message sent to '${telegram.chatId}': ${cartUrl}`);
		} catch (error) {
			Logger.error(error);
		}
	})();
}
