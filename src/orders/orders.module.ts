import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersResolver, OrdersService],
})
export class OrdersModule {}
