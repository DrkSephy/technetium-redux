import alt from '../alt';
import TimeSeriesActions from '../actions/TimeSeriesActions';

class TimeSeriesStore {
  constructor() {
    this.bindActions(TimeSeriesActions);
    this.chartData = [];
  }

  onGetTimeSeriesSuccess(data) {
    console.log(data);
    this.chartData = c3.generate({
      bindto: '.chart_2',
      data: {
        x: 'x',
        columns: data
      },
      axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%m-%d'
            }
        }
      }
    });
  }

  onGetTimeSeriesFail(data) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }
}

export default alt.createStore(TimeSeriesStore);