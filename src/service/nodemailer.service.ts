import nodemailer from "nodemailer"

import {ServiceResponse} from "../models/service.response";
import {DateFormatter} from "../utils/datetime";
import {NodemailerParameters} from "../models/nodemailer.request";
import {ConfigService} from "./Environment.service";

// Initialize instance
const instance = ConfigService.instance;

// Date formatting class
const formatter = new DateFormatter(new Date());

// Function to send an email
export const sendEmailService = async (values: NodemailerParameters): Promise<ServiceResponse> => {

    let templateValues = {
        name: "Default Name",
        time: formatter.format(),
        timezone: "",
        companyName: 'Luwi Team',
        activity: "",
        activityLink: "",
    }

    if (values != null || values != undefined)  templateValues = values;

    try {

        // Create a transporter using Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: instance.userEmail,
                pass: instance.userPassword,
            },
        });

        const defaultTemplate = (parameters: NodemailerParameters): string => {

            return `
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>DEv TOday!</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                                margin: 0;
                                padding: 0;
                            }
                            .container { 
                                width: 100vw;
                                max-width: 600px;
                                margin: 0 auto;
                                background-color: #ffffff;
                                padding: 20px;
                                border-radius: 8px;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                            }
                            h1 {
                                color: #333333;
                            }
                            p {
                                color: #555555;
                            }
                            .activity-box {
                                background-color: #f0f8ff;
                                border-left: 4px solid #007acc;
                                padding: 12px;
                                margin: 20px 0;
                                border-radius: 4px;
                            }
                            .button {
                                display: inline-block;
                                padding: 12px 20px;
                                margin-top: 10px;
                                background-color: #007acc;
                                color: #ffffff;
                                text-decoration: none;
                                border-radius: 5px;
                                font-weight: bold;
                            }
                            .button:hover {
                                background-color: #005fa3;
                            }
                            .footer {
                                margin-top: 20px;
                                font-size: 12px;
                                color: #999999;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Here is what we have for you today!</h1>
                            <p>Dear ${parameters.name},</p>
                            <p>We’ve prepared something for you at <strong>${parameters.time}</strong>.</p>
                            
                            <div class="activity-box">
                                <strong>Today's Activity:</strong>
                                <p>${parameters.activity}</p>
                                <a href="${parameters.activityLink}" class="button" target="_blank">View Activity</a>
                            </div>
          
                            <p>If you have any questions, feel free to reply to this email.</p>
                            <p>Best regards,</p>
                            <p>The ${parameters.companyName} Team</p>
                            <div class="footer">
                                <p>&copy; 2025 ${parameters.companyName}. All rights reserved.</p>
                                <p>Time zone: ${parameters.timezone}</p>
                            </div>
                        </div>
                    </body>
                </html>
            `;
        }

        // Email details
        const mailOptions = {
            from: instance.userEmail,
            to: instance.emailRecipient,
            subject: instance.emailSubject,
            html: defaultTemplate(templateValues),
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        return {
            success: true,
            message:"✅ Email sent successfully!",
            time: formatter.format(),
            data: {value: info}
        };

    } catch (error:any) {
        return {
            success: false,
            message:`❌ Error sending email: ${error.message}`,
            time: formatter.format(),
            data: {value: error}
        };
    }
};