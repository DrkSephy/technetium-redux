import alt from '../alt';

class TimeSeriesActions {
  constructor() {
    this.generateActions(
      'getTimeSeriesSuccess',
      'getTimeSeriesFail'
    );
  }

  getData(username, reponame) {
    $.ajax({ 
        url: '/api/weeklycommits',
        data: {
          username: username,
          reponame: reponame
        }
      })
      .done((data) => {
        this.actions.getTimeSeriesSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getTimeSeriesFail(jqXhr);
      });
  }
}

export default alt.createActions(TimeSeriesActions);