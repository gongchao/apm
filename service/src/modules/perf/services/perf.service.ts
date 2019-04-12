import { Injectable } from '@nestjs/common';
import { InjectEs } from '@shared/modules/elasticsearch/es.decorator';
import { Client } from 'elasticsearch';
import { NavigationTimingSearch } from '../searchs/navigation-timing.search';
import { keyBy } from 'lodash';
import { PERF_FIELDS } from '../constants';
import { NavigationTimingGroupByDateSearch } from '../searchs/navigation-timing-group-by-date.search';
import { UrlsSearch } from '../searchs/urls.search';

@Injectable()
export class PerfService {
  constructor(
    @InjectEs() private readonly es: Client,
  ) {
  }

  async getUrls(projectId, keyword, limit, sAt, eAt) {
    return await this.es.search(UrlsSearch.create(projectId, keyword, limit, sAt, eAt))
      .then(({ aggregations }) => ({ data: aggregations.urls.buckets }))
      .catch(() => {
        return { data: [] };
      });
  }

  async getNavigationTiming(projectId, sAt, eAt) {
    return await this.es.search(NavigationTimingSearch.create(projectId, sAt, eAt))
      .then(({ aggregations }) => aggregations)
      .catch(() => {
        return keyBy(PERF_FIELDS.map(key => ({ key, value: 0 })), 'key');
      });
  }

  async getNavigationTimingGroupByDate(projectId, sAt, eAt, interval) {
    return await this.es.search(NavigationTimingGroupByDateSearch.create(projectId, sAt, eAt, interval))
      .then(({ aggregations }) => ({ data: aggregations.list.buckets }))
      .catch(() => {
        return { data: [] };
      });
  }
}
