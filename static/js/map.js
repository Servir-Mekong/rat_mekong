var load = document.querySelector("#loader");

function loadfun() {
    load.style.display = 'none';
}

/* 
    ** Map Tab Scripts **
*/

//Queryselector
var sidebarContent = document.querySelector('#sidebar-content');
//var displayHomeSidebarContent = document.querySelector("#home" );
var displayFilterSidebarContent = document.querySelector("#filter" );
var displayLayerSidebarContent = document.querySelector("#layer" );
var displayBasemapSidebarContent = document.querySelector("#basemap" );
//var closeHomeSidebarContent = document.querySelector("#close-home-content" );
var closeFilterSidebarContent = document.querySelector("#close-filter-content" );
var closeLayerSidebarContent = document.querySelector("#close-layer-content" );
var closeBasemapSidebarContent = document.querySelector("#close-basemap-content" );

//Define map center
var MapOtions = {
    center: [15.5162, 102.9560],
    zoom: 6,
    minZoom: 5,
    maxZoom: 14,
    zoomControl: false
}

//create map
var map = L.map('map', MapOtions);

//Set default basemap
var basemap_layer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//Change zoom control postion to right
L.control.zoom({
    position: 'topright'
}).addTo(map);

//Add scale control to map
var scale = L.control.scale({
    position:'bottomright'
}).addTo(map);

//Onlick expand filter sidebar content area
displayFilterSidebarContent.onclick = function(){
    if (getComputedStyle(sidebarContent).display === "none"){
        sidebarContent.style.display ="block";
        sidebarContent.style.width = "350px";
        sidebarContent.style.marginLeft = "60px";
    } else if (sidebarContent.style.display === "block"){
        sidebarContent.style.width = "350px";
        sidebarContent.style.marginLeft = "60px";
    }else {
        sidebarContent.style.display = "none";
    }
};

//Onlick expand layer sidebar content area
displayLayerSidebarContent.onclick = function(){
    if (getComputedStyle(sidebarContent).display === "none"){
        sidebarContent.style.display ="block";
        sidebarContent.style.width = "350px";
        sidebarContent.style.marginLeft = "60px";
    } else if (sidebarContent.style.display === "block"){
        sidebarContent.style.width = "350px";
        sidebarContent.style.marginLeft = "60px";
    } else {
        sidebarContent.style.display = "none";
    }
}

//Onlick expand basemap sidebar content area
displayBasemapSidebarContent.onclick=function(){
    if (getComputedStyle(sidebarContent).display === "none"){
        sidebarContent.style.display ="block";
        sidebarContent.style.width = "350px";
        sidebarContent.style.marginLeft = "60px";
    } else if (sidebarContent.style.display === "block"){
        sidebarContent.style.width = "350px";
        sidebarContent.style.marginLeft = "60px";
    } else {
        sidebarContent.style.display = "none";
    }
}

// Onclick close sidebar home content area
// closeHomeSidebarContent.onclick = function(){
//     sidebarContent.style.display = "none";
// }
// Onclick close sidebar home content area
closeFilterSidebarContent.onclick = function(){
    sidebarContent.style.display = "none";
}
// Onclick close sidebar layer content area
closeLayerSidebarContent.onclick = function(){
    sidebarContent.style.display = "none";
}
// Onclick close sidebar basemap content area
closeBasemapSidebarContent.onclick = function(){
    sidebarContent.style.display = "none";
}

/* 
    Filter Panel 
*/

// Sidebar Dropdown Filter
var expanded = false;

function toggle(source) {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] != source)
            checkboxes[i].checked = source.checked;
    }
}    

var filterCountry = document.querySelector("#filter-country");
filterCountry.onclick = function() {
    var checkboxes = document.getElementById("countryCheckboxes");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}
var filterRiverBasin = document.querySelector("#filter-river-basin");
filterRiverBasin.onclick = function() {
    var checkboxes = document.getElementById("riverBasinCheckboxes");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}

// Icon options
var iconOptions = {
    iconUrl: '/static/images/marker.png',
    iconSize: [22, 30]
}

// Creating a custom icon
var customIcon = L.icon(iconOptions);

