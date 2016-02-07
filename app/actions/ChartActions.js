import alt from '../alt';

class ChartActions {
  constructor() {
    this.generateActions(
      'getChartSuccess',
      'getChartFail'
    );
  }

  getData() {
    $.ajax({ url: '/api/charts' })
      .done((data) => {
        this.actions.getChartSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getChartFail(jqXhr);
      });
  }
}

export default alt.createActions(ChartActions);