import {Config} from '../config';
import {Link} from '../store/model';
import {Logger} from '../logger';
import Mail from 'nodemailer/lib/mailer';
import nodemailer from 'nodemailer';

const email = Config.notifications.email;

const transporter = nodemailer.createTransport({
	auth: {
		pass: email.password,
		user: email.username
	},
	service: 'gmail'
});

export function sendEmail(cartUrl: string, link: Link) {
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
		to: email.username
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			Logger.error(error);
		} else {
			Logger.info(`↗ email sent: ${info.response as string}`);
		}
	});
}
