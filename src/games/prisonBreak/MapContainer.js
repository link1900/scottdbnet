import find from 'lodash/find';
import { connect } from 'react-redux';
import Map from './Map';
import { getPlayerLocation } from './Player';

function borderForPath(paths, direction) {
  const somePath = find(paths, { direction });
  if (!somePath) {
    return {
      show: true,
      color: 'black'
    };
  }

  if (somePath.locked) {
    return {
      show: true,
      color: 'red'
    };
  }
  return {
    show: false
  };
}

const mapStateToProps = state => {
  const cells = state.world.locations.map(location => {
    return {
      x: location.x,
      y: location.y,
      size: 30,
      show: location.visited,
      borderTop: borderForPath(location.paths, 'north'),
      borderBottom: borderForPath(location.paths, 'south'),
      borderRight: borderForPath(location.paths, 'east'),
      borderLeft: borderForPath(location.paths, 'west')
    };
  });
  const currentLocation = getPlayerLocation(state);
  if (!currentLocation) {
    return {};
  }

  return {
    showMap: true,
    gridHeight: 6,
    gridWidth: 3,
    cellSize: 30,
    currentLocationX: currentLocation.x,
    currentLocationY: currentLocation.y,
    cells
  };
};

const mapDispatchToProps = () => {
  return {};
};

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);

export default MapContainer;
