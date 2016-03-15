import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Glyphicon} from 'react-bootstrap';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';

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
    this.handleEvent = this.handleEvent.bind(this);
  }

  handleEvent(event, picker) {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate
    });
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
        onEvent={this.handleEvent}>
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