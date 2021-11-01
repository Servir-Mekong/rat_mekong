// Sidebar
var sidebar = document.querySelector("#sidebar"); 
var sidenavFilter = document.querySelector("#filter");
var sidenavLayer = document.querySelector("#layer");
var sidenavBasemap = document.querySelector("#basemap");
var sidenavOpen = document.querySelector("#open-sidebar"); 
var sidenavClose = document.querySelector("#close-sidebar"); 
var sidebarContent = document.querySelector("#sidebar-content");

var MapOtions = {
    center: [21.9162, 95.9560],
    zoom: 5,
    zoomControl: false
 }
 var map = L.map('map', MapOtions);

function displaySidebar(){
    if (sidebarContent.style.display === "none") {
        sidebarContent.style.display = "block";
        sidebarContent.style.width = "300px";
        sidebar.style.marginLeft = "300px";
        sidenavOpen.style.display = "none"; 
        sidenavClose.style.display = "block";
    } else {
        sidebarContent.style.display = "none";
        sidebar.style.marginLeft = 0;
        sidenavOpen.style.display = "block"; 
        sidenavClose.style.display = "none";
    }
};

function displayFilterSidebar(){
    if (sidebarContent.style.display === "none") {
        sidebarContent.style.display = "block";
        sidebarContent.style.width = "300px";
        sidebar.style.marginLeft = "300px";
        sidenavOpen.style.display = "none"; 
        sidenavClose.style.display = "block";
    } else {
        sidebarContent.style.display = "block";
        sidebar.style.marginLeft = "300px";
        sidenavOpen.style.display = "none"; 
        sidenavClose.style.display = "block";
    }
};
function displayLayerSidebar(){
    if (sidebarContent.style.display === "none") {
        sidebarContent.style.display = "block";
        sidebarContent.style.width = "300px";
        sidebar.style.marginLeft = "300px";
        sidenavOpen.style.display = "none"; 
        sidenavClose.style.display = "block";
    } else {
        sidebarContent.style.display = "block";
        sidebar.style.marginLeft = "300px";
        sidenavOpen.style.display = "none"; 
        sidenavClose.style.display = "block";
    }
};
function displayBasemapSidebar(){
    if (sidebarContent.style.display === "none") {
        sidebarContent.style.display = "block";
        sidebarContent.style.width = "300px";
        sidebar.style.marginLeft = "300px";
        sidenavOpen.style.display = "none"; 
        sidenavClose.style.display = "block";
    } else {
        sidebarContent.style.display = "block";
        sidebar.style.marginLeft = "300px";
        sidenavOpen.style.display = "none"; 
        sidenavClose.style.display = "block";
    }
};

sidenavFilter.addEventListener("click", displayFilterSidebar); 
sidenavLayer.addEventListener("click", displayLayerSidebar); 
sidenavBasemap.addEventListener("click", displayBasemapSidebar);
sidenavOpen.addEventListener("click", displaySidebar);
sidenavClose.addEventListener("click", displaySidebar);

// Sidebar Dropdown Filter
var expanded = false;

function toggle(source) {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] != source)
            checkboxes[i].checked = source.checked;
    }
}      
function showCountries() {
    var checkboxes = document.getElementById("countryCheckboxes");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}
function showRiverBasins() {
    var checkboxes = document.getElementById("riverBasinCheckboxes");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}
/** Sidebar End Dropdown Filter */

var basemap_layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.control.zoom({
    position: 'topright'
}).addTo(map);


