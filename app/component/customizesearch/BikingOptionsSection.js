import PropTypes from 'prop-types';
import React from 'react';
import { matchShape, routerShape } from 'found';
import { intlShape } from 'react-intl';
import { saveRoutingSettings } from '../../action/SearchSettingsActions';
import SearchSettingsDropdown, {
  getStepOptionsNumerical,
  valueShape,
} from './SearchSettingsDropdown';
import { addAnalyticsEvent } from '../../util/analyticsUtils';
import { findNearestOption } from '../../util/planParamUtil';
import { BicycleParkingFilter } from '../../constants';
import { replaceQueryParams } from '../../util/queryUtils';

// eslint-disable-next-line react/prefer-stateless-function
class BikingOptionsSection extends React.Component {
  render() {
    const { defaultSettings, bikeSpeed, overrideStyle } = this.props;
    const { intl } = this.context;
    const options = getStepOptionsNumerical(this.props.bikeSpeedOptions);

    const parkingOptions = [
      {
        title: intl.formatMessage({
          id: `bicycle-parking-filter-${BicycleParkingFilter.All}`,
        }),
        value: BicycleParkingFilter.All,
      },
      {
        title: intl.formatMessage({
          id: `bicycle-parking-filter-${BicycleParkingFilter.FreeOnly}`,
        }),
        value: BicycleParkingFilter.FreeOnly,
      },
      {
        title: intl.formatMessage({
          id: `bicycle-parking-filter-${BicycleParkingFilter.SecurePreferred}`,
        }),
        value: BicycleParkingFilter.SecurePreferred,
      },
    ];

    const currentSelection =
      options.find(option => option.value === bikeSpeed) ||
      options.find(
        option =>
          option.value ===
          findNearestOption(bikeSpeed, this.props.bikeSpeedOptions),
      );

    const currentParkingFilter = parkingOptions.find(
      f => f.value === this.props.bicycleParkingFilter,
    );
    return (
      <React.Fragment>
        <SearchSettingsDropdown
          name="bike-parking-selector"
          currentSelection={currentParkingFilter}
          defaultValue={defaultSettings.bicycleParkingFilter}
          onOptionSelected={value => {
            this.context.executeAction(saveRoutingSettings, {
              bicycleParkingFilter: value,
            });
            addAnalyticsEvent({
              category: 'ItinerarySettings',
              action: 'ChangeBicycleParkingFilter',
              name: value,
            });
            setTimeout(() => {
              replaceQueryParams(this.context.router, this.context.match, {});
            }, 100);
          }}
          options={parkingOptions}
          formatOptions
          labelText={intl.formatMessage({ id: 'bicycle-parking-filter' })}
          translateLabels={false}
        />
        <SearchSettingsDropdown
          name="bike-speed-selector"
          currentSelection={currentSelection}
          defaultValue={defaultSettings.bikeSpeed}
          onOptionSelected={value => {
            this.context.executeAction(saveRoutingSettings, {
              bikeSpeed: value,
            });
            addAnalyticsEvent({
              category: 'ItinerarySettings',
              action: 'ChangeBikingSpeed',
              name: value,
            });
            setTimeout(() => {
              replaceQueryParams(this.context.router, this.context.match, {});
            }, 100);
          }}
          options={options}
          formatOptions
          labelText={intl.formatMessage({ id: 'biking-speed' })}
          translateLabels={false}
          overrideStyle={overrideStyle}
        />
      </React.Fragment>
    );
  }
}

BikingOptionsSection.propTypes = {
  bikeSpeed: valueShape.isRequired,
  bicycleParkingFilter: PropTypes.string.isRequired,
  bikeSpeedOptions: PropTypes.array.isRequired,
  overrideStyle: PropTypes.object,
  defaultSettings: PropTypes.shape({
    bikeSpeed: PropTypes.number.isRequired,
    bicycleParkingFilter: PropTypes.string.isRequired,
  }).isRequired,
};

BikingOptionsSection.contextTypes = {
  match: matchShape.isRequired,
  router: routerShape.isRequired,
  intl: intlShape.isRequired,
  executeAction: PropTypes.func.isRequired,
};

export default BikingOptionsSection;