var iconOptionsGreen = {
    iconUrl: '/static/images/green.png',
    iconSize: [22, 30]
}
var iconOptionsBlue = {
    iconUrl: '/static/images/blue.png',
    iconSize: [22, 30]
}
var iconOptionsYellow = {
    iconUrl: '/static/images/brown.png',
    iconSize: [22, 30]
}
var iconOptionsRed = {
    iconUrl: '/static/images/red.png',
    iconSize: [22, 30]
}

var greenIcon = L.icon(iconOptionsGreen);
var blueIcon = L.icon(iconOptionsBlue);
var brownIcon = L.icon(iconOptionsYellow);
var redIcon = L.icon(iconOptionsRed);


var reservoirName = document.getElementById("reservoir_name");

// Filter by reservoir/dam name
function filterByReservoirName(feature) {
    if(feature.properties.Name==reservoirName.value)
    return true
}
var Battambang_1_sl;
$.ajax({
    type: "GET",
    data: {'reservoir': 'Battambang_1'},
    url: '/ajax/storagelevel/Battambang_1',
    async: false,
    datatype: "text",
    success: function(data){ Battambang_1_sl = data; }
});
// console.log(Battambang_1_sl);
var Lam_Pao_sl;
$.ajax({
    type: "GET",
    data: {'reservoir': 'Lam_Pao'},
    url: '/ajax/storagelevel/Lam_Pao',
    async: false,
    datatype: "text",
    success: function(data){ Lam_Pao_sl = data; }
});
var Lower_Sesan_2_sl;
$.ajax({
    type: "GET",
    data: {'reservoir': 'Lower_Sesan_2'},
    url: '/ajax/storagelevel/Lower_Sesan_2',
    async: false,
    datatype: "text",
    success: function(data){ Lower_Sesan_2_sl = data; }
});
var Nam_Mang_3_sl;
$.ajax({
    type: "GET",
    data: {'reservoir': 'Nam_Mang_3'},
    url: '/ajax/storagelevel/Nam_Mang_3',
    async: false,
    datatype: "text",
    success: function(data){ Nam_Mang_3_sl = data; }
});
var Nam_Ngum_1_sl;
$.ajax({
    type: "GET",
    data: {'reservoir': 'Nam_Ngum_1'},
    url: '/ajax/storagelevel/Nam_Ngum_1',
    async: false,
    datatype: "text",
    success: function(data){ Nam_Ngum_1_sl = data; }
});
var Nam_Theun_2_sl;
$.ajax({
    type: "GET",
    data: {'reservoir': 'Nam_Theun_2'},
    url: '/ajax/storagelevel/Nam_Theun_2',
    async: false,
    datatype: "text",
    success: function(data){ Nam_Theun_2_sl = data; }
});
// var Nam_Ton_sl;
// $.ajax({
//     type: "GET",
//     data: {'reservoir': 'Nam_Ton'},
//     url: '/ajax/storagelevel/Nam_Ton',
//     async: false,
//     datatype: "text",
//     success: function(data){ Nam_Ton_sl = data; }
// });
var Phumi_Svay_Chrum_sl;
$.ajax({
    type: "GET",
    data: {'reservoir': 'Phumi_Svay_Chrum'},
    url: '/ajax/storagelevel/Phumi_Svay_Chrum',
    async: false,
    datatype: "text",
    success: function(data){ Phumi_Svay_Chrum_sl = data; }
});
var Sesan_4_sl;
$.ajax({
    type: "GET",
    data: {'reservoir': 'Sesan_4'},
    url: '/ajax/storagelevel/Sesan_4',
    async: false,
    datatype: "text",
    success: function(data){ Sesan_4_sl = data; }
});
var Sirindhorn_sl;
$.ajax({
    type: "GET",
    data: {'reservoir': 'Sirindhorn'},
    url: '/ajax/storagelevel/Sirindhorn',
    async: false,
    datatype: "text",
    success: function(data){ Sirindhorn_sl = data; }
});
var Sre_Pok_4_sl;
$.ajax({
    type: "GET",
    data: {'reservoir': 'Sre_Pok_4'},
    url: '/ajax/storagelevel/Sre_Pok_4',
    async: false,
    datatype: "text",
    success: function(data){ Sre_Pok_4_sl = data; }
});
var Ubol_Ratana_sl;
$.ajax({
    type: "GET",
    data: {'reservoir': 'Ubol_Ratana'},
    url: '/ajax/storagelevel/Ubol_Ratana',
    async: false,
    datatype: "text",
    success: function(data){ Ubol_Ratana_sl = data; }
});
var Yali_sl;
$.ajax({
    type: "GET",
    data: {'reservoir': 'Yali'},
    url: '/ajax/storagelevel/Yali',
    async: false,
    datatype: "text",
    success: function(data){ Yali_sl = data; }
});

