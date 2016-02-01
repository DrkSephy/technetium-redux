import alt from '../alt';

class FooterActions {
  constructor() {
    this.generateActions(
      'getCommitsSuccess',
      'getCommitsFail'
    );
  }

  getCommits() {
    $.ajax({ url: '/api/commits' })
      .done((data) => {
        this.actions.getCommitsSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getCommitsFail(jqXhr);
      });
  }
}

export default alt.createAction(FooterActions);