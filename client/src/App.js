/* global google */
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './App.css';

const APIKey = 'AIzaSyCzDglpbAYLMLeevqKfV7cXftnX_ZBH0Co';

class App extends Component {
  state = {
    videoFeedVisible: false,
    heatmapVisible: true,
    heatmapPoints: {    
      positions: [
        { lat: 1.354, lng: 103.815, weight: 0.1, name: 'Punggol' },
        { lat: 1.365, lng: 103.8151, weight: 0.2, name: 'Sengkang' },
        { lat: 1.3762, lng: 103.8152, weight: 0.3, name: 'Buona Vista' },
        { lat: 1.3873, lng: 103.8153, weight: 0.4, name: 'Jurong West CC' },
        { lat: 1.3984, lng: 103.8154, weight: 0.9, name: 'Choa Chu Kang LRT' },
        { lat: 1.3095, lng: 103.8155, weight: 1, name: 'Changi Airport'}
      ],
      options: {   
        radius: 10,
        opacity: 1
      }
    }
  }

  toggleVideoFeed = () => {
    this.setState(prevState => {
      return {
        videoFeedVisible: !prevState.videoFeedVisible
      }
    })
  }

  static defaultProps = {
    center: {
      lat: 1.354,
      lng: 103.815
    },
    zoom: 12,
    options: {
      styles: [
        { "elementType": "labels.text.fill", "stylers":[{"color":"#ffffff"}] },
        { "elementType":"labels.text.stroke", "stylers":[{"color":"#000000"}, {"lightness":13}] },
        {"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},
        {"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},
        {"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},
        {"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},
        {"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},
        {"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},
        {"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},
        {"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},
        {"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},
        {"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},
        {"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]},
      ]
    }
  }

  render () {
    const { heatmapVisible, heatmapPoints } = this.state;
    const { positions } = heatmapPoints;
    
    return (
      <div className="App">
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: APIKey }}
            {...this.props}
            heatmap={heatmapPoints}
            heatmapLibrary={true}
          >
          </GoogleMapReact>
          <TopRiskLocations locations={positions} />
        </div>
      </div>
    );
  }
}

const TopRiskLocations = (props) => {
  const { locations } = props;
  let sortedLocations = locations.sort((a, b) => (b.weight - a.weight)).slice(0, Math.min(locations.length, 10));

  return (
    <div className="locations-container">
      <h3>Top Fire Risks</h3>
      { sortedLocations &&
        sortedLocations.map((location, index) => 
          <p>{`${index + 1}. ${location.name}`}</p>
        )
      }
    </div>
  )
}

export default App;
