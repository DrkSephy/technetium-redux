import alt from '../alt';
import DateRangePickerActions from '../actions/DateRangePickerActions';

class DateRangePickerStore {
  constructor() {
    this.bindActions(DateRangePickerActions);
    this.startDate = '';
    this.endDate = '';
  }

  onUpdateDateRangeSuccess(payload) {
    this.startDate = payload.startDate;
    this.endDate = payload.endDate;
  }

  onUpdateDateRangeFail(message) {
    console.log('Invalid ranges set for date range picker');
  }
}

export default alt.createStore(DateRangePickerStore);