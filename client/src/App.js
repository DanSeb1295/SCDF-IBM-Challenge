import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './App.css';
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import videoLow from './assets/video_low.mp4';
import lampPostIcon from './assets/lamppost.svg';
import fireIcon from './assets/fire.svg';
import r3Icon from './assets/3r.png';
import redSpot from './assets/redspot.svg';
import Loader from 'react-loader-spinner'

const APIKey = 'AIzaSyCzDglpbAYLMLeevqKfV7cXftnX_ZBH0Co';
const positionsData = [
  { id: 1, lat: 1.360948, lng: 103.913379, weight: 0.1, name: 'Paya Lebar Air Base' },
  { id: 2, lat: 1.34999, lng: 103.764195, weight: 0.5, name: 'Bukit Batok Nature Park' },
  { id: 3, lat: 1.376464, lng: 103.771713, weight: 0.3, name: 'Bukit Panjang' },
  { id: 4, lat: 1.3438137, lng: 103.711323, weight: 0.4, name: 'Boon Lay' },
  { id: 5, lat: 1.33569359, lng: 103.9623297, weight: 0.9, name: 'Changi Business Park' },
  { id: 6, lat: 1.294444, lng: 103.846947, weight: 0.9, name: 'Fort Canning Hill' },
  { id: 7, lat: 1.446392, lng: 103.780655, weight: 0.4, name: 'Admiralty Park' },
  { id: 8, lat: 1.273806, lng: 103.817497, weight: 0.8, name: 'Mount Faber Park' },
  { id: 9, lat: 1.282375, lng: 103.864273, weight: 0.1, name: 'Gardens by the Bay' },
  { id: 10, lat: 1.366700, lng: 103.800003, weight: 0.3, name: 'Yio Chu Kang MRT' },
  { id: 11, lat: 1.287953, lng: 103.851784, weight: 0.2, name: 'Downtown Core' },
  { id: 12, lat: 1.345010, lng: 103.983208, weight: 0.3, name: 'Changi' },
  { id: 13, lat: 1.369309, lng: 103.848351, weight: 0.2, name: 'AMK Hub' },
  { id: 14, lat: 1.293354, lng: 103.853561, weight: 0.1, name: 'Swissotel The Stamford' },
  { id: 15, lat: 1.296568, lng: 103.852119, weight: 0.1, name: 'Singapore Management University' },
  { id: 16, lat: 1.347026, lng: 103.724052, weight: 0.2, name: 'Yu Hua Secondary School' },
  { id: 17, lat: 1.250111, lng: 103.830933, weight: 0.5, name: 'Sentosa' },
  { id: 18, lat: 1.420181, lng: 103.864555, weight: 0.5, name: 'Seletar Airport' },
  { id: 19, lat: 1.371778, lng: 103.893059, weight: 0.1, name: 'Hougang' },
  { id: 20, lat: 1.463780, lng: 103.801811, weight: 0.4, name: 'Senoko Road' },
  { id: 21, lat: 1.363125, lng: 103.773307, weight: 0.7, name: 'Dairy Farm' },
  { id: 22, lat: 1.316681, lng: 103.708406, weight: 0.4, name: 'Jurong Hill Park' },
  { id: 23, lat: 1.378040, lng: 103.823367, weight: 0.3, name: 'Thomson' },
  { id: 24, lat: 1.328711, lng: 103.897104, weight: 0.2, name: 'Ubi' },
  { id: 25, lat: 1.338993, lng: 103.773812, weight: 0.1, name: 'Beauty World' },
  { id: 26, lat: 1.401386, lng: 103.903442, weight: 0.2, name: 'Punggol Arcadia' },
  { id: 27, lat: 1.402465, lng: 103.907234, weight: 0.1, name: 'Punggol Vista' },
  { id: 28, lat: 11.40244, lng: 103.901848, weight: 0.2, name: 'Punggol Regalia' },
  { id: 29, lat: 1.403501, lng: 103.899307, weight: 0.1, name: 'Punggol Sapphire' },
  { id: 30, lat: 1.405088, lng: 103.905702, weight: 0.1, name: 'Punggol View Primary School' },
  { id: 31, lat: 1.407662, lng: 103.900252, weight: 0.2, name: 'Waterway Terraces' },
  { id: 32, lat: 1.403887, lng: 103.902590, weight: 1.0, name: 'Punggol MRT' },
  { id: 33, lat: 1.400262, lng: 103.902354, weight: 0.2, name: 'Edgefield Secondary School' },
  { id: 34, lat: 1.408477, lng: 103.905294, weight: 0.3, name: 'Punggol Town Hub' },
  { id: 35, lat: 1.402161, lng: 103.897351, weight: 0.4, name: 'Punggol Twin Waterfalls' }
]

