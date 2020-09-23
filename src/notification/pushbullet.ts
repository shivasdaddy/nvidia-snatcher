import {Config} from '../config';
import {Link} from '../store/model';
import {Logger} from '../logger';
import PushBullet from 'pushbullet';

const pushBulletApiKey = Config.notifications.pushBulletApiKey;

export function sendPushBulletNotification(cartUrl: string, link: Link) {
	const pusher = new PushBullet(pushBulletApiKey);
	const title = `🚨 [${link.brand} (${link.series})] ${link.model} - IN STOCK`;

	pusher.note({}, title, cartUrl, (err: Error, result: string) => {
		if (err) {
			Logger.error(err);
		} else {
			Logger.info(`↗ pushbullet notification sent: ${result}`);
		}
	});
}
