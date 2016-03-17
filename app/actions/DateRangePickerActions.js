import alt from '../alt';

class DateRangePickerActions {
  constructor() {
    this.generateActions(
      'updateDateRangeSuccess',
      'updateDateRangeFail'
    );
  }

  setRanges(startDate, endDate) {
    if (startDate && endDate !== undefined) {
      console.log('Start date: ' + startDate);
      console.log('End Date: ' + endDate);
      this.actions.updateDateRangeSuccess({
        'startDate': startDate,
        'endDate': endDate 
      });
    } 
  }
}

export default alt.createActions(DateRangePickerActions);