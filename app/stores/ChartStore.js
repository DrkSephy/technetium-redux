import alt from '../alt';
import ChartActions from '../actions/ChartActions';

class ChartStore {
  constructor() {
    this.bindActions(ChartActions);
    this.chartData = [];
  }

  onGetChartSuccess(data) {
    this.chartData = c3.generate({
      bindto: '.chart_1',
      data: {
        columns: [
          data[0],
          data[1]
        ]
      }
    });
    console.log(this.chartData);

  }

  onGetChartFail(data) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText); 
  }
} 

export default alt.createStore(ChartStore);