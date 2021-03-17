import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateIdentityArgs {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class UpdateIdentityArgs {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class GetIdentityArgs {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  email: string;
}

@InputType()
export class DeleteIdentityArgs {
  @Field(() => String)
  _id: string;
}

@InputType()
export class LoginArgs {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
