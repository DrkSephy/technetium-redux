import React from 'react';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer>
        <div className='container'>
          <div className='row text-center'>
            <div>
              <h3 className='lead'></h3>
              <p>Powered by Node, Express, React and Flux. <a href='https://github.com/DrkSephy/technetium-redux'>Source Code</a> © 2016 <a href='https://github.com/DrkSephy'>David Leonard</a>.</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;