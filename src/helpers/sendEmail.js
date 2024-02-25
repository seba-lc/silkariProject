const transporter = require("../settings/mailer");

const sendEmail = async (userEmail, subject, item, quantity) => {
  let errors = {};
  try {
    await transporter.sendMail({
      from: '"Marketar" <projectmarket87@gmail.com>', // sender address
      to: userEmail,//"bar@example.com, baz@example.com", // list of receivers
      subject: subject, // Subject line
      html: `
      <p>Just a reminder that we are running out of ${item}:</p>
      <p>We have ${quantity + ' ' + item} left</p>
      <br><br><hr><br><br>
      <div>
        <img src="cid:brandImg" width="200" alt="brand-image" />
        <h1>Silkari Lagoons</h1>
      </div>
      `, // html body
      attachments: [
        {
          filename: 'brand-image.png',
          path: __dirname + './../assets/brand-image.png',
          cid: 'brandImg'
        }
      ]
    });
    return errors;
  } catch (error) {
    console.log(error);
    errors.servidor = "Error al enviar el email";
    return errors;
  }
}

module.exports = sendEmail;