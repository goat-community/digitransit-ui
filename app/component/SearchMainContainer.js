
import React from 'react';
import { intlShape, FormattedMessage } from 'react-intl';
import Tab from 'material-ui/Tabs/Tab';
import cx from 'classnames';
import without from 'lodash/without';

import { setEndpoint, setUseCurrent } from '../action/EndpointActions';
import FakeSearchBar from './FakeSearchBar';
import FakeSearchWithButtonContainer from './FakeSearchWithButtonContainer';
import GeolocationOrInput from './GeolocationOrInput';
import SearchModal from './SearchModal';
import SearchModalLarge from './SearchModalLarge';
import Icon from './Icon';
import { getAllEndpointLayers } from '../util/searchUtils';


class SearchMainContainer extends React.Component {
  static contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired,
    router: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    breakpoint: React.PropTypes.string.isRequired,
  };

  static propTypes = {
    className: React.PropTypes.string,
    searchModalIsOpen: React.PropTypes.bool.isRequired,
    selectedTab: React.PropTypes.string.isRequired,
  }

  onTabChange = tab => this.changeToTab(tab.props.value)

  componentDidMount() {
    this.focusInput(this.props.selectedTab);
  }

  onSuggestionSelected = (name, item) => {
    if (item.properties.link) {
      const newLocation = {
          ...this.context.location,
        state: {
          ...this.context.location.state,
          searchModalIsOpen: false,
        },
        pathname: item.properties.link,
      }
      return this.context.router.push(newLocation);
    }

    if (item.type === 'CurrentLocation') {
      this.context.executeAction(setUseCurrent, {
        target: this.props.selectedTab,
      });
    } else {
      this.context.executeAction(setEndpoint, {
        target: this.props.selectedTab,
        endpoint: {
          lat: item.geometry.coordinates[1],
          lon: item.geometry.coordinates[0],
          address: name,
        },
      });
    }

    this.closeModal();
  }

  searchInputs = [];

  clickSearch = () => {
    const origin = this.context.getStore('EndpointStore').getOrigin();
    const geolocation = this.context.getStore('PositionStore').getLocationState();
    const hasOrigin = origin.lat || (origin.useCurrentPosition && geolocation.hasLocation);

    this.openDialog(hasOrigin ? 'destination' : 'origin');
  }

  isOpen = () => {
    return this.props.searchModalIsOpen;
  }

  openDialog = (tab) => {
    const state = {
      searchModalIsOpen: true,
      selectedTab: tab,
    };

    this.context.router.push({
      state: state,
      pathname: this.context.location.pathname,
    });
  }

  focusInput = value => {
    // this.searchInputs[value].searchInput is a hack
    if(this.searchInputs[value]) {
      this.searchInputs[value].searchInput.autowhatever.input.focus()
    }
  }

  closeModal = () => this.context.router.goBack()

  changeToTab(tabname) {
    this.context.router.replace({
      ...this.context.location,
      state: {
        ...this.context.location.state,
        selectedTab: tabname,
      },
    });
    this.focusInput(tabname);
  }

  renderEndpointTab = (tabname, tablabel, type, endpoint, layers) => (
    <Tab
      className={`search-header__button${this.props.selectedTab === tabname ? '--selected' : ''}`}
      label={tablabel}
      value={tabname}
      id={tabname}
      onActive={this.onTabChange}
    >
      <GeolocationOrInput
        ref={(c) => { this.searchInputs[tabname] = c; }}
        id={`search-${tabname}`}
        useCurrentPosition={endpoint.useCurrentPosition}
        initialValue={endpoint.address}
        type={type}
        layers={layers}
        close={this.closeModal}
        onSuggestionSelected={this.onSuggestionSelected}
      />
    </Tab>
  );

  render() {
    const destinationPlaceholder = this.context.intl.formatMessage({
      id: 'destination-placeholder',
      defaultMessage: 'Where to? - address or stop',
    });

    const fakeSearchBar = (
      <FakeSearchBar
        placeholder={destinationPlaceholder}
        id="front-page-search-bar"
      />);

    const Component = this.context.breakpoint === 'large' ? SearchModalLarge : SearchModal;

    const origin = this.context.getStore('EndpointStore').getOrigin();
    let searchLayers = getAllEndpointLayers();
    if (origin.useCurrentPosition) { // currpos-currpos routing not allowed
      searchLayers = without(searchLayers, 'CurrentPosition');
    }

    return (
      <div
        className={cx(
          'fake-search-container', `bp-${this.context.breakpoint}`, this.props.className,
        )}
      >
        <FakeSearchWithButtonContainer fakeSearchBar={fakeSearchBar} onClick={this.clickSearch} />
        <Component
          selectedTab={this.props.selectedTab}
          modalIsOpen={this.isOpen()}
          closeModal={this.closeModal}
        >
          {this.renderEndpointTab(
            'origin',
            <div>
              <FormattedMessage id="origin" defaultMessage="Origin" />
              <br />
              <span className="search-current-origin-tip">
                {!origin.useCurrentPosition ? origin.address : [
                  <Icon img="icon-icon_position" key="icon" />,
                  <FormattedMessage
                    key="text"
                    id="own-position"
                    defaultMessage="Your current location"
                  />,
                ]}
              </span>
            </div>,
            'endpoint',
            this.context.getStore('EndpointStore').getOrigin(),
            searchLayers,
          )}
          {this.renderEndpointTab(
            'destination',
            <div>
              <FormattedMessage id="search" defaultMessage="Search" />
              <br />
              <span className="search-current-origin-tip">
                <FormattedMessage
                  id="place-route-or-keyword"
                  defaultMessage="Destination, route or stop"
                />
              </span>
            </div>,
            'all',
            this.context.getStore('EndpointStore').getDestination(),
            searchLayers,
          )}
        </Component>
      </div>
    );
  }
}

export default SearchMainContainer;
