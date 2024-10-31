import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '465'),
    secure: true, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
export class EmailService {

    static async send(to: string, subject: string, text: string, html?: string) {
        try {
            await transporter.sendMail({
                from: `"Callselly Notifications" <${process.env.EMAIL_USER}>`,
                to,
                subject,
                text,
                html,
            });
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}