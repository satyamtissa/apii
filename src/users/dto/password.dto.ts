import { PickType } from '@nestjs/swagger';
 

import { ADDTOPASSWORD } from '../entities/password.entity';

export class CreateAddToPasswordDto extends PickType(ADDTOPASSWORD, [
  
'id',
  'email',
  'oldpassword',
  'newpassword'
 
   
]) {}
