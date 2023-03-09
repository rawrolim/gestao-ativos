import nodemailer from 'nodemailer';

const email = process.env.EMAIL;

export const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: 'alemaorolim@gmail.com',
        pass: 'jtqkzeiyjwgtawmi'
    }
});

export const mailOptions = {
    from: email
}