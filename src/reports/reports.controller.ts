import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmailRequestDtoObj } from './dto/sent-email.dto';
import { ReportsService } from './reports.service';

@Controller('my-reports')
export class ReportsController {
  constructor(private myReportService: ReportsService) {}

  // Get All
 
  @Post()
  sendEmail(@Body() emailRequestDto: EmailRequestDtoObj) {
    return this.myReportService.sendMail(emailRequestDto);
  }
}