function onEachFeature(feature, reservoirLayer) {
    var resname = feature.properties.Name;
    var stationid = feature.properties.R_ID;
    var rbasin = feature.properties.River;
    var country = feature.properties.Country;
    var slevel = feature.properties.Storage;
    var content = '<iframe id="encoder_iframe"  width="700" height="460" src="https://ratmekong-servir.adpc.net/iframe?stationid=&countryname=&riverbasin=&reservoirname=" frameborder="0"></iframe>';
    var popupContent = content.replace("stationid=", "stationid=" + stationid).replace("countryname=", "countryname=" + country).replace("riverbasin=", "riverbasin=" + rbasin).replace("reservoirname=", "reservoirname=" + resname);
    reservoirLayer.bindTooltip(resname);
    // reservoirLayer.on('click', function (e) {
    //     this.bindPopup(popupContent);
    // });  
    reservoirLayer.bindPopup(popupContent); 
    reservoirLayer.layerTag = "GeoJSONLayer"
    //reservoirLayer.setIcon(customIcon);
    // if (slevel === '81%-100%') {
    //     reservoirLayer.setIcon(blueIcon); 
    // }else if(slevel === '30%-80%'){
    //     reservoirLayer.setIcon(greenIcon);
    // }else {
    //     reservoirLayer.setIcon(brownIcon);
    // } 
    var battambang_1_sl = parseInt(Battambang_1_sl);  
    var lam_pao_sl = parseInt(Lam_Pao_sl);
    var lower_sesan_2_sl = parseInt(Lower_Sesan_2_sl);
    var nam_mang_3_sl = parseInt(Nam_Mang_3_sl);
    var nam_ngum_1_sl = parseInt(Nam_Ngum_1_sl);
    var nam_theun_2_sl = parseInt(Nam_Theun_2_sl);
    var nam_ton_sl = 60;// parseInt(Nam_Ton_sl);
    var phumi_svay_chrum_sl = parseInt(Phumi_Svay_Chrum_sl);
    var sesan_4_sl = parseInt(Sesan_4_sl);
    var sirindhorn_sl = parseInt(Sirindhorn_sl);
    var sre_pok_4_sl = parseInt(Sre_Pok_4_sl);
    var ubol_ratana_sl = parseInt(Ubol_Ratana_sl);
    var yali_sl = parseInt(Yali_sl);
    // console.log(battambang_1_sl)
    // console.log(Yali_sl)

    function reservoirIcon(name, sl) {
    
        if ( resname == name && sl >= 75 ) {
            reservoirLayer.setIcon(blueIcon);
        } 
        else if ( resname == name && (sl >= 50 && sl < 75) ) {
            reservoirLayer.setIcon(greenIcon);
        } 
        else if ( resname == name && (sl >= 25 && sl < 50) ) {
            reservoirLayer.setIcon(brownIcon);
        } 
        else if ( resname == name && sl < 25 ) {
            reservoirLayer.setIcon(redIcon);
        }  
        return reservoirIcon 
    }

    reservoirIcon("Battambang 1", battambang_1_sl);
    reservoirIcon("Lam Pao", lam_pao_sl);
    reservoirIcon("Lower Sesan 2", lower_sesan_2_sl);
    reservoirIcon("Nam Mang 3", nam_mang_3_sl);
    reservoirIcon("Nam Ngum 1", nam_ngum_1_sl);
    reservoirIcon("Nam Theun 2", nam_theun_2_sl);
    reservoirIcon("Nam Ton (Monkey Cheek)", nam_ton_sl);
    reservoirIcon("Phumi Svay Chrum", phumi_svay_chrum_sl);
    reservoirIcon("Sesan 4", sesan_4_sl);
    reservoirIcon("Sirindhorn", sirindhorn_sl);
    reservoirIcon("Sre Pok 4", sre_pok_4_sl);
    reservoirIcon("Ubol Ratana", ubol_ratana_sl);
    reservoirIcon("Yali", yali_sl);

    // if ( resname == "Battambang 1" && Battambang_1_sl >= 75 ) {
    //     reservoirLayer.setIcon(blueIcon);
    // } 
    // else if ( resname == "Battambang 1" && (Battambang_1_sl >= 50 && Battambang_1_sl < 75) ) {
    //     reservoirLayer.setIcon(greenIcon);
    // } 
    // else if ( resname == "Battambang 1" && (Battambang_1_sl >= 25 && Battambang_1_sl < 50) ) {
    //     reservoirLayer.setIcon(brownIcon);
    // } 
    // else if ( resname == "Battambang 1" && Battambang_1_sl < 25 ) {
    //     reservoirLayer.setIcon(redIcon);
    // }       
} 

