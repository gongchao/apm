import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout-default',
  templateUrl: './default.html',
  styleUrls: ['./default.less']
})
export class DefaultLayoutComponent {
  isProject: boolean;

  public menus = [
    { name: '首页', link: '/dashboard' },
    { name: '项目列表', link: '/projects' },
  ];

  public projectMenus = [
    { name: '仪表盘', link: './dashboard' },
    { name: '页面性能', link: './performance' },
    { name: 'AJAX性能', link: './ajax' },
    { name: '浏览器', link: './browser' },
    { name: '运营商', link: './operator' },
    { name: '区域', link: './area' },
    { name: '设置', link: './setting' },
  ];

  constructor(
    private readonly router: ActivatedRoute,
  ) {
    this.isProject = this.router.snapshot.data.isProject;
  }
}
