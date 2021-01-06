import { Global, Module } from '@nestjs/common';
import { PUB_SUB } from './pubsub.constants';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
import { PubSub } from 'apollo-server-express';

const options = {
  host: '172.31.42.111',
  port: 6379,
  connectTimeout: 10000,
};
/*
const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
});
*/
const pubsub = new PubSub();

@Global()
@Module({
  providers: [
    {
      provide: PUB_SUB,
      useValue: pubsub,
    },
  ],
  exports: [PUB_SUB],
})
export class PubSubModule {}
