import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './App.css';
import video from './assets/video.mov';

const APIKey = 'AIzaSyCzDglpbAYLMLeevqKfV7cXftnX_ZBH0Co';
const google = window.google;

class App extends Component {
  state = {
    video,
    videoFeedVisible: false,
    heatmapVisible: true,
    heatmapPoints: {    
      positions: [
        { lat: 1.354, lng: 103.815, weight: 0.1, name: 'Punggol' },
        { lat: 1.356, lng: 103.8151, weight: 0.2, name: 'Sengkang' },
        { lat: 1.358, lng: 103.8152, weight: 0.3, name: 'Buona Vista' },
        { lat: 1.360, lng: 103.8153, weight: 0.4, name: 'Jurong West CC' },
        { lat: 1.362, lng: 103.8154, weight: 0.9, name: 'Choa Chu Kang LRT' },
        { lat: 1.364, lng: 103.8155, weight: 1, name: 'Changi Airport'}
      ],
      options: {   
        radius: 10,
        opacity: 1
      }
    }
  }

  toggleVideoFeed = () => {
    // TODO: Make Dynamic Based onClick Target
    this.setState(prevState => {
      return {
        videoFeedVisible: !prevState.videoFeedVisible
      }
    })
  }

  toggleHeatMap = () => {
    this.setState(prevState => {
      return {
        heatmapVisible: !prevState.heatmapVisible
      }
    })
  }

  handleApiLoaded = (map, maps) => {
    this.setState({ map, maps });
  }

  getRoute = (origin, destination) => {
    const { map, maps } = this.state;
    const directionService = new maps.DirectionsService()
    directionService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: maps.TravelMode.TWO_WHEELER
      },
      (result, status) => {
        if (status === maps.DirectionsStatus.OK) {
          const renderer = new maps.DirectionsRenderer();
          renderer.setMap(map)
          renderer.setDirections(result);
          this.setState({
            directions: result
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
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
    const { heatmapVisible, heatmapPoints, videoFeedVisible, video, maps, directions } = this.state;
    const { positions } = heatmapPoints;

    return (
      <div className="App" onClick={() => this.getRoute({lat: 1.354, lng: 103.815}, { lat: 1.354, lng: 103.915 })}>
        <div id="map" style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: APIKey }}
            heatmap={heatmapVisible ? heatmapPoints : {positions: []}}
            heatmapLibrary={true}
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
            {...this.props}
          >
          </GoogleMapReact>
          <TopRiskLocations locations={positions} />
          { videoFeedVisible &&
            <div className="dark-overlay">
              <video src={video} autoPlay/>
            </div>
          }
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
          <p key={index}>{`${index + 1}. ${location.name}`}</p>
        )
      }
    </div>
  )
}

export default App;
