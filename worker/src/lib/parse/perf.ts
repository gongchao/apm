import { forEach } from 'lodash';

export const parsePerf = (timing: PerformanceTiming) => {
  if (!timing || !timing.connectStart) return;

  const data: any = {};

  /**
   * 时序图
   * Redirect -> App cache -> DNS -> TCP -> Request -> Response -> Processing -> onLoad
   *   | unLoad
   */
  data.redirect = timing.redirectEnd - timing.redirectStart;

  data.appCache = timing.domainLookupStart - timing.fetchStart;

  data.dns = timing.domainLookupEnd - timing.domainLookupStart;

  data.tcp = timing.connectEnd - timing.connectStart;

  data.ssl = timing.connectEnd - timing.secureConnectionStart;

  data.request = timing.responseStart - timing.requestStart;

  data.response = timing.responseEnd - timing.responseStart;

  data.processing = timing.domComplete - timing.domLoading;

  data.onLoad = timing.loadEventEnd - timing.loadEventStart;

  data.unload = timing.unloadEventEnd - timing.unloadEventStart;

  /**
   * 重要指标
   */

  // 首字节
  data.ttfb = timing.responseStart - timing.domainLookupStart;

  // 首次渲染时间
  data.firstpPaint = timing.responseEnd - timing.navigationStart;

  // 首次可交互时间
  data.fristInteract = timing.domInteractive - timing.fetchStart;

  // HTML 加载完成
  data.domReady = timing.domContentLoadedEventEnd - timing.navigationStart;

  // 页面加载完成
  data.loadPage = timing.loadEventStart - timing.navigationStart;

  forEach(data, (_, key) => {
    data[key] = data[key] > 9e5 ? 0 : Math.max(data[key], 0);
  });

  return data;
};
