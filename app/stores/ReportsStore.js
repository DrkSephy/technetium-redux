import alt from '../alt';
import ReportsActions from '../actions/ReportsActions';

class ReportsStore {
  constructor() {
    this.bindActions(ReportsActions);
    this.commits = [];
    this.issuesOpened = [];
    this.issuesAssigned = [];
    this.issuesCompleted = [];
    this.issuesComments = [];
    this.pullRequests = [];
    this.reportData = [];
  }

  onGetReportPullRequestsSuccess(data) {
    this.pullRequests = data;
  }

  onGetReportPullRequestsFail(data) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }

  onGetReportDataSuccess(data) {
    this.reportData = data;
  }

  onGetCommitsSuccess(data) {
    this.commits = data;
  }

  onGetCommitsFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }

  onGetIssuesOpenedSuccess(data) {
    this.issuesOpened = data;
  }

  onGetIssuesOpenedFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }

  onGetIssuesAssignedSuccess(data) {
    this.issuesAssigned = data;
  }

  onGetIssuesAssignedFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }

  onGetIssuesCompletedSuccess(data) {
    this.issuesCompleted = data;
  }

  onGetIssuesCompletedFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }

  onGetIssuesCommentsSuccess(data) {
    this.issuesComments = data;
  }

  onGetIssuesCommentsFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }
}

export default alt.createStore(ReportsStore);