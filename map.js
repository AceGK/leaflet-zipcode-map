
// set map center
var map = L.map("map").setView([37.586171232943016, -122.09909227412555], 9);
map.options.minZoom = 9;

// set map tiles and attribution(s)
var tiles = L.tileLayer(
    // "http://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
);
tiles.addTo(map);

// add plpc marker
var purpleLotus = L.marker([37.36524801165674, -121.89022565537691]).addTo(map)
    .bindPopup('Purple Lotus Patient Center');


// zipcodes to display
let southBayZip = [
    "94022", "94024", "94025", "94027", "94028", "94040", "94041", "94043", "94085", "94086", "94087", "94089", "94301", "94303", "94304", "94305", "94306", "94536", "94537", "94538", "94539", "94544", "94555", "94560", "94587", "95002", "95008", "95014", "95030", "95032", "95035", "95050", "95051", "95053", "95054", "95070", "95110", "95111", "95112", "95113", "95116", "95117", "95118", "95119", "95120", "95121", "95122", "95123", "95124", "95125", "95126", "95127", "95128", "95129", "95130", "95131", "95132", "95133", "95134", "95135", "95136", "95138", "95139", "95148", "94540", "94543", "94557", "94497", "94061", "94063", "94064", "94065", "94070"
];

let eastBayZip = [
    "94552", "94566", "94568", "94506", "94526", "94582", "94583", "94708", "94707", "94801", "94802", "94803", "94804", "94805", "94806", "94807", "94808", "94850", "94547", "94564", "94530", "94701", "94702", "94703", "94704", "94705", "94706", "94709", "94710", "94712", "94720", "94572", "94525", "94553", "94569", "94507", "94595", "94596", "94597", "94598", "94563", "94549", "94556", "94509", "94531", "94565", "94651", "94513", "94505", "94561", "94518", "94519", "94520", "94521", "94522", "94529", "94523", "94577", "94578", "94579", "94541", "94580", "94542", "94546", "94540", "94543", "94545", "94557", "94551", "94588"
];

function styleSouth(feature) {
    return {
        fillColor: "purple",
        weight: 3,
        color: "purple",
        fillOpacity: 0.3,
        stroke: false,
        smoothFactor: 0
    };
}
function styleEast(feature) {
    return {
        fillColor: "blue",
        weight: 3,
        color: "blue",
        fillOpacity: 0.3,
        stroke: false,
        smoothFactor: 0
    };
}

$.getJSON("bay_area.geojson", function (bay) {
    // loop through bay_area json array
    for (var item in bay.features) {
        // loop through all zipcodes
        for (var zip in southBayZip && eastBayZip) {
            //   if bay_area zip value = zipcode in array, display on map
            if (
                bay.features[item].properties.id == southBayZip[zip]
            ) {
                L.geoJson(bay.features[item], { style: styleSouth }).addTo(map);
            }
            if (
                bay.features[item].properties.id == eastBayZip[zip]
            ) {
                L.geoJson(bay.features[item], { style: styleEast }).addTo(map);
            }
        }
    }
});
