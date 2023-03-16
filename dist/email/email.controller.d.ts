import { EmailService } from './email.service';
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    sendEmail(email: string): Promise<[import("@sendgrid/mail").ClientResponse, {}]>;
}
