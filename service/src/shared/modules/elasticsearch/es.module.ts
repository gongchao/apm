import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { ELASTICSEARCH_PROVIDER } from './es.constants';
import { Client } from 'elasticsearch';

@Global()
@Module({})
export class EsModule {
  static register(clientOptions): DynamicModule {
    const provider: Provider = {
      provide: ELASTICSEARCH_PROVIDER,
      useFactory: (): Client => {
        return new Client(clientOptions);
      },
    };
    return {
      module: EsModule,
      providers: [provider],
      exports: [provider],
    };
  }
}
