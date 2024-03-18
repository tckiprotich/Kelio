import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';


export async function POST(req: Request, res: NextResponse) {
    const body = await req.json()
    console.log(body)


   const { firstName: name, email, message } = body;
    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,

        auth: {
            user: 'tckiprotich@gmail.com',
            pass: 'oxpijfmonxasqgel',
        },
    });

    const mailOptions: Mail.Options = {
        from: 'keliosharon@gmail.com',
        to: 'keliosharon@gmail.com',
        // cc: email, (uncomment this line if you want to send a copy to the sender)
        subject: `Message from ${name} (${email})`,
        text: message,
    };

    const sendMailPromise = () =>
        new Promise<string>((resolve, reject) => {
            transport.sendMail(mailOptions, function (err: any) {
                if (!err) {
                    resolve('Email sent');
                } else {
                    reject(err.message);
                }
            });
        });

    try {
        await sendMailPromise();
        // @ts-ignore
        return Response.json({ message: 'Message Sent', status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }

}