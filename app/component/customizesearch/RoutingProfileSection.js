import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import { matchShape, routerShape } from 'found';
import SearchSettingsDropdown from './SearchSettingsDropdown';
import {
  RoutingProfileOptions,
  RoutingProfileDropDownOptions,
} from '../../constants';
import { saveRoutingSettings } from '../../action/SearchSettingsActions';
import { replaceQueryParams } from '../../util/queryUtils';

const RoutingProfileOptionsSection = (
  { currentSettings },
  { intl, executeAction, config, router, match },
  currentSelection = currentSettings.routingProfile ||
    RoutingProfileOptions.Standard,
) => {
  return (
    <div className="walk-options-container">
      <SearchSettingsDropdown
        currentSelection={
          RoutingProfileDropDownOptions.find(
            option => option.value === currentSelection,
          ) || RoutingProfileDropDownOptions[0]
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
          setTimeout(() => {
            replaceQueryParams(router, match, {});
          }, 100);
        }}
        options={RoutingProfileDropDownOptions}
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
  router: routerShape.isRequired,
  match: matchShape.isRequired,
};

export default RoutingProfileOptionsSection;
