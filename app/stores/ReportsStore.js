import alt from '../alt';
import ReportsActions from '../actions/ReportsActions';

class ReportsStore {
  constructor() {
    this.bindActions(ReportsActions);
    this.reportData = [];
    this.issuesOpened = 0;
    this.commits = 0;
  }

  onGetReportDataSuccess(data) {
    this.reportData = data;
  }

  onGetReportOpenedIssuesSuccess(data) {
    this.issuesOpened = data;
  }

  onGetReportCommitsSuccess(data) {
    this.commits = data;
  }
}

export default alt.createStore(ReportsStore);