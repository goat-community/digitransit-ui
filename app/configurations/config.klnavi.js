/* eslint-disable */
import configMerger from '../util/configMerger';
import { MapMode } from '../constants';

const CONFIG = 'klnavi';
const APP_TITLE = 'KLNavi';
const HEADER_TITLE = 'KLNavi';
const APP_DESCRIPTION = 'Mobilitätsplattform für die Stadt Kaiserslautern';
const API_URL = process.env.API_URL || 'https://api.klnavi.dev.plan4better.de';
const DATAHUB_TILES_URL = process.env.DATAHUB_TILES_URL || 'https://tiles.bbnavi.de';
// const MAP_URL = process.env.MAP_URL || 'https://tiles.stadtnavi.eu/streets/{z}/{x}/{y}{r}.png';
const SEMI_TRANSPARENT_MAP_URL = process.env.SEMITRANSPARENT_MAP_URL || "https://tiles.stadtnavi.eu/satellite-overlay/{z}/{x}/{y}{r}.png";
const GEOCODING_BASE_URL = process.env.GEOCODING_BASE_URL || "https://photon.stadtnavi.eu/pelias/v1";
const YEAR = 1900 + new Date().getYear();
const STATIC_MESSAGE_URL =
    process.env.STATIC_MESSAGE_URL ||
    '/assets/messages/message.klnavi.json';

const walttiConfig = require('./config.waltti.js').default;


const minLat = 48.966571;
const maxLat = 49.900007;
const minLon = 7.2464377;
const maxLon = 10.161698;
// Center
const focusLat = 49.441866;
const focusLon = 7.770070;


