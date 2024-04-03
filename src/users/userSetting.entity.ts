import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
export class UserSetting {
  @PrimaryColumn()
  @Field()
  setting_id: string;

  @Column()
  @Field()
  user_id: string;

  @Column()
  @Field({ defaultValue: false })
  receivedNotifications: boolean;

  @Column()
  @Field({ defaultValue: false })
  receiveEmails: boolean;
}
