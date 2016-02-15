import alt from '../alt';
import ReportsActions from '../actions/ReportsActions';

class ReportsStore {
  constructor() {
    this.bindActions(ReportsActions);
    this.reportData = [];
  }

  onGetReportDataSuccess(data) {
    this.reportData = data;
  }

  onGetCommitsSuccess(data) {
    this.commits = data;
  }
}

export default alt.createStore(ReportsStore);