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
    zoomControl: false
}

//create map
var map = L.map('map', MapOtions);

//Set default basemap
var basemap_layer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
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


//Onlick expand home sidebar content area
// displayHomeSidebarContent.onclick = function(){
//     if (getComputedStyle(sidebarContent).display === "none"){
//         sidebarContent.style.display ="block";
//         sidebarContent.style.width = "350px";
//         sidebarContent.style.marginLeft = "60px";
//     } else if (sidebarContent.style.display === "block"){
//         sidebarContent.style.width = "350px";
//         sidebarContent.style.marginLeft = "60px";
//     }else {
//         sidebarContent.style.display = "none";
//     }
// }

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
    iconUrl: '/static/images/red.png',
    iconSize: [22, 30]
}

var greenIcon = L.icon(iconOptionsGreen);
var blueIcon = L.icon(iconOptionsBlue);
var yellowIcon = L.icon(iconOptionsYellow);


var cambodia_reservoirs = L.geoJson(reservoirs, {
    filter: filterCambodia,
    //style: Style, 
	onEachFeature: function(feature, reservoirLayer) {
        var resname = feature.properties.Name;
        var stationid = feature.properties.id;
        var rbasin = feature.properties.River;
        var country = feature.properties.Country;
        var slevel = feature.properties.Storage;
        var content = '<iframe id="encoder_iframe"  width="700" height="460" src="http://58.137.55.230/testiframe?stationid=&countryname=&riverbasin=&reservoirname=" frameborder="0"></iframe>';
		var popupContent = content.replace("stationid=", "stationid=" + stationid).replace("countryname=", "countryname=" + country).replace("riverbasin=", "riverbasin=" + rbasin).replace("reservoirname=", "reservoirname=" + resname);
        reservoirLayer.bindTooltip(resname);
        // reservoirLayer.on('click', function (e) {
        //     this.bindPopup(popupContent);
        // });  
        reservoirLayer.bindPopup(popupContent); 
        //reservoirLayer.setIcon(customIcon);
        if (slevel === '81%-100%') {
            reservoirLayer.setIcon(blueIcon); 
        }else if(slevel === '30%-80%'){
            reservoirLayer.setIcon(greenIcon);
        }else {
            reservoirLayer.setIcon(yellowIcon);
        }                    
    } 
})
var laos_reservoirs = L.geoJson(reservoirs, {
    filter: filterLaos,
    //style: Style, 
	onEachFeature: function(feature, reservoirLayer) {
        var resname = feature.properties.Name;
        var stationid = feature.properties.id;
        var rbasin = feature.properties.River;
        var country = feature.properties.Country;
        var slevel = feature.properties.Storage;
        var content = '<iframe id="encoder_iframe"  width="700" height="460" src="http://58.137.55.230/testiframe?stationid=&countryname=&riverbasin=&reservoirname=" frameborder="0"></iframe>';
		var popupContent = content.replace("stationid=", "stationid=" + stationid).replace("countryname=", "countryname=" + country).replace("riverbasin=", "riverbasin=" + rbasin).replace("reservoirname=", "reservoirname=" + resname);
        reservoirLayer.bindTooltip(resname);
        // reservoirLayer.on('click', function (e) {
        //     this.bindPopup(popupContent);
        // });  
        reservoirLayer.bindPopup(popupContent);
        //reservoirLayer.setIcon(customIcon); 
        if (slevel === '81%-100%') {
            reservoirLayer.setIcon(blueIcon); 
        }else if(slevel === '30%-80%'){
            reservoirLayer.setIcon(greenIcon);
        }else {
            reservoirLayer.setIcon(yellowIcon);
        }                       
    } 
})
var thailand_reservoirs = L.geoJson(reservoirs, {
    filter: filterThailand,
    //style: Style, 
	onEachFeature: function(feature, reservoirLayer) {
        var resname = feature.properties.Name;
        var stationid = feature.properties.id;
        var rbasin = feature.properties.River;
        var country = feature.properties.Country;
        var slevel = feature.properties.Storage;
        var content = '<iframe id="encoder_iframe"  width="700" height="460" src="http://58.137.55.230/testiframe?stationid=&countryname=&riverbasin=&reservoirname=" frameborder="0"></iframe>';
		var popupContent = content.replace("stationid=", "stationid=" + stationid).replace("countryname=", "countryname=" + country).replace("riverbasin=", "riverbasin=" + rbasin).replace("reservoirname=", "reservoirname=" + resname);
        reservoirLayer.bindTooltip(resname);
        // reservoirLayer.on('click', function (e) {
        //     this.bindPopup(popupContent);
        // });  
        reservoirLayer.bindPopup(popupContent); 
        //reservoirLayer.setIcon(customIcon);   
        if (slevel === '81%-100%') {
            reservoirLayer.setIcon(blueIcon); 
        }else if(slevel === '30%-80%'){
            reservoirLayer.setIcon(greenIcon);
        }else {
            reservoirLayer.setIcon(yellowIcon);
        }                    
    } 
})
var vietnam_reservoirs = L.geoJson(reservoirs, {
    filter: filterVietnam,
    //style: Style, 
	onEachFeature: function(feature, reservoirLayer) {
        var resname = feature.properties.Name;
        var stationid = feature.properties.id;
        var rbasin = feature.properties.River;
        var country = feature.properties.Country;
        var slevel = feature.properties.Storage;
        var content = '<iframe id="encoder_iframe"  width="700" height="460" src="http://58.137.55.230/testiframe?stationid=&countryname=&riverbasin=&reservoirname=" frameborder="0"></iframe>';
		var popupContent = content.replace("stationid=", "stationid=" + stationid).replace("countryname=", "countryname=" + country).replace("riverbasin=", "riverbasin=" + rbasin).replace("reservoirname=", "reservoirname=" + resname);
        reservoirLayer.bindTooltip(resname);
        // reservoirLayer.on('click', function (e) {
        //     this.bindPopup(popupContent);
        // });     
        reservoirLayer.bindPopup(popupContent);  
        //reservoirLayer.setIcon(customIcon); 
        if (slevel === '81%-100%') {
            reservoirLayer.setIcon(blueIcon); 
        }else if(slevel === '30%-80%'){
            reservoirLayer.setIcon(greenIcon);
        }else {
            reservoirLayer.setIcon(yellowIcon);
        }                    
    } 
});

