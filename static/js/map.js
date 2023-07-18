// Define map center
var MapOtions = {
    center: [18.5162, 103.0560],
    zoom: 5,
    minZoom: 4,
    maxZoom: 14,
    zoomControl: false
}

// Create map
var map = L.map('map', MapOtions);

// Set default basemap
var basemap_layer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Change zoom control postion to right
L.control.zoom({
    position: 'topleft'
}).addTo(map);

// Add scale control to map
var scale = L.control.scale({
    position:'bottomleft'
}).addTo(map);

var mapd = document.getElementById('map');
const mapDiv = document.getElementById('mapDiv');
const sideDiv = document.getElementById('sideDiv');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

leftBtn.addEventListener('click', expandMap);
rightBtn.addEventListener('click', collapseMap);

function expandMap() {
    mapDiv.classList.remove('col-md-6');
    mapDiv.classList.add('col-md-12');
    sideDiv.classList.remove('col-md-6');
    sideDiv.style.display = 'none';
    mapd.style.width='100%';
    map.invalidateSize();
    leftBtn.style.display = 'none';
    rightBtn.style.display = 'block';
}

function collapseMap() {
    mapDiv.classList.remove('col-md-12');
    mapDiv.classList.add('col-md-6');
    sideDiv.classList.add('col-md-6');
    sideDiv.style.display = 'block';
    mapd.style.width='50%';
    map.invalidateSize();
    leftBtn.style.display = 'block';
    rightBtn.style.display = 'none';
}

const fullscreenButton = document.getElementById('fullscreenButton');
const closeButton = document.getElementById('closeButton');
const sidebar = document.getElementById('sidebar');

// Function to enter fullscreen mode for the div
function enterFullscreen() {
  if (sidebar.requestFullscreen) {
    sidebar.requestFullscreen();
  } else if (sidebar.mozRequestFullScreen) {
    sidebar.mozRequestFullScreen();
  } else if (sidebar.webkitRequestFullscreen) {
    sidebar.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
  } else if (sidebar.msRequestFullscreen) {
    sidebar.msRequestFullscreen();
  }
  
  // Show the close button, hide the fullscreen button
  closeButton.style.display = 'inline-block';
  fullscreenButton.style.display = 'none';
}

// Function to exit fullscreen mode for the div
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  
  // Hide the close button, show the fullscreen button
  closeButton.style.display = 'none';
  fullscreenButton.style.display = 'inline-block';
}

// Attach click event listener to the fullscreen button
fullscreenButton.addEventListener('click', enterFullscreen);

// Attach click event listener to the close button
closeButton.addEventListener('click', exitFullscreen);

function getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

const url = '/get_increase_decrease/';
// const url = '/static/demo.json';
let dataArray = [];

async function fetchData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        // Modify the array within the function
        // console.log(data)
        dataArray = data;
        
    } catch (error) {
        console.error('Error:', error);
    }
}

var resData = '/get_reservoir/'; //'/static/data/geojson/reservoirs_38.geojson';

var resLayer, adm0_layer;

var chart = {
    // type: 'line',
    zoomType: "x",
    panning: true,
    panKey: "shift",
    style: {
        fontSize: "12px",
        color: "#000000",
    },
}

var xAxis =  {
    type: 'datetime',
    title: {
        text: "Year",
        style: {
            // font: "16px bold Times New Roman, sans-serif",
            color: "#000000",
        },
    },
    labels: {
        style: {
            // font: "16px Times New Roman, sans-serif",
            color: "#000000",
        },
    },
}

var labels = {
    // format: "{value:.0f}",
    style: {
        // font: "16px Times New Roman, sans-serif",
        color: "#000000",
    },
}

var tooltip = {
    xDateFormat: "%d-%m-%Y",
    crosshairs: true,
    shared: true,
    valueDecimals: 0,
    valueSuffix: " (m3/s)",
}

var states = {
    hover: {
        lineWidthPlus: 0,
    },
}

// Define country boundary style
var adm0Style = {
    color: "#282828",
    weight: 0.5,
    fillOpacity: 0.0,
    fillColor: "#fff",
};

