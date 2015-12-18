Raven = require 'raven-js'
React              = require 'react'
SummaryNavigation  = require '../component/navigation/summary-navigation'
ItinerarySummary   = require '../component/itinerary/itinerary-summary'
ArrowLink          = require '../component/util/arrow-link'
Map                = require '../component/map/map'
ItinerarySearchActions = require '../action/itinerary-search-action'
EndpointActions    = require '../action/endpoint-actions.coffee'
SummaryRow         = require '../component/summary/summary-row'
NoRoutePopup       = require '../component/summary/no-route-popup'
SearchTwoFieldsContainer = require '../component/search/search-two-fields-container'
ItineraryLine      = require '../component/map/itinerary-line'
sortBy             = require 'lodash/collection/sortBy'
{otpToLocation, locationToCoords} = require '../util/otp-strings'
{supportsHistory}  = require 'history/lib/DOMUtils'
intl               = require 'react-intl'

FormattedMessage = intl.FormattedMessage

class SummaryPage extends React.Component
  @contextTypes:
    getStore: React.PropTypes.func.isRequired
    executeAction: React.PropTypes.func.isRequired
    history: React.PropTypes.object.isRequired
    location: React.PropTypes.object.isRequired

  @loadAction: (params) ->
    [
      [EndpointActions.setOrigin, otpToLocation(params.from)],
      [EndpointActions.setDestination, otpToLocation(params.to)]
    ]

  componentWillMount: ->
    props = @context.getStore('ItinerarySearchStore').getOptions()
    if props.params.from != @props.params.from or props.params.to != @props.params.to
      @context.executeAction ItinerarySearchActions.itinerarySearchRequest, @props

  componentWillUpdate: (props) ->
    if props.params.from != @props.params.from or props.params.to != @props.params.to
      @context.executeAction ItinerarySearchActions.itinerarySearchRequest, props

  componentDidMount: ->
    @context.getStore('ItinerarySearchStore').addChangeListener @onChange
    @context.getStore("TimeStore").addChangeListener @onTimeChange

  componentWillUnmount: ->
    @context.getStore('ItinerarySearchStore').removeChangeListener @onChange
    @context.getStore("TimeStore").removeChangeListener @onTimeChange

  onChange: =>
    @forceUpdate()

  onTimeChange: =>
    @context.executeAction ItinerarySearchActions.itinerarySearchRequest, @props

  getActiveIndex: =>
    @context.location.state?.summaryPageSelected or @state?.summaryPageSelected or 0

  onSelectActive: (index) =>
    if @getActiveIndex() == index # second click navigates
      @context.history.pushState null, "#{@context.location.pathname}/#{index}"
    else if supportsHistory()
      @context.history.replaceState summaryPageSelected: index, @context.location.pathname
    else
      @setState summaryPageSelected: index
      @forceReload()

  render: ->
    rows = []
    leafletObjs = []
    activeIndex = @getActiveIndex()

    data = @context.getStore('ItinerarySearchStore').getData()
    plan = data.plan
    if plan
      summary = <ItinerarySummary className="itinerary-summary--summary-row itinerary-summary--onmap-black"
                                  itinerary={plan.itineraries[@getActiveIndex()]}
                                  />
      toItinerary = <ArrowLink to="#{@context.location.pathname}/#{@getActiveIndex()}"
                               className="arrow-link--summary-row right-arrow-blue-background"/>
      for data, i in plan.itineraries
        passive = i != activeIndex
        rows.push <SummaryRow key={i}
                              hash={i}
                              params={@props.params}
                              data={data} passive={passive}
                              onSelect={@onSelectActive}/>
        leafletObjs.push <ItineraryLine key={i}
                                        hash={i}
                                        legs={data.legs}
                                        showFromToMarkers={i == 0}
                                        passive={passive}/>
    else if data.error
      rows = [
        <FormattedMessage
          id='route-not-possible'
          defaultMessage="Unfortunately your route is not possible. Technical error: '{error}'"
          values={
            error: data.error.msg
          }/>,
        <NoRoutePopup />]
      Raven.captureMessage("OTP returned an error when requesting a plan", {extra: data})


    # Draw active last
    leafletObjs = sortBy(leafletObjs, (i) => i.props.passive == false)

    <SummaryNavigation className="fullscreen">
      <Map ref="map"
           className="summaryMap"
           leafletObjs={leafletObjs}
           fitBounds={true}
           from={locationToCoords(otpToLocation(@props.params.from))}
           to={locationToCoords(otpToLocation(@props.params.to))}
           padding={[0, 110]}>
        <SearchTwoFieldsContainer/>
        {toItinerary}
        {summary}
      </Map>
      <div>{rows}</div>
    </SummaryNavigation>

module.exports = SummaryPage
