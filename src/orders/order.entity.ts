import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/user.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'order' })
@ObjectType()
export class Order {
  @PrimaryColumn()
  @Field()
  order_code: string;

  @Field()
  @Column()
  order_type: string;

  @Field()
  @Column()
  supervisitor: string;

  @Field()
  @Column()
  buy_date: Date;

  @Field()
  @Column()
  received_date: Date;

  @Field()
  @Column()
  creation_date: Date;

  @Field()
  @Column()
  transfer_method: string;

  @Field()
  @Column()
  promotion_code: string;

  @Field()
  @Column()
  method: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  original_price: number;

  @Field()
  @Column()
  vat: number;

  @Field()
  @Column()
  special_price: number;

  @Field()
  @Column()
  total_amount: number;
}