fetch(resData)
.then(response => response.json())
.then(data => {
    var data = JSON.parse(data);
    // console.log(data)

    const tableBody = document.querySelector('#resTable tbody');

    data.features.forEach(dothis);

    function dothis(item){
        const row = document.createElement('tr');

        // Set the ID attribute for the row
        row.setAttribute('data-id', item.properties.ID);
        row.setAttribute('data-lat', item.properties.LAT_DD);
        row.setAttribute('data-lng', item.properties.LONG_DD);
        row.setAttribute('data-country', item.properties.COUNTRY);
  
        // Generate table cells for each column
        const nameCell = document.createElement('td');
        nameCell.textContent = item.properties.NAME;
        row.appendChild(nameCell);

        var country = item.properties.COUNTRY;
        const flagCell = document.createElement('td');
        flagCell.setAttribute('class', 'fs-3');

        if (country == 'Cambodia'){
            var countryCode = "KH"
            // const flagCell = document.createElement('td');
            flagCell.innerHTML = getFlagEmoji(countryCode);
            row.appendChild(flagCell);
        } else if (country == 'China'){
            var countryCode = "CN"
            // const flagCell = document.createElement('td');
            flagCell.innerHTML = getFlagEmoji(countryCode);
            row.appendChild(flagCell);
        } else if (country == 'Laos'){
            var countryCode = "LA"
            // const flagCell = document.createElement('td');
            flagCell.innerHTML = getFlagEmoji(countryCode);
            row.appendChild(flagCell);
        } else if (country == 'Thailand'){
            var countryCode = "TH"
            // const flagCell = document.createElement('td');
            flagCell.innerHTML = getFlagEmoji(countryCode);
            row.appendChild(flagCell);
        } else if (country == 'Vietnam'){
            var countryCode = "VN"
            // const flagCell = document.createElement('td');
            flagCell.innerHTML = getFlagEmoji(countryCode);
            row.appendChild(flagCell);
        }
        row.appendChild(flagCell);

        // const statusCell = document.createElement('td');
        // statusCell.textContent = item.properties.STATUS;
        // row.appendChild(statusCell);

        const icdcCell = document.createElement('td');
        icdcCell.setAttribute('id', item.properties.ID);
        row.appendChild(icdcCell);
        // console.log(icdcCell)
        
        tableBody.appendChild(row);
    }

    fetchData()
    .then(()=> {
        var d = Object.values(dataArray);
        d.forEach((val) => {
            try {
                var id = (val["ID"])
                var value = (val["Value"])
                var getTableCell = document.querySelector("#"+id)
                // console.log(getTableCell)
                if (value < 0){
                    getTableCell.innerHTML = '<i class="fas fa-arrow-down fa-lg"></i>';
                } else if (value > 0){
                    getTableCell.innerHTML = '<i class="fas fa-arrow-up fa-lg"></i>';
                } else {
                    getTableCell.innerHTML = '<i class="far fa-square fa-lg"></i>';
                }
                // getTableCell.innerHTML = value

            } catch (error) {
                console.error('Error:', error);
            }
        });
        // const result = d.filter(id => id.ID =="Lam_Pao");
        // console.log(result[0]["Value"])
        function getIcon(rid){
            let data;
            try {
                const filterArr = d.filter(x => x.ID == rid);
                data = filterArr;
                // console.log(rid)
                // console.log(data)
            } catch (error) {
                console.error('Error:', error);
            }
            const value = data[0]["Value"];
            // console.log(value)
            if(value < 0){
                iconUrl = '/static/images/brown.png';
            } else if (value > 0){
                iconUrl = '/static/images/green.png';
            }else {
                iconUrl = '/static/images/blue.png';
            }

            var iconOptions = {
                iconUrl: iconUrl,
                iconSize: [15, 22]
            };
            var customIcon = L.icon(iconOptions);
            return customIcon;
        }

        function onEachFeature(feature, rLayer){
            var name = feature.properties.NAME;
            var id = feature.properties.ID;
            var icon = getIcon(id);
            rLayer.bindTooltip(name);
            rLayer.setIcon(icon);
            rLayer.on('click', function (e) {

                const profileTabLink = document.querySelector('#pills-profile-tab');
                profileTabLink.classList.remove('disabled');
                profileTabLink.classList.add('active');
                profileTabLink.setAttribute('aria-selected', 'true');
                
                const homeTabLink = document.querySelector('#pills-home-tab');
                // homeTabLink.classList.remove('disabled');
                homeTabLink.classList.remove('active');
                homeTabLink.setAttribute('aria-selected', 'false');

                const profileContent = document.querySelector('#pills-profile');
                const homeContent = document.querySelector('#pills-home');
                homeContent.classList.remove('active', 'show');
                profileContent.classList.add('active', 'show');

                var res_id = feature.properties.ID;
                reservoir_id = res_id
                
                const params = new URLSearchParams();
                params.append('r_id', res_id);

                const url_about = '/get_reservoir_info/?' + params.toString();
                const url_aec = '/get_aec_chart/?' + params.toString();
                const url_inflow = '/get_inflow_chart/?' + params.toString();
                const url_outflow = '/get_outflow_chart/?' + params.toString();
                const url_sarea = '/get_sarea_chart/?' + params.toString();
                const url_deltas = '/get_deltas_chart/?' + params.toString();
                const url_rc = '/get_rc_chart/?' + params.toString();
                const url_precip = '/get_precip_chart/?' + params.toString();

                // Reservoir Info
                fetch(url_about)
                .then(response => response.json())
                .then(data => {
                    var data = JSON.parse(data);
                    // console.log(data);
                    const resTableBody = document.querySelector('#resInfo tbody');
                    
                    var getInfos = Object.values(data);
                    getInfos.forEach((val) => {
                        // NAME,COUNTRY,LATITUDE,LONGITITUDE,YEAR,DIS_AVG_LS,AREA_REP,AREA_SKM,CAP_MCM,DEPTH_M,GRAND_ID,CATCH_SKM,ELEV_MASL,CAP_MIN,AREA_POLY,DAM_LEN_M,ID
                        var name = val["NAME"]
                        var lat = val["LATITUDE"]
                        var lng = val["LONGITITUDE"]
                        var country = val["COUNTRY"]
                        var status = val["STATUS"]
                        var year = val["YEAR"]
                        var area = val["AREA_SKM"]
                        var cap = val["CAP_MCM"]
                        var depth = val["DEPTH_M"]
                        var catchment = val["CATCH_SKM"]
                        var elv = val["ELEV_MASL"]
                        var length = val["DAM_LEN_M"]

                        if (country == 'Cambodia'){
                            var countryCode = "KH"
                            flag = getFlagEmoji(countryCode);
                        } else if (country == 'China'){
                            var countryCode = "CN"
                            flag = getFlagEmoji(countryCode);
                        } else if (country == 'Laos'){
                            var countryCode = "LA"
                            flag = getFlagEmoji(countryCode);
                        } else if (country == 'Thailand'){
                            var countryCode = "TH"
                            flag = getFlagEmoji(countryCode);
                        } else if (country == 'Vietnam'){
                            var countryCode = "VN"
                            flag = getFlagEmoji(countryCode);
                        }

                        document.querySelector('#resInfo tbody #resName').innerHTML = name;
                        document.querySelector('#resInfo tbody #resLocation').innerHTML = flag;
                        document.querySelector('#resInfo tbody #resLat').innerHTML = lat;
                        document.querySelector('#resInfo tbody #resLng').innerHTML = lng;
                        document.querySelector('#resInfo tbody #resStatus').innerHTML = status;
                        document.querySelector('#resInfo tbody #resYear').innerHTML = year;
                        document.querySelector('#resInfo tbody #resArea').innerHTML = area;
                        document.querySelector('#resInfo tbody #resCap').innerHTML = cap;
                        document.querySelector('#resInfo tbody #resDepth').innerHTML = depth;
                        document.querySelector('#resInfo tbody #resCatch').innerHTML = catchment;
                        document.querySelector('#resInfo tbody #resElv').innerHTML = elv;
                        document.querySelector('#resInfo tbody #resLength').innerHTML = length;
                    });
                });

                // AEC chart
                fetch(url_aec)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    // Convert dates to JavaScript dates
                    var data = JSON.parse(data);
                    var series = data.map(function(d) {
                        return [new Date(d.date).getTime(), d.value];
                    });
                    
                    // Create Highcharts chart
                    Highcharts.chart('chartAEC', {
                        chart: {
                            // type: "spline",
                            zoomType: "x",
                            panning: true,
                            panKey: "shift",
                        },
                        title: false,
                        xAxis: {
                            crosshair: true,
                            type: "category",
                            title: {
                                text: "Elevation (m) <br><br><p></p>",
                            },
                            labels: {
                                allowDecimals: false,
                                format: "{value}",
                                style: {
                                    // font: "16px Times New Roman, sans-serif",
                                    color: "#000000",
                                },
                            },
                            minTickInterval: 1,
                            min: 0.0,
                        },
                        yAxis: {
                            title: {
                                useHTML: true,
                                enabled: true,
                                text: "Area (Km<sup>2</sup>)",
                            },
                            labels: {
                                format: "{value:.f}",
                            },
                            minTickInterval: 1,
                            min: 0.0,
                        },
                        tooltip: {
                            valueDecimals: 2,
                            formatter: function() {
                                return 'Elevation: <b>' + this.x + ' m</b><br> Area: <b>'+this.y+' Km<sup>2</sup></b>'
                            }
                        },
                        legend: {enabled:false},
                        plotOptions: {
                            area: {
                                fillColor: {
                                    linearGradient: {
                                        x1: 0,
                                        y1: 0,
                                        x2: 0,
                                        y2: 1
                                    },
                                    stops: [
                                        [0, Highcharts.getOptions().colors[0]],
                                        [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                    ]
                                },
                                marker: {
                                    radius: 2
                                },
                                lineWidth: 1,
                                states: {
                                    hover: {
                                        lineWidth: 1
                                    }
                                },
                                threshold: null
                            }
                        },
                        series: [{
                            name: 'Area',
                            type: 'area',
                            data: data.map(d => d.area),
                        }]
                    });
                })
                .catch(error => {
                    console.error(error);
                });

                // Inflow chart
                fetch(url_inflow)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    // Convert dates to JavaScript dates
                    var data = JSON.parse(data);
                    var series = data.map(function(d) {
                        return [new Date(d.date).getTime(), d.inflow];
                    });

                    fetch(url_precip)
                    .then(response => response.json())
                    .then(pdata => {
                        var pdata = JSON.parse(pdata);
                        var pseries = pdata.map(function(d) {
                            return [new Date(d.date).getTime(), d.precip];
                        });
                        
                        // Create Highcharts chart
                        Highcharts.chart('chartInflow', {
                            // chart: chart,
                            chart: {
                                zoomType: "xy",
                                panning: true,
                                panKey: "shift",
                                style: {
                                color: "#000000",
                                },
                            },
                            title: false,
                            xAxis: xAxis,
                            yAxis: [
                                {
                                    title: {
                                        text: "Inflow (m3/s)",
                                        style: {
                                            // font: "16px bold Times New Roman, sans-serif",
                                            color: "#000000",
                                        },
                                    },
                                    labels: labels,
                                },
                                {
                                    title: {
                                        text: "Precipitation (mm)",
                                        style: {
                                            // font: "16px bold Times New Roman, sans-serif",
                                            color: "#000000",
                                        },
                                    },
                                    labels: {
                                    format: "{value:.2f}",
                                    },
                                    // tickPositions: [0, 50, 100, 200, 700, 1000],
                                    minTickInterval: 0.01,
                                    opposite: true,
                                    reversed: true,
                                    tickPositioner: function(min, max) {
                                        var mx;
                                        if (max < 100){
                                            mx = max + 100;
                                        } else if (max > 100 && max < 200){
                                            mx = max + 200;
                                        } else if (max > 200 && max < 350){
                                            mx = max + 250;
                                        } else if (max > 350 && max < 500){
                                            mx = max + 300;
                                        } else {
                                            mx = max + 500;
                                        }
                                        var ticks = [], 
                                            interval = Math.ceil((mx - min) / 5); // divide the range into 5 intervals
                                    
                                        // generate ticks at each interval
                                        for (var i = min; i <= mx; i += interval) {
                                        ticks.push(i);
                                        }
                                        return ticks;
                                    }
                                }
                            ],
                            tooltip:{
                                xDateFormat: "%d-%m-%Y",
                                crosshairs: true,
                                shared: true,
                                // valueDecimals: 0,
                                // valueSuffix: " (m3/s)",
                            },
                            legend: {enabled:true},
                            series: [
                                {
                                    name: 'Inflow(m3/s)',
                                    type: 'line',
                                    data: series,
                                    color: "darkblue",
                                    states: states
                                },
                                {
                                    name: "Precipitation(mm)",
                                    data: pseries,
                                    type: "line",
                                    yAxis: 1,
                                    color: "red",
                                    states: states
                                }
                            ]
                        });
                    })
                    .catch(error => {
                        console.error(error);
                    });
                })
                .catch(error => {
                    console.error(error);
                });

                // Outflow chart
                fetch(url_outflow)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    // Convert dates to JavaScript dates
                    var data = JSON.parse(data);
                    var series = data.map(function(d) {
                        return [new Date(d.date).getTime(), d.outflow];
                    });
                    
                    // Create Highcharts chart
                    Highcharts.chart('chartOutflow', {
                        chart: chart,
                        title: false,
                        xAxis: xAxis,
                        yAxis: {
                            title: {
                                text: "Outflow (m3/s)",
                                style: {
                                    // font: "16px bold Times New Roman, sans-serif",
                                    color: "#000000",
                                },
                            },
                            labels: labels,
                            // minTickInterval: 1,
                        },
                        tooltip: tooltip,
                        legend: {enabled:false},
                        series: [{
                            name: 'Outflow',
                            type: 'line',
                            data: series,
                            color: "darkblue",
                            states: states
                        }]
                    });
                })
                .catch(error => {
                    console.error(error);
                });

                // Sarea chart
                fetch(url_sarea)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    // Convert dates to JavaScript dates
                    var data = JSON.parse(data);
                    var series = data.map(function(d) {
                        return [new Date(d.date).getTime(), d.area];
                    });
                    
                    // Create Highcharts chart
                    Highcharts.chart('chartSarea', {
                        chart: chart,
                        title: false,
                        xAxis: xAxis,
                        yAxis: {
                            title: {
                                text: "Area (km2)",
                                style: {
                                    // font: "16px bold Times New Roman, sans-serif",
                                    color: "#000000",
                                },
                            },
                            labels: labels,
                            // minTickInterval: 1,
                        },
                        tooltip: {
                            xDateFormat: "%d-%m-%Y",
                            crosshairs: true,
                            shared: true,
                            valueDecimals: 0,
                            valueSuffix: " Km^2",
                        },
                        legend: {enabled:false},
                        series: [{
                            name: 'Area',
                            type: 'line',
                            data: series,
                            color: "darkblue",
                            states: states
                        }]
                    });
                })
                .catch(error => {
                    console.error(error);
                });

                // Deltas chart
                fetch(url_deltas)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    // Convert dates to JavaScript dates
                    var data = JSON.parse(data);
                    var series = data.map(function(d) {
                        return [new Date(d.date).getTime(), d.dels];
                    });
                    
                    // Create Highcharts chart
                    Highcharts.chart('chartDeltas', {
                        chart: chart,
                        title: false,
                        xAxis: xAxis,
                        yAxis: {
                            title: {
                                text: "dS (m3)",
                                style: {
                                    // font: "16px bold Times New Roman, sans-serif",
                                    color: "#000000",
                                },
                            },
                            labels: labels,
                            // minTickInterval: 1,
                        },
                        tooltip: {
                            xDateFormat: "%d-%m-%Y",
                            crosshairs: true,
                            shared: true,
                            valueDecimals: 2,
                            valueSuffix: " (m3)",
                        },
                        legend: {enabled:false},
                        series: [{
                            name: 'dS',
                            type: 'line',
                            data: series,
                            color: "darkblue",
                            states: states
                        }]
                    });
                })
                .catch(error => {
                    console.error(error);
                });

                // Rule curve chart
                fetch(url_rc)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    // Convert dates to JavaScript dates
                    var data = JSON.parse(data);
        
                    // Create Highcharts chart
                    Highcharts.chart('chartRC', {
                        chart: {
                            zoomType: 'x',
                            panning: true,
                            panKey: 'shift',
                            style: {
                                color: "#000000"
                            }
                        },
                        title: false,
                        xAxis: [{
                            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                            title: {
                                text: 'Month',
                                style: {
                                    color: "#000000"
                                }
                            },
                            labels: {
                                format: '{value}',
                                style: {
                                    color: "#000000"
                                }
                            },
                            minTickInterval: 0.01
                        }],
                        yAxis: {
                            title: {
                                useHTML: true,
                                enabled: true,
                                text: 'Specific storage (S/S<sub>max</sub>)',
                                style: {
                                    color: "#000000"
                                }
                            },
                            labels: {
                                format: '{value:.2f}',
                                style: {
                                    color: "#000000"
                                }	
                            },
                            minTickInterval: 0.01,
                        },
                        legend: {enabled:false},
                        series: [{
                            name: 'Specific Storage (S/Smax)',
                            data: data.map(d => d.value),
                            type: 'spline',
                            // type: 'line',
                            color: 'darkblue',
                            marker: {
                                enabled: true,
                                radius: 3		
                            },
                            states: states
                        }]
                    })
                })
                .catch(error => {
                    console.error(error);
                });
            });
        }
        
        resLayer = L.geoJson(data, {
            onEachFeature: onEachFeature
            // onEachFeature: function (feature, rLayer){
            //     var name = feature.properties.NAME;
            //     var id = feature.properties.ID;
            //     var icon = getIcon(id);
            //     rLayer.bindTooltip(name);
            //     rLayer.setIcon(icon);
                // rLayer.on('click', function (e) {

                //     const profileTabLink = document.querySelector('#pills-profile-tab');
                //     profileTabLink.classList.remove('disabled');
                //     profileTabLink.classList.add('active');
                //     profileTabLink.setAttribute('aria-selected', 'true');
                    
                //     const homeTabLink = document.querySelector('#pills-home-tab');
                //     // homeTabLink.classList.remove('disabled');
                //     homeTabLink.classList.remove('active');
                //     homeTabLink.setAttribute('aria-selected', 'false');

                //     const profileContent = document.querySelector('#pills-profile');
                //     const homeContent = document.querySelector('#pills-home');
                //     homeContent.classList.remove('active', 'show');
                //     profileContent.classList.add('active', 'show');

                //     var res_id = feature.properties.ID;
                //     reservoir_id = res_id
                    
                //     const params = new URLSearchParams();
                //     params.append('r_id', res_id);

                //     const url_about = '/get_reservoir_info/?' + params.toString();
                //     const url_aec = '/get_aec_chart/?' + params.toString();
                //     const url_inflow = '/get_inflow_chart/?' + params.toString();
                //     const url_outflow = '/get_outflow_chart/?' + params.toString();
                //     const url_sarea = '/get_sarea_chart/?' + params.toString();
                //     const url_deltas = '/get_deltas_chart/?' + params.toString();
                //     const url_rc = '/get_rc_chart/?' + params.toString();
                //     const url_precip = '/get_precip_chart/?' + params.toString();

                //     // Reservoir Info
                //     fetch(url_about)
                //     .then(response => response.json())
                //     .then(data => {
                //         var data = JSON.parse(data);
                //         // console.log(data);
                //         const resTableBody = document.querySelector('#resInfo tbody');
                        
                //         var getInfos = Object.values(data);
                //         getInfos.forEach((val) => {
                //             // NAME,COUNTRY,LATITUDE,LONGITITUDE,YEAR,DIS_AVG_LS,AREA_REP,AREA_SKM,CAP_MCM,DEPTH_M,GRAND_ID,CATCH_SKM,ELEV_MASL,CAP_MIN,AREA_POLY,DAM_LEN_M,ID
                //             var name = val["NAME"]
                //             var lat = val["LATITUDE"]
                //             var lng = val["LONGITITUDE"]
                //             var country = val["COUNTRY"]
                //             var year = val["AREA_SKM"]
                //             var area = val["YEAR"]
                //             var cap = val["CAP_MCM"]
                //             var depth = val["DEPTH_M"]
                //             var catchment = val["CATCH_SKM"]
                //             var elv = val["ELEV_MASL"]
                //             var length = val["DAM_LEN_M"]

                //             if (country == 'Cambodia'){
                //                 var countryCode = "KH"
                //                 flag = getFlagEmoji(countryCode);
                //             } else if (country == 'China'){
                //                 var countryCode = "CN"
                //                 flag = getFlagEmoji(countryCode);
                //             } else if (country == 'Laos'){
                //                 var countryCode = "LA"
                //                 flag = getFlagEmoji(countryCode);
                //             } else if (country == 'Thailand'){
                //                 var countryCode = "TH"
                //                 flag = getFlagEmoji(countryCode);
                //             } else if (country == 'Vietnam'){
                //                 var countryCode = "VN"
                //                 flag = getFlagEmoji(countryCode);
                //             }

                //             document.querySelector('#resInfo tbody #resName').innerHTML = name;
                //             document.querySelector('#resInfo tbody #resLocation').innerHTML = flag;
                //             document.querySelector('#resInfo tbody #resLat').innerHTML = lat;
                //             document.querySelector('#resInfo tbody #resLng').innerHTML = lng;
                //             document.querySelector('#resInfo tbody #resYear').innerHTML = year;
                //             document.querySelector('#resInfo tbody #resArea').innerHTML = area;
                //             document.querySelector('#resInfo tbody #resCap').innerHTML = cap;
                //             document.querySelector('#resInfo tbody #resDepth').innerHTML = depth;
                //             document.querySelector('#resInfo tbody #resCatch').innerHTML = catchment;
                //             document.querySelector('#resInfo tbody #resElv').innerHTML = elv;
                //             document.querySelector('#resInfo tbody #resLength').innerHTML = length;
                //         });
                //     });

                //     // AEC chart
                //     fetch(url_aec)
                //     .then(response => response.json())
                //     .then(data => {
                //         // console.log(data)
                //         // Convert dates to JavaScript dates
                //         var data = JSON.parse(data);
                //         var series = data.map(function(d) {
                //             return [new Date(d.date).getTime(), d.value];
                //         });
                        
                //         // Create Highcharts chart
                //         Highcharts.chart('chartAEC', {
                //             chart: {
                //                 // type: "spline",
                //                 zoomType: "x",
                //                 panning: true,
                //                 panKey: "shift",
                //             },
                //             title: false,
                //             xAxis: {
                //                 crosshair: true,
                //                 type: "category",
                //                 title: {
                //                     text: "Elevation (m) <br><br><p></p>",
                //                 },
                //                 labels: {
                //                     allowDecimals: false,
                //                     format: "{value}",
                //                     style: {
                //                         // font: "16px Times New Roman, sans-serif",
                //                         color: "#000000",
                //                     },
                //                 },
                //                 minTickInterval: 1,
                //                 min: 0.0,
                //             },
                //             yAxis: {
                //                 title: {
                //                     useHTML: true,
                //                     enabled: true,
                //                     text: "Area (Km<sup>2</sup>)",
                //                 },
                //                 labels: {
                //                     format: "{value:.f}",
                //                 },
                //                 minTickInterval: 1,
                //                 min: 0.0,
                //             },
                //             tooltip: {
                //                 valueDecimals: 2,
                //                 formatter: function() {
                //                     return 'Elevation: <b>' + this.x + ' m</b><br> Area: <b>'+this.y+' Km<sup>2</sup></b>'
                //                 }
                //             },
                //             legend: {enabled:false},
                //             plotOptions: {
                //                 area: {
                //                     fillColor: {
                //                         linearGradient: {
                //                             x1: 0,
                //                             y1: 0,
                //                             x2: 0,
                //                             y2: 1
                //                         },
                //                         stops: [
                //                             [0, Highcharts.getOptions().colors[0]],
                //                             [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                //                         ]
                //                     },
                //                     marker: {
                //                         radius: 2
                //                     },
                //                     lineWidth: 1,
                //                     states: {
                //                         hover: {
                //                             lineWidth: 1
                //                         }
                //                     },
                //                     threshold: null
                //                 }
                //             },
                //             series: [{
                //                 name: 'Area',
                //                 type: 'area',
                //                 data: data.map(d => d.area),
                //             }]
                //         });
                //     })
                //     .catch(error => {
                //         console.error(error);
                //     });

                //     // Inflow chart
                //     fetch(url_inflow)
                //     .then(response => response.json())
                //     .then(data => {
                //         // console.log(data)
                //         // Convert dates to JavaScript dates
                //         var data = JSON.parse(data);
                //         var series = data.map(function(d) {
                //             return [new Date(d.date).getTime(), d.inflow];
                //         });

                //         fetch(url_precip)
                //         .then(response => response.json())
                //         .then(pdata => {
                //             var pdata = JSON.parse(pdata);
                //             var pseries = pdata.map(function(d) {
                //                 return [new Date(d.date).getTime(), d.precip];
                //             });
                            
                //             // Create Highcharts chart
                //             Highcharts.chart('chartInflow', {
                //                 // chart: chart,
                //                 chart: {
                //                     zoomType: "xy",
                //                     panning: true,
                //                     panKey: "shift",
                //                     style: {
                //                     color: "#000000",
                //                     },
                //                 },
                //                 title: false,
                //                 xAxis: xAxis,
                //                 yAxis: [
                //                     {
                //                         title: {
                //                             text: "Inflow (m3/s)",
                //                             style: {
                //                                 // font: "16px bold Times New Roman, sans-serif",
                //                                 color: "#000000",
                //                             },
                //                         },
                //                         labels: labels,
                //                         // tickPositions: [0, 100, 200, 400, 700, 1000],
                //                         // minTickInterval: 1,
                //                         // tickPositioner: function(min, max) {
                //                         //     var mx;
                //                         //     if (max < 100){
                //                         //         mx = max + 100;
                //                         //     } else if (max > 100 && max < 200){
                //                         //         mx = max + 200;
                //                         //     } else if (max > 200 && max < 350){
                //                         //         mx = max + 250;
                //                         //     } else if (max > 350 && max < 500){
                //                         //         mx = max + 300;
                //                         //     } else {
                //                         //         mx = max + 500;
                //                         //     }
                //                         //     var ticks = [], 
                //                         //         interval = Math.ceil((mx - min) / 5); // divide the range into 5 intervals
                                        
                //                         //     // generate ticks at each interval
                //                         //     for (var i = min; i <= mx; i += interval) {
                //                         //       ticks.push(i);
                //                         //     }
                //                         //     return ticks;
                //                         // }
                //                     },
                //                     {
                //                         title: {
                //                             text: "Precipitation (mm)",
                //                             style: {
                //                                 // font: "16px bold Times New Roman, sans-serif",
                //                                 color: "#000000",
                //                             },
                //                         },
                //                         labels: {
                //                         format: "{value:.2f}",
                //                         },
                //                         // tickPositions: [0, 50, 100, 200, 700, 1000],
                //                         minTickInterval: 0.01,
                //                         opposite: true,
                //                         reversed: true,
                //                         tickPositioner: function(min, max) {
                //                             var mx;
                //                             if (max < 100){
                //                                 mx = max + 100;
                //                             } else if (max > 100 && max < 200){
                //                                 mx = max + 200;
                //                             } else if (max > 200 && max < 350){
                //                                 mx = max + 250;
                //                             } else if (max > 350 && max < 500){
                //                                 mx = max + 300;
                //                             } else {
                //                                 mx = max + 500;
                //                             }
                //                             var ticks = [], 
                //                                 interval = Math.ceil((mx - min) / 5); // divide the range into 5 intervals
                                        
                //                             // generate ticks at each interval
                //                             for (var i = min; i <= mx; i += interval) {
                //                             ticks.push(i);
                //                             }
                //                             return ticks;
                //                         }
                //                     }
                //                 ],
                //                 tooltip:{
                //                     xDateFormat: "%d-%m-%Y",
                //                     crosshairs: true,
                //                     shared: true,
                //                     // valueDecimals: 0,
                //                     // valueSuffix: " (m3/s)",
                //                 },
                //                 legend: {enabled:true},
                //                 series: [
                //                     {
                //                         name: 'Inflow(m3/s)',
                //                         type: 'line',
                //                         data: series,
                //                         color: "darkblue",
                //                         states: states
                //                     },
                //                     {
                //                         name: "Precipitation(mm)",
                //                         data: pseries,
                //                         type: "line",
                //                         yAxis: 1,
                //                         color: "red",
                //                         states: states
                //                     }
                //                 ]
                //             });
                //         })
                //         .catch(error => {
                //             console.error(error);
                //         });
                //     })
                //     .catch(error => {
                //         console.error(error);
                //     });

                //     // Outflow chart
                //     fetch(url_outflow)
                //     .then(response => response.json())
                //     .then(data => {
                //         // console.log(data)
                //         // Convert dates to JavaScript dates
                //         var data = JSON.parse(data);
                //         var series = data.map(function(d) {
                //             return [new Date(d.date).getTime(), d.outflow];
                //         });
                        
                //         // Create Highcharts chart
                //         Highcharts.chart('chartOutflow', {
                //             chart: chart,
                //             title: false,
                //             xAxis: xAxis,
                //             yAxis: {
                //                 title: {
                //                     text: "Outflow (m3/s)",
                //                     style: {
                //                         // font: "16px bold Times New Roman, sans-serif",
                //                         color: "#000000",
                //                     },
                //                 },
                //                 labels: labels,
                //                 // minTickInterval: 1,
                //             },
                //             tooltip: tooltip,
                //             legend: {enabled:false},
                //             series: [{
                //                 name: 'Outflow',
                //                 type: 'line',
                //                 data: series,
                //                 color: "darkblue",
                //                 states: states
                //             }]
                //         });
                //     })
                //     .catch(error => {
                //         console.error(error);
                //     });

                //     // Sarea chart
                //     fetch(url_sarea)
                //     .then(response => response.json())
                //     .then(data => {
                //         // console.log(data)
                //         // Convert dates to JavaScript dates
                //         var data = JSON.parse(data);
                //         var series = data.map(function(d) {
                //             return [new Date(d.date).getTime(), d.area];
                //         });
                        
                //         // Create Highcharts chart
                //         Highcharts.chart('chartSarea', {
                //             chart: chart,
                //             title: false,
                //             xAxis: xAxis,
                //             yAxis: {
                //                 title: {
                //                     text: "Area (km2)",
                //                     style: {
                //                         // font: "16px bold Times New Roman, sans-serif",
                //                         color: "#000000",
                //                     },
                //                 },
                //                 labels: labels,
                //                 // minTickInterval: 1,
                //             },
                //             tooltip: {
                //                 xDateFormat: "%d-%m-%Y",
                //                 crosshairs: true,
                //                 shared: true,
                //                 valueDecimals: 0,
                //                 valueSuffix: " Km^2",
                //             },
                //             legend: {enabled:false},
                //             series: [{
                //                 name: 'Area',
                //                 type: 'line',
                //                 data: series,
                //                 color: "darkblue",
                //                 states: states
                //             }]
                //         });
                //     })
                //     .catch(error => {
                //         console.error(error);
                //     });

                //     // Deltas chart
                //     fetch(url_deltas)
                //     .then(response => response.json())
                //     .then(data => {
                //         // console.log(data)
                //         // Convert dates to JavaScript dates
                //         var data = JSON.parse(data);
                //         var series = data.map(function(d) {
                //             return [new Date(d.date).getTime(), d.dels];
                //         });
                        
                //         // Create Highcharts chart
                //         Highcharts.chart('chartDeltas', {
                //             chart: chart,
                //             title: false,
                //             xAxis: xAxis,
                //             yAxis: {
                //                 title: {
                //                     text: "dS (m3)",
                //                     style: {
                //                         // font: "16px bold Times New Roman, sans-serif",
                //                         color: "#000000",
                //                     },
                //                 },
                //                 labels: labels,
                //                 // minTickInterval: 1,
                //             },
                //             tooltip: {
                //                 xDateFormat: "%d-%m-%Y",
                //                 crosshairs: true,
                //                 shared: true,
                //                 valueDecimals: 2,
                //                 valueSuffix: " (m3)",
                //             },
                //             legend: {enabled:false},
                //             series: [{
                //                 name: 'dS',
                //                 type: 'line',
                //                 data: series,
                //                 color: "darkblue",
                //                 states: states
                //             }]
                //         });
                //     })
                //     .catch(error => {
                //         console.error(error);
                //     });

                //     // Rule curve chart
                //     fetch(url_rc)
                //     .then(response => response.json())
                //     .then(data => {
                //         // console.log(data)
                //         // Convert dates to JavaScript dates
                //         var data = JSON.parse(data);
            
                //         // Create Highcharts chart
                //         Highcharts.chart('chartRC', {
                //             chart: {
                //                 zoomType: 'x',
                //                 panning: true,
                //                 panKey: 'shift',
                //                 style: {
                //                     color: "#000000"
                //                 }
                //             },
                //             title: false,
                //             xAxis: [{
                //                 categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                //                 title: {
                //                     text: 'Month',
                //                     style: {
                //                         color: "#000000"
                //                     }
                //                 },
                //                 labels: {
                //                     format: '{value}',
                //                     style: {
                //                         color: "#000000"
                //                     }
                //                 },
                //                 minTickInterval: 0.01
                //             }],
                //             yAxis: {
                //                 title: {
                //                     useHTML: true,
                //                     enabled: true,
                //                     text: 'Specific storage (S/S<sub>max</sub>)',
                //                     style: {
                //                         color: "#000000"
                //                     }
                //                 },
                //                 labels: {
                //                     format: '{value:.2f}',
                //                     style: {
                //                         color: "#000000"
                //                     }	
                //                 },
                //                 minTickInterval: 0.01,
                //             },
                //             legend: {enabled:false},
                //             series: [{
                //                 name: 'Specific Storage (S/Smax)',
                //                 data: data.map(d => d.value),
                //                 type: 'spline',
                //                 // type: 'line',
                //                 color: 'darkblue',
                //                 marker: {
                //                     enabled: true,
                //                     radius: 3		
                //                 },
                //                 states: states
                //             }]
                //         })
                //     })
                //     .catch(error => {
                //         console.error(error);
                //     });
                // });
            // }
        }).addTo(map);

        adm0_layer = L.geoJson(adm0, {
            style: adm0Style,
            onEachFeature: function(feature, admin0Layer) {
                // admin0Layer.bindPopup(feature.properties.NAME_0);  
                admin0Layer.on('click', function(e){
                    var countryName = feature.properties.NAME_0;
                    // console.log(countryName);
                    if(map.hasLayer(resLayer)){
                        map.removeLayer(resLayer);
                    }
                    adm0_layer.setStyle(adm0Style);

                    this.setStyle({
                        color: "#000",
                        weight: 1.0,
                        fillOpacity: 0.3,
                        fillColor: "yellow",
                    });

                    resLayer = L.geoJson(data, {
                        filter: function(feature) {
                            if(feature.properties.COUNTRY == countryName)
                            return true;
                        },
                        onEachFeature: onEachFeature
                    }).addTo(map)

                    const tableRows = document.querySelectorAll('#resTable tbody tr');
                    for (var i = 0; i < tableRows.length; i++) {
                        var cn = tableRows[i].getAttribute('data-country');
                        // console.log(cn)
                        if (cn == countryName){
                            tableRows[i].style.display = "";
                        } else {
                            tableRows[i].style.display = "none";
                        }
                    }
                });        
            } 
        }).addTo(map);
    });
    
    const tableRows = document.querySelectorAll('#resTable tbody tr');

    // Add click event listener to each row
    tableRows.forEach((row) => {
        row.addEventListener('click', () => {
            const id = row.getAttribute('data-id');
            const lat = row.getAttribute('data-lat');
            const lng = row.getAttribute('data-lng');
            map.flyTo([lat, lng], 13)
            // Adjust the left margin of the map container element
            // const mapContainer = document.getElementById('map');
            // mapContainer.style.marginLeft = '-60%';
            // mapContainer.style.left = '-60%';

            // document.querySelector("#pills-tabContent").padddingLeft = "-30%";
            
            const profileTabLink = document.querySelector('#pills-profile-tab');
            profileTabLink.classList.remove('disabled');
            profileTabLink.classList.add('active');
            profileTabLink.setAttribute('aria-selected', 'true');
            
            const homeTabLink = document.querySelector('#pills-home-tab');
            // homeTabLink.classList.remove('disabled');
            homeTabLink.classList.remove('active');
            homeTabLink.setAttribute('aria-selected', 'false');

            const profileContent = document.querySelector('#pills-profile');
            const homeContent = document.querySelector('#pills-home');
            homeContent.classList.remove('active', 'show');
            profileContent.classList.add('active', 'show');

            const params = new URLSearchParams();
            params.append('r_id', id);

            const url_about = '/get_reservoir_info/?' + params.toString();
            const url_aec = '/get_aec_chart/?' + params.toString();
            const url_inflow = '/get_inflow_chart/?' + params.toString();
            const url_outflow = '/get_outflow_chart/?' + params.toString();
            const url_sarea = '/get_sarea_chart/?' + params.toString();
            const url_deltas = '/get_deltas_chart/?' + params.toString();
            const url_rc = '/get_rc_chart/?' + params.toString();
            const url_precip = '/get_precip_chart/?' + params.toString();

            // Reservoir Info
            fetch(url_about)
            .then(response => response.json())
            .then(data => {
                var data = JSON.parse(data);
                // console.log(data);
                const resTableBody = document.querySelector('#resInfo tbody');
                
                var getInfos = Object.values(data);
                getInfos.forEach((val) => {
                    // NAME,COUNTRY,LATITUDE,LONGITITUDE,YEAR,DIS_AVG_LS,AREA_REP,AREA_SKM,CAP_MCM,DEPTH_M,GRAND_ID,CATCH_SKM,ELEV_MASL,CAP_MIN,AREA_POLY,DAM_LEN_M,ID
                    var name = val["NAME"]
                    var lat = val["LATITUDE"]
                    var lng = val["LONGITITUDE"]
                    var country = val["COUNTRY"]
                    var year = val["AREA_SKM"]
                    var area = val["YEAR"]
                    var cap = val["CAP_MCM"]
                    var depth = val["DEPTH_M"]
                    var catchment = val["CATCH_SKM"]
                    var elv = val["ELEV_MASL"]
                    var length = val["DAM_LEN_M"]

                    if (country == 'Cambodia'){
                        var countryCode = "KH"
                        flag = getFlagEmoji(countryCode);
                    } else if (country == 'China'){
                        var countryCode = "CN"
                        flag = getFlagEmoji(countryCode);
                    } else if (country == 'Laos'){
                        var countryCode = "LA"
                        flag = getFlagEmoji(countryCode);
                    } else if (country == 'Thailand'){
                        var countryCode = "TH"
                        flag = getFlagEmoji(countryCode);
                    } else if (country == 'Vietnam'){
                        var countryCode = "VN"
                        flag = getFlagEmoji(countryCode);
                    }

                    document.querySelector('#resInfo tbody #resName').innerHTML = name;
                    document.querySelector('#resInfo tbody #resLocation').innerHTML = flag;
                    document.querySelector('#resInfo tbody #resLat').innerHTML = lat;
                    document.querySelector('#resInfo tbody #resLng').innerHTML = lng;
                    document.querySelector('#resInfo tbody #resYear').innerHTML = year;
                    document.querySelector('#resInfo tbody #resArea').innerHTML = area;
                    document.querySelector('#resInfo tbody #resCap').innerHTML = cap;
                    document.querySelector('#resInfo tbody #resDepth').innerHTML = depth;
                    document.querySelector('#resInfo tbody #resCatch').innerHTML = catchment;
                    document.querySelector('#resInfo tbody #resElv').innerHTML = elv;
                    document.querySelector('#resInfo tbody #resLength').innerHTML = length;
                });
            });

            // AEC chart
            fetch(url_aec)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                // Convert dates to JavaScript dates
                var data = JSON.parse(data);
                var series = data.map(function(d) {
                    return [new Date(d.date).getTime(), d.value];
                });
                
                // Create Highcharts chart
                Highcharts.chart('chartAEC', {
                    chart: {
                        // type: "spline",
                        zoomType: "x",
                        panning: true,
                        panKey: "shift",
                    },
                    title: false,
                    xAxis: {
                        crosshair: true,
                        type: "category",
                        title: {
                            text: "Elevation (m) <br><br><p></p>",
                        },
                        labels: {
                            allowDecimals: false,
                            format: "{value}",
                            style: {
                                // font: "16px Times New Roman, sans-serif",
                                color: "#000000",
                            },
                        },
                        minTickInterval: 1,
                        min: 0.0,
                    },
                    yAxis: {
                        title: {
                            useHTML: true,
                            enabled: true,
                            text: "Area (Km<sup>2</sup>)",
                        },
                        labels: {
                            format: "{value:.f}",
                        },
                        minTickInterval: 1,
                        min: 0.0,
                    },
                    tooltip: {
                        valueDecimals: 2,
                        formatter: function() {
                            return 'Elevation: <b>' + this.x + ' m</b><br> Area: <b>'+this.y+' Km<sup>2</sup></b>'
                        }
                    },
                    legend: {enabled:false},
                    plotOptions: {
                        area: {
                            fillColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, Highcharts.getOptions().colors[0]],
                                    [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                ]
                            },
                            marker: {
                                radius: 2
                            },
                            lineWidth: 1,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            threshold: null
                        }
                    },
                    series: [{
                        name: 'Area',
                        type: 'area',
                        data: data.map(d => d.area),
                    }]
                });
            })
            .catch(error => {
                console.error(error);
            });

            // Inflow chart
            fetch(url_inflow)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                // Convert dates to JavaScript dates
                var data = JSON.parse(data);
                var series = data.map(function(d) {
                    return [new Date(d.date).getTime(), d.inflow];
                });

                fetch(url_precip)
                .then(response => response.json())
                .then(pdata => {
                    var pdata = JSON.parse(pdata);
                    var pseries = pdata.map(function(d) {
                        return [new Date(d.date).getTime(), d.precip];
                    });
                    
                    // Create Highcharts chart
                    Highcharts.chart('chartInflow', {
                        // chart: chart,
                        chart: {
                            zoomType: "xy",
                            panning: true,
                            panKey: "shift",
                            style: {
                              color: "#000000",
                            },
                        },
                        title: false,
                        xAxis: xAxis,
                        yAxis: [
                            {
                                title: {
                                    text: "Inflow (m3/s)",
                                    style: {
                                        // font: "16px bold Times New Roman, sans-serif",
                                        color: "#000000",
                                    },
                                },
                                labels: labels,
                                // tickPositions: [0, 100, 200, 400, 700, 1000],
                                // minTickInterval: 1,
                                // tickPositioner: function(min, max) {
                                //     var mx;
                                //     if (max < 100){
                                //         mx = max + 100;
                                //     } else if (max > 100 && max < 200){
                                //         mx = max + 200;
                                //     } else if (max > 200 && max < 350){
                                //         mx = max + 250;
                                //     } else if (max > 350 && max < 500){
                                //         mx = max + 300;
                                //     } else {
                                //         mx = max + 500;
                                //     }
                                //     var ticks = [], 
                                //         interval = Math.ceil((mx - min) / 5); // divide the range into 5 intervals
                                
                                //     // generate ticks at each interval
                                //     for (var i = min; i <= mx; i += interval) {
                                //       ticks.push(i);
                                //     }
                                //     return ticks;
                                // }
                            },
                            {
                                title: {
                                    text: "Precipitation (mm)",
                                    style: {
                                        // font: "16px bold Times New Roman, sans-serif",
                                        color: "#000000",
                                    },
                                },
                                labels: {
                                format: "{value:.2f}",
                                },
                                // tickPositions: [0, 50, 100, 200, 700, 1000],
                                minTickInterval: 0.01,
                                opposite: true,
                                reversed: true,
                                tickPositioner: function(min, max) {
                                    var mx;
                                    if (max < 100){
                                        mx = max + 100;
                                    } else if (max > 100 && max < 200){
                                        mx = max + 200;
                                    } else if (max > 200 && max < 350){
                                        mx = max + 250;
                                    } else if (max > 350 && max < 500){
                                        mx = max + 300;
                                    } else {
                                        mx = max + 500;
                                    }
                                    var ticks = [], 
                                        interval = Math.ceil((mx - min) / 5); // divide the range into 5 intervals
                                
                                    // generate ticks at each interval
                                    for (var i = min; i <= mx; i += interval) {
                                      ticks.push(i);
                                    }
                                    return ticks;
                                }
                            }
                        ],
                        tooltip:{
                            xDateFormat: "%d-%m-%Y",
                            crosshairs: true,
                            shared: true,
                            // valueDecimals: 0,
                            // valueSuffix: " (m3/s)",
                        },
                        legend: {enabled:true},
                        series: [
                            {
                                name: 'Inflow(m3/s)',
                                type: 'line',
                                data: series,
                                color: "darkblue",
                                states: states
                            },
                            {
                                name: "Precipitation(mm)",
                                data: pseries,
                                type: "line",
                                yAxis: 1,
                                color: "red",
                                states: states
                            }
                        ]
                    });
                })
                .catch(error => {
                    console.error(error);
                });
            })
            .catch(error => {
                console.error(error);
            });

            // Outflow chart
            fetch(url_outflow)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                // Convert dates to JavaScript dates
                var data = JSON.parse(data);
                var series = data.map(function(d) {
                    return [new Date(d.date).getTime(), d.outflow];
                });
                
                // Create Highcharts chart
                Highcharts.chart('chartOutflow', {
                    chart: chart,
                    title: false,
                    xAxis: xAxis,
                    yAxis: {
                        title: {
                            text: "Outflow (m3/s)",
                            style: {
                                // font: "16px bold Times New Roman, sans-serif",
                                color: "#000000",
                            },
                        },
                        labels: labels,
                        // minTickInterval: 1,
                    },
                    tooltip: tooltip,
                    legend: {enabled:false},
                    series: [{
                        name: 'Outflow',
                        type: 'line',
                        data: series,
                        color: "darkblue",
                        states: states
                    }]
                });
            })
            .catch(error => {
                console.error(error);
            });

            // Sarea chart
            fetch(url_sarea)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                // Convert dates to JavaScript dates
                var data = JSON.parse(data);
                var series = data.map(function(d) {
                    return [new Date(d.date).getTime(), d.area];
                });
                
                // Create Highcharts chart
                Highcharts.chart('chartSarea', {
                    chart: chart,
                    title: false,
                    xAxis: xAxis,
                    yAxis: {
                        title: {
                            text: "Area (km2)",
                            style: {
                                // font: "16px bold Times New Roman, sans-serif",
                                color: "#000000",
                            },
                        },
                        labels: labels,
                        // minTickInterval: 1,
                    },
                    tooltip: {
                        xDateFormat: "%d-%m-%Y",
                        crosshairs: true,
                        shared: true,
                        valueDecimals: 0,
                        valueSuffix: " Km^2",
                    },
                    legend: {enabled:false},
                    series: [{
                        name: 'Area',
                        type: 'line',
                        data: series,
                        color: "darkblue",
                        states: states
                    }]
                });
            })
            .catch(error => {
                console.error(error);
            });

            // Deltas chart
            fetch(url_deltas)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                // Convert dates to JavaScript dates
                var data = JSON.parse(data);
                var series = data.map(function(d) {
                    return [new Date(d.date).getTime(), d.dels];
                });
                
                // Create Highcharts chart
                Highcharts.chart('chartDeltas', {
                    chart: chart,
                    title: false,
                    xAxis: xAxis,
                    yAxis: {
                        title: {
                            text: "dS (m3)",
                            style: {
                                // font: "16px bold Times New Roman, sans-serif",
                                color: "#000000",
                            },
                        },
                        labels: labels,
                        // minTickInterval: 1,
                    },
                    tooltip: {
                        xDateFormat: "%d-%m-%Y",
                        crosshairs: true,
                        shared: true,
                        valueDecimals: 2,
                        valueSuffix: " (m3)",
                    },
                    legend: {enabled:false},
                    series: [{
                        name: 'dS',
                        type: 'line',
                        data: series,
                        color: "darkblue",
                        states: states
                    }]
                });
            })
            .catch(error => {
                console.error(error);
            });

            // Rule curve chart
            fetch(url_rc)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                // Convert dates to JavaScript dates
                var data = JSON.parse(data);
    
                // Create Highcharts chart
                Highcharts.chart('chartRC', {
                    chart: {
                        zoomType: 'x',
                        panning: true,
                        panKey: 'shift',
                        style: {
                            color: "#000000"
                        }
                    },
                    title: false,
                    xAxis: [{
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        title: {
                            text: 'Month',
                            style: {
                                color: "#000000"
                            }
                        },
                        labels: {
                            format: '{value}',
                            style: {
                                color: "#000000"
                            }
                        },
                        minTickInterval: 0.01
                    }],
                    yAxis: {
                        title: {
                            useHTML: true,
                            enabled: true,
                            text: 'Specific storage (S/S<sub>max</sub>)',
                            style: {
                                color: "#000000"
                            }
                        },
                        labels: {
                            format: '{value:.2f}',
                            style: {
                                color: "#000000"
                            }	
                        },
                        minTickInterval: 0.01,
                    },
                    legend: {enabled:false},
                    series: [{
                        name: 'Specific Storage (S/Smax)',
                        data: data.map(d => d.value),
                        type: 'spline',
                        // type: 'line',
                        color: 'darkblue',
                        marker: {
                            enabled: true,
                            radius: 3		
                        },
                        states: states
                    }]
                })
            })
            .catch(error => {
                console.error(error);
            });
        });
    });
    
})
.catch(error => {
    console.error(error);
});

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
    color: "red",
    weight: 1.75,
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
    // onEachFeature: function(feature, reservoirsPolyLayer) {
    //     var reservoirs_name = feature.properties.Name;
    //     var country = feature.properties.Country;
    //     reservoirsPolyLayer.on('mouseover', function (e) {
    //         this.setStyle(highlightStyle);
    //         this.bindTooltip(reservoirs_name + ", " + country);
    //     }); 
    //     reservoirsPolyLayer.on('mouseout', function (e) {
    //         this.setStyle(reservoirsBoundaryStyle);
    //     });                       
    // } 
}); 