var selectedReservoirLayer;
$("#reservoir_name").on('change', function(){
    var selectedValue = this.value;
    if (selectedValue == "All"){
        // unchecked layer;
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = true;
        }
        selectedReservoirLayer = L.geoJson(reservoirs, {
            onEachFeature: onEachFeature
        }).addTo(map);
        map.fitBounds(selectedReservoirLayer.getBounds());
    } else if (selectedValue == selectedValue){
        // unchecked layer;
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false;
        }

        // remove layers from map
        map.eachLayer(function (layer) {
            if ( layer.layerTag && layer.layerTag === "GeoJSONLayer") {
                map.removeLayer(layer)
            }
        });
        if (selectedReservoirLayer){
            map.removeLayer(selectedReservoirLayer)
        }
        selectedReservoirLayer = L.geoJson(reservoirs, {
            filter: filterByReservoirName, 
            onEachFeature: onEachFeature
        }).addTo(map);
        map.fitBounds(selectedReservoirLayer.getBounds());
    }

});

//filter by country
function filterCambodia(feature) {
    if(feature.properties.Country=="Cambodia")
    return true
}
function filterLaos(feature) {
    if(feature.properties.Country=="Laos")
    return true
}
function filterThailand(feature) {
    if(feature.properties.Country=="Thailand")
    return true
}
function filterVietnam(feature) {
    if(feature.properties.Country=="Vietnam")
    return true
}
var cambodia_reservoirs = L.geoJson(reservoirs, {
    filter: filterCambodia,
	onEachFeature: onEachFeature      
})
var laos_reservoirs = L.geoJson(reservoirs, {
    filter: filterLaos,
	onEachFeature: onEachFeature
})
var thailand_reservoirs = L.geoJson(reservoirs, {
    filter: filterThailand,
	onEachFeature: onEachFeature
})
var vietnam_reservoirs = L.geoJson(reservoirs, {
    filter: filterVietnam,
	onEachFeature: onEachFeature
});

var all_reservoirs = L.geoJson(reservoirs, {
	onEachFeature: onEachFeature
}).addTo(map);
map.fitBounds(all_reservoirs.getBounds());

// var all_reservoirs = L.layerGroup([cambodia_reservoirs, laos_reservoirs, thailand_reservoirs, vietnam_reservoirs]);

document.getElementById("all").checked = true;
document.getElementById("cambodia").checked = true;
document.getElementById("laos").checked = true;
document.getElementById("thailand").checked = true;
document.getElementById("vietnam").checked = true;


$('input[type=checkbox][name=all]').click(function(){
    if (this.checked){
        map.addLayer(all_reservoirs)
        map.fitBounds(all_reservoirs.getBounds());
    }else {
        map.removeLayer(all_reservoirs); 
    }
});
$('input[type=checkbox][name=cambodia]').click(function(){
    if (this.checked){
        map.addLayer(cambodia_reservoirs);
        map.fitBounds(cambodia_reservoirs.getBounds());
    }else {
        map.removeLayer(cambodia_reservoirs);
    }
});
$('input[type=checkbox][name=laos]').click(function(){
    if (this.checked){
        map.addLayer(laos_reservoirs);
        map.fitBounds(laos_reservoirs.getBounds());
    }else {
        map.removeLayer(laos_reservoirs);
    }
});
$('input[type=checkbox][name=thailand]').click(function(){
    if (this.checked){
        map.addLayer(thailand_reservoirs);
        map.fitBounds(thailand_reservoirs.getBounds());
    }else {
        map.removeLayer(thailand_reservoirs);
    }
});
$('input[type=checkbox][name=vietnam]').click(function(){
    if (this.checked){
        map.addLayer(vietnam_reservoirs);
        map.fitBounds(vietnam_reservoirs.getBounds());
    }else {
        map.removeLayer(vietnam_reservoirs);
    }
});

