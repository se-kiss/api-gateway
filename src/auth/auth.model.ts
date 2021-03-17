import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Identity {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  _createdAt: string;

  @Field(() => String)
  _updatedAt: string;

  constructor(args: Identity) {
    Object.assign(this, args);
  }
}

@ObjectType()
export class Token {
  @Field(() => String)
  token: string;

  constructor(args: Token) {
    Object.assign(this, args);
  }
}

@ObjectType()
export class Me {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  email: string;
}
