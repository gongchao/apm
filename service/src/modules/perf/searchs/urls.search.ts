export class UrlsSearch {
  static create(projectId, keyword, limit, sAt, eAt) {
    return {
      index: `perf_${projectId}`,
      type: 'perf',
      size: 0,
      body: {
        query: {
          bool: {
            must: [
              { range: { '@timestamp': { gte: sAt, lte: eAt } } },
              {
                query_string: {
                  query: keyword,
                  fields: ['url.keyword'],
                },
              },
            ],
          },
        },
        aggs: {
          urls: {
            terms: {
              field: 'url.keyword',
              size: limit,
            },
          },
        },
      },
    };
  }
}
