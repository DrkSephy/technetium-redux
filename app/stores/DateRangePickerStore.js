import alt from '../alt';
import DateRangePickerActions from '../actions/DateRangePickerActions';

class DateRangePickerStore {
  constructor() {
    this.bindActions(DateRangePickerActions);
    this.sDate = '';
    this.eDate = '';
  }

  onUpdateDateRangeSuccess(payload) {
    console.log(payload);
    this.sDate = payload.startDate;
    this.eDate = payload.endDate;
  }

  onUpdateDateRangeFail(message) {
    console.log('Invalid ranges set for date range picker');
  }
}

export default alt.createStore(DateRangePickerStore);