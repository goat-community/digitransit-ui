import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import SearchSettingsDropdown from './SearchSettingsDropdown';
import { RoutingProfileOptions } from '../../constants';
import { saveRoutingSettings } from '../../action/SearchSettingsActions';

const RoutingProfileOptionsSection = (
  { currentSettings },
  { intl, executeAction, config },
  currentSelection = currentSettings.routingProfile ||
    RoutingProfileOptions.Standard,
) => {
  const routingProfileOptions = [
    {
      title: 'default',
      value: RoutingProfileOptions.Standard,
    },
    {
      title: 'wheelchair',
      value: RoutingProfileOptions.Wheelchair,
    },
    {
      title: 'rollator',
      value: RoutingProfileOptions.Rollator,
    },
    {
      title: 'slight-walking-disability',
      value: RoutingProfileOptions.SlightWalkingDisability,
    },
    {
      title: 'moderate-walking-disability',
      value: RoutingProfileOptions.ModerateWalkingDisability,
    },
    {
      title: 'severe-walking-disability',
      value: RoutingProfileOptions.SevereWalkingDisability,
    },
    {
      title: 'stroller',
      value: RoutingProfileOptions.Stroller,
    },
  ];
  return (
    <div className="walk-options-container">
      <SearchSettingsDropdown
        currentSelection={
          routingProfileOptions.find(
            option => option.value === currentSelection,
          ) || routingProfileOptions[0]
        }
        onOptionSelected={value => {
          if (!config.routingProfilesDefaultSettings?.[value]) {
            throw new Error(
              `Routing profile ${value} is not defined in the default settings`,
            );
          }
          // eslint-disable-next-line no-console
          executeAction(saveRoutingSettings, {
            routingProfile: value,
            ...config.routingProfilesDefaultSettings[value],
          });
        }}
        options={routingProfileOptions}
        labelText={intl.formatMessage({ id: 'routing-profile' })}
        highlightDefaulValue
        formatOptions
        name="routing-profile"
      />
    </div>
  );
};

RoutingProfileOptionsSection.propTypes = {
  currentSettings: PropTypes.object.isRequired,
};

RoutingProfileOptionsSection.contextTypes = {
  config: PropTypes.object.isRequired,
  executeAction: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default RoutingProfileOptionsSection;
