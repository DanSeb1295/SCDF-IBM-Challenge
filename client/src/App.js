import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './App.css';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class App extends Component {
  static defaultProps = {
    center: {
      lat: 1.354,
      lng: 103.815
    },
    zoom: 12
  }

  render () {
    return (
      <div className="App">
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;
