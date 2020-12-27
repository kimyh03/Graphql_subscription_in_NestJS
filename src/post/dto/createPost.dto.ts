import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { BaseOutput } from '../../shared/baseOutput';
import { Post } from '../post';

@InputType()
export class CreatePostInput extends PickType(Post, ['text'], InputType) {}

@ObjectType()
export class CreatePostOutput extends BaseOutput {}
