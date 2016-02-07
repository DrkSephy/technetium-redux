import alt from '../alt';

class TimeSeriesActions {
  constructor() {
    this.generateActions(
      'getTimeSeriesSuccess',
      'getTimeSeriesFail'
    );
  }

  getData() {
    $.ajax({ url: '/api/timeseries' })
      .done((data) => {
        this.actions.getTimeSeriesSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getTimeSeriesFail(jqXhr);
      });
  }
}

export default alt.createActions(TimeSeriesActions);