var all_reservoirs = L.geoJson(reservoirs, {
	onEachFeature: function(feature, reservoirLayer) {
        var resname = feature.properties.Name;
        var stationid = feature.properties.id;
        var rbasin = feature.properties.River;
        var country = feature.properties.Country;
        var slevel = feature.properties.Storage;
        var content = '<iframe id="encoder_iframe"  width="700" height="460" src="http://58.137.55.230/testiframe?stationid=&countryname=&riverbasin=&reservoirname=" frameborder="0"></iframe>';
		var popupContent = content.replace("stationid=", "stationid=" + stationid).replace("countryname=", "countryname=" + country).replace("riverbasin=", "riverbasin=" + rbasin).replace("reservoirname=", "reservoirname=" + resname);
        reservoirLayer.bindTooltip(resname);
        // reservoirLayer.on('click', function (e) {
        //     this.bindPopup(popupContent);
        // }); 
        reservoirLayer.bindPopup(popupContent);  
        //reservoirLayer.setIcon(customIcon);
        if (slevel === '81%-100%') {
            reservoirLayer.setIcon(blueIcon); 
        }else if(slevel === '30%-80%'){
            reservoirLayer.setIcon(greenIcon);
        }else {
            reservoirLayer.setIcon(yellowIcon);
        }                     
    } 
}).addTo(map);

document.getElementById("all").checked = true;
document.getElementById("cambodia").checked = true;
document.getElementById("laos").checked = true;
document.getElementById("thailand").checked = true;
document.getElementById("vietnam").checked = true;


