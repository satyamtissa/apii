import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongoModule } from 'src/common/mongo.module';
import { ReportsService } from 'src/reports/reports.service';
///import { LocalStrategy } from 'local.strategy';
 
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    MongoModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '300s' },
    })],
  controllers: [AuthController],
  providers: [AuthService,ReportsService,LocalStrategy,JwtStrategy],
})
export class AuthModule {}
