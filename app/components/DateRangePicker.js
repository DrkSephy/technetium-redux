import React from 'react';
import moment from 'moment';
import {Button, Glyphicon} from 'react-bootstrap';
import ReportsStore from '../stores/ReportsStore';
import ReportsActions from '../actions/ReportsActions';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import DateRangePickerStore from '../stores/DateRangePickerStore';
import DateRangePickerActions from '../actions/DateRangePickerActions';

class DateRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      },
      startDate: moment().subtract(29, 'days'),
      endDate: moment()
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    DateRangePickerStore.listen(this.onChange);
  }

  componentWillUnmount() {
    DateRangePickerStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleEvent(event, picker) {
    DateRangePickerActions.setRanges(picker.startDate, picker.endDate);
    let startDate = picker.startDate.unix();
    let endDate = picker.endDate.unix();
    ReportsActions.getOpenedIssues(
      ReportsStore.getState().username,
      ReportsStore.getState().reponame,
      startDate,
      endDate
    );
  }

  render() {
    const buttonStyle = {
      width: '100%'
    }

    const divStyle = {
      paddingTop: '10%'
    }

    var start = this.state.startDate.format('YYYY/MM/DD');
    var end = this.state.endDate.format('YYYY/MM/DD');
    var label = start + ' - ' + end;
    if (start === end) {
      label = start;
    }
    return (
      <DateRangePicker 
        startDate={this.state.startDate} 
        endDate={this.state.endDate} 
        ranges={this.state.ranges} 
        onApply={this.handleEvent}>
        <Button className='selected-date-range-btn' style={buttonStyle}>
          <div className='pull-left'><Glyphicon glyph='calendar' /></div>
          <div className='text-center'>
            {label}
            <div className='pull-right'>
              <Glyphicon glyph='glyphicon glyphicon-chevron-down' /></div>
          </div>
        </Button>
        <div style={divStyle}> </div>
      </DateRangePicker>
    );
  }
}

export default DateRange;