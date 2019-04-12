import { open } from 'line-reader';
import * as moment from 'moment';
import { template } from 'lodash';
import { existsSync } from 'fs';
import { config } from '../../config';
import { NginxLog } from '../parse/nginx-log';
import { parseBrowser } from '../parse/browser';
import { parseIp } from '../parse/ip';
import { parsePerf } from '../parse/perf';
import * as qs from 'qs';
import { push } from '../report';
import { log } from '../../log';
import * as pretty from 'pretty-time';

export class Reader {
  private readonly nginxParse: NginxLog;
  constructor() {
    this.nginxParse = new NginxLog(config.nginx_log_format);
  }

  public getlogPath() {
    const compiled = template(config.log_path, {
      imports: { format: (x) => moment().add(-1, 'm').format(x) },
    });
    return compiled();
  }

  execute() {
    const logPath = this.getlogPath();

    log(`开始处理日志 ${logPath}`);
    const s = process.hrtime();

    if (!existsSync(logPath)) return log(`日志文件不存在`);

    open(logPath, (err, reader) => {
      if (err) return;

      let counter = 0;

      const loop = () => {
        if (!reader.hasNextLine()) return reader.close(() => {
          log(`共处理日志 ${counter} 条; t: ${pretty(process.hrtime(s))}`);
        });

        reader.nextLine((err, line) => {
          if (err) return;

          ++counter;
          console.log(counter);

          return this.lineLogHandle(line).then(loop);
        });
      };

      loop();
    });
  }

  public async lineLogHandle(content: string) {
    if (!content.includes(config.record_file)) return;
    const log = this.nginxParse.parseLine(content);
    if (!log) return;

    const _query = qs.parse(log.request.slice(16, log.request.length - 9));
    if (!_query.d || !_query.d.project) return;
    const query = _query.d;

    const pushData: any = {};

    pushData.project = query.project;
    pushData.type = query.type;
    pushData.url = query.url;
    pushData.relase = query.relase;
    pushData.perf = parsePerf(query.details);
    pushData.browser = parseBrowser(log.http_user_agent);
    pushData.ip = parseIp(log.remote_addr);

    pushData.sdkVersion = query.sdkVersion;

    pushData._raw = JSON.stringify(log);

    pushData['@timestamp'] = log.time_local || moment().toISOString();

    push(pushData);
  }
}
