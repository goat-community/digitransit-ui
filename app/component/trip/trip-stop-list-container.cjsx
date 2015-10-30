React                   = require 'react'
Relay                   = require 'react-relay'
queries                 = require '../../queries'
GtfsUtils               = require '../../util/gtfs'
groupBy                 = require 'lodash/collection/groupBy'
cx                      = require 'classnames'
TripRouteStop           = require './trip-route-stop'
isEmpty                 = require 'lodash/lang/isEmpty'
moment                  = require 'moment'
geoUtils              = require '../../util/geo-utils'

class TripStopListContainer extends React.Component
  @contextTypes:
    getStore: React.PropTypes.func.isRequired

  setNearestStopDistance: (stops) =>
    state = @context.getStore('LocationStore').getLocationState()
    if state.hasLocation == true
      geoUtils.setDistanceToNearestStop(state.lat, state.lon, stops);

  componentDidMount: ->
    @context.getStore('RealTimeInformationStore').addChangeListener @onRealTimeChange

  componentWillUnmount: ->
    @context.getStore('RealTimeInformationStore').removeChangeListener @onRealTimeChange

  onRealTimeChange: =>
    @forceUpdate()

  getStops: ->
    @setNearestStopDistance(@props.trip.stoptimes.map(
      (stoptime)->
        stoptime.stop
    ))
    mode = @props.trip.route.type.toLowerCase()
    vehicles = @context.getStore('RealTimeInformationStore').vehicles
    vehicle = !isEmpty(vehicles) && vehicles[Object.keys(vehicles)[0]]

    currentTime = moment()
    currentTimeFromMidnight = currentTime.clone().diff(currentTime.clone().startOf('day'), 'seconds')
    stopPassed = false


    @props.trip.stoptimes.map (stoptime, index) ->
      nextStop = "HSL:" + vehicle.next_stop
      if nextStop == stoptime.stop.gtfsId
        stopPassed = true
      else if vehicle.stop_index == index
        # tram: next_stop is undefined
        stopPassed = true
      else if (stoptime.realtimeDeparture > currentTimeFromMidnight && isEmpty(vehicle))
        stopPassed = true

      <TripRouteStop
        key={stoptime.stop.gtfsId}
        stop={stoptime.stop}
        mode={mode}
        nearestDistance={stoptime.stop.nearestDistanceß}
        vehicle={if nextStop == stoptime.stop.gtfsId then vehicle}
        stopPassed={stopPassed}
        realtime={stoptime.realtime}
        realtimeDeparture={stoptime.realtimeDeparture}
        currentTimeFromMidnight={currentTimeFromMidnight}/>

  render: ->
    <div className={cx "route-stop-list", @props.className}>
      {@getStops()}
    </div>

module.exports = Relay.createContainer(TripStopListContainer, fragments: queries.TripStopListFragments)