//filter by reservoirs
function filterByChi(feature) {
    if(feature.properties.River=="Chi")
    return true
}
function filteryByLamDomNoi(feature) {
    if(feature.properties.River=="Lam Dom Noi")
    return true
}
function filterByNamGnong(feature) {
    if(feature.properties.River=="Nam Gnong")
    return true
}
function filterByNamNgum(feature) {
    if(feature.properties.River=="Nam Ngum")
    return true
}
function filterByNamPong(feature) {
    if(feature.properties.River=="Nam Pong")
    return true
}
function filterByNamTheun(feature) {
    if(feature.properties.River=="Nam Theun")
    return true
}
function filterBySesan(feature) {
    if(feature.properties.River=="Sesan")
    return true
}
function filterBySeSan(feature) {
    if(feature.properties.River=="Se San")
    return true
}

var chiRiverLayer = L.geoJson(reservoirs, {
    filter: filterByChi,
	onEachFeature: onEachFeature
});

var lamDomNoiRiverLayer = L.geoJson(reservoirs, {
    filter: filteryByLamDomNoi,
	onEachFeature: onEachFeature
});

var namGnongRiverLayer = L.geoJson(reservoirs, {
    filter: filterByNamGnong,
	onEachFeature: onEachFeature
});
var namNgumRiverLayer = L.geoJson(reservoirs, {
    filter: filterByNamNgum,
	onEachFeature: onEachFeature
});
var namPongRiverLayer = L.geoJson(reservoirs, {
    filter: filterByNamPong,
	onEachFeature: onEachFeature
});
var namTheunRiverLayer = L.geoJson(reservoirs, {
    filter: filterByNamTheun,
	onEachFeature: onEachFeature
});
var sesanRiverLayer = L.geoJson(reservoirs, {
    filter: filterBySesan,
	onEachFeature: onEachFeature
});
var seSanRiverLayer = L.geoJson(reservoirs, {
    filter: filterBySeSan,
	onEachFeature: onEachFeature
});

$('input[type=checkbox][name=allRivers]').click(function(){
    if (this.checked){
        map.addLayer(all_reservoirs);
        map.fitBounds(all_reservoirs.getBounds());
    }else {
        map.removeLayer(all_reservoirs);
    }
});
$('input[type=checkbox][name=chi]').click(function(){
    if (this.checked){
        map.addLayer(chiRiverLayer);
        map.fitBounds(chiRiverLayer.getBounds());
    }else {
        map.removeLayer(chiRiverLayer);
        map.removeLayer(all_reservoirs);
    }
});
$('input[type=checkbox][name=lamDomNoi]').click(function(){
    if (this.checked){
        map.addLayer(lamDomNoiRiverLayer);
        map.fitBounds(lamDomNoiRiverLayer.getBounds());
    }else {
        map.removeLayer(lamDomNoiRiverLayer);
        map.removeLayer(all_reservoirs);
    }
});
$('input[type=checkbox][name=namGnong]').click(function(){
    if (this.checked){
        map.addLayer(namGnongRiverLayer);
        map.fitBounds(namGnongRiverLayer.getBounds());
    }else {
        map.removeLayer(namGnongRiverLayer);
        map.removeLayer(all_reservoirs);
    }
});
$('input[type=checkbox][name=namNgum]').click(function(){
    if (this.checked){
        map.addLayer(namNgumRiverLayer);
        map.fitBounds(namNgumRiverLayer.getBounds());
    }else {
        map.removeLayer(namNgumRiverLayer);
        map.removeLayer(all_reservoirs); 
    }
});
$('input[type=checkbox][name=namPong]').click(function(){
    if (this.checked){
        map.addLayer(namPongRiverLayer);
        map.fitBounds(namPongRiverLayer.getBounds());
    }else {
        map.removeLayer(namPongRiverLayer);
        map.removeLayer(all_reservoirs);
    }
});
$('input[type=checkbox][name=namTheun]').click(function(){
    if (this.checked){
        map.addLayer(namTheunRiverLayer);
        map.fitBounds(namTheunRiverLayer.getBounds());
    }else {
        map.removeLayer(namTheunRiverLayer);
        map.removeLayer(all_reservoirs);
    }
});
$('input[type=checkbox][name=sesan]').click(function(){
    if (this.checked){
        map.addLayer(sesanRiverLayer);
        map.fitBounds(sesanRiverLayer.getBounds());
    }else {
        map.removeLayer(sesanRiverLayer);
        map.removeLayer(all_reservoirs);
    }
});
$('input[type=checkbox][name=seSan]').click(function(){
    if (this.checked){
        map.addLayer(seSanRiverLayer);
        map.fitBounds(seSanRiverLayer.getBounds());
    }else {
        map.removeLayer(seSanRiverLayer);
        map.removeLayer(all_reservoirs);
    }
});

