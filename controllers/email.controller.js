// const {response} = require('express');

// const { Resend } = require ('resend');

// const resend = new Resend(process.env.RESEND_EMAIL);

// const sendEmail = async (req, res = response) => {

//     const { from, to, subject, message } = req.body
    
        
//         try {
//             await resend.emails.send({
//                 from: "onboarding@resend.dev",
//                 to: to,
//                 subject: subject,
//                 html: `<p>${message}</p>`
//             });

//             return res.json({
//                 ok: true,
//                 body: 'Correo enviado'
//             })
//         } catch(error) {
//             return res.status(400).json({
//                 ok: false,
//                 body: `No fue posible enviar el correo ${error}`
//             })
//         }
            
// }


// module.exports = {
//     sendEmail
// }

