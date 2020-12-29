import { InputType, PickType } from '@nestjs/graphql';
import { Post } from 'src/shared/models/post.model';

@InputType()
export class CreatePostInput extends PickType(Post, ['text'], InputType) {}
