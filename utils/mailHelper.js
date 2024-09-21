import transporter from "../config/transporter.config";
import config from "../config/index"
import { text } from "express";

const sender={
    address:config.SMTP_EMAIL,
    name:"Mailtrap Test"
}


const mailHelper = async (options)=>{
    const message = {
        from:sender,
        to:options.email,
        subject:options.subject,
        text:options.text
    }

    await transporter.sendMail(message)

}

export default mailHelper;