const hubsData = [
  { id: 1, lat: 1.402165, lng: 103.907280, r3: 1 },
  { id: 1, lat: 1.412161, lng: 103.897351, r3: 0 },
  { id: 1, lat: 1.407161, lng: 103.898351, r3: 0 }
]

const hubsSuggestion = [
  { id: 1, lat: 1.402165, lng: 103.907280, r3: 0 },
  { id: 1, lat: 1.412161, lng: 103.897351, r3: 1 },
  { id: 1, lat: 1.407161, lng: 103.898351, r3: 0 }
]

class App extends Component {
  state = {
    videoLow,
    allocationMode: false,
    zoom: 12,
    videoFeedVisible: false,
    heatmapVisible: true,
    heatmapPoints: {    
      positions: [...positionsData],
      options: {   
        radius: 30,
        opacity: 1
      }
    }
  }

  componentDidMount = () => {
    axios.get('./ibm')
      .then(res => { 
        let positions = cloneDeep(this.state.heatmapPoints.positions)

        res.data.map(resItem => {
          for (let i = 0; i < res.data.length; i++) {
            if (positions[i].id === parseInt(resItem.LOCATION_ID))
              positions[i].weight = parseFloat(resItem.RISK)
          }
          return null
        })

        let heatmapPoints = {
          ...this.state.heatmapPoints,
          positions
        }

        this.setState({ heatmapPoints })
      })
      .catch(err => { console.log(err) })
  }

  toggleVideoFeed = (lat, lng) => {
    this.setState(prevState => {
      return {
        center: { lat, lng },
        zoom: 15,
        videoFeedVisible: !prevState.videoFeedVisible
      }
    })
  }

  toggleFireFeed = (lat, lng) => {
    this.setState(prevState => {
      return {
        center: { lat, lng },
        zoom: 15,
        videoFeedVisible: !prevState.videoFeedVisible
      }
    })

    const { lat: hubLat, lng: hubLng } = hubsData.filter(hub => hub.r3)[0];
    this.getRoute({ lat: hubLat, lng: hubLng }, { lat, lng });
  }

