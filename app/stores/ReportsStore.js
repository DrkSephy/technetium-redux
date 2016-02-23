import alt from '../alt';
import ReportsActions from '../actions/ReportsActions';

class ReportsStore {
  constructor() {
    this.bindActions(ReportsActions);
    this.reportData = [];
    this.issuesOpened = 0;
    this.commits = 0;
    this.sparklineData = [];
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

  onGetSparklineDataSuccess(data) {
    this.sparklineData = data;
  }

  onGetSparklineDataFail(data) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }
}

export default alt.createStore(ReportsStore);