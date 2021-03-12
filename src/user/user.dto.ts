import { Field, InputType } from '@nestjs/graphql';
import { User } from './user.model';

@InputType()
export class CreateUserArgs
  implements Omit<User, '_id' | '_createdAt' | '_updatedAt'> {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;
}

@InputType()
export class UpdateUserArgs
  implements Partial<Omit<User, '_createdAt' | '_updatedAt'>> {
  @Field(() => String)
  _id: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;
}

@InputType()
export class GetUsersArgs {
  @Field(() => [String], { nullable: true })
  ids?: string[];
}

@InputType()
export class DeleteUserArgs {
  @Field(() => String)
  _id: string;
}
