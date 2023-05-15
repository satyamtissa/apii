import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { MyReports } from './entities/report.entity';
import axios from 'axios';
import { EmailRequestDtoObj } from './dto/sent-email.dto';


@Injectable()
export class ReportsService {

  async sendMail(input: EmailRequestDtoObj) {
    try {

      const requestBody = {
        personalizations: [{
          to: [{ email: `${input.to}` }]
        }],

        from: { email: `${input.from}` },
        subject: `${input.subject}`,
        content: [{
          type: 'text/html',
          value: `${input.body}`
        }]
      };
      const headerBody = {
        headers: {
          'Authorization': 'Bearer ' + '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',
        }
      }

      const emailRes = await axios.post('https://api.sendgrid.com/v3/mail/send',
        requestBody, headerBody
      );
      return {

        httpCode: 200
      };
    } catch (err) {
      return {

        httpCode: 400
      };
      console.log(`Error sending email to sandip.chaudhari22@gmail.com`, err)
    }

  }

}
