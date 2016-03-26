import alt from '../alt';

class DateRangePickerActions {
  constructor() {
    this.generateActions(
      'updateDateRangeSuccess',
      'updateDateRangeFail'
    );
  }

  setRanges(startDate, endDate) {
    this.actions.updateDateRangeSuccess({
      'startDate': startDate,
      'endDate': endDate
    });
  }
}

export default alt.createActions(DateRangePickerActions);