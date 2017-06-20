///<reference path="../../../headers/common.d.ts" />

import _ from 'lodash';
import coreModule from 'app/core/core_module';
import {DashboardModel} from '../model';
import {HistoryListOpts} from './models';

export class HistorySrv {
  /** @ngInject */
  constructor(private backendSrv, private $q) {}

  getHistoryList(dashboard: DashboardModel, options: HistoryListOpts) {
    const id = dashboard && dashboard.id ? dashboard.id : void 0;
    return id ? this.backendSrv.get(`api/dashboards/db/${id}/versions`, options) : this.$q.when([]);
  }

  compareVersions(dashboard: DashboardModel, compare: { new: number, original: number }, view = 'html') {
    const id = dashboard && dashboard.id ? dashboard.id : void 0;
    const url = `api/dashboards/db/${id}/compare/${compare.original}...${compare.new}/${view}`;
    return id ? this.backendSrv.get(url) : this.$q.when({});
  }

  restoreDashboard(dashboard: DashboardModel, version: number) {
    const id = dashboard && dashboard.id ? dashboard.id : void 0;
    const url = `api/dashboards/db/${id}/restore`;
    return id && _.isNumber(version) ? this.backendSrv.post(url, { version }) : this.$q.when({});
  }
}

coreModule.service('historySrv', HistorySrv);
