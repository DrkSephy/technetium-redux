import React from 'react';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-5'>
              <h3 className='lead'></h3>
              <p>Powered by <strong>Node.js</strong>,  <strong>Express.js</strong>, <strong>MongoDB</strong> and <strong>React</strong> with <strong>Flux</strong> architecture.</p>
              <p>You may view the <a href='https://github.com/DrkSephy/technetium-redux'>Source Code</a> behind this project on GitHub.</p>
              <p>© 2016 <a href='https://github.com/DrkSephy'>David Leonard.</a></p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;