// Create mekong layer
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
}); 

var gms_rivers_layer = L.geoJson(gms_rivers_lm, {
    style: gmsriversStyle
}).addTo(map);

var main_rivers_layer = L.geoJson(main_rivers_lm, {
    style: mainriversStyle
});

var sub_basin_layer = L.geoJson(basinData, {
    style: basinStyle,
});

// document.querySelector('#reservoirs_poly_toggle').onclick = (function(){
//     if(this.checked) {
//         map.addLayer(reservoirs_poly_layer);
//     } else {
//         map.removeLayer(reservoirs_poly_layer);
//     }
// });
// document.querySelector('#mekong_toggle').onclick = (function(){
//     if(this.checked) {
//         map.addLayer(mekong_layer);
//     } else {
//         map.removeLayer(mekong_layer);
//     }
// });
// document.querySelector('#adm0_toggle').onclick = (function(){
//     if(this.checked) {
//         map.addLayer(adm0_layer);
//     } else {
//         map.removeLayer(adm0_layer);
//     }
// });
// document.querySelector('#gms_rivers_toggle').onclick = (function(){
//     if(this.checked) {
//         map.addLayer(gms_rivers_layer);
//     } else {
//         map.removeLayer(gms_rivers_layer);
//     }
// });
// document.querySelector('#main_rivers_toggle').onclick = (function(){
//     if(this.checked) {
//         map.addLayer(main_rivers_layer);
//     } else {
//         map.removeLayer(main_rivers_layer);
//     }
// });
// document.querySelector('#sub_basin_toggle').onclick = (function(){
//     if(this.checked) {
//         map.addLayer(sub_basin_layer);
//     } else {
//         map.removeLayer(sub_basin_layer);
//     }
// });

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var satellite = L.tileLayer('https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg', {
    attribution: '&copy; <a href="https://www.earthdata.nasa.gov/">earthdata</a> contributors'
});

var baseMaps = {
    "Street": basemap_layer,
    "Satellite": satellite,
    "OpenStreetMap": osm
};

var overlayMaps = {
    "Reservoirs Boundary": reservoirs_poly_layer,
    "Lower Mekong Basin": mekong_layer,
    // "Country Boundary": adm0_layer,
    "GMS Rivers": gms_rivers_layer,
    "Main Rivers": main_rivers_layer,
    "River Sub-basin": sub_basin_layer,
};

var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);