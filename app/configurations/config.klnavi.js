/* eslint-disable */
import configMerger from '../util/configMerger';
import { MapMode } from '../constants';

const CONFIG = 'klnavi';
const APP_TITLE = 'KLNavi';
const HEADER_TITLE = 'KLNavi';
const APP_DESCRIPTION = 'Mobilitätsplattform für die Stadt Kaiserslautern';
const API_URL = process.env.API_URL || 'https://api.klnavi.de';
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
        walkBoardCost: null,
        walkReluctance: null,
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
                href: '/impressum',
            },
            {
                name: 'privacy',
                nameEn: 'Privacy',
                href: '/datenschutzerklaerung',
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
    impressum: {
        de: [
            {
                header: 'Impressum',
                paragraphs: [
                    'Angaben gemäß § 5 DDG: <br>KL.digital GmbH <br>Bahnhofstraße 26-28 <br>67655 Kaiserslautern <br>Telefon: +49 631 205894-70 <br>Telefax: +49 631 205894-99 <br>info@kl.digital <br><a href="http://www.herzlich-digital.de">www.herzlich-digital.de</a> <br>UStId-Nr.: DE316325536',
                    'Vorsitzender des Aufsichtsrats: <br>Beate Kimmel, Oberbürgermeisterin der Stadt Kaiserslautern ',
                    'Geschäftsführung: <br>Dr. Ilona Benz ',
                    'Sitz der Gesellschaft: <br>Kaiserslautern ',
                    'Eingetragen beim Amtsgericht Kaiserslautern, HRB 32353<br>Aufsichtsbehörde<br>Aufsichts- und Dienstleistungsdirektion <br>Kurfürstliches Palais <br>Willy-Brandt-Platz 3 <br>D-54290 Trier <br>Postfach 13 20 <br>D-54203 Trier <br>Tel.: +49 (651) 9494-0 <br>Fax.: +49 (651) 9494-170 <br>poststelle@add.rlp.de <br><a href="http://www.add.rlp.de">www.add.rlp.de</a></br>',
                    'Haftungsausschluss (Disclaimer)<br>Haftung für Inhalte<br>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.<br>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.<br><br>Haftung für Links<br>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.<br>Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.<br><br>Urheberrecht<br>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.<br>Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet.<br>Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.'
                ]
            }
        ],
        en: [
            {
                header: 'Impressum',
                paragraphs: [
                    'Angaben gemäß § 5 DDG: <br>KL.digital GmbH <br>Bahnhofstraße 26-28 <br>67655 Kaiserslautern <br>Telefon: +49 631 205894-70 <br>Telefax: +49 631 205894-99 <br>info@kl.digital <br><a href="http://www.herzlich-digital.de">www.herzlich-digital.de</a> <br>UStId-Nr.: DE316325536',
                    'Vorsitzender des Aufsichtsrats: <br>Beate Kimmel, Oberbürgermeisterin der Stadt Kaiserslautern ',
                    'Geschäftsführung: <br>Dr. Ilona Benz ',
                    'Sitz der Gesellschaft: <br>Kaiserslautern ',
                    'Eingetragen beim Amtsgericht Kaiserslautern, HRB 32353<br>Aufsichtsbehörde<br>Aufsichts- und Dienstleistungsdirektion <br>Kurfürstliches Palais <br>Willy-Brandt-Platz 3 <br>D-54290 Trier <br>Postfach 13 20 <br>D-54203 Trier <br>Tel.: +49 (651) 9494-0 <br>Fax.: +49 (651) 9494-170 <br>poststelle@add.rlp.de <br><a href="http://www.add.rlp.de">www.add.rlp.de</a></br>',
                    'Haftungsausschluss (Disclaimer)<br>Haftung für Inhalte<br>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.<br>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.<br><br>Haftung für Links<br>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.<br>Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.<br><br>Urheberrecht<br>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.<br>Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet.<br>Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.'
                ]
            }
        ]
    },
    datenschutzerklaerung: {
        de: [
            {
                header: 'Datenschutzerklärung ',
                paragraphs: [
                    'Mit dieser Datenschutzerklärung informieren wir Sie über die Verarbeitung Ihrer personenbezogenen Daten auf der Website <a href="http://www.klnavi.de">www.klnavi.de</a> durch uns sowie über die Ihnen zustehenden Rechte.<br>Soweit auf andere Seiten verlinkt wird, haben wir weder Einfluss noch Kontrolle auf die verlinkten Inhalte und die dortigen Datenschutzbestimmungen. Wir empfehlen, die Datenschutzerklärungen auf den Webseiten zu prüfen, um feststellen zu können, ob und in welchem Umfang personenbezogene Daten erhoben, verarbeitet, genutzt oder und Dritten zugänglich gemacht werden.',
                    'I. Name und Anschrift des Verantwortlichen<br><br>Der Verantwortliche im Sinne der Datenschutz-Grundverordnung und anderer nationaler Datenschutzgesetze der Mitgliedsstaaten sowie sonstiger datenschutzrechtlicher Bestimmungen ist die:<br><br>KL.digital GmbH<br>Bahnhofstraße 26-28<br>67655 Kaiserslautern<br>Deutschland<br>Tel.: 0631 205894 70<br>E-Mail: <a href="mailto:info@kl.digital">info@kl.digital</a><br>Website: <a href="http://www.herzlich-digital.de">www.herzlich-digital.de</a>',
                    '2. Rechtsgrundlage für die Verarbeitung personenbezogener Daten ist<br><br>Soweit wir für Verarbeitungsvorgänge personenbezogener Daten eine Einwilligung der betroffenen Person einholen, dient Art. 6 Abs. 1 lit. a EU-Datenschutzgrundverordnung (DSGVO) als Rechtsgrundlage.<br><br>Bei der Verarbeitung von personenbezogenen Daten, die zur Erfüllung eines Vertrages, dessen Vertragspartei die betroffene Person ist, erforderlich ist, dient Art. 6 Abs. 1 lit. b DSGVO als Rechtsgrundlage. Dies gilt auch für Verarbeitungsvorgänge, die zur Durchführung vorvertraglicher Maßnahmen erforderlich sind.<br><br>Soweit eine Verarbeitung personenbezogener Daten zur Erfüllung einer rechtlichen Verpflichtung erforderlich ist, der unser Unternehmen unterliegt, dient Art. 6 Abs. 1 lit. c DSGVO als Rechtsgrundlage.<br><br>Ist die Verarbeitung zur Wahrung eines berechtigten Interesses unseres Unternehmens oder eines Dritten erforderlich und überwiegen die Interessen, Grundrechte und Grundfreiheiten des Betroffenen das erstgenannte Interesse nicht, so dient Art. 6 Abs. 1 lit. f DSGVO als Rechtsgrundlage für die Verarbeitung.',
                    '3. Datenlöschung und Speicherdauer<br><br>Die personenbezogenen Daten der betroffenen Person werden gelöscht oder gesperrt, sobald der Zweck der Speicherung entfällt. Eine Speicherung kann darüber hinaus erfolgen, wenn dies durch den europäischen oder nationalen Gesetzgeber in unionsrechtlichen Verordnungen, Gesetzen oder sonstigen Vorschriften, denen der Verantwortliche unterliegt, vorgesehen wurde. Eine Sperrung oder Löschung der Daten erfolgt auch dann, wenn eine durch die genannten Normen vorgeschriebene Speicherfrist abläuft, es sei denn, dass eine Erforderlichkeit zur weiteren Speicherung der Daten für einen Vertragsabschluss oder eine Vertragserfüllung besteht.',
                    'III. Bereitstellung der Website und Erstellung von Logfiles<br><br>1. Beschreibung und Umfang der Datenverarbeitung<br><br>Bei jedem Aufruf unserer Internetseite erfasst unser System automatisiert Daten und Informationen vom Computersystem des aufrufenden Rechners.<br><br>Folgende Daten werden hierbei erhoben:<br><br>&nbsp;&nbsp;&nbsp;&nbsp;Informationen über den Browsertyp und die verwendete Version<br>&nbsp;&nbsp;&nbsp;&nbsp;Das Betriebssystem des Nutzers<br>&nbsp;&nbsp;&nbsp;&nbsp;Den Internet-Service-Provider des Nutzers<br>&nbsp;&nbsp;&nbsp;&nbsp;Die IP-Adresse des Nutzers<br>&nbsp;&nbsp;&nbsp;&nbsp;Datum und Uhrzeit des Zugriffs<br>&nbsp;&nbsp;&nbsp;&nbsp;Websites, von denen das System des Nutzers auf unsere Internetseite gelangt<br>&nbsp;&nbsp;&nbsp;&nbsp;Websites, die vom System des Nutzers über unsere Website aufgerufen werden<br><br>Die Daten werden ebenfalls in den Logfiles unseres Systems gespeichert. Eine Speicherung dieser Daten zusammen mit anderen personenbezogenen Daten des Nutzers findet nicht statt.<br><br>2. Rechtsgrundlage für die Datenverarbeitung<br><br>Rechtsgrundlage für die vorübergehende Speicherung der Daten und der Logfiles ist Art. 6 Abs. 1 lit. f DSGVO.<br><br>3. Zweck der Datenverarbeitung<br><br>Die vorübergehende Speicherung der IP-Adresse durch das System ist notwendig, um eine Auslieferung der Website an den Rechner des Nutzers zu ermöglichen. Hierfür muss die IP-Adresse des Nutzers für die Dauer der Sitzung gespeichert bleiben.<br><br>Die Speicherung in Logfiles erfolgt, um die Funktionsfähigkeit der Website sicherzustellen. Zudem dienen uns die Daten zur Optimierung der Website und zur Sicherstellung der Sicherheit unserer informationstechnischen Systeme. Eine Auswertung der Daten zu Marketingzwecken findet in diesem Zusammenhang nicht statt.<br><br>In diesen Zwecken liegt auch unser berechtigtes Interesse an der Datenverarbeitung nach Art. 6 Abs. 1 lit. f DSGVO.',
                    '4. Dauer der Speicherung<br><br>Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind. Im Falle der Erfassung der Daten zur Bereitstellung der Website ist dies der Fall, wenn die jeweilige Sitzung beendet ist.<br><br>Im Falle der Speicherung der Daten in Logfiles ist dies nach spätestens sieben Tagen der Fall. Eine darüberhinausgehende Speicherung ist möglich. In diesem Fall werden die IP-Adressen der Nutzer gelöscht oder verfremdet, sodass eine Zuordnung des aufrufenden Clients nicht mehr möglich ist.<br><br>5. Widerspruchs- und Beseitigungsmöglichkeit<br><br>Die Erfassung der Daten zur Bereitstellung der Website und die Speicherung der Daten in Logfiles ist für den Betrieb der Internetseite zwingend erforderlich. Es besteht folglich seitens des Nutzers keine Widerspruchsmöglichkeit.<br><br>IV Webanalyse durch Matomo (ehemals PIWIK)',
                    '1. Umfang der Verarbeitung personenbezogener Daten<br><br>Wir nutzen auf unserer Website das Open-Source-Software-Tool Matomo (ehemals PIWIK) zur Analyse des Surfverhaltens unserer Nutzer. Die Software setzt ein Cookie auf dem Rechner der Nutzer (zu Cookies siehe bereits oben). Werden Einzelseiten unserer Website aufgerufen, so werden folgende Daten gespeichert:<br><br>&nbsp;&nbsp;&nbsp;&nbsp;Zwei Bytes der IP-Adresse des aufrufenden Systems des Nutzers<br>&nbsp;&nbsp;&nbsp;&nbsp;Die aufgerufene Webseite<br>&nbsp;&nbsp;&nbsp;&nbsp;Die Website, von der der Nutzer auf die aufgerufene Webseite gelangt ist (Referrer)<br>&nbsp;&nbsp;&nbsp;&nbsp;Die Unterseiten, die von der aufgerufenen Webseite aus aufgerufen werden<br>&nbsp;&nbsp;&nbsp;&nbsp;Die Verweildauer auf der Webseite<br>&nbsp;&nbsp;&nbsp;&nbsp;Die Häufigkeit des Aufrufs der Webseite<br><br>Die Software läuft dabei ausschließlich auf den Servern unserer Webseite. Eine Speicherung der personenbezogenen Daten der Nutzer findet nur dort statt. Eine Weitergabe der Daten an Dritte erfolgt nicht.<br><br>Die Software ist so eingestellt, dass die IP-Adressen nicht vollständig gespeichert werden, sondern 2 Bytes der IP-Adresse maskiert werden (Bsp.: 192.168.xxx.xxx). Auf diese Weise ist eine Zuordnung der gekürzten IP-Adresse zum aufrufenden Rechner nicht mehr möglich.<br><br>2. Rechtsgrundlage für die Verarbeitung personenbezogener Daten<br><br>Rechtsgrundlage für die Verarbeitung der Daten ist Art. 6 Abs. 1 Buchstabe e; Abs. 3 Buchstabe b DS-GVO i.V.m. § 3 LDSG.<br><br>3. Zweck der Datenverarbeitung<br><br>Wir sind durch die Auswertung der gewonnen Daten in der Lage, Informationen über die Nutzung der einzelnen Komponenten unserer Webseite zusammenzustellen. Dies hilft uns dabei, unsere Webseite und deren Nutzerfreundlichkeit stetig zu verbessern.<br><br>4. Dauer der Speicherung<br><br>Die Daten werden gelöscht, sobald sie für unsere Aufzeichnungszwecke nicht mehr benötigt werden.<br><br>In unserem Fall ist dies nach 30 Tagen der Fall.<br><br>5. Widerspruchs- und Beseitigungsmöglichkeit<br><br>Einzelheiten über die auf der Website eingesetzten Cookies, den spezifischen Zweck, den der jeweilige Cookie erfüllt sowie eine Beschreibung, wie Sie diese Cookies löschen können, entnehmen Sie bitte dem Abschnitt „XI Informationen zu Cookies und Widerspruch Webanalyse“.<br><br>VI. Rechte der betroffenen Person<br><br>Werden personenbezogene Daten von Ihnen verarbeitet, sind Sie Betroffener i.S.d. DSGVO und es stehen Ihnen folgende Rechte gegenüber dem Verantwortlichen zu:',
                    '1. Auskunftsrecht<br><br>Sie können von dem Verantwortlichen eine Bestätigung darüber verlangen, ob personenbezogene Daten, die Sie betreffen, von uns verarbeitet werden.<br><br>Liegt eine solche Verarbeitung vor, können Sie von dem Verantwortlichen über folgende Informationen Auskunft verlangen:<br><br>&nbsp;&nbsp;&nbsp;&nbsp;(1) die Zwecke, zu denen die personenbezogenen Daten verarbeitet werden;<br>&nbsp;&nbsp;&nbsp;&nbsp;(2) die Kategorien von personenbezogenen Daten, welche verarbeitet werden;<br>&nbsp;&nbsp;&nbsp;&nbsp;(3) die Empfänger bzw. die Kategorien von Empfängern, gegenüber denen die Sie betreffenden personenbezogenen Daten offengelegt wurden oder noch offengelegt werden;<br>&nbsp;&nbsp;&nbsp;&nbsp;(4) die geplante Dauer der Speicherung der Sie betreffenden personenbezogenen Daten oder, falls konkrete Angaben hierzu nicht möglich sind, Kriterien für die Festlegung der Speicherdauer;<br>&nbsp;&nbsp;&nbsp;&nbsp;(5) das Bestehen eines Rechts auf Berichtigung oder Löschung der Sie betreffenden personenbezogenen Daten, eines Rechts auf Einschränkung der Verarbeitung durch den Verantwortlichen oder eines Widerspruchsrechts gegen diese Verarbeitung;<br>&nbsp;&nbsp;&nbsp;&nbsp;(6) das Bestehen eines Beschwerderechts bei einer Aufsichtsbehörde.<br><br>2. Recht auf Löschung<br><br>a) Löschungspflicht<br><br>Sie können von dem Verantwortlichen verlangen, dass die Sie betreffenden personenbezogenen Daten unverzüglich gelöscht werden, und der Verantwortliche ist verpflichtet, diese Daten unverzüglich zu löschen, sofern einer der folgenden Gründe zutrifft:<br><br>&nbsp;&nbsp;&nbsp;&nbsp;(1) Die Sie betreffenden personenbezogenen Daten sind für die Zwecke, für die sie erhoben oder auf sonstige Weise verarbeitet wurden, nicht mehr notwendig.<br>&nbsp;&nbsp;&nbsp;&nbsp;(2) Sie widerrufen Ihre Einwilligung, auf die sich die Verarbeitung gem. Art. 6 Abs. 1 lit. a oder Art. 9 Abs. 2 lit. a DSGVO stützte, und es fehlt an einer anderweitigen Rechtsgrundlage für die Verarbeitung.<br>&nbsp;&nbsp;&nbsp;&nbsp;(3) Sie legen gem. Art. 21 Abs. 1 DSGVO Widerspruch gegen die Verarbeitung ein und es liegen keine vorrangigen berechtigten Gründe für die Verarbeitung vor, oder Sie legen gem. Art. 21 Abs. 2 DSGVO Widerspruch gegen die Verarbeitung ein.<br>&nbsp;&nbsp;&nbsp;&nbsp;(4) Die Sie betreffenden personenbezogenen Daten wurden unrechtmäßig verarbeitet.<br>&nbsp;&nbsp;&nbsp;&nbsp;(5) Die Löschung der Sie betreffenden personenbezogenen Daten ist zur Erfüllung einer rechtlichen Verpflichtung nach dem Unionsrecht oder dem Recht der Mitgliedstaaten erforderlich, dem der Verantwortliche unterliegt.<br>&nbsp;&nbsp;&nbsp;&nbsp;(6) Die Sie betreffenden personenbezogenen Daten wurden in Bezug auf angebotene Dienste der Informationsgesellschaft gemäß Art. 8 Abs. 1 DSGVO erhoben.<br><br>b) Ausnahmen<br><br>Das Recht auf Löschung besteht nicht, soweit die Verarbeitung erforderlich ist<br><br>&nbsp;&nbsp;&nbsp;&nbsp;(1) zur Ausübung des Rechts auf freie Meinungsäußerung und Information;<br>&nbsp;&nbsp;&nbsp;&nbsp;(2) zur Erfüllung einer rechtlichen Verpflichtung, die die Verarbeitung nach dem Recht der Union oder der Mitgliedstaaten, dem der Verantwortliche unterliegt, erfordert, oder zur Wahrnehmung einer Aufgabe, die im öffentlichen Interesse liegt oder in Ausübung öffentlicher Gewalt erfolgt, die dem Verantwortlichen übertragen wurde;<br>&nbsp;&nbsp;&nbsp;&nbsp;(3) aus Gründen des öffentlichen Interesses im Bereich der öffentlichen Gesundheit gemäß Art. 9 Abs. 2 lit. h und i sowie Art. 9 Abs. 3 DSGVO;<br>&nbsp;&nbsp;&nbsp;&nbsp;(4) für im öffentlichen Interesse liegende Archivzwecke, wissenschaftliche oder historische Forschungszwecke oder für statistische Zwecke gem. Art. 89 Abs. 1 DSGVO, soweit das unter Abschnitt a) genannte Recht voraussichtlich die Verwirklichung der Ziele dieser Verarbeitung unmöglich macht oder ernsthaft beeinträchtigt, oder<br>&nbsp;&nbsp;&nbsp;&nbsp;(5) zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.',
                    'gegenüber dem Verantwortlichen geltend gemacht, ist dieser verpflichtet, allen Empfängern, denen die Sie betreffenden personenbezogenen Daten offengelegt wurden, diese Berichtigung oder Löschung der Daten oder Einschränkung der Verarbeitung mitzuteilen, es sei denn, dies erweist sich als unmöglich oder ist mit einem unverhältnismäßigen Aufwand verbunden.<br><br>Ihnen steht gegenüber dem Verantwortlichen das Recht zu, über diese Empfänger unterrichtet zu werden.<br><br>4. Widerspruchsrecht<br><br>Sie haben das Recht, aus Gründen, die sich aus ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten, die aufgrund von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, Widerspruch einzulegen.<br><br>Der Verantwortliche verarbeitet die Sie betreffenden personenbezogenen Daten nicht mehr, es sei denn, er kann zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.<br><br>Sie haben die Möglichkeit, im Zusammenhang mit der Nutzung von Diensten der Informationsgesellschaft – ungeachtet der Richtlinie 2002/58/EG – Ihr Widerspruchsrecht mittels automatisierter Verfahren auszuüben, bei denen technische Spezifikationen verwendet werden.<br><br>5. Recht auf Widerruf der datenschutzrechtlichen Einwilligungserklärung<br><br>Sie haben das Recht, Ihre datenschutzrechtliche Einwilligungserklärung jederzeit zu widerrufen. Durch den Widerruf der Einwilligung wird die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung nicht berührt.<br><br>6. Recht auf Beschwerde bei einer Aufsichtsbehörde<br><br>Unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs steht Ihnen das Recht auf Beschwerde bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres Aufenthaltsorts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes, zu, wenn Sie der Ansicht sind, dass die Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die DSGVO verstößt.<br><br>Die Aufsichtsbehörde, bei der die Beschwerde eingereicht wurde, unterrichtet den Beschwerdeführer über den Stand und die Ergebnisse der Beschwerde einschließlich der Möglichkeit eines gerichtlichen Rechtsbehelfs nach Art. 78 DSGVO.<br><br>Die zuständige Aufsichtsbehörde ist: Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz, Hintere Bleiche 34, 55116 Mainz, Telefon: 06131 / 208-2449, E-Mail: <a href="mailto:poststelle@datenschutz.rlp.de">poststelle@datenschutz.rlp.de</a>, Internet: <a href="https://www.datenschutz.rlp.de" target="_blank">www.datenschutz.rlp.de</a><br><br>V. Datenschutzhinweise zur Mobilitätsplattform KLNavi', 
                    '1 KLNavi<br><br>Die Anwendung KLNavi bietet intermodale Mobilitätsauskünfte. Neben den bereits oben beschriebenen Angaben (in der Allgemeinen Datenschutzerklärung) zu Server-Logs und Cookies werden zur Optimierung der Anwendung die genutzten Funktionen erhoben. Hierzu nutzt die Anwendung KLNavi die Anwendung Matomo und speichert hierzu Cookies. Die Speicherung dieser Cookies erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.<br><br>Explizit nicht gespeichert werden Start-/Ziel Suchen.<br><br>2. Fahrgemeinschaft.de<br><br>KLNavi nutzt zum Inserieren von Fahrgemeinschaftsangeboten die Dienste der Fahrgemeinschaft.de GmbH, Erlenstr. 7, D-71297 Mönsheim.<br><br>Beim Inserieren von Mitfahrangeboten werden die folgenden Daten vom Nutzer erhoben und an Fahrgemeinschaft.de übermittelt:<br><br>    Fahrtdaten (Start, Ziel, Datum/Wochentage und Uhrzeit)<br>    Kontaktdaten (Telefonnummer)<br><br>Die personenbezogenen Daten werden für die Einstellung eines Fahrgemeinschafts-Inserats in KLNavi erhoben und als Kontaktmöglichkeit für die Nutzer zur Kontaktaufnahme verwendet. Die angegebenen Daten werden durch Fahrgemeinschaft.de und angeschlossene Partner-Portale veröffentlicht und damit weitergegeben. Die Nutzung und Eingabe von Daten in diese Online-Anwendung erfolgt freiwillig.<br><br>Einmalige Fahrgemeinschaftsangebote werden nach dem Datum der Fahrt gelöscht. Regelmäßige Fahrgemeinschaftsangebote werden spätestens drei Monate nach Aufgabe des Inserats gelöscht.<br><br>Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Fahrgemeinschaft.de: <a href="https://www.fahrgemeinschaft.de/datenschutz.php" target="_blank">www.fahrgemeinschaft.de/datenschutz.php</a><br><br>KLNavi speichert keine Kontaktdaten.<br><br>3. Speicherung von Nutzerprofilen im Browser<br><br>Um die Benutzerfreundlichkeit unserer Webseite zu erhöhen und ein personalisiertes Nutzererlebnis zu ermöglichen, nutzen wir die Technologie zur Speicherung von Nutzerprofilen direkt im Browser des Nutzers. Diese Funktion ermöglicht es, Ihre Präferenzen und Einstellungen auf der Webseite zu speichern, damit Sie bei Ihrem nächsten Besuch personalisierte Funktionen und Voreinstellungen automatisch wieder nutzen können.<br><br>Art der gespeicherten Daten Art der gespeicherten Daten<br><br>Für die Erstellung von Nutzerprofilen können folgende Arten von Daten in Ihrem Browser gespeichert werden:<br><br>    Voreingestellte Spracheinstellungen<br>    Layout- und Designpräferenzen<br>    Auswahl und Konfiguration von Routingprofilen<br><br>Speicherung und Zugriff<br><br>Die Speicherung der Daten erfolgt ausschließlich lokal in Ihrem Browser mittels Cookies oder der Web Storage API (lokalen Speicherung). Diese Daten werden zu keinem Zeitpunkt an unsere Server übermittelt oder extern gespeichert. Der Zugriff und die Nutzung dieser Daten beschränken sich auf Ihren Browser, um die Funktionalität und Personalisierung unserer Webseite bei Ihrem Besuch zu verbessern.<br><br>Kontrolle und Löschung der Daten<br><br>Sie haben volle Kontrolle über die in Ihrem Browser gespeicherten Nutzerprofil-Daten. Sie können die Speicherung dieser Daten durch Anpassung der Browsereinstellungen verhindern oder vorhandene Daten jederzeit über die Einstellungen Ihres Browsers löschen. Bitte beachten Sie, dass die Deaktivierung oder Löschung dieser Daten dazu führen kann, dass bestimmte personalisierte Funktionen unserer Webseite nicht mehr zur Verfügung stehen oder nicht wie erwartet funktionieren.<br><br>Unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs steht Ihnen das Recht auf Beschwerde bei der Aufsichtsbehörde zu, wenn Sie der Ansicht sind, dass die Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die DSGVO verstößt.<br><br>Zuständige Aufsichtsbehörde ist der Landesbeauftragte für den Datenschutz Rheinland-Pfalz, Postfach 30 40, 55020 Mainz. Telefon: 06131/8920-0; Fax: 06131/8920-299<br><br>E-Mail: <a href="mailto:poststelle@datenschutz.rlp.de">poststelle@datenschutz.rlp.de</a>.<br><br>Die Aufsichtsbehörde unterrichtet den Beschwerdeführer über den Stand und die Ergebnisse der Beschwerde einschließlich der Möglichkeit eines gerichtlichen Rechtsbehelfs nach Art. 78 DSGVO.',
                    'VI Informationen zu Cookies und Widerspruch Webanalyse<br><br>Hier erfahren Sie Details zur Nutzung von Cookies und wie Sie der Verarbeitung Ihrer personenbezogenen Daten im Hinblick auf unsere Website (Cookies, Webanalyse) im Einzelnen widersprechen und/oder die Löschung der hierbei erhobenen personenbezogenen Daten vornehmen können.<br><br>Informationen über Cookies<br><br>Beim Aufruf unserer Website werden im Zwischenspeicher Ihres Browsers folgende Cookies gespeichert:', 
                    '<table style="border-collapse: collapse;" border="1"><tbody><tr><td><b>Name</b></td><td><b>Anbieter</b></td><td><b>Zweck</b></td><td><b>Ablaufdatum</b></td></tr><tr><td>pwAuth</td><td>Intern</td><td>Speicherung des erfolgreichen Logins auf geschützten Unterseiten</td><td>Schließen des Browsers (Session)</td></tr><tr><td>_pk_id.1.bc6f</td><td>Matomo</td><td>Statistische Auswertung des Websiteaufrufs (Analyse der Sitzungen) Erkennt wiederkehrende Besucher/innen</td><td>Löschung nach einem Monat</td></tr><tr><td>_pk_ses.1.bc6f</td><td>Matomo</td><td>Statistische Auswertung des Websiteaufrufs (Analyse des Aufrufs) Erkennt kurzfristig wiederkehrende Besucher/innen</td><td>Löschung nach einem Tag</td></tr><tr><td>hidecookie_datenschutz</td><td>Intern</td><td>Zustimmung und Beachtung des Cookie-Hinweises</td><td>Schließen des Browsers (Session)</td></tr><tr><td>PHPSESSID</td><td>Intern</td><td>Speicherung der Suchfilter im Veranstaltungskalender</td><td>Schließen des Browsers (Session)</td></tr></tbody></table>'
                ]
            }
        ], 
        en: [
            {
                header: 'Datenschutzerklärung ',
                paragraphs: [
                    'Mit dieser Datenschutzerklärung informieren wir Sie über die Verarbeitung Ihrer personenbezogenen Daten auf der Website <a href="http://www.klnavi.de">www.klnavi.de</a> durch uns sowie über die Ihnen zustehenden Rechte.<br>Soweit auf andere Seiten verlinkt wird, haben wir weder Einfluss noch Kontrolle auf die verlinkten Inhalte und die dortigen Datenschutzbestimmungen. Wir empfehlen, die Datenschutzerklärungen auf den Webseiten zu prüfen, um feststellen zu können, ob und in welchem Umfang personenbezogene Daten erhoben, verarbeitet, genutzt oder und Dritten zugänglich gemacht werden.',
                    'I. Name und Anschrift des Verantwortlichen<br><br>Der Verantwortliche im Sinne der Datenschutz-Grundverordnung und anderer nationaler Datenschutzgesetze der Mitgliedsstaaten sowie sonstiger datenschutzrechtlicher Bestimmungen ist die:<br><br>KL.digital GmbH<br>Bahnhofstraße 26-28<br>67655 Kaiserslautern<br>Deutschland<br>Tel.: 0631 205894 70<br>E-Mail: <a href="mailto:info@kl.digital">info@kl.digital</a><br>Website: <a href="http://www.herzlich-digital.de">www.herzlich-digital.de</a>',
                    '2. Rechtsgrundlage für die Verarbeitung personenbezogener Daten ist<br><br>Soweit wir für Verarbeitungsvorgänge personenbezogener Daten eine Einwilligung der betroffenen Person einholen, dient Art. 6 Abs. 1 lit. a EU-Datenschutzgrundverordnung (DSGVO) als Rechtsgrundlage.<br><br>Bei der Verarbeitung von personenbezogenen Daten, die zur Erfüllung eines Vertrages, dessen Vertragspartei die betroffene Person ist, erforderlich ist, dient Art. 6 Abs. 1 lit. b DSGVO als Rechtsgrundlage. Dies gilt auch für Verarbeitungsvorgänge, die zur Durchführung vorvertraglicher Maßnahmen erforderlich sind.<br><br>Soweit eine Verarbeitung personenbezogener Daten zur Erfüllung einer rechtlichen Verpflichtung erforderlich ist, der unser Unternehmen unterliegt, dient Art. 6 Abs. 1 lit. c DSGVO als Rechtsgrundlage.<br><br>Ist die Verarbeitung zur Wahrung eines berechtigten Interesses unseres Unternehmens oder eines Dritten erforderlich und überwiegen die Interessen, Grundrechte und Grundfreiheiten des Betroffenen das erstgenannte Interesse nicht, so dient Art. 6 Abs. 1 lit. f DSGVO als Rechtsgrundlage für die Verarbeitung.',
                    '3. Datenlöschung und Speicherdauer<br><br>Die personenbezogenen Daten der betroffenen Person werden gelöscht oder gesperrt, sobald der Zweck der Speicherung entfällt. Eine Speicherung kann darüber hinaus erfolgen, wenn dies durch den europäischen oder nationalen Gesetzgeber in unionsrechtlichen Verordnungen, Gesetzen oder sonstigen Vorschriften, denen der Verantwortliche unterliegt, vorgesehen wurde. Eine Sperrung oder Löschung der Daten erfolgt auch dann, wenn eine durch die genannten Normen vorgeschriebene Speicherfrist abläuft, es sei denn, dass eine Erforderlichkeit zur weiteren Speicherung der Daten für einen Vertragsabschluss oder eine Vertragserfüllung besteht.',
                    'III. Bereitstellung der Website und Erstellung von Logfiles<br><br>1. Beschreibung und Umfang der Datenverarbeitung<br><br>Bei jedem Aufruf unserer Internetseite erfasst unser System automatisiert Daten und Informationen vom Computersystem des aufrufenden Rechners.<br><br>Folgende Daten werden hierbei erhoben:<br><br>&nbsp;&nbsp;&nbsp;&nbsp;Informationen über den Browsertyp und die verwendete Version<br>&nbsp;&nbsp;&nbsp;&nbsp;Das Betriebssystem des Nutzers<br>&nbsp;&nbsp;&nbsp;&nbsp;Den Internet-Service-Provider des Nutzers<br>&nbsp;&nbsp;&nbsp;&nbsp;Die IP-Adresse des Nutzers<br>&nbsp;&nbsp;&nbsp;&nbsp;Datum und Uhrzeit des Zugriffs<br>&nbsp;&nbsp;&nbsp;&nbsp;Websites, von denen das System des Nutzers auf unsere Internetseite gelangt<br>&nbsp;&nbsp;&nbsp;&nbsp;Websites, die vom System des Nutzers über unsere Website aufgerufen werden<br><br>Die Daten werden ebenfalls in den Logfiles unseres Systems gespeichert. Eine Speicherung dieser Daten zusammen mit anderen personenbezogenen Daten des Nutzers findet nicht statt.<br><br>2. Rechtsgrundlage für die Datenverarbeitung<br><br>Rechtsgrundlage für die vorübergehende Speicherung der Daten und der Logfiles ist Art. 6 Abs. 1 lit. f DSGVO.<br><br>3. Zweck der Datenverarbeitung<br><br>Die vorübergehende Speicherung der IP-Adresse durch das System ist notwendig, um eine Auslieferung der Website an den Rechner des Nutzers zu ermöglichen. Hierfür muss die IP-Adresse des Nutzers für die Dauer der Sitzung gespeichert bleiben.<br><br>Die Speicherung in Logfiles erfolgt, um die Funktionsfähigkeit der Website sicherzustellen. Zudem dienen uns die Daten zur Optimierung der Website und zur Sicherstellung der Sicherheit unserer informationstechnischen Systeme. Eine Auswertung der Daten zu Marketingzwecken findet in diesem Zusammenhang nicht statt.<br><br>In diesen Zwecken liegt auch unser berechtigtes Interesse an der Datenverarbeitung nach Art. 6 Abs. 1 lit. f DSGVO.',
                    '4. Dauer der Speicherung<br><br>Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind. Im Falle der Erfassung der Daten zur Bereitstellung der Website ist dies der Fall, wenn die jeweilige Sitzung beendet ist.<br><br>Im Falle der Speicherung der Daten in Logfiles ist dies nach spätestens sieben Tagen der Fall. Eine darüberhinausgehende Speicherung ist möglich. In diesem Fall werden die IP-Adressen der Nutzer gelöscht oder verfremdet, sodass eine Zuordnung des aufrufenden Clients nicht mehr möglich ist.<br><br>5. Widerspruchs- und Beseitigungsmöglichkeit<br><br>Die Erfassung der Daten zur Bereitstellung der Website und die Speicherung der Daten in Logfiles ist für den Betrieb der Internetseite zwingend erforderlich. Es besteht folglich seitens des Nutzers keine Widerspruchsmöglichkeit.<br><br>IV Webanalyse durch Matomo (ehemals PIWIK)',
                    '1. Umfang der Verarbeitung personenbezogener Daten<br><br>Wir nutzen auf unserer Website das Open-Source-Software-Tool Matomo (ehemals PIWIK) zur Analyse des Surfverhaltens unserer Nutzer. Die Software setzt ein Cookie auf dem Rechner der Nutzer (zu Cookies siehe bereits oben). Werden Einzelseiten unserer Website aufgerufen, so werden folgende Daten gespeichert:<br><br>&nbsp;&nbsp;&nbsp;&nbsp;Zwei Bytes der IP-Adresse des aufrufenden Systems des Nutzers<br>&nbsp;&nbsp;&nbsp;&nbsp;Die aufgerufene Webseite<br>&nbsp;&nbsp;&nbsp;&nbsp;Die Website, von der der Nutzer auf die aufgerufene Webseite gelangt ist (Referrer)<br>&nbsp;&nbsp;&nbsp;&nbsp;Die Unterseiten, die von der aufgerufenen Webseite aus aufgerufen werden<br>&nbsp;&nbsp;&nbsp;&nbsp;Die Verweildauer auf der Webseite<br>&nbsp;&nbsp;&nbsp;&nbsp;Die Häufigkeit des Aufrufs der Webseite<br><br>Die Software läuft dabei ausschließlich auf den Servern unserer Webseite. Eine Speicherung der personenbezogenen Daten der Nutzer findet nur dort statt. Eine Weitergabe der Daten an Dritte erfolgt nicht.<br><br>Die Software ist so eingestellt, dass die IP-Adressen nicht vollständig gespeichert werden, sondern 2 Bytes der IP-Adresse maskiert werden (Bsp.: 192.168.xxx.xxx). Auf diese Weise ist eine Zuordnung der gekürzten IP-Adresse zum aufrufenden Rechner nicht mehr möglich.<br><br>2. Rechtsgrundlage für die Verarbeitung personenbezogener Daten<br><br>Rechtsgrundlage für die Verarbeitung der Daten ist Art. 6 Abs. 1 Buchstabe e; Abs. 3 Buchstabe b DS-GVO i.V.m. § 3 LDSG.<br><br>3. Zweck der Datenverarbeitung<br><br>Wir sind durch die Auswertung der gewonnen Daten in der Lage, Informationen über die Nutzung der einzelnen Komponenten unserer Webseite zusammenzustellen. Dies hilft uns dabei, unsere Webseite und deren Nutzerfreundlichkeit stetig zu verbessern.<br><br>4. Dauer der Speicherung<br><br>Die Daten werden gelöscht, sobald sie für unsere Aufzeichnungszwecke nicht mehr benötigt werden.<br><br>In unserem Fall ist dies nach 30 Tagen der Fall.<br><br>5. Widerspruchs- und Beseitigungsmöglichkeit<br><br>Einzelheiten über die auf der Website eingesetzten Cookies, den spezifischen Zweck, den der jeweilige Cookie erfüllt sowie eine Beschreibung, wie Sie diese Cookies löschen können, entnehmen Sie bitte dem Abschnitt „XI Informationen zu Cookies und Widerspruch Webanalyse“.<br><br>VI. Rechte der betroffenen Person<br><br>Werden personenbezogene Daten von Ihnen verarbeitet, sind Sie Betroffener i.S.d. DSGVO und es stehen Ihnen folgende Rechte gegenüber dem Verantwortlichen zu:',
                    '1. Auskunftsrecht<br><br>Sie können von dem Verantwortlichen eine Bestätigung darüber verlangen, ob personenbezogene Daten, die Sie betreffen, von uns verarbeitet werden.<br><br>Liegt eine solche Verarbeitung vor, können Sie von dem Verantwortlichen über folgende Informationen Auskunft verlangen:<br><br>&nbsp;&nbsp;&nbsp;&nbsp;(1) die Zwecke, zu denen die personenbezogenen Daten verarbeitet werden;<br>&nbsp;&nbsp;&nbsp;&nbsp;(2) die Kategorien von personenbezogenen Daten, welche verarbeitet werden;<br>&nbsp;&nbsp;&nbsp;&nbsp;(3) die Empfänger bzw. die Kategorien von Empfängern, gegenüber denen die Sie betreffenden personenbezogenen Daten offengelegt wurden oder noch offengelegt werden;<br>&nbsp;&nbsp;&nbsp;&nbsp;(4) die geplante Dauer der Speicherung der Sie betreffenden personenbezogenen Daten oder, falls konkrete Angaben hierzu nicht möglich sind, Kriterien für die Festlegung der Speicherdauer;<br>&nbsp;&nbsp;&nbsp;&nbsp;(5) das Bestehen eines Rechts auf Berichtigung oder Löschung der Sie betreffenden personenbezogenen Daten, eines Rechts auf Einschränkung der Verarbeitung durch den Verantwortlichen oder eines Widerspruchsrechts gegen diese Verarbeitung;<br>&nbsp;&nbsp;&nbsp;&nbsp;(6) das Bestehen eines Beschwerderechts bei einer Aufsichtsbehörde.<br><br>2. Recht auf Löschung<br><br>a) Löschungspflicht<br><br>Sie können von dem Verantwortlichen verlangen, dass die Sie betreffenden personenbezogenen Daten unverzüglich gelöscht werden, und der Verantwortliche ist verpflichtet, diese Daten unverzüglich zu löschen, sofern einer der folgenden Gründe zutrifft:<br><br>&nbsp;&nbsp;&nbsp;&nbsp;(1) Die Sie betreffenden personenbezogenen Daten sind für die Zwecke, für die sie erhoben oder auf sonstige Weise verarbeitet wurden, nicht mehr notwendig.<br>&nbsp;&nbsp;&nbsp;&nbsp;(2) Sie widerrufen Ihre Einwilligung, auf die sich die Verarbeitung gem. Art. 6 Abs. 1 lit. a oder Art. 9 Abs. 2 lit. a DSGVO stützte, und es fehlt an einer anderweitigen Rechtsgrundlage für die Verarbeitung.<br>&nbsp;&nbsp;&nbsp;&nbsp;(3) Sie legen gem. Art. 21 Abs. 1 DSGVO Widerspruch gegen die Verarbeitung ein und es liegen keine vorrangigen berechtigten Gründe für die Verarbeitung vor, oder Sie legen gem. Art. 21 Abs. 2 DSGVO Widerspruch gegen die Verarbeitung ein.<br>&nbsp;&nbsp;&nbsp;&nbsp;(4) Die Sie betreffenden personenbezogenen Daten wurden unrechtmäßig verarbeitet.<br>&nbsp;&nbsp;&nbsp;&nbsp;(5) Die Löschung der Sie betreffenden personenbezogenen Daten ist zur Erfüllung einer rechtlichen Verpflichtung nach dem Unionsrecht oder dem Recht der Mitgliedstaaten erforderlich, dem der Verantwortliche unterliegt.<br>&nbsp;&nbsp;&nbsp;&nbsp;(6) Die Sie betreffenden personenbezogenen Daten wurden in Bezug auf angebotene Dienste der Informationsgesellschaft gemäß Art. 8 Abs. 1 DSGVO erhoben.<br><br>b) Ausnahmen<br><br>Das Recht auf Löschung besteht nicht, soweit die Verarbeitung erforderlich ist<br><br>&nbsp;&nbsp;&nbsp;&nbsp;(1) zur Ausübung des Rechts auf freie Meinungsäußerung und Information;<br>&nbsp;&nbsp;&nbsp;&nbsp;(2) zur Erfüllung einer rechtlichen Verpflichtung, die die Verarbeitung nach dem Recht der Union oder der Mitgliedstaaten, dem der Verantwortliche unterliegt, erfordert, oder zur Wahrnehmung einer Aufgabe, die im öffentlichen Interesse liegt oder in Ausübung öffentlicher Gewalt erfolgt, die dem Verantwortlichen übertragen wurde;<br>&nbsp;&nbsp;&nbsp;&nbsp;(3) aus Gründen des öffentlichen Interesses im Bereich der öffentlichen Gesundheit gemäß Art. 9 Abs. 2 lit. h und i sowie Art. 9 Abs. 3 DSGVO;<br>&nbsp;&nbsp;&nbsp;&nbsp;(4) für im öffentlichen Interesse liegende Archivzwecke, wissenschaftliche oder historische Forschungszwecke oder für statistische Zwecke gem. Art. 89 Abs. 1 DSGVO, soweit das unter Abschnitt a) genannte Recht voraussichtlich die Verwirklichung der Ziele dieser Verarbeitung unmöglich macht oder ernsthaft beeinträchtigt, oder<br>&nbsp;&nbsp;&nbsp;&nbsp;(5) zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.',
                    'gegenüber dem Verantwortlichen geltend gemacht, ist dieser verpflichtet, allen Empfängern, denen die Sie betreffenden personenbezogenen Daten offengelegt wurden, diese Berichtigung oder Löschung der Daten oder Einschränkung der Verarbeitung mitzuteilen, es sei denn, dies erweist sich als unmöglich oder ist mit einem unverhältnismäßigen Aufwand verbunden.<br><br>Ihnen steht gegenüber dem Verantwortlichen das Recht zu, über diese Empfänger unterrichtet zu werden.<br><br>4. Widerspruchsrecht<br><br>Sie haben das Recht, aus Gründen, die sich aus ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten, die aufgrund von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, Widerspruch einzulegen.<br><br>Der Verantwortliche verarbeitet die Sie betreffenden personenbezogenen Daten nicht mehr, es sei denn, er kann zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.<br><br>Sie haben die Möglichkeit, im Zusammenhang mit der Nutzung von Diensten der Informationsgesellschaft – ungeachtet der Richtlinie 2002/58/EG – Ihr Widerspruchsrecht mittels automatisierter Verfahren auszuüben, bei denen technische Spezifikationen verwendet werden.<br><br>5. Recht auf Widerruf der datenschutzrechtlichen Einwilligungserklärung<br><br>Sie haben das Recht, Ihre datenschutzrechtliche Einwilligungserklärung jederzeit zu widerrufen. Durch den Widerruf der Einwilligung wird die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung nicht berührt.<br><br>6. Recht auf Beschwerde bei einer Aufsichtsbehörde<br><br>Unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs steht Ihnen das Recht auf Beschwerde bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres Aufenthaltsorts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes, zu, wenn Sie der Ansicht sind, dass die Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die DSGVO verstößt.<br><br>Die Aufsichtsbehörde, bei der die Beschwerde eingereicht wurde, unterrichtet den Beschwerdeführer über den Stand und die Ergebnisse der Beschwerde einschließlich der Möglichkeit eines gerichtlichen Rechtsbehelfs nach Art. 78 DSGVO.<br><br>Die zuständige Aufsichtsbehörde ist: Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz, Hintere Bleiche 34, 55116 Mainz, Telefon: 06131 / 208-2449, E-Mail: <a href="mailto:poststelle@datenschutz.rlp.de">poststelle@datenschutz.rlp.de</a>, Internet: <a href="https://www.datenschutz.rlp.de" target="_blank">www.datenschutz.rlp.de</a><br><br>V. Datenschutzhinweise zur Mobilitätsplattform KLNavi', 
                    '1 KLNavi<br><br>Die Anwendung KLNavi bietet intermodale Mobilitätsauskünfte. Neben den bereits oben beschriebenen Angaben (in der Allgemeinen Datenschutzerklärung) zu Server-Logs und Cookies werden zur Optimierung der Anwendung die genutzten Funktionen erhoben. Hierzu nutzt die Anwendung KLNavi die Anwendung Matomo und speichert hierzu Cookies. Die Speicherung dieser Cookies erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.<br><br>Explizit nicht gespeichert werden Start-/Ziel Suchen.<br><br>2. Fahrgemeinschaft.de<br><br>KLNavi nutzt zum Inserieren von Fahrgemeinschaftsangeboten die Dienste der Fahrgemeinschaft.de GmbH, Erlenstr. 7, D-71297 Mönsheim.<br><br>Beim Inserieren von Mitfahrangeboten werden die folgenden Daten vom Nutzer erhoben und an Fahrgemeinschaft.de übermittelt:<br><br>    Fahrtdaten (Start, Ziel, Datum/Wochentage und Uhrzeit)<br>    Kontaktdaten (Telefonnummer)<br><br>Die personenbezogenen Daten werden für die Einstellung eines Fahrgemeinschafts-Inserats in KLNavi erhoben und als Kontaktmöglichkeit für die Nutzer zur Kontaktaufnahme verwendet. Die angegebenen Daten werden durch Fahrgemeinschaft.de und angeschlossene Partner-Portale veröffentlicht und damit weitergegeben. Die Nutzung und Eingabe von Daten in diese Online-Anwendung erfolgt freiwillig.<br><br>Einmalige Fahrgemeinschaftsangebote werden nach dem Datum der Fahrt gelöscht. Regelmäßige Fahrgemeinschaftsangebote werden spätestens drei Monate nach Aufgabe des Inserats gelöscht.<br><br>Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Fahrgemeinschaft.de: <a href="https://www.fahrgemeinschaft.de/datenschutz.php" target="_blank">www.fahrgemeinschaft.de/datenschutz.php</a><br><br>KLNavi speichert keine Kontaktdaten.<br><br>3. Speicherung von Nutzerprofilen im Browser<br><br>Um die Benutzerfreundlichkeit unserer Webseite zu erhöhen und ein personalisiertes Nutzererlebnis zu ermöglichen, nutzen wir die Technologie zur Speicherung von Nutzerprofilen direkt im Browser des Nutzers. Diese Funktion ermöglicht es, Ihre Präferenzen und Einstellungen auf der Webseite zu speichern, damit Sie bei Ihrem nächsten Besuch personalisierte Funktionen und Voreinstellungen automatisch wieder nutzen können.<br><br>Art der gespeicherten Daten Art der gespeicherten Daten<br><br>Für die Erstellung von Nutzerprofilen können folgende Arten von Daten in Ihrem Browser gespeichert werden:<br><br>    Voreingestellte Spracheinstellungen<br>    Layout- und Designpräferenzen<br>    Auswahl und Konfiguration von Routingprofilen<br><br>Speicherung und Zugriff<br><br>Die Speicherung der Daten erfolgt ausschließlich lokal in Ihrem Browser mittels Cookies oder der Web Storage API (lokalen Speicherung). Diese Daten werden zu keinem Zeitpunkt an unsere Server übermittelt oder extern gespeichert. Der Zugriff und die Nutzung dieser Daten beschränken sich auf Ihren Browser, um die Funktionalität und Personalisierung unserer Webseite bei Ihrem Besuch zu verbessern.<br><br>Kontrolle und Löschung der Daten<br><br>Sie haben volle Kontrolle über die in Ihrem Browser gespeicherten Nutzerprofil-Daten. Sie können die Speicherung dieser Daten durch Anpassung der Browsereinstellungen verhindern oder vorhandene Daten jederzeit über die Einstellungen Ihres Browsers löschen. Bitte beachten Sie, dass die Deaktivierung oder Löschung dieser Daten dazu führen kann, dass bestimmte personalisierte Funktionen unserer Webseite nicht mehr zur Verfügung stehen oder nicht wie erwartet funktionieren.<br><br>Unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs steht Ihnen das Recht auf Beschwerde bei der Aufsichtsbehörde zu, wenn Sie der Ansicht sind, dass die Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die DSGVO verstößt.<br><br>Zuständige Aufsichtsbehörde ist der Landesbeauftragte für den Datenschutz Rheinland-Pfalz, Postfach 30 40, 55020 Mainz. Telefon: 06131/8920-0; Fax: 06131/8920-299<br><br>E-Mail: <a href="mailto:poststelle@datenschutz.rlp.de">poststelle@datenschutz.rlp.de</a>.<br><br>Die Aufsichtsbehörde unterrichtet den Beschwerdeführer über den Stand und die Ergebnisse der Beschwerde einschließlich der Möglichkeit eines gerichtlichen Rechtsbehelfs nach Art. 78 DSGVO.',
                    'VI Informationen zu Cookies und Widerspruch Webanalyse<br><br>Hier erfahren Sie Details zur Nutzung von Cookies und wie Sie der Verarbeitung Ihrer personenbezogenen Daten im Hinblick auf unsere Website (Cookies, Webanalyse) im Einzelnen widersprechen und/oder die Löschung der hierbei erhobenen personenbezogenen Daten vornehmen können.<br><br>Informationen über Cookies<br><br>Beim Aufruf unserer Website werden im Zwischenspeicher Ihres Browsers folgende Cookies gespeichert:', 
                    '<table style="border-collapse: collapse;" border="1"><tbody><tr><td><b>Name</b></td><td><b>Anbieter</b></td><td><b>Zweck</b></td><td><b>Ablaufdatum</b></td></tr><tr><td>pwAuth</td><td>Intern</td><td>Speicherung des erfolgreichen Logins auf geschützten Unterseiten</td><td>Schließen des Browsers (Session)</td></tr><tr><td>_pk_id.1.bc6f</td><td>Matomo</td><td>Statistische Auswertung des Websiteaufrufs (Analyse der Sitzungen) Erkennt wiederkehrende Besucher/innen</td><td>Löschung nach einem Monat</td></tr><tr><td>_pk_ses.1.bc6f</td><td>Matomo</td><td>Statistische Auswertung des Websiteaufrufs (Analyse des Aufrufs) Erkennt kurzfristig wiederkehrende Besucher/innen</td><td>Löschung nach einem Tag</td></tr><tr><td>hidecookie_datenschutz</td><td>Intern</td><td>Zustimmung und Beachtung des Cookie-Hinweises</td><td>Schließen des Browsers (Session)</td></tr><tr><td>PHPSESSID</td><td>Intern</td><td>Speicherung der Suchfilter im Veranstaltungskalender</td><td>Schließen des Browsers (Session)</td></tr></tbody></table>'
                ]
            }
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

        airplane: {
            availableForSelection: false,
            defaultValue: false,
            nearYouLabel: {
                de: 'Flughäfen in der Nähe',
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
            {
                name: {
                    en: 'Kaiserslautern Car-Sharing Stations',
                    de: 'Kaiserslautern Car-Sharing Stations',
                },
                url: '/assets/geojson/kaiserslautern_carsharing_stations.geojson',
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
