import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { createRefetchContainer, graphql } from 'react-relay/compat';
import connectToStores from 'fluxible-addons-react/connectToStores';

import PopupMock from './PopupMock';
import MarkerPopupBottom from '../MarkerPopupBottom';
import StopCardContainer from '../../StopCardContainer';
import ComponentUsageExample from '../../ComponentUsageExample';

import mockData from './StopMarkerPopup.mockdata';

const NUMBER_OF_DEPARTURES = 5;
const STOP_TIME_RANGE = 12 * 60 * 60;
const TERMINAL_TIME_RANGE = 60 * 60;

class StopMarkerPopup extends React.PureComponent {
  componentWillReceiveProps({ relay, currentTime }) {
    const currUnix = this.props.currentTime;
    if (currUnix !== currentTime) {
      relay.refetch({ currentTime: currUnix }, null);
    }
  }

  render() {
    const { currentTime, stop, terminal } = this.props;
    const entity = stop || terminal;
    const isTerminal = terminal !== null;

    return (
      <div className="card">
        <StopCardContainer
          stop={entity}
          numberOfDepartures={(isTerminal ? 3 : 1) * NUMBER_OF_DEPARTURES}
          startTime={currentTime}
          isTerminal={isTerminal}
          timeRange={isTerminal ? TERMINAL_TIME_RANGE : STOP_TIME_RANGE}
          limit={NUMBER_OF_DEPARTURES}
          isPopUp
          className="card-padding"
        />
        <MarkerPopupBottom
          location={{
            address: entity.name,
            lat: entity.lat,
            lon: entity.lon,
          }}
        />
      </div>
    );
  }
}

StopMarkerPopup.propTypes = {
  stop: PropTypes.object,
  terminal: PropTypes.object,
  currentTime: PropTypes.number.isRequired,
  relay: PropTypes.shape({
    refetch: PropTypes.func.isRequired,
  }).isRequired,
};

const StopMarkerPopupContainer = createRefetchContainer(
  connectToStores(StopMarkerPopup, ['TimeStore'], ({ getStore }) => ({
    currentTime: getStore('TimeStore')
      .getCurrentTime()
      .unix(),
  })),
  {
    /* TODO manually deal with:
    initialVariables: {
      currentTime: 0,
    }
    */
    stop: graphql`
    fragment on Stop
      @argumentDefinitions(
        currentTime: { type: "Long!", defaultValue: 0 }
        timeRange: { type: "Long!", defaultValue: 43200 }
        numberOfDepartures: { type: "Int!", defaultValue: 5 }
      ) {
      gtfsId
      lat
      lon
      name
      ...StopCardContainer_stop
    }
  `,
    terminal: graphql`
    fragment on Stop
      @argumentDefinitions(
        currentTime: { type: "Long!", defaultValue: 0 }
        timeRange: { type: "Long!", defaultValue: 3600 }
        numberOfDepartures: { type: "Int!", defaultValue: 15 }
      ) {
      gtfsId
      lat
      lon
      name
      ...StopCardContainer_stop
    }
  `,
  },
);

StopMarkerPopupContainer.displayName = 'StopMarkerPopup';

const getTimeProps = currentTime => ({
  currentTime,
  relay: {
    refetch: () => {},
  },
});

StopMarkerPopupContainer.description = () => (
  <div>
    <ComponentUsageExample description="empty">
      <PopupMock size="small">
        <StopMarkerPopup
          {...mockData.empty}
          {...getTimeProps(moment().unix())}
        />
      </PopupMock>
    </ComponentUsageExample>
    <ComponentUsageExample description="basic">
      <PopupMock>
        <StopMarkerPopup
          {...mockData.basic}
          {...getTimeProps(mockData.currentTime)}
        />
      </PopupMock>
    </ComponentUsageExample>
    <ComponentUsageExample description="withInfo">
      <PopupMock size="small">
        <StopMarkerPopup
          stop={{
            ...mockData.empty.stop,
            alerts: [
              {
                alertSeverityLevel: 'INFO',
              },
            ],
          }}
          {...getTimeProps(moment().unix())}
        />
      </PopupMock>
    </ComponentUsageExample>
    <ComponentUsageExample description="withDisruption">
      <PopupMock size="small">
        <StopMarkerPopup
          stop={{
            ...mockData.empty.stop,
            alerts: [
              {
                alertSeverityLevel: 'WARNING',
              },
            ],
          }}
          {...getTimeProps(moment().unix())}
        />
      </PopupMock>
    </ComponentUsageExample>
  </div>
);

export default StopMarkerPopupContainer;