/** End Filter Panel */

/** 
    Layer Panel
*/
//Define reservoirs boundary style
var reservoirsBoundaryStyle = {
    color: "#1ca3ec",
    weight: 1.0,
    opacity: 0.6,
    fillOpacity: 0.6,
    fillColor: "#1ca3ec",
};

//Define Mekong region boundary style
var mekongBoundaryStyle = {
    color: "#191970",
    weight: 1.75,
    //opacity: 0.6,
    //fillOpacity: 0.3,
    fillColor: "none",
};

//Define country boundary style
var adm0Style = {
    color: "#6A5ACD",
    weight: 1.0,
    //opacity: 0.6,
    //fillOpacity: 0.3,
    fillColor: "none",
};

var gmsriversStyle = {
    color: "#007FFF",
    weight: 1.25,
};
var mainriversStyle = {
    color: "#00008B",
    weight: 1.5,
};
var basinStyle = {
    color: "#018786",
    weight: 1.0,
    //opacity: 0.6,
    //fillOpacity: 0.65,
    fillColor: "none",
};
//Highlight feature style
var highlightStyle = {
    color: '#00008B', 
    weight: 1.0,
    opacity: 0.6,
    fillOpacity: 0.65,
    //fillColor: '#2262CC'
};

var reservoirs_poly_layer = L.geoJson(reservoirs_poly, {
    style: reservoirsBoundaryStyle,
    onEachFeature: function(feature, reservoirsPolyLayer) {
        var reservoirs_name = feature.properties.Name;
        var country = feature.properties.Country;
        reservoirsPolyLayer.on('mouseover', function (e) {
            this.setStyle(highlightStyle);
            this.bindTooltip(reservoirs_name + ", " + country);
        }); 
        reservoirsPolyLayer.on('mouseout', function (e) {
            this.setStyle(reservoirsBoundaryStyle);
        });                       
    } 
}); 

//Create mekong layer
var mekong_layer = L.geoJson(lowerMekongBoundary, {
    style: mekongBoundaryStyle,
    onEachFeature: function(feature, mekongLayer) {
        mekongLayer.on('mouseover', function (e) {
            this.setStyle(highlightStyle);
            this.bindTooltip('Mekong Region');
        }); 
        mekongLayer.on('mouseout', function (e) {
            this.setStyle(mekongBoundaryStyle);
        });                       
    } 
}).addTo(map); 

var adm0_layer = L.geoJson(adm0, {
    style: adm0Style,
    onEachFeature: function(feature, admin0Layer) {

        admin0Layer.bindPopup(feature.properties.NAME_0);
        // admin0Layer.on('mouseover', function (e) {
        //     this.setStyle(highlightStyle);
        //     this.bindTooltip(feature.properties.NAME_0);
        // }); 
        // admin0Layer.on('mouseout', function (e) {
        //     this.setStyle(adm0Style);
        // });                   
    } 
});

var gms_rivers_layer = L.geoJson(gms_rivers_lm, {
    style: gmsriversStyle
});
var main_rivers_layer = L.geoJson(main_rivers_lm, {
    style: mainriversStyle
});
var sub_basin_layer = L.geoJson(basinData, {
    style: basinStyle,
});