export default configMerger(walttiConfig, {
    CONFIG,
    DATAHUB_O_AUTH: {
        CLIENT_ID: process.env.DATAHUB_O_AUTH_CLIENT_ID,
        CLIENT_SECRET: process.env.DATAHUB_O_AUTH_CLIENT_SECRET,
    },
    URL: {
        DATAHUB: process.env.DATAHUB_URL || 'https://datahub.bbnavi.de',
        OTP: process.env.OTP_URL || `${API_URL}/otp/routers/default/`,
        MAP: {
            default: 'https://sgx.geodatenzentrum.de/wmts_basemapde/tile/1.0.0/de_basemapde_web_raster_farbe/default/GLOBAL_WEBMERCATOR/{z}/{y}/{x}.png',
            osm: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            // satellite: 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWxpYXNwYWphcmVzIiwiYSI6ImNqOW1scnVyOTRxcWwzMm5yYWhta2N2cXcifQ.aDCgidtC9cjf_O75frn9lA',
            semiTransparent: SEMI_TRANSPARENT_MAP_URL,
            bicycle: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
        },
        STOP_MAP: `${API_URL}/otp/routers/default/vectorTiles/stops/`,
        PARK_AND_RIDE_MAP: `${API_URL}/otp/routers/default/vectorTiles/parking/`,
        ROADWORKS_MAP: `${API_URL}/map/v1/cifs/`,
        COVID19_MAP: '', // `https://tiles.caresteouvert.fr/public.poi_osm_light/{z}/{x}/{y}.pbf`,
        RENTAL_STATION_MAP: `${API_URL}/otp/routers/default/vectorTiles/rentalStations/`,
        RENTAL_VEHICLE_MAP: `${API_URL}/otp/routers/default/vectorTiles/rentalVehicles/`,
        REALTIME_RENTAL_STATION_MAP: `${API_URL}/otp/routers/default/vectorTiles/realtimeRentalStations/`,
        WEATHER_STATIONS_MAP: '', // `${API_URL}/map/v1/weather-stations/`,
        CHARGING_STATIONS_MAP: 'https://ocpdb.bbnavi.de/tiles/{z}/{x}/{y}.mvt',
        CHARGING_STATION_DETAILS_API: 'https://ocpdb.bbnavi.de/api/ocpi/2.2/location/',
        PELIAS: `${process.env.GEOCODING_BASE_URL || GEOCODING_BASE_URL}/search`,
        PELIAS_REVERSE_GEOCODER: `${process.env.GEOCODING_BASE_URL || GEOCODING_BASE_URL
            }/reverse`,
        PELIAS_PLACE: `${process.env.GEOCODING_BASE_URL || GEOCODING_BASE_URL
            }/place`,
        FARES: '', // `${API_URL}/fares`,
        FONT: '' // Do not use Google fonts.
    },

    mainMenu: {
        showDisruptions: false,
        showEmbeddedSearch: false,
    },

    availableLanguages: ['de', 'en', 'pl'],
    defaultLanguage: 'de',
    issueTrackerUrl: '', // 'https://maengelmelder.service-bw.de/?lat=${lat}&lng=${lon}',

    MATOMO_URL: process.env.MATOMO_URL,

    /* disable the "next" column of the Route panel as it can be confusing sometimes: https://github.com/stadtnavi/digitransit-ui/issues/167 */
    displayNextDeparture: false,
    maxWalkDistance: 15000,
    optimize: "TRIANGLE",
    defaultSettings: {
        optimize: "TRIANGLE",
        safetyFactor: 0.4,
        slopeFactor: 0.3,
        timeFactor: 0.3,
        includeParkAndRideSuggestions: true,
        includeCarSuggestions: true,
    },
    routingProfilesDefaultSettings: {
        default: {
            walkSpeed: 1.4,
            accessibilityOption: false,
            includeBikeSuggestions: true,
            showBikeAndParkItineraries: true,
        },
        wheelchair: {
            walkSpeed: 1.4,
            accessibilityOption: true,
            includeBikeSuggestions: false,
            showBikeAndParkItineraries: false,
        },
        stroller: {
            walkSpeed: 1.4,
            accessibilityOption: true,
            includeBikeSuggestions: false,
            showBikeAndParkItineraries: false,
        },
        rollator: {
            walkSpeed: 0.6,
            accessibilityOption: false,
            includeBikeSuggestions: false,
            showBikeAndParkItineraries: false,
        },
        'slight-walking-disability': {
            walkSpeed: 0.8,
            accessibilityOption: false,
            includeBikeSuggestions: true,
        },
        'moderate-walking-disability': {
            walkSpeed: 0.4,
            accessibilityOption: false,
            includeBikeSuggestions: true,
        },
        'severe-walking-disability': {
            walkSpeed: 0.2,
            accessibilityOption: false,
            includeBikeSuggestions: false,
            showBikeAndParkItineraries: false,
        },
    },
    // TODO shouldn't boolean be reversed? See https://github.com/HSLdevcom/digitransit-ui/pull/4648#discussion_r1121671721 
    separatedParkAndRideSwitch: false,
    defaultOptions: {
        walkSpeed: [0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2],
    },
    itinerary: {
        delayThreshold: 60,
    },
    modesWithNoBike: ['BICYCLE_RENT', 'WALK', 'CARPOOL', 'FLEX_DIRECT', 'FLEX_ACCESS', 'FLEX_EGRESS'],
    appBarLink: {
        name: 'Feedback',
        href: 'https://klnavi.de/feedback',
        target: '_blank'
    },
    contactName: {
        de: 'transportkollektiv',
        default: 'transportkollektiv',
    },
    colors: {
        primary: '#007CBD',
        iconColors: {
            'mode-bus': '#ff0000',
            'mode-car': '#007AC9',
            'mode-rail': '#008000',
            'mode-metro': '#0065B0',
            'mode-citybike': '#ff834a',
            'mode-charging-station': '#00b096',
            'mode-bike-park': '#005ab4',
            'mode-carpool': '#9fc727'
        },
    },

    sprites: 'assets/svg-sprite.bbnavi.svg',

    socialMedia: {
        title: APP_TITLE,
        description: APP_DESCRIPTION,
        image: {
            url: '/img/klnavi-social-media.png',
            width: 600,
            height: 300,
        },
        twitter: {
            card: 'summary_large_image',
            site: '@herzlichdigital',
        },
    },

    parkAndRide: {
        show: true,
        smallIconZoom: 14,
        minZoom: 14,
    },

    parkAndRideForBikes: {
        show: true,
        smallIconZoom: 14,
        minZoom: 14
    },

    roadworks: {
        show: false,
        roadworksSmallIconZoom: 16,
        roadworksMinZoom: 10
    },

    covid19: {
        show: false,
        smallIconZoom: 17,
        minZoom: 15
    },

    weatherStations: {
        show: false,
        smallIconZoom: 17,
        minZoom: 15
    },

    backgroundMaps: [{
        mapMode: MapMode.Default,
        messageId: 'map-type-streets',
        defaultMessage: 'Streets (LGB)',
        previewImage: '/img/maptype-streets-lgb.png',
    }, {
        mapMode: MapMode.Bicycle,
        messageId: 'map-type-bicycle',
        defaultMessage: 'Bicycle',
        previewImage: '/img/maptype-bicycle.png',
    }, {
        mapMode: MapMode.OSM,
        messageId: 'map-type-openstreetmap',
        defaultMessage: 'OSM',
        previewImage: '/img/maptype-streets-osm.png',
    }],

    datahubTiles: {
        show: true,
        smallIconZoom: 17,
        minZoom: 15,
        layers: [{
            name: 'poi_coords_bike_rentals',
            labelId: 'map-layer-datahub-bike-rentals',
            icon: 'poi_bicycle_rental',
            baseUrl: `${DATAHUB_TILES_URL}/public.poi_coords_bike_rentals/`,
            vectorTileLayer: 'public.poi_coords_bike_rentals',
        }, {
            name: 'poi_coords_bike_repair_shops',
            labelId: 'map-layer-datahub-bike-repair-shops',
            icon: 'icon-icon_stop_bicycle_repair',
            baseUrl: `${DATAHUB_TILES_URL}/public.poi_coords_bike_repair_shops/`,
            vectorTileLayer: 'public.poi_coords_bike_repair_shops',
        }, {
            name: 'poi_coords_e_bike_charging_stations',
            labelId: 'map-layer-datahub-e-bike-charging-stations',
            icon: 'icon-icon_stop_e_bike_charging_station',
            baseUrl: `${DATAHUB_TILES_URL}/public.poi_coords_e_bike_charging_stations/`,
            vectorTileLayer: 'public.poi_coords_e_bike_charging_stations',
        }, {
            name: 'poi_coords_e_bike_rentals',
            labelId: 'map-layer-datahub-e-bike-rentals',
            icon: 'poi_e_bike_rental',
            baseUrl: `${DATAHUB_TILES_URL}/public.poi_coords_e_bike_rentals/`,
            vectorTileLayer: 'public.poi_coords_e_bike_rentals',
        }],
    },

    chargingStations: {
        show: true,
        smallIconZoom: 14,
        minZoom: 14
    },

    cityBike: {
        minZoomStopsNearYou: 10,
        showStationId: false,
        useSpacesAvailable: false,
        showCityBikes: true,
        networks: {
            'nextbike_vn': {
                icon: 'nextbike',
                name: {
                    de: 'Nextbike (VRN)',
                    en: 'Nextbike (VRN)',
                },
                type: 'citybike',
                url: {
                    de: 'https://www.nextbike.de/de/standorte/',
                    en: 'https://www.nextbike.de/en/standorte/',
                },
                visibleInSettingsUi: true,
                enabled: true,
            }
        }
    },

    mergeStopsByCode: true,

    title: APP_TITLE,
    titleAsHtml: APP_TITLE,
    appBarTitle: HEADER_TITLE,

    favicon: './app/configurations/images/klnavi/favicon.png',

    meta: {
        description: APP_DESCRIPTION,
    },
    welcomePopup: {
        enabled: true
    },
    modeToOTP: {
        carpool: 'CARPOOL',
    },

    logo: 'klnavi/herzlich_digital_logo.png',
    logoBlau: 'klnavi/herzlich_digital_logo_blau.png',
    logoSmall: 'klnavi/herzlich_digital_logo.png',

    GTMid: '',

    // get newest version from: https://github.com/moment/moment-timezone/blame/develop/data/packed/latest.json
    timezoneData: 'Europe/Berlin|CET CEST CEMT|-10 -20 -30|01010101010101210101210101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 kL0 Nc0 m10 WM0 1ao0 1cp0 dX0 jz0 Dd0 1io0 17c0 1fA0 1a00 1ehA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|41e5',

    map: {
        useRetinaTiles: true,
        tileSize: 256,
        zoomOffset: 0,
        zoom: 14,
        showZoomControl: true, // DT-3470, DT-3397
        showStreetModeSelector: false, // DT-3470
        showLayerSelector: true, // DT-3470
        showStopMarkerPopupOnMobile: true, // DT-3470
        showScaleBar: true, // DT-3470, DT-3397
        genericMarker: {
            popup: {
                offset: [0, 0],
                maxWidth: 250,
                minWidth: 250,
            }
        },
        attribution: {
            'default': '© GeoBasis-DE/LGB, <a tabindex=-1 href="https://www.govdata.de/dl-de/by-2-0">dl-de/by-2-0</a>, © Geoportal Berlin, <a tabindex=-1 href="https://www.govdata.de/dl-de/by-2-0">dl-de/by-2-0</a>, © <a tabindex=-1 href="https://gdz.bkg.bund.de">BKG</a>, © <a tabindex=-1 href="https://www.openstreetmap.org/copyright">OpenStreetMap-Mitwirkende</a>, <a tabindex=-1 href="https://www.vbb.de/vbb-services/api-open-data/datensaetze/">VBB</a> ',
            'osm': '© <a tabindex=-1 href="https://www.openstreetmap.org/copyright">OpenStreetMap-Mitwirkende</a>, <a tabindex=-1 href="https://www.vbb.de/vbb-services/api-open-data/datensaetze/">VBB</a> ',
            'satellite': '© GeoBasis-DE/LGB, <a tabindex=-1 href="https://www.govdata.de/dl-de/by-2-0">dl-de/by-2-0</a>, © Geoportal Berlin, <a tabindex=-1 href="https://www.govdata.de/dl-de/by-2-0">dl-de/by-2-0</a>, © <a tabindex=-1 href="https://www.openstreetmap.org/copyright">OpenStreetMap-Mitwirkende</a>, <a tabindex=-1 href="https://www.vbb.de/vbb-services/api-open-data/datensaetze/">VBB</a> ',
            'bicycle': '© <a tabindex=-1 href="https://www.openstreetmap.org/copyright">OpenStreetMap-Mitwirkende</a>, © <a tabindex=-1 href="https://www.cyclosm.org/#map=12/52.3728/4.8936/cyclosmx">CyclOSM</a>, © <a tabindex=-1 href="https://www.openstreetmap.fr/">OSM-FR</a>, <a tabindex=-1 href="https://www.vbb.de/vbb-services/api-open-data/datensaetze/">VBB</a>',
        },

        areaBounds: {
            // large buffer around Germany
            corner1: [58, 21.2],
            corner2: [46.5, 3.6],
        },
    },

    feedIds: ['klnavi'],

    searchSources: ['oa', 'osm'],
    searchParams: {
        'boundary.rect.min_lat': minLat,
        'boundary.rect.max_lat': maxLat,
        'boundary.rect.min_lon': minLon,
        'boundary.rect.max_lon': maxLon,
        'focus.point.lat': focusLat,
        'focus.point.lon': focusLon,
    },

    areaPolygon: [
        [minLon, minLat],
        [minLon, maxLat],
        [maxLon, maxLat],
        [maxLon, minLat],
    ],

    nationalServiceLink: {
        name: 'reiseauskunft.bahn.de',
        href: 'https://reiseauskunft.bahn.de/bin/query.exe/dn?protocol=https:'
    },

    defaultEndpoint: {
        lat: focusLat,
        lon: focusLon,
    },


    defaultOrigins: [
        {
            icon: 'icon-icon_bus',
            label: 'Bahnhof',
            lat: 49.441866,
            lon: 7.770070,
        },
        {
            icon: 'icon-icon_star',
            label: 'Krankenhaus',
            lat: 49.441866,
            lon: 7.770070,
        }
    ],

    menu: {
        copyright: {
            label: `© Herzlich Digital ${YEAR}`
        },
        content: [
            {
                name: 'about-this-service',
                nameEn: 'About this service',
                route: '/dieser-dienst',
                icon: 'icon-icon_info',
            },
            {
                name: 'imprint',
                nameEn: 'Imprint',
                href: 'https://klnavi.de/impressum',
            },
            {
                name: 'privacy',
                nameEn: 'Privacy',
                href: 'https://klnavi.de/datenschutzerklaerung',
            },
        ],
        sponsorImages: [
            {
                url: '/img/BMDV_Fz_2021_Web2x_de.gif',
                alt: 'Bundesministerium für Verkehr und digitale Infrastruktur',
            },
            {
                url: '/img/DkV_Logo_Final.png',
                alt: 'DKV Logo',
            },

        ],
        maintainedBy: [
            {
                url: '/img/kaiserslautern_logo_red.png',
                alt: 'Kaiserslautern Stadt'
            },
            {
                url: '/img/Logo-Herzlich-Digital-770x770.png',
                alt: 'Herzlich Digital',
                height: "130px"
            }
        ]
    },

    aboutThisService: {
        de: [
            {
                header: 'Über dieses Angebot',
                paragraphs: [
                    'KL.Navi ist eine Mobilitätsplattform für die Stadt Kaiserslautern. Die Projektpartner:innen und die beteiligten Kommunen bündeln hier Daten zu ÖPNV, Fußwegen, Radverkehr, Straßen- und Parkplätzen  Ladeinfrastruktur und Sharing-Angeboten. Die Mobilitätsangebote werden durch intermodales Routing miteinander vernetzt. Ein besonderer Fokus der Plattform ist das Routing für Personen mit eingeschränkter Mobilität, hierfür werden unter anderem Daten der Stadt Kaiserslautern und aus OSM verwendet.',
                ],
            },
            {
                header: 'Mitmachen',
                paragraphs: [
                    'Sie betreiben ein Mobilitätsangebot in Kaiserslautern und haben es noch nicht in KL.Navi gefunden? Dann freuen wir uns über Ihre Nachricht. Statistische und Echtzeit-Informationen, die als offene Daten vorliegen, binden wir gerne ein.',
                    'Sie nutzen ein Mobilitätsangebot in Brandenburg (z.B. einen Bürgerbus oder ein Fahrrad- oder Carsharing-Angebot) und finden es nicht in KL.Navi? Dann freuen wir uns über Ihre Hinweise und gucken dann, ob wir es in KL.Navi einbinden können.',
                    'Sie möchten zum Mitmacher werden und wünschen mehr Informationen?',
                    'Schreiben Sie uns eine E-mail an vorname.nachname@kaiserslautern.de',
                ]
            },
            {
                header: 'Digitransit Plattform',
                paragraphs: [
                    'Dieser Dienst basiert auf <a href="https://stadtnavi.de/">stadtnavi</a> stadtnavi.de, einem Projekt der Stadt Herrenberg in Baden-Württemberg. Die Grundlage für stadtnavi sind die internationalen Open-Source-Projekte Digitransit und OpenTripPlanner. Alle Software ist unter einer offenen Lizenzen verfügbar. Vielen Dank an alle Beteiligten.',
                    'Der gesamte Quellcode der Plattform, die aus vielen verschiedenen Komponenten besteht, ist auf <a href="https://github.com/bbnavi/">Github</a> verfügbar.'
                ],
            },
            {
                header: 'Datenquellen',
                paragraphs: [
                    'Kartendaten: © <a target=new href=https://www.openstreetmap.org/>OpenStreetMap Mitwirkende</a>',
                    'ÖPNV-Daten: Datensätze der <a target=new href=https://www.vrn.de/opendata/datasets>Verkehrsverbund Rhein-Neckar GmbH</a>, Shapes (d.h. Geometrien der Streckenverläufe) jeweils angereichert mit OpenStreetMap-Daten © OpenStreetMap Mitwirkende',
                    'Alle Angaben ohne Gewähr.'
                ],
            },
        ],
        en: [
            {
                header: 'About this service',
                paragraphs: [
                    'KL.Navi is a mobility platform for the city of Kaiserslautern. This project brings together partners and local municipalities to consolidate data on public transport, walking paths, cycling, street and parking information, charging infrastructure, and sharing services. The mobility offerings are connected through intermodal routing. A special focus of the platform is on routing for individuals with limited mobility, utilizing data from the city of Kaiserslautern and OpenStreetMap (OSM).',
                ],
            },
            {
                header: 'Get Involved',
                paragraphs: [
                    'Do you operate a mobility service in Kaiserslautern and cannot find it on KL.Navi? We welcome your input. We are keen to integrate both statistical and real-time information available as open data.',
                    'Are you using a mobility service in Brandenburg (e.g., a citizen bus or a bike or car sharing service) and cannot find it on KL.Navi? We appreciate your feedback and will look into incorporating it into KL.Navi.',
                    'Want to become a contributor and need more information?',
                    'Email us at firstname.lastname@kaiserslautern.de',
                ]
            },
            {
                header: 'Digitransit Platform',
                paragraphs: [
                    'This service is based on stadtnavi.de, a project by the city of Herrenberg in Baden-Württemberg. The foundation of stadtnavi includes the international open-source projects Digitransit and OpenTripPlanner. All software is available under open licenses. Thanks to all contributors.',
                    'The entire source code for the platform, which consists of many different components, is available on Github.'
                ],
            },
            {
                header: 'Data sources',
                paragraphs: [
                    'Map data: © OpenStreetMap contributors',
                    'Public transit data: Datasets by VBB GmbH, enhanced with OpenStreetMap data © OpenStreetMap contributors',
                    'No responsibility is accepted for the accuracy of this information.'
                ],
            },
        ]
    },
    redirectReittiopasParams: true,

    themeMap: {
        klnavi: 'klnavi'
    },

    transportModes: {

        nearYouTitle: {
            de: 'Fahrpläne und Routen',
        },

        bus: {
            availableForSelection: true,
            defaultValue: true,
            smallIconZoom: 16,
            nearYouLabel: {
                de: 'Bushaltestellen in der Nähe',
            }
        },

        rail: {
            availableForSelection: true,
            defaultValue: true,
            nearYouLabel: {
                de: 'Bahnhaltestellen in der Nähe',
            }
        },

        tram: {
            availableForSelection: true,
            defaultValue: true,
            nearYouLabel: {
                de: 'Tramhaltestellen in der Nähe',
            }
        },

        subway: {
            availableForSelection: true,
            defaultValue: true,
            nearYouLabel: {
                de: 'U-Bahnhaltestellen in der Nähe',
            }
        },
        airplane: {
            availableForSelection: false,
            defaultValue: false,
            nearYouLabel: {
                de: 'Flughäfen in der Nähe',
            }
        },

        ferry: {
            availableForSelection: true,
            defaultValue: true,
            nearYouLabel: {
                de: 'Fähranleger in der Nähe',
            }
        },

        carpool: {
            availableForSelection: true,
            defaultValue: true,
            nearYouLabel: {
                de: 'Mitfahrpunkte in der Nähe',
                en: 'Nearby carpool stops on the map',
            }
        },

        citybike: {
            availableForSelection: true,
            defaultValue: true,
            nearYouLabel: {
                de: 'Sharing-Angebote in der Nähe',
                en: 'Shared mobility near you'
            }
        },
    },

    streetModes: {
        public_transport: {
            availableForSelection: true,
            defaultValue: true,
            exclusive: false,
            icon: 'bus-withoutBox',
        },

        walk: {
            availableForSelection: true,
            defaultValue: false,
            exclusive: true,
            icon: 'walk',
        },

        bicycle: {
            availableForSelection: true,
            defaultValue: false,
            exclusive: true,
            icon: 'bicycle-withoutBox',
        },

        car: {
            availableForSelection: false,
            defaultValue: false,
            exclusive: false,
            icon: 'car-withoutBox',
        },

        car_park: {
            availableForSelection: true,
            defaultValue: false,
            exclusive: false,
            icon: 'car-withoutBox',
        },

        carpool: {
            availableForSelection: true,
            defaultValue: false,
            exclusive: true,
            icon: 'carpool-withoutBox',
        },
    },

    showTicketInformation: false,
    showTicketPrice: false,
    availableTickets: { 'klnavi': {} },
    fareMapping: function mapFareId(fareId) {
        return {
            en: "Adult",
            de: "Regulär",
        };
    },
    displayFareInfoTop: false,

    showWeatherInformation: false,

    // the route to stop button in when you select an individual stop/bike rental station
    showMapRoutingButton: false,
    showRouteSearch: false,
    showNearYouButtons: false,

    // adding assets/geoJson/hb-layers layers
    geoJson: {
        layers: [
            // TMB Geo Daten der POIs aus der Kategorie 15 (Fahrradvermietung/-service)
            {
                name: {
                    en: 'VRN Mask',
                    de: 'VRN Mask',
                },
                url: '/assets/geojson/vrn_mask.geojson',
                isOffByDefault: false,
            },
            {
                name: {
                    en: 'Kaiserslautern',
                    de: 'Kaiserslautern',
                },
                url: '/assets/geojson/klnavi_boundary.geojson',
                isOffByDefault: false,
            },

        ],
    },
    staticMessagesUrl: STATIC_MESSAGE_URL,

    parkAndRideBannedVehicleParkingTags: [
        'lot_type:Parkplatz',
        'lot_type:Tiefgarage',
        'lot_type:Parkhaus'
    ],

    suggestCarMinDistance: 800,
    suggestWalkMaxDistance: 3000,
    suggestBikeAndPublicMinDistance: 3000,
    suggestBikeAndParkMinDistance: 1000,

    // live bus locations
    vehicles: false,
    showVehiclesOnSummaryPage: false,
    showVehiclesOnStopPage: true,

    showBikeAndPublicItineraries: true,
    showBikeAndParkItineraries: true,
    showStopAndRouteSearch: false,
    showTimeTableOptions: false,

    viaPointsEnabled: false,

    klaro: {
        styling: {
            theme: ['light', 'bottom'],
        },
        hideDeclineAll: true,
        mustConsent: true,
        translations: {
            de: {
                privacyPolicyUrl: 'https://www.herzlich-digital.de/datenschutz',
                acceptSelected: 'Auswahl bestätigen',
                consentModal: {
                    title: 'Cookies und Privatsphäre',
                    description: 'Wir verwenden Cookies auf dieser Webseite.',
                },
                privacyPolicy: {
                    name: 'hier',
                    text: 'Weitere Informationen zum Umgang mit Cookies und unsere Datenschutzerklärung finden Sie {privacyPolicy}.'
                },
                purposes: {
                    functional: {
                        title: "Notwendige Cookies",
                        description: "Diese Cookies werden für eine reibungslose Funktion unserer Website benötigt."
                    }
                },
                service: {
                    required: {
                        description: ' ',
                        title: ' '
                    }
                },
                klaro: {
                    title: "1. klaro",
                    description: "Zweck: Speichert Ihre Einwilligung zur Verwendung von Cookies."
                },
                lang: {
                    title: "2. lang",
                    description: "Zweck: Speichert Ihre gewählte Sprache."
                }
            },
            en: {
                privacyPolicyUrl: 'https://www.herzlich-digital.de/datenschutz',
                acceptSelected: 'Confirm selection',
                consentModal: {
                    title: 'Cookies and privacy',
                    description: 'We use cookies on this website.',
                },
                privacyPolicy: {
                    name: 'here',
                    text: 'For more information on how we handle cookies and our privacy policy, please see {privacyPolicy}.'
                },
                purposes: {
                    functional: {
                        title: "Necessary cookies",
                        description: "These cookies are needed for the smooth functioning of our website."
                    }
                },
                service: {
                    required: {
                        description: ' ',
                        title: ' '
                    }
                },
                klaro: {
                    title: "1. klaro",
                    description: "Purpose: Saves your consent to the use of cookies."
                },
                lang: {
                    title: "2. lang",
                    description: "Purpose: Saves your selected language."
                }
            }
        },
        services: [
            {
                name: "klaro",
                default: true,
                required: true,
                purposes: ['functional']
            },
            {
                name: "lang",
                default: true,
                required: true,
                purposes: ['functional']
            }
        ]
    }
});