$('input[type=checkbox][name=all]').click(function(){
    if (this.checked){
        map.addLayer(all_reservoirs)
        //map.addLayer(cambodia_reservoirs);
        //map.addLayer(laos_reservoirs);
        //map.addLayer(thailand_reservoirs);
        //map.addLayer(vietnam_reservoirs);
    }else {
        map.removeLayer(all_reservoirs);
        //map.removeLayer(cambodia_reservoirs);
        //map.removeLayer(laos_reservoirs);
        //map.removeLayer(thailand_reservoirs);
        //map.removeLayer(vietnam_reservoirs);  
    }
});
$('input[type=checkbox][name=cambodia]').click(function(){
    if (this.checked){
        map.addLayer(cambodia_reservoirs);
    }else {
        map.removeLayer(cambodia_reservoirs);
    }
});
$('input[type=checkbox][name=laos]').click(function(){
    if (this.checked){
        map.addLayer(laos_reservoirs);
    }else {
        map.removeLayer(laos_reservoirs);
    }
});
$('input[type=checkbox][name=thailand]').click(function(){
    if (this.checked){
        map.addLayer(thailand_reservoirs);
    }else {
        map.removeLayer(thailand_reservoirs);
    }
});
$('input[type=checkbox][name=vietnam]').click(function(){
    if (this.checked){
        map.addLayer(vietnam_reservoirs);
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
    //style: Style, 
	onEachFeature: function(feature, reservoirLayer) {
        var resname = feature.properties.Name;
        var stationid = feature.properties.id;
        var rbasin = feature.properties.River;
        var country = feature.properties.Country;
        var slevel = feature.properties.Storage;
        var content = '<iframe id="encoder_iframe"  width="700" height="460" src="http://58.137.55.230/testiframe?stationid=&countryname=&riverbasin=&reservoirname=" frameborder="0"></iframe>';
		var popupContent = content.replace("stationid=", "stationid=" + stationid).replace("countryname=", "countryname=" + country).replace("riverbasin=", "riverbasin=" + rbasin).replace("reservoirname=", "reservoirname=" + resname);
        reservoirLayer.bindTooltip(resname);
        // reservoirLayer.on('click', function (e) {
        //     this.bindPopup(popupContent);
        // });   
        reservoirLayer.bindPopup(popupContent);    
        //reservoirLayer.setIcon(customIcon);  
        if (slevel === '81%-100%') {
            reservoirLayer.setIcon(blueIcon); 
        }else if(slevel === '30%-80%'){
            reservoirLayer.setIcon(greenIcon);
        }else {
            reservoirLayer.setIcon(yellowIcon);
        }                     
    } 
});

var lamDomNoiRiverLayer = L.geoJson(reservoirs, {
    filter: filteryByLamDomNoi,
    //style: Style, 
	onEachFeature: function(feature, reservoirLayer) {
        var resname = feature.properties.Name;
        var stationid = feature.properties.id;
        var rbasin = feature.properties.River;
        var country = feature.properties.Country;
        var slevel = feature.properties.Storage;
        var content = '<iframe id="encoder_iframe"  width="700" height="460" src="http://58.137.55.230/testiframe?stationid=&countryname=&riverbasin=&reservoirname=" frameborder="0"></iframe>';
		var popupContent = content.replace("stationid=", "stationid=" + stationid).replace("countryname=", "countryname=" + country).replace("riverbasin=", "riverbasin=" + rbasin).replace("reservoirname=", "reservoirname=" + resname);
        reservoirLayer.bindTooltip(resname);
        // reservoirLayer.on('click', function (e) {
        //     this.bindPopup(popupContent);
        // });  
        reservoirLayer.bindPopup(popupContent);    
        //reservoirLayer.setIcon(customIcon);    
        if (slevel === '81%-100%') {
            reservoirLayer.setIcon(blueIcon); 
        }else if(slevel === '30%-80%'){
            reservoirLayer.setIcon(greenIcon);
        }else {
            reservoirLayer.setIcon(yellowIcon);
        }                  
    } 
});

var namGnongRiverLayer = L.geoJson(reservoirs, {
    filter: filterByNamGnong,
    //style: Style, 
	onEachFeature: function(feature, reservoirLayer) {
        var resname = feature.properties.Name;
        var stationid = feature.properties.id;
        var rbasin = feature.properties.River;
        var country = feature.properties.Country;
        var slevel = feature.properties.Storage;
        var content = '<iframe id="encoder_iframe"  width="700" height="460" src="http://58.137.55.230/testiframe?stationid=&countryname=&riverbasin=&reservoirname=" frameborder="0"></iframe>';
		var popupContent = content.replace("stationid=", "stationid=" + stationid).replace("countryname=", "countryname=" + country).replace("riverbasin=", "riverbasin=" + rbasin).replace("reservoirname=", "reservoirname=" + resname);
        reservoirLayer.bindTooltip(resname);
        // reservoirLayer.on('click', function (e) {
        //     this.bindPopup(popupContent);
        // }); 
        reservoirLayer.bindPopup(popupContent);    
        //reservoirLayer.setIcon(customIcon); 
        if (slevel === '81%-100%') {
            reservoirLayer.setIcon(blueIcon); 
        }else if(slevel === '30%-80%'){
            reservoirLayer.setIcon(greenIcon);
        }else {
            reservoirLayer.setIcon(yellowIcon);
        }                   
    } 
});
var namNgumRiverLayer = L.geoJson(reservoirs, {
    filter: filterByNamNgum,
    //style: Style, 
	onEachFeature: function(feature, reservoirLayer) {
        var resname = feature.properties.Name;
        var stationid = feature.properties.id;
        var rbasin = feature.properties.River;
        var country = feature.properties.Country;
        var slevel = feature.properties.Storage;
        var content = '<iframe id="encoder_iframe"  width="700" height="460" src="http://58.137.55.230/testiframe?stationid=&countryname=&riverbasin=&reservoirname=" frameborder="0"></iframe>';
		var popupContent = content.replace("stationid=", "stationid=" + stationid).replace("countryname=", "countryname=" + country).replace("riverbasin=", "riverbasin=" + rbasin).replace("reservoirname=", "reservoirname=" + resname);
        reservoirLayer.bindTooltip(resname);
        // reservoirLayer.on('click', function (e) {
        //     this.bindPopup(popupContent);
        // });  
        reservoirLayer.bindPopup(popupContent);   
        //reservoirLayer.setIcon(customIcon);   
        if (slevel === '81%-100%') {
            reservoirLayer.setIcon(blueIcon); 
        }else if(slevel === '30%-80%'){
            reservoirLayer.setIcon(greenIcon);
        }else {
            reservoirLayer.setIcon(yellowIcon);
        }                     
    } 
});
var namPongRiverLayer = L.geoJson(reservoirs, {
    filter: filterByNamPong,
    //style: Style, 
	onEachFeature: function(feature, reservoirLayer) {
        var resname = feature.properties.Name;
        var stationid = feature.properties.id;
        var rbasin = feature.properties.River;
        var country = feature.properties.Country;
        var slevel = feature.properties.Storage;
        var content = '<iframe id="encoder_iframe"  width="700" height="460" src="http://58.137.55.230/testiframe?stationid=&countryname=&riverbasin=&reservoirname=" frameborder="0"></iframe>';
		var popupContent = content.replace("stationid=", "stationid=" + stationid).replace("countryname=", "countryname=" + country).replace("riverbasin=", "riverbasin=" + rbasin).replace("reservoirname=", "reservoirname=" + resname);
        reservoirLayer.bindTooltip(resname);
        // reservoirLayer.on('click', function (e) {
        //     this.bindPopup(popupContent);
        // });  
        reservoirLayer.bindPopup(popupContent);    
        //reservoirLayer.setIcon(customIcon);  
        if (slevel === '81%-100%') {
            reservoirLayer.setIcon(blueIcon); 
        }else if(slevel === '30%-80%'){
            reservoirLayer.setIcon(greenIcon);
        }else {
            reservoirLayer.setIcon(yellowIcon);
        }                    
    } 
});
var namTheunRiverLayer = L.geoJson(reservoirs, {
    filter: filterByNamTheun,
    //style: Style, 
	onEachFeature: function(feature, reservoirLayer) {
        var resname = feature.properties.Name;
        var stationid = feature.properties.id;
        var rbasin = feature.properties.River;
        var country = feature.properties.Country;
        var slevel = feature.properties.Storage;
        var content = '<iframe id="encoder_iframe"  width="700" height="460" src="http://58.137.55.230/testiframe?stationid=&countryname=&riverbasin=&reservoirname=" frameborder="0"></iframe>';
		var popupContent = content.replace("stationid=", "stationid=" + stationid).replace("countryname=", "countryname=" + country).replace("riverbasin=", "riverbasin=" + rbasin).replace("reservoirname=", "reservoirname=" + resname);
        reservoirLayer.bindTooltip(resname);
        // reservoirLayer.on('click', function (e) {
        //     this.bindPopup(popupContent);
        // }); 
        reservoirLayer.bindPopup(popupContent);   
        //reservoirLayer.setIcon(customIcon); 
        if (slevel === '81%-100%') {
            reservoirLayer.setIcon(blueIcon); 
        }else if(slevel === '30%-80%'){
            reservoirLayer.setIcon(greenIcon);
        }else {
            reservoirLayer.setIcon(yellowIcon);
        }                       
    } 
});
var sesanRiverLayer = L.geoJson(reservoirs, {
    filter: filterBySesan,
    //style: Style, 
	onEachFeature: function(feature, reservoirLayer) {
        var resname = feature.properties.Name;
        var stationid = feature.properties.id;
        var rbasin = feature.properties.River;
        var country = feature.properties.Country;
        var slevel = feature.properties.Storage;
        var content = '<iframe id="encoder_iframe"  width="700" height="460" src="http://58.137.55.230/testiframe?stationid=&countryname=&riverbasin=&reservoirname=" frameborder="0"></iframe>';
		var popupContent = content.replace("stationid=", "stationid=" + stationid).replace("countryname=", "countryname=" + country).replace("riverbasin=", "riverbasin=" + rbasin).replace("reservoirname=", "reservoirname=" + resname);
        reservoirLayer.bindTooltip(resname);
        // reservoirLayer.on('click', function (e) {
        //     this.bindPopup(popupContent);
        // });
        reservoirLayer.bindPopup(popupContent);        
        //reservoirLayer.setIcon(customIcon); 
        if (slevel === '81%-100%') {
            reservoirLayer.setIcon(blueIcon); 
        }else if(slevel === '30%-80%'){
            reservoirLayer.setIcon(greenIcon);
        }else {
            reservoirLayer.setIcon(yellowIcon);
        }                  
    } 
});
var seSanRiverLayer = L.geoJson(reservoirs, {
    filter: filterBySeSan,
    //style: Style, 
	onEachFeature: function(feature, reservoirLayer) {
        var resname = feature.properties.Name;
        var stationid = feature.properties.id;
        var rbasin = feature.properties.River;
        var country = feature.properties.Country;
        var slevel = feature.properties.Storage;
        var content = '<iframe id="encoder_iframe"  width="700" height="460" src="http://58.137.55.230/testiframe?stationid=&countryname=&riverbasin=&reservoirname=" frameborder="0"></iframe>';
		var popupContent = content.replace("stationid=", "stationid=" + stationid).replace("countryname=", "countryname=" + country).replace("riverbasin=", "riverbasin=" + rbasin).replace("reservoirname=", "reservoirname=" + resname);
        reservoirLayer.bindTooltip(resname);
        // reservoirLayer.on('click', function (e) {
        //     this.bindPopup(popupContent);
        // }); 
        reservoirLayer.bindPopup(popupContent);  
        //reservoirLayer.setIcon(customIcon); 
        if (slevel === '81%-100%') {
            reservoirLayer.setIcon(blueIcon); 
        }else if(slevel === '30%-80%'){
            reservoirLayer.setIcon(greenIcon);
        }else {
            reservoirLayer.setIcon(yellowIcon);
        }                      
    } 
});

$('input[type=checkbox][name=allRivers]').click(function(){
    if (this.checked){
        map.addLayer(chiRiverLayer);
        map.addLayer(lamDomNoiRiverLayer);
        map.addLayer(namGnongRiverLayer);
        map.addLayer(namNgumRiverLayer);
        map.addLayer(namPongRiverLayer);
        map.addLayer(namTheunRiverLayer);
        map.addLayer(sesanRiverLayer);
        map.addLayer(seSanRiverLayer);
    }else {
        map.removeLayer(chiRiverLayer);
        map.removeLayer(lamDomNoiRiverLayer);
        map.removeLayer(namGnongRiverLayer);
        map.removeLayer(namNgumRiverLayer);
        map.removeLayer(namPongRiverLayer);
        map.removeLayer(namTheunRiverLayer);
        map.removeLayer(sesanRiverLayer);
        map.removeLayer(seSanRiverLayer);
        map.removeLayer(cambodia_reservoirs);
        map.removeLayer(laos_reservoirs);
        map.removeLayer(thailand_reservoirs);
        map.removeLayer(vietnam_reservoirs); 
        map.removeLayer(all_reservoirs);
    }
});
$('input[type=checkbox][name=chi]').click(function(){
    if (this.checked){
        map.addLayer(chiRiverLayer);
    }else {
        map.removeLayer(chiRiverLayer);
        map.removeLayer(all_reservoirs);
    }
});
$('input[type=checkbox][name=lamDomNoi]').click(function(){
    if (this.checked){
        map.addLayer(lamDomNoiRiverLayer);
    }else {
        map.removeLayer(lamDomNoiRiverLayer);
        map.removeLayer(all_reservoirs);
    }
});
$('input[type=checkbox][name=namGnong]').click(function(){
    if (this.checked){
        map.addLayer(namGnongRiverLayer);
    }else {
        map.removeLayer(namGnongRiverLayer);
        map.removeLayer(all_reservoirs);
    }
});
$('input[type=checkbox][name=namNgum]').click(function(){
    if (this.checked){
        map.addLayer(namNgumRiverLayer);
    }else {
        map.removeLayer(namNgumRiverLayer);
        map.removeLayer(all_reservoirs);
    }
});
$('input[type=checkbox][name=namPong]').click(function(){
    if (this.checked){
        map.addLayer(namPongRiverLayer);
    }else {
        map.removeLayer(namPongRiverLayer);
        map.removeLayer(all_reservoirs);
    }
});
$('input[type=checkbox][name=namTheun]').click(function(){
    if (this.checked){
        map.addLayer(namTheunRiverLayer);
    }else {
        map.removeLayer(namTheunRiverLayer);
        map.removeLayer(all_reservoirs);
    }
});
$('input[type=checkbox][name=sesan]').click(function(){
    if (this.checked){
        map.addLayer(sesanRiverLayer);
    }else {
        map.removeLayer(sesanRiverLayer);
        map.removeLayer(all_reservoirs);
    }
});
$('input[type=checkbox][name=seSan]').click(function(){
    if (this.checked){
        map.addLayer(seSanRiverLayer);
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
    div.innerHTML += '<strong>Storage Level</strong>'+ '<br>'
    div.innerHTML +=  '<img class="pt-2" src="/static/images/blue.png" width="20px">' + ' > 80% ' + '<br>'
    div.innerHTML +=  '<img class="pt-1" src="/static/images/green.png" width="20px">'  + ' 30% - 80% ' + '<br>'
    div.innerHTML +=  '<img class="pt-1" src="/static/images/red.png" width="20px">'   +  ' < 30% '

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

/** 
    ** Table Tab Scripts **
*/

//AEC Table
document.addEventListener('DOMContentLoaded', function () {
    let table = new DataTable('#aec', {
        ajax: function (d, cb) {
            fetch('/static/data/table/aec.json')
                .then(response => response.json())
                .then(data => cb(data));
        },
        dom: 'Bfrtip',
        buttons: [
            'pageLength', 'print', 'excel', 'csv', 'pdf'
        ],
        columns: [
            //{ "data": "id" },
            { "data": "country" },
            { "data": "river" },
            { "data": "name" },
            { "data": "elevation" },
            { "data": "cum_area" },                                  
        ],
        order: [[ 0, 'asc'], [ 1, 'asc'], [ 2, 'asc']]
    });
});

//Filter AEC by country
$(document).ready(function() {
    var table =  $('#aec').DataTable();    
    $('#aec_country').on('change', function () {
        table.columns(0).search( this.value ).draw();
    });
});
//Filter AEC by river basin
$(document).ready(function() {
    var table =  $('#aec').DataTable();    
    $('#aec_river_basin').on('change', function () {
        table.columns(1).search( this.value ).draw();
    });
 });

//deltas Table
document.addEventListener('DOMContentLoaded', function () {
    let table = new DataTable('#deltas', {
        ajax: function (d, cb) {
            fetch('/static/data/table/deltas.json')
                .then(response => response.json())
                .then(data => cb(data));
        },
        dom: 'Bfrtip',
        buttons: [
            'pageLength', 'print', 'excel', 'csv', 'pdf'
        ],
        columns: [
            // { "data": "id" },
            { "data": "country" },
            { "data": "river" },
            { "data": "name" },
            { "data": "date" },
            { "data": "deltas" },              
        ],
        columnDefs: [ { type: 'date', 'targets': [3] } ],
        order: [[ 0, 'asc'], [ 1, 'asc'], [ 2, 'asc'], [ 3, 'desc' ]]
    });
});

//Filter deltas by country
$(document).ready(function() {
    var table =  $('#deltas').DataTable();    
    $('#deltas_country').on('change', function () {
        table.columns(0).search( this.value ).draw();
    });
});
//Filter deltas by river basin
$(document).ready(function() {
    var table =  $('#deltas').DataTable();    
    $('#deltas_river_basin').on('change', function () {
        table.columns(1).search( this.value ).draw();
    });
 });

//Inflow Table
document.addEventListener('DOMContentLoaded', function () {
    let table = new DataTable('#inflow', {
        ajax: function (d, cb) {
            fetch('/static/data/table/inflow.json')
                .then(response => response.json())
                .then(data => cb(data));
        },
        dom: 'Bfrtip',
        buttons: [
            'pageLength', 'print', 'excel', 'csv', 'pdf'
        ],
        columns: [
            // { "data": "id" },
            { "data": "country" },
            { "data": "river" },
            { "data": "name" },
            { "data": "date" },
            { "data": "inflow_cumecs" },                        
        ],
        columnDefs: [ { type: 'date', 'targets': [3] } ],
        order: [[ 0, 'asc'], [ 1, 'asc'], [ 2, 'asc'], [ 3, 'desc' ]]
    });
});

//Filter inflow by country
$(document).ready(function() {
    var table =  $('#inflow').DataTable();    
    $('#inflow_country').on('change', function () {
        table.columns(0).search( this.value ).draw();
    });
});
//Filter inflow by river basin
$(document).ready(function() {
    var table =  $('#inflow').DataTable();    
    $('#inflow_river_basin').on('change', function () {
        table.columns(1).search( this.value ).draw();
    });
 });

//Outflow Table
document.addEventListener('DOMContentLoaded', function () {
    let table = new DataTable('#outflow', {
        ajax: function (d, cb) {
            fetch('/static/data/table/outflow.json')
                .then(response => response.json())
                .then(data => cb(data));
        },
        dom: 'Bfrtip',
        buttons: [
            'pageLength', 'print', 'excel', 'csv', 'pdf'
        ],
        columns: [
            // { "data": "id" },
            { "data": "country" },
            { "data": "river" },
            { "data": "name" },
            { "data": "date" },
            { "data": "outflow_cumecs" },                                  
        ],
        columnDefs: [ { type: 'date', 'targets': [3] } ],
        order: [[ 0, 'asc'], [ 1, 'asc'], [ 2, 'asc'], [ 3, 'desc' ]]
    });
});

//Filter outflow by country
$(document).ready(function() {
    var table =  $('#outflow').DataTable();    
    $('#outflow_country').on('change', function () {
        table.columns(0).search( this.value ).draw();
    });
});
//Filter outflow by river basin
$(document).ready(function() {
    var table =  $('#outflow').DataTable();    
    $('#outflow_river_basin').on('change', function () {
        table.columns(1).search( this.value ).draw();
    });
 });

//Surface Area Table
document.addEventListener('DOMContentLoaded', function () {
    let table = new DataTable('#surface_area', {
        ajax: function (d, cb) {
            fetch('/static/data/table/surface_area.json')
                .then(response => response.json())
                .then(data => cb(data));
        },
        dom: 'Bfrtip',
        buttons: [
            'pageLength', 'print', 'excel', 'csv', 'pdf'
        ],
        columns: [
            // { "data": "id" },
            { "data": "country" },
            { "data": "river" },
            { "data": "name" },
            { "data": "date" },
            { "data": "surface_area_sqkm" },                                    
        ],
        columnDefs: [ { type: 'date', 'targets': [3] } ],
        order: [[ 0, 'asc'], [ 1, 'asc'], [ 2, 'asc'], [ 3, 'desc' ]]
    });
});

//Filter surface_area by country
$(document).ready(function() {
    var table =  $('#surface_area').DataTable();    
    $('#sarea_country').on('change', function () {
        table.columns(0).search( this.value ).draw();
    });
});
//Filter surface_area by river basin
$(document).ready(function() {
    var table =  $('#surface_area').DataTable();    
    $('#sarea_river_basin').on('change', function () {
        table.columns(1).search( this.value ).draw();
    });
 });

//Rule Curve Table
document.addEventListener('DOMContentLoaded', function () {
    let table = new DataTable('#rcurve', {
        ajax: function (d, cb) {
            fetch('/static/data/table/rcurve.json')
                .then(response => response.json())
                .then(data => cb(data));
        },
        dom: 'Bfrtip',
        buttons: [
            'pageLength', 'print', 'excel', 'csv', 'pdf'
        ],
        columns: [
            // { "data": "id" },
            { "data": "country" },
            { "data": "river" },
            { "data": "name" }, 
            { "data": "January" },
            { "data": "February" },
            { "data": "March" },
            { "data": "April" },
            { "data": "May" },
            { "data": "June" },
            { "data": "July" },
            { "data": "August" },
            { "data": "September" },
            { "data": "October" },
            { "data": "November" },
            { "data": "December" }           
        ],
        order: [[ 0, 'asc'], [ 1, 'asc'], [ 2, 'asc']]
    });
});

//Filter rcurve by country
$(document).ready(function() {
    var table =  $('#rcurve').DataTable();    
    $('#rcurve_country').on('change', function () {
        table.columns(0).search( this.value ).draw();
    });
});
//Filter rcurve by river basin
$(document).ready(function() {
    var table =  $('#rcurve').DataTable();    
    $('#rcurve_river_basin').on('change', function () {
        table.columns(1).search( this.value ).draw();
    });
});