$('input[type=checkbox][name=reservoirs_poly_toggle]').click(function(){
    if(this.checked) {
        map.addLayer(reservoirs_poly_layer);
    } else {
        map.removeLayer(reservoirs_poly_layer);
    }
});
$('input[type=checkbox][name=mekong_toggle]').click(function(){
    if(this.checked) {
        map.addLayer(mekong_layer);
    } else {
        map.removeLayer(mekong_layer);
    }
});
$('input[type=checkbox][name=adm0_toggle]').click(function(){
    if(this.checked) {
        map.addLayer(adm0_layer);
    } else {
        map.removeLayer(adm0_layer);
    }
});
$('input[type=checkbox][name=gms_rivers_toggle]').click(function(){
    if(this.checked) {
        map.addLayer(gms_rivers_layer);
    } else {
        map.removeLayer(gms_rivers_layer);
    }
});
$('input[type=checkbox][name=main_rivers_toggle]').click(function(){
    if(this.checked) {
        map.addLayer(main_rivers_layer);
    } else {
        map.removeLayer(main_rivers_layer);
    }
});
$('input[type=checkbox][name=sub_basin_toggle]').click(function(){
    if(this.checked) {
        map.addLayer(sub_basin_layer);
    } else {
        map.removeLayer(sub_basin_layer);
    }
});
/** End Layer Panel */

/* 
    Basemap Panel
*/

//Onclick change basemap active class
$(document).ready(function() {
    $(".basemap-card").click(function () {
        $(".basemap-card").removeClass("active");
        // $(".tab").addClass("active"); // instead of this do the below 
        $(this).addClass("active");   
    });
});

//Legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<h5 class="fw-bold pb-1">Storage Level</h5>'
    div.innerHTML +=  '<img class="pt-1" src="/static/images/blue.png" width="20px">' + ' 75-100% High ' + '<br>'
    div.innerHTML +=  '<img class="pt-1" src="/static/images/green.png" width="20px">'  + ' 50-75% Medium ' + '<br>'
    div.innerHTML +=  '<img class="pt-1" src="/static/images/brown.png" width="20px">'  + ' 25-50% Low ' + '<br>'
    div.innerHTML +=  '<img class="pt-1" src="/static/images/red.png" width="20px">'   +  ' 0-25% Critical '

    return div;
};

legend.addTo(map);

//Onclick switch basemap 
$('#nav-basemap div').on('click', function(e) {
    var selected_basemap = this.getAttribute('data-layer');
    //MapBox Basemap
    // if((selected_basemap === "street")){
    //     basemap_layer.setUrl('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}');
    // }else if(selected_basemap === "osm"){
    //     basemap_layer.setUrl('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    // }else if(selected_basemap === "osm"){
    //     basemap_layer.setUrl('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    // }else if(selected_basemap === "osm"){
    //     basemap_layer.setUrl('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    // }else if(selected_basemap === "osm"){
    //     basemap_layer.setUrl('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    // }else 
    if(selected_basemap === "osm"){
        basemap_layer.setUrl('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');    
    }else if((selected_basemap === "street")){
        basemap_layer.setUrl('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}');
    }else if(selected_basemap === "satellite"){
        basemap_layer.setUrl('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');
    }else if(selected_basemap === "terrain"){
        basemap_layer.setUrl('https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}');
    }
    else if(selected_basemap === "topo"){
        basemap_layer.setUrl('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png');
    }
    else if(selected_basemap === "dark"){
        basemap_layer.setUrl('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png');
    }
    else if(selected_basemap === "gray"){
        basemap_layer.setUrl('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}');
    } 
});
/** End Basemap Panel */

/** 
    ** Add GeoJSON Layer Search Bar ** 
*/
var searchControl = new L.Control.Search({
    //container: 'findbox',
    layer: all_reservoirs,
    propertyName: 'Name',
    position: 'topright',
    zoom: 13,
    marker: {						//custom L.Marker or false for hide
        icon: false,				//custom L.Icon for maker location or false for hide
        animate: true,				//animate a circle over location found
        circle: {					//draw a circle in location found
            radius: 0,
            weight: 0,
            color: 'blue',
            stroke: true,
            fill: true
        }
    }
});

var resetStyle = {
    color: 'none', 
    radius: 0,
    weight: 0,
    opacity: 0,
    stroke: false,
    fill: false
}
searchControl.on('search:locationfound', function(e) {
    if(e.layer._popup)
        e.layer.openPopup();
}).on('search:collapsed', function(e) {
    all_reservoirs.eachLayer(function(layer) {	//restore feature color
        layer.setStyle(resetStyle);
    });	
});

map.addControl( searchControl );  //inizialize search control
/** End Search Panel */