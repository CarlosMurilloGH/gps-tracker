import React, { useState, useEffect, useRef } from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Polyline, Marker } from 'react-google-maps';
import API_KEY from '../api/apiKeys';
// ... import other dependencies

const car = "M17.402,0H5.643..."; // your car path data
const icon = {
    path: car,
    scale: 0.7,
    strokeColor: "white",
    strokeWeight: 0.1,
    fillOpacity: 1,
    fillColor: "#404040",
    offset: "5%",
    rotation: 240
    // anchor: new window.google.maps.Point(10, 10)
  };
function Map() {
  const [progress, setProgress] = useState([]);
  const [directions, setDirections] = useState(null);
  const stops = useRef([
    {
      lat: 12.9802347063322,
      lng: 77.5907760360903,
      id: "stop1"
    },
    {
      lat: 12.9771191896563,
      lng: 77.5857120256672,
      id: "stop2"
    }
]);

  const path = useRef([
    {
        lat: 12.9802347063322,
        lng: 77.5907760360903,
        bearing: -20.5784744283754
      },
      {
        lat: 12.9793774204024,
        lng: 77.5910979011596,
        bearing: 17.1118088152409
      },
      {
        lat: 12.9795865148043,
        lng: 77.5911622741734,
        bearing: 70.6690312217414
      },
      {
        lat: 12.9797746996155,
        lng: 77.5916987159555,
        bearing: 38.1233134168197
      },
      {
        lat: 12.9801301594259,
        lng: 77.5919776656823,
        bearing: -45.7414247345699
      },
      {
        lat: 12.9798374278543,
        lng: 77.5922780730802,
        bearing: 16.0994201411847
      },
      {
        lat: 12.9791683258247,
        lng: 77.5920849540387,
        bearing: 35.6916527554558
      },
      {
        lat: 12.9787501361417,
        lng: 77.5917845466407,
        bearing: 58.0502467067782
      },
      {
        lat: 12.9784155838887,
        lng: 77.5912481048586,
        bearing: 64.0233912454979
      },
      {
        lat: 12.9784783124705,
        lng: 77.5913768508863,
        bearing: 45.7412428776673
      },
      {
        lat: 12.9783319457552,
        lng: 77.5912266471873,
        bearing: -69.926654677622
      },
      {
        lat: 12.978394674358,
        lng: 77.591054985817,
        bearing: 16.3413468751341
      },
      {
        lat: 12.9779555738058,
        lng: 77.5909262397893,
        bearing: 54.6749460887583
      },
      {
        lat: 12.9776210204837,
        lng: 77.5904541710211,
        bearing: 64.0233096712307
      },
      {
        lat: 12.9774746532636,
        lng: 77.5901537636231,
        bearing: 65.5464053454266
      },
      {
        lat: 12.9761573444059,
        lng: 77.5872569779997,
        bearing: -66.4029340594377
      },
      {
        lat: 12.9764291706147,
        lng: 77.5866347055324,
        bearing: -48.4630801907934
      },
      {
        lat: 12.9766382674962,
        lng: 77.5863986711483,
        bearing: -54.992843944921
      },
      {
        lat: 12.9771191896563,
        lng: 77.5857120256672,
        bearing: -60.0659370316888
      }
  ]);

  // Other constants and variables...
  const velocity = 100;
  const initialDate = useRef(new Date());

  const moveObject = () => {
    const distance = getDistance();
    if (!distance) {
      return;
    }
  
    let progress = path.current.filter((coordinates) => coordinates.distance < distance);
  
    const nextLine = path.current.find((coordinates) => coordinates.distance > distance);
  
    if (!nextLine) {
      setProgress(progress);
      clearInterval(intervalRef.current);
      return; // it's the end!
    }
    
    const lastLine = progress[progress.length - 1];
  
    const lastLineLatLng = new window.google.maps.LatLng(lastLine.lat, lastLine.lng);
    const nextLineLatLng = new window.google.maps.LatLng(nextLine.lat, nextLine.lng);
  
    // distance of this line
    const totalDistance = nextLine.distance - lastLine.distance;
    const percentage = (distance - lastLine.distance) / totalDistance;
  
    const position = window.google.maps.geometry.spherical.interpolate(
      lastLineLatLng,
      nextLineLatLng,
      percentage
    );
  
    progress = progress.concat(position);
    setProgress(progress);
  };

  useEffect(() => {
    const interval = setInterval(moveObject, 1000);
    return () => clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    // Logic for componentWillMount (calculatePath)
  }, []);

  useEffect(() => {
    // Logic for componentDidUpdate
  }, [progress]);

  const startSimulator = () => {
    // Your startSimulator method logic...
  };

  // Map rendering
  return (
    <>
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: path.current[0].lat, lng: path.current[0].lng }}
      >
        <button onClick={startSimulator}>Start Simulator</button>
        {/* ... other components and JSX */}
        <Polyline
          path={progress}
          options={{ strokeColor: 'pink' }}
        />
        <Marker
          icon={icon1}
          position={progress[progress.length - 1]}
        />
      </GoogleMap>
    </>
  );
}

const MapComponent = withScriptjs(withGoogleMap(Map));
const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY.mapsOtherkey}`;

export default function () {
  return (
    <MapComponent
      googleMapURL={mapURL}
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div style={{ height: '600px', width: '600px' }} />}
      mapElement={<div style={{ height: '100%' }} />}
    />
  );
}
