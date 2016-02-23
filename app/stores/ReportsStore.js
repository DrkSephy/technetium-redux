import alt from '../alt';
import ReportsActions from '../actions/ReportsActions';

class ReportsStore {
  constructor() {
    this.bindActions(ReportsActions);
    this.reportData = [];
    this.issuesOpened = 0;
    this.commits = 0;
    this.sparklineData = [];
    this.sparklineIssuesOpened = [];
    this.sparklineIssuesAssigned = [];
    this.sparklineIssuesClosed = [];
  }

  onGetSparklineIssuesClosedSuccess(data) {
    this.sparklineIssuesClosed = data;
  }

  onGetSparklineIssuesClosedFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }

  onGetSparklineIssuesOpenedSuccess(data) {
    this.sparklineIssuesOpened = data;
  }

  onGetSparklineIssuesOpenedFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }

  onGetSparklineIssuesAssignedSuccess(data) {
    this.sparklineIssuesAssigned = data;
  }

  onGetSparklineIssuesAssignedFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
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

  onGetSparklineDataFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }
}

export default alt.createStore(ReportsStore);