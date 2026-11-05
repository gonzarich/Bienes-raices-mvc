import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: process.env.EMAIL_SECURE === "true",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });


    const { nombre, email, token } = datos;

    // Enviar el Email
    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Confirma tu cuenta en BienesRaices.com',
        text: 'Confirma tu cuenta en BienesRaices.com',
        html: `
            <p>Hola ${nombre}, confirma tu cuenta en BienesRaices.com</p>

            <p>Tu cuenta ya esta lista, debes confirmarla en el siguiente enlace:</p>
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">Confirma tu cuenta</a>

            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    })
}



const emailOlvidePassword = async (datos) => {

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: process.env.EMAIL_SECURE === "true",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });


    const { nombre, email, token } = datos;

    // Enviar el Email
    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Restablece tu contraseña en BienesRaices.com',
        text: 'Restablece tu contraseña en BienesRaices.com',
        html: `
            <p>Hola ${nombre}, has solicitado restablecer tu contraseña en BienesRaices.com</p>

            <p>Sigue el siguiente enlace para restablecer tu contraseña:</p>
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/olvide-password/${token}">Restablece tu contraseña</a>

            <p>Si tu no solicitaste el cambio de contraseña, puedes ignorar este mensaje</p>
        `
    })
}

export {
    emailRegistro,
    emailOlvidePassword
}