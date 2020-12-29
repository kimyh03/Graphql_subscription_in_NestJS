import { InputType, PickType } from '@nestjs/graphql';
import { User } from 'src/shared/models/user.model';

@InputType()
export class EditProfileInput extends PickType(User, ['name'], InputType) {}
