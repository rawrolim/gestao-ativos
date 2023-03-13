import { transporter, mailOptions } from '@/config/nodemailer';

const handler = async (req, res) => {
    const HTML = `
    <html>
        <body style="background-color: rgb(72, 70, 184); border: 1px solid #4444; border-radius: 5px;">
            <div style="padding: 3rem!important; flex: 0 0 auto; width: 100%; ">
                <p>Olá ${req.body.nome},</p>
                <p>Nós recebemos sua solicitação de login, para ter o acesso liberado é necessário confirmar o email.</p>
                <p>Clique no botão abaixo.</p>
                <div style="
                text-align: center!important;
                margin-top: 3rem!important;
                ">
                    <a style="
                        background-color: #6f42c1;
                        color: white;
                        padding: .5rem 1rem;
                        font-size: 1.25rem;
                        border-radius: .3rem;
                        display: inline-block;
                        font-weight: 400;
                        line-height: 1.5;
                        text-align: center;
                        text-decoration: none;
                        vertical-align: middle;
                        cursor: pointer;
                        user-select: none;
                        border: 1px solid transparent;
                        box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
                        " target="_blank" href="${process.env.VERCEL_URL + 'email/' + req.body.id}">Clique aqui</a>
                </div>
            </div>
        </body>
    </html>
    ` ;

    const retorno = await transporter.sendMail({
        ...mailOptions,
        subject: "Verificação da gestão de ativos",
        html: HTML,
        to: req.body.email
    })
    res.status(200).json(retorno);
}

export default handler;
