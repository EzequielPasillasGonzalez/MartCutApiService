const { Transporter } = require('../models/index.models')

//? Enviar mails
const enviarCorreos = async (email, codigo_verficacion) => {
    try {

        await Transporter.sendMail({
            from: `"Código de Verificación" <${process.env.MAILER_EMAIL}>`, // sender address
            to: email, // list of receivers
            subject: "Código de Verificación CutMart", // Subject line            
            html: `
            <div style="border-radius: 25px 25px 25px 25px; border: 2px solid #003764;">
            <div style="font-family: Arial, sans-serif, 'Open Sans'" >
                <div align="center" style="background-color:#003764;border-radius: 18px 18px 0px 0px;
                border: 2px solid #003764;">
                    <div class="adM">                    
                    </div>           
                    <img src="https://res.cloudinary.com/dpjkjdwbw/image/upload/v1715272298/y8p1krxt66twebhxb7lv.jpg" width="100px" height="100px" class="CToWUd" data-bit="iit">         
                </div>
                <div style="color:#003764;">
                    <h1 style="text-align:center"><span class="il">Código</span> de verificación </h1>
                    <h3 style="text-align:center">
                        Has solicitado un <span class="il">código</span> de verificación, tu <span class="il">código</span> es:
                    </h3>
                    <h1 style="text-align:center">
                        ${codigo_verficacion}
                    </h1>                    
                </div>
            </div>
          </div>              
            `,
        });

        return true
    } catch (error) {
        throw new Error(`Hubo un error con el envío del correo. ${error.message}`)
    }
}


module.exports = {
    enviarCorreos
}