$('input[type=radio][name=basemap_selection]').change(function(){
    var selected_basemap = $(this).val();
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

//define admin boundary style
var mekongBoundaryStyle = {
    color: "#3182bd",
    weight: 0.75,
    opacity: 0.6,
    fillOpacity: 0.3,
    fillColor: "#3182bd",
};

var adm0Style = {
    color: "#756bb1",
    weight: 0.75,
    opacity: 0.6,
    fillOpacity: 0.3,
    fillColor: "#756bb1",
};

// highlight admin feature style
var highlightStyle = {
    color: '#fff', 
    weight: 1,
    opacity: 0.6,
    fillOpacity: 0.65,
    fillColor: '#2262CC'
};

//create admin geojson layer
var mekong_layer = L.geoJson(mekongBoundary, {
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
}); 

var adm0_layer = L.geoJson(adm0, {
    style: adm0Style,
    onEachFeature: function(feature, admin0Layer) {
        admin0Layer.on('mouseover', function (e) {
            this.setStyle(highlightStyle);
            this.bindTooltip(feature.properties.NAME_0);
        }); 
        admin0Layer.on('mouseout', function (e) {
            this.setStyle(adm0Style);
        });   
                
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
    //style: Style, 
	onEachFeature: function(feature, reservoirLayer) {
        var resname = feature.properties.Name;
        var stationid = feature.properties.id;
        var content = '<iframe id="encoder_iframe"  width="700" height="460" src="http://58.137.55.230/testiframe?stationid=&reservoirname=" frameborder="0"></iframe>';
		var popupContent = content.replace("stationid=", "stationid=" + stationid).replace("reservoirname=", "reservoirname=" + resname);
        reservoirLayer.bindTooltip(resname);
        reservoirLayer.on('click', function (e) {
            this.bindPopup(popupContent);
        });                       
    } 
})
var laos_reservoirs = L.geoJson(reservoirs, {
    filter: filterLaos,
    //style: Style, 
	onEachFeature: function(feature, reservoirLayer) {
        var resname = feature.properties.Name;
        var stationid = feature.properties.id;
        var content = '<iframe id="encoder_iframe"  width="700" height="460" src="http://58.137.55.230/testiframe?stationid=&reservoirname=" frameborder="0"></iframe>';
		var popupContent = content.replace("stationid=", "stationid=" + stationid).replace("reservoirname=", "reservoirname=" + resname);
        reservoirLayer.bindTooltip(resname);
        reservoirLayer.on('click', function (e) {
            this.bindPopup(popupContent);
        });                       
    } 
})
var thailand_reservoirs = L.geoJson(reservoirs, {
    filter: filterThailand,
    //style: Style, 
	onEachFeature: function(feature, reservoirLayer) {
        var resname = feature.properties.Name;
        var stationid = feature.properties.id;
        var content = '<iframe id="encoder_iframe"  width="700" height="460" src="http://58.137.55.230/testiframe?stationid=&reservoirname=" frameborder="0"></iframe>';
		var popupContent = content.replace("stationid=", "stationid=" + stationid).replace("reservoirname=", "reservoirname=" + resname);
        reservoirLayer.bindTooltip(resname);
        reservoirLayer.on('click', function (e) {
            this.bindPopup(popupContent);
        });                       
    } 
})
var vietnam_reservoirs = L.geoJson(reservoirs, {
    filter: filterVietnam,
    //style: Style, 
	onEachFeature: function(feature, reservoirLayer) {
        var resname = feature.properties.Name;
        var stationid = feature.properties.id;
        var content = '<iframe id="encoder_iframe"  width="700" height="460" src="http://58.137.55.230/testiframe?stationid=&reservoirname=" frameborder="0"></iframe>';
		var popupContent = content.replace("stationid=", "stationid=" + stationid).replace("reservoirname=", "reservoirname=" + resname);
        reservoirLayer.bindTooltip(resname);
        reservoirLayer.on('click', function (e) {
            this.bindPopup(popupContent);
        });                       
    } 
});

var all_reservoirs = L.geoJson(reservoirs, {
	onEachFeature: function(feature, reservoirLayer) {
        var resname = feature.properties.Name;
        var stationid = feature.properties.id;
        var content = '<iframe id="encoder_iframe"  width="700" height="460" src="http://58.137.55.230/testiframe?stationid=&reservoirname=" frameborder="0"></iframe>';
		var popupContent = content.replace("stationid=", "stationid=" + stationid).replace("reservoirname=", "reservoirname=" + resname);
        reservoirLayer.bindTooltip(resname);
        reservoirLayer.on('click', function (e) {
            this.bindPopup(popupContent);
        });                       
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
        var content = '<iframe id="encoder_iframe"  width="700" height="460" src="http://58.137.55.230/testiframe?stationid=&reservoirname=" frameborder="0"></iframe>';
		var popupContent = content.replace("stationid=", "stationid=" + stationid).replace("reservoirname=", "reservoirname=" + resname);
        reservoirLayer.bindTooltip(resname);
        reservoirLayer.on('click', function (e) {
            this.bindPopup(popupContent);
        });                       
    } 
});

var lamDomNoiRiverLayer = L.geoJson(reservoirs, {
    filter: filteryByLamDomNoi,
    //style: Style, 
	onEachFeature: function(feature, reservoirLayer) {
        var resname = feature.properties.Name;
        var stationid = feature.properties.id;
        var content = '<iframe id="encoder_iframe"  width="700" height="460" src="http://58.137.55.230/testiframe?stationid=&reservoirname=" frameborder="0"></iframe>';
		var popupContent = content.replace("stationid=", "stationid=" + stationid).replace("reservoirname=", "reservoirname=" + resname);
        reservoirLayer.bindTooltip(resname);
        reservoirLayer.on('click', function (e) {
            this.bindPopup(popupContent);
        });                       
    } 
});

var namGnongRiverLayer = L.geoJson(reservoirs, {
    filter: filterByNamGnong,
    //style: Style, 
	onEachFeature: function(feature, reservoirLayer) {
        var resname = feature.properties.Name;
        var stationid = feature.properties.id;
        var content = '<iframe id="encoder_iframe"  width="700" height="460" src="http://58.137.55.230/testiframe?stationid=&reservoirname=" frameborder="0"></iframe>';
		var popupContent = content.replace("stationid=", "stationid=" + stationid).replace("reservoirname=", "reservoirname=" + resname);
        reservoirLayer.bindTooltip(resname);
        reservoirLayer.on('click', function (e) {
            this.bindPopup(popupContent);
        });                       
    } 
});
var namNgumRiverLayer = L.geoJson(reservoirs, {
    filter: filterByNamNgum,
    //style: Style, 
	onEachFeature: function(feature, reservoirLayer) {
        var resname = feature.properties.Name;
        var stationid = feature.properties.id;
        var content = '<iframe id="encoder_iframe"  width="700" height="460" src="http://58.137.55.230/testiframe?stationid=&reservoirname=" frameborder="0"></iframe>';
		var popupContent = content.replace("stationid=", "stationid=" + stationid).replace("reservoirname=", "reservoirname=" + resname);
        reservoirLayer.bindTooltip(resname);
        reservoirLayer.on('click', function (e) {
            this.bindPopup(popupContent);
        });                       
    } 
});
var namPongRiverLayer = L.geoJson(reservoirs, {
    filter: filterByNamPong,
    //style: Style, 
	onEachFeature: function(feature, reservoirLayer) {
        var resname = feature.properties.Name;
        var stationid = feature.properties.id;
        var content = '<iframe id="encoder_iframe"  width="700" height="460" src="http://58.137.55.230/testiframe?stationid=&reservoirname=" frameborder="0"></iframe>';
		var popupContent = content.replace("stationid=", "stationid=" + stationid).replace("reservoirname=", "reservoirname=" + resname);
        reservoirLayer.bindTooltip(resname);
        reservoirLayer.on('click', function (e) {
            this.bindPopup(popupContent);
        });                       
    } 
});
var namTheunRiverLayer = L.geoJson(reservoirs, {
    filter: filterByNamTheun,
    //style: Style, 
	onEachFeature: function(feature, reservoirLayer) {
        var resname = feature.properties.Name;
        var stationid = feature.properties.id;
        var content = '<iframe id="encoder_iframe"  width="700" height="460" src="http://58.137.55.230/testiframe?stationid=&reservoirname=" frameborder="0"></iframe>';
		var popupContent = content.replace("stationid=", "stationid=" + stationid).replace("reservoirname=", "reservoirname=" + resname);
        reservoirLayer.bindTooltip(resname);
        reservoirLayer.on('click', function (e) {
            this.bindPopup(popupContent);
        });                       
    } 
});
var sesanRiverLayer = L.geoJson(reservoirs, {
    filter: filterBySesan,
    //style: Style, 
	onEachFeature: function(feature, reservoirLayer) {
        var resname = feature.properties.Name;
        var stationid = feature.properties.id;
        var content = '<iframe id="encoder_iframe"  width="700" height="460" src="http://58.137.55.230/testiframe?stationid=&reservoirname=" frameborder="0"></iframe>';
		var popupContent = content.replace("stationid=", "stationid=" + stationid).replace("reservoirname=", "reservoirname=" + resname);
        reservoirLayer.bindTooltip(resname);
        reservoirLayer.on('click', function (e) {
            this.bindPopup(popupContent);
        });                       
    } 
});
var seSanRiverLayer = L.geoJson(reservoirs, {
    filter: filterBySeSan,
    //style: Style, 
	onEachFeature: function(feature, reservoirLayer) {
        var resname = feature.properties.Name;
        var stationid = feature.properties.id;
        var content = '<iframe id="encoder_iframe"  width="700" height="460" src="http://58.137.55.230/testiframe?stationid=&reservoirname=" frameborder="0"></iframe>';
		var popupContent = content.replace("stationid=", "stationid=" + stationid).replace("reservoirname=", "reservoirname=" + resname);
        reservoirLayer.bindTooltip(resname);
        reservoirLayer.on('click', function (e) {
            this.bindPopup(popupContent);
        });                       
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

var scale = L.control.scale({
    position:'bottomright'
}).addTo(map);


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
            { "data": "id" },
            { "data": "name" },
            { "data": "elevation" },
            { "data": "cum_area" },
            { "data": "country" },
            { "data": "river" },            
        ]
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
            { "data": "id" },
            { "data": "name" },
            { "data": "date" },
            { "data": "deltas" },
            { "data": "country" },
            { "data": "river" },            
        ]
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
            { "data": "id" },
            { "data": "name" },
            { "data": "date" },
            { "data": "inflow_cumecs" },
            { "data": "country" },
            { "data": "river" },            
        ]
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
            { "data": "id" },
            { "data": "name" },
            { "data": "date" },
            { "data": "outflow_cumecs" },
            { "data": "country" },
            { "data": "river" },            
        ]
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
            { "data": "id" },
            { "data": "name" },
            { "data": "date" },
            { "data": "surface_area_sqkm" },
            { "data": "country" },
            { "data": "river" },            
        ]
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
            { "data": "id" },
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
            { "data": "December" },
            { "data": "country" },
            { "data": "river" },            
        ]
    });
});




          
          
          
        