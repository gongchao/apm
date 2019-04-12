import { Inject } from '@nestjs/common';
import { ELASTICSEARCH_PROVIDER } from './es.constants';

export const InjectEs = () => Inject(ELASTICSEARCH_PROVIDER);
