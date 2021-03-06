import { InputType, PickType } from '@nestjs/graphql';
import { User } from 'src/shared/models/user.model';

@InputType()
export class SignUpUserInput extends PickType(
  User,
  ['name', `email`],
  InputType,
) {}
