import {Config} from '../config';
import {Link} from '../store/model';
import {Logger} from '../logger';
import Mail from 'nodemailer/lib/mailer';
import nodemailer from 'nodemailer';

const [email, phone] = [Config.notifications.email, Config.notifications.phone];

const transporter = nodemailer.createTransport({
	auth: {
		pass: email.password,
		user: email.username
	},
	service: 'gmail'
});

export function sendSMS(cartUrl: string, link: Link) {
	const mailOptions: Mail.Options = {
		attachments: link.screenshot ? [
			{
				filename: link.screenshot,
				path: `./${link.screenshot}`
			}
		] : undefined,
		from: email.username,
		subject: `🚨 [${link.brand} (${link.series})] ${link.model} - IN STOCK`,
		text: cartUrl,
		to: generateAddress()
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			Logger.error(error);
		} else {
			Logger.info(`↗ email sent: ${info.response as string}`);
		}
	});
}

function generateAddress() {
	const carrier = phone.carrier.toLowerCase();
	if (carrier && phone.availableCarriers.has(carrier)) {
		return [phone.number, phone.availableCarriers.get(carrier)].join('@');
	}
}