  recenterMap = (lat, lng) => {
    this.setState({ center: { lat, lng } })
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
    let { renderer } = this.state;
    const directionService = new maps.DirectionsService()
    directionService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: maps.TravelMode.WALKING
      },
      (result, status) => {
        if (status === maps.DirectionsStatus.OK) {
          if (!renderer) {
            renderer = new maps.DirectionsRenderer();
            renderer.setMap(map)
          }

          renderer.setDirections(result);
          this.setState({
            renderer,
            directions: result
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  toggleAllocationMode = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState(prevState => {
        return {
          allocationMode: !prevState.allocationMode,
          loading: false
        }
      })
    }, 2000)
  }

  onClearRoute = (event) => {
    if (event.key === '1') {
      const { renderer } = this.state;
      renderer.set('directions', null);
    }
  }

  static defaultProps = {
    defaultCenter: {
      lat: 1.354,
      lng: 103.815
    },
    options: {
      styles: [
        {"elementType": "labels.text.fill", "stylers":[{"color":"#ffffff"}]},
        {"elementType":"labels.text.stroke", "stylers":[{"color":"#000000"}, {"lightness":13}]},
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
    const { heatmapVisible, heatmapPoints, videoFeedVisible, videoLow, center, zoom, allocationMode, loading } = this.state;
    const { positions } = heatmapPoints;
    
    return (
      <div className="App" onKeyPress={this.onClearRoute}>
        <div id="map" style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: APIKey }}
            heatmap={heatmapVisible ? heatmapPoints : {positions: []}}
            heatmapLibrary={true}
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
            {...this.props}
            center={center}
            zoom={zoom}
            onZoomChanged={(zoom) => console.log(zoom)}
          >
            { positions && 
              positions.map(position => {
                return <LampPost {...position} onClick={() => this.toggleVideoFeed(position.lat, position.lng)} zoom={zoom}/>
              })
            }
            { hubsData && zoom >= 14 && !allocationMode &&
              hubsData.map(hub => {
                return (
                  <Hub {...hub} allocationMode={allocationMode} />
                )
              })
            }
            { hubsSuggestion && zoom >= 14 && allocationMode &&
              hubsSuggestion.map(hub => {
                return (
                  <Hub {...hub} allocationMode={allocationMode} />
                )
              })
            }
            {
              positions &&
              positions.map(position => {
                if (position.weight === 1) {
                  return <Fire {...position} onClick={() => this.toggleFireFeed(position.lat, position.lng)} />
                }
                return null;
              })
            }
          </GoogleMapReact>
          <TopRiskLocations locations={positions} onClick={this.toggleVideoFeed}/>
          <AllocationButton allocationMode={allocationMode} onClick={this.toggleAllocationMode} loading={loading} />
          { videoFeedVisible &&
            <div className="dark-overlay" onClick={this.toggleVideoFeed}>
              <video src={videoLow} autoPlay/>
            </div>
          }
        </div>
      </div>
    );
  }
}

const TopRiskLocations = props => {
  const { locations, onClick } = props;
  let sortedLocations = locations.sort((a, b) => (b.weight - a.weight)).slice(0, Math.min(locations.length, 20));

  return (
    <div className="locations-container">
      <h3>Top Fire Hazard Risks</h3>
      { sortedLocations &&
        sortedLocations.map((location, index) => 
          <p key={index} onClick={() => onClick(location.lat, location.lng)}>{`${index + 1}. ${location.name}`}</p>
        )
      }
    </div>
  )
}

const LampPost = props => {
  const { lat, lng, onClick, weight, zoom } = props;

  return (
    <div>
      <img className='lamppost-icon' src={lampPostIcon} alt="LampPost Icon" lat={lat} lng={lng} onClick={onClick} />  
      { weight > 0.75 && zoom >= 14 &&
        <img className='redspot-icon' src={redSpot} alt="" lat={lat} lng={lng} />
      }
    </div>
  )
}

const Fire = props => {
  const { lat, lng, onClick } = props;

  return (
    <img name='fire' className='fire-icon' src={fireIcon} alt="Fire Icon" lat={lat} lng={lng} onClick={onClick} />
  )
}

const AllocationButton = props => {
  const { allocationMode, onClick, loading } = props;
  
  return (
    <div className="allocate-button" onClick={onClick}>
      { !loading && allocationMode && 'Show Current' }
      { !loading && !allocationMode && 'Optimise 3R Allocation' }
      { loading &&
        <Loader type="TailSpin" height={14} width={14} color={'#FFF'} />
      }
    </div>
  )
}

const Hub = props => {
  const { r3, allocationMode } = props;
  return (
    <div className="hub-title">
      Docking Hub
      <div className={`${allocationMode ? 'hub-container allocation' : 'hub-container'}`} style={r3 ? { opacity: 1 } : { opacity: 0.4 }} >
        <img className="r3-icon" src={r3 ? r3Icon : ''} alt=""/>
      </div>
    </div>
  )
}

export default App;
