export class NavigationTimingSearch {
  static create(projectId, sAt, eAt) {
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
        aggs: this.getAvgQuery(),
      },
    };
  }

  static getAvgQuery() {
    return {
      redirect: { avg: { field: 'perf.redirect' } },
      appCache: { avg: { field: 'perf.appCache' } },
      dns: { avg: { field: 'perf.dns' } },
      tcp: { avg: { field: 'perf.tcp' } },
      ssl: { avg: { field: 'perf.ssl' } },
      request: { avg: { field: 'perf.request' } },
      response: { avg: { field: 'perf.response' } },
      processing: { avg: { field: 'perf.processing' } },
      onLoad: { avg: { field: 'perf.onLoad' } },
      unload: { avg: { field: 'perf.unload' } },
    };
  }
}
