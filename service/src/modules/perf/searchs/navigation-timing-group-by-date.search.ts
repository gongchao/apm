import { NavigationTimingSearch } from './navigation-timing.search';

export class NavigationTimingGroupByDateSearch {
  static create(projectId, sAt, eAt, interval = '30m') {
    return {
      index: `perf_${projectId}`,
      type: 'perf',
      size: 0,
      body: {
        query: {
          bool: {
            must: [
              { range: { '@timestamp': { gte: sAt, lte: eAt } } },
            ],
          },
        },
        aggs: {
          list: {
            date_histogram: {
              field: '@timestamp',
              format: 'YYYY-MM-dd HH:mm:ss',
              time_zone: '+08:00',
              interval,
            },
            aggs: NavigationTimingSearch.getAvgQuery(),
          },
        },
      },
    };
  }
}
