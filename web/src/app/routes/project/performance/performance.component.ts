import { Component, OnInit } from '@angular/core';
import { DataSet } from '@antv/data-set';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  templateUrl: './performance.html',
  styleUrls: ['./performance.less'],
})
export class PerformanceComponent implements OnInit {
  query = {
    range: [],
    url: '*',
    interval: '30m'
  };

  isDataLoading: boolean;

  data = [];

  isDataGroupByDateLoading: boolean;

  dataGroupByDate = [];

  constructor(
    private readonly http: HttpClient,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    const currentDate = moment();
    this.query.range = [moment(currentDate).add(-1, 'h').toDate(), currentDate.toDate()];

    this.onSearch();
  }

  onSearch() {
    this.getNavigationTimingData();
    this.getNavigationTimingGroupByDate();
  }

  dataHandle(): any {
    const id = this.route.snapshot.parent.params.id;
    const { range, url, interval } = this.query;
    const [sAt, eAt] = (range || [] as any);

    return {
      id,
      url,
      sAt: sAt.getTime(),
      eAt: eAt.getTime(),
      interval,
    };
  }

  getNavigationTimingData() {
    this.isDataLoading = true;
    return this.http.get('/api/perf/navigationTiming', {
      params: this.dataHandle(),
    })
    .pipe(finalize(() => this.isDataLoading = false))
    .subscribe(data => {
     this.data = Object.keys(data).map(key => {
       return { State: 'Timing', key, value: data[key].value };
     });
    });
  }

  getNavigationTimingGroupByDate() {
    this.isDataGroupByDateLoading = true;
    return this.http.get('/api/perf/navigationTimingGroupByDate', {
      params: this.dataHandle(),
    })
    .pipe(finalize(() => this.isDataGroupByDateLoading = false))
    .subscribe(({ data }: any) => {
     const dv = new DataSet.View().source(data);
     this.dataGroupByDate = dv.transform({
       type: 'fold',
       fields: ['redirect', 'appCache', 'dns', 'tcp', 'ssl', 'request', 'response', 'processing', 'onLoad', 'unload'],
       key: 'key',
       value: 'value',
       retains: ['key_as_string'],
     }).rows.map(x => {
       return { key_as_string: x.key_as_string, key: x.key, value: x.value.value || 0 };
     });
    });
  }
}
