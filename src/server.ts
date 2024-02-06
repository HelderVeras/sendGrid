import fastify from "fastify";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

type SendGrid = {
    to: string;
    from: string;
    subject: string;
    text: string;
    html: string;
}

const app = fastify();

app.post("/send-email", async (request, response) => {
    const { to, from, subject, text, html } = request.body as SendGrid;
  
    const msg = { to, from, subject, text, html };
  
    try {
      const res = await sgMail.send(msg);
      const status = res[0].statusCode;
      console.log("Email sent successfully. Status code:", status);
      response.status(200).send('Email enviado com sucesso');
    } catch (error) {
      console.error("Error sending email:", error);
      response.status(500).send('Erro ao enviar o email');
    }
  });
/*
app.post("/send-email", async (request, response) => {
   try{
    const { to, from, subject, text, html } = request.body as SendGrid;

    const msg = {
        to,
        from,
        subject,
        text,
        html,
      };

    sgMail
  .send(msg)
  .then((res) => {
    return response.status(200).send('Email enviado com suceso');
  })
  .catch((error) => {
    console.error(error);
    return response.status(500).send('Erro ao enviar o email');
  });
} catch(error){
       console.log(error)
       return response.status(500).send('Erro ao enviar o email');
    }
});
*/
    


app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(() => {
    console.log('Servidor funcionando');
})
