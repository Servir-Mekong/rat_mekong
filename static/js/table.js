/** 
    ** Table Tab Scripts **
*/

$(document).ready(function() {
    $('#aec').DataTable( {
        "ajax": {
            "url": "/static/data/table_data/aec_all.json",
            "dataSrc": "",
            // deferRender: true,
            // clear: true,
            // destroy: true,
            //cache: false,
        },
        dom: 'Bfrtip',
        buttons: [
            'pageLength', 'print', 'excel', 'csv', 'pdf'
        ],
        columns: [
            { "data": "country" },
            { "data": "river" },
            { "data": "name" },
            { "data": "Elevation" },
            { "data": "CumArea" },                                  
        ],
        order: [[ 0, 'asc'], [ 1, 'asc'], [ 2, 'asc']]
    });

    $('#deltas').DataTable( {
        "ajax": {
            "url": "/static/data/table_data/deltas_all.json",
            "dataSrc": ""
        },
        dom: 'Bfrtip',
        buttons: [
            'pageLength', 'print', 'excel', 'csv', 'pdf'
        ],
        columns: [
            { "data": "country" },
            { "data": "river" },
            { "data": "name" },
            { "data": "date" },
            { "data": "dS" },                                  
        ],
        columnDefs: [ { type: 'date', 'targets': [3] } ],
        order: [[ 0, 'asc'], [ 1, 'asc'], [ 2, 'asc'], [ 3, 'desc' ]]
    });

    $('#inflow').DataTable( {
        "ajax": {
            "url": "/static/data/table_data/inflow_all.json", //  ajax/inflowdata/
            "dataSrc": "",
            // deferRender: true,
            // clear: true,
            // destroy: true,
            // cache: false,
        },
        serverSide: true,
        dom: 'Bfrtip',
        buttons: [
            'pageLength', 'print', 'excel', 'csv', 'pdf'
        ],
        columns: [
            { "data": "country" },
            { "data": "river" },
            { "data": "name" },
            { "data": "date" },
            { "data": "streamflow" },                                  
        ],
        columnDefs: [ { type: 'date', 'targets': [3] } ],
        order: [[ 0, 'asc'], [ 1, 'asc'], [ 2, 'asc'], [ 3, 'desc' ]]
    });

    $('#outflow').DataTable( {
        "ajax": {
            "url": "/static/data/table_data/outflow_all.json",
            "dataSrc": "",
            // deferRender: true,
            // clear: true,
            // destroy: true
        },
        dom: 'Bfrtip',
        buttons: [
            'pageLength', 'print', 'excel', 'csv', 'pdf'
        ],
        columns: [
            { "data": "country" },
            { "data": "river" },
            { "data": "name" },
            { "data": "Date" },
            { "data": "Streamflow" },                                  
        ],
        columnDefs: [ { type: 'date', 'targets': [3] } ],
        order: [[ 0, 'asc'], [ 1, 'asc'], [ 2, 'asc'], [ 3, 'desc' ]]
    });

    $('#surface_area').DataTable( {
        "ajax": {
            "url": "/static/data/table_data/sarea_all.json",
            "dataSrc": ""
        },
        dom: 'Bfrtip',
        buttons: [
            'pageLength', 'print', 'excel', 'csv', 'pdf'
        ],
        columns: [
            { "data": "country" },
            { "data": "river" },
            { "data": "name" },
            { "data": "mosaic_enddate" },
            { "data": "corrected_area" },                                  
        ],
        columnDefs: [ { type: 'date', 'targets': [3] } ],
        order: [[ 0, 'asc'], [ 1, 'asc'], [ 2, 'asc'], [ 3, 'desc' ]]
    });

    $('#rcurve').DataTable( {
        "ajax": {
            "url": "/static/data/table_data/rcurve_all.json",
            "dataSrc": ""
        },
        dom: 'Bfrtip',
        buttons: [
            'pageLength', 'print', 'excel', 'csv', 'pdf'
        ],
        columns: [
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

var aec_table = document.getElementById('aec_table');
var deltas_table = document.getElementById('deltas_table');
var inflow_table = document.getElementById('inflow_table');
var outflow_table = document.getElementById('outflow_table');
var sarea_table = document.getElementById('sarea_table');
var rcurve_table = document.getElementById('rcurve_table');

// Filter 
$(document).ready(function() {
    var dateFilterRow = document.getElementById('dateFilterRow');
    var aecTable = $('#aec').DataTable();  
    var deltasTable = $('#deltas').DataTable();  
    var inflowTable = $('#inflow').DataTable(); 
    var outflowTable = $('#outflow').DataTable(); 
    var sareaTable = $('#surface_area').DataTable();  
    var rcurveTable = $('#rcurve').DataTable(); 

    var getSelectedValue = document.getElementById('reservoir_datasets');
    //console.log(getSelectedValue)

    if (getSelectedValue.value == "AEC"){
        $('#select_country').on('change', function () {
            aecTable.columns(0).search( this.value ).draw();
        });
        $('#select_river_basin').on('change', function () {
            aecTable.columns(1).search( this.value ).draw();
        });
        $('#reservoir').on('change', function () {
            var selectedReservoir = this.value;
            if (selectedReservoir == selectedReservoir){
                aecTable.columns(2).search( this.value ).draw();
            }
        });
        // Hide date filter row
        dateFilterRow.style.display = "none";
    } 

    $("#reservoir_datasets").on('change', function(){
        var selectedValue = this.value;
        if (selectedValue == 'AEC'){
            dateFilterRow.style.display = "none";
            aec_table.style.display = "block";
            var getSelectedCountry = document.getElementById('select_country');
            // var getSelectedRiverBasin = document.getElementById('select_river_basin');
            // getSelectedRiverBasin.value = "";
            // getSelectedRiverBasin.text = "All";
            
            // Filter by country
            aecTable.columns(0).search( getSelectedCountry.value ).draw();
            $('#select_country').on('change', function () {
                aecTable.columns(0).search( this.value ).draw();
            });
            // Filter by river basin
            $('#select_river_basin').on('change', function () {
                aecTable.columns(1).search( this.value ).draw();
            });
            // Filter by reservoir
            $('#reservoir').on('change', function () {     
                aecTable.columns(2).search( this.value ).draw();              
            });
        } else {
            //dateFilterRow.style.display = "block";
            aec_table.style.display = "none";
        }

        if (selectedValue == 'Storage Change'){
            dateFilterRow.style.display = "block";
            deltas_table.style.display = "block";
            var getSelectedCountry = document.getElementById('select_country');
            var getSelectedRiverBasin = document.getElementById('select_river_basin');
            
            // Filter by country
            deltasTable.columns(0).search( getSelectedCountry.value ).draw();
            $('#select_country').on('change', function () {
                deltasTable.columns(0).search( this.value ).draw();
            });
            // Filter by river basin
            $('#select_river_basin').on('change', function () {
                deltasTable.columns(1).search( this.value ).draw();
            });
            // Filter by reservoir
            $('#reservoir').on('change', function () {     
                deltasTable.columns(2).search( this.value ).draw();           
            });

            var minDate;
            var maxDate;
            
            // Custom filtering function which will search data in column four between two values
            $.fn.dataTable.ext.search.push(
                function( settings, data, dataIndex ) {
                    var min = minDate.val();
                    var max = maxDate.val();
                    var date = new Date( data[3] );
            
                    if (
                        ( min === null && max === null ) ||
                        ( min === null && date <= max ) ||
                        ( min <= date   && max === null ) ||
                        ( min <= date   && date <= max )
                    ) {
                        return true;
                    }
                    return false;
                }
            );
            
            $(document).ready(function() {
                // Create date inputs
                minDate = new DateTime($('#min'), {
                    // format: 'MMMM Do YYYY'
                    format: 'M/D/YYYY'
                });
                maxDate = new DateTime($('#max'), {
                    //format: 'MMMM Do YYYY'
                    format: 'M/D/YYYY'
                });
            
                // DataTables initialisation
                //var table = $('#surface_area').DataTable();
            
                // Refilter the table
                $('#min, #max').on('change', function () {
                    deltasTable.draw();
                });
            });

        } else {
            deltas_table.style.display = "none";
        }

        if (selectedValue == 'Inflow'){
            dateFilterRow.style.display = "block";
            inflow_table.style.display = "block";
            var getSelectedCountry = document.getElementById('select_country');
            var getSelectedRiverBasin = document.getElementById('select_river_basin');
            
            // Filter by country
            inflowTable.columns(0).search( getSelectedCountry.value ).draw();
            $('#select_country').on('change', function () {
                inflowTable.columns(0).search( this.value ).draw();
            });
            // Filter by river basin
            $('#select_river_basin').on('change', function () {
                inflowTable.columns(1).search( this.value ).draw();
            });
            // Filter by reservoir
            $('#reservoir').on('change', function () {     
                inflowTable.columns(2).search( this.value ).draw();              
            });   
            
            var minDate;
            var maxDate;
            
            // Custom filtering function which will search data in column four between two values
            $.fn.dataTable.ext.search.push(
                function( settings, data, dataIndex ) {
                    var min = minDate.val();
                    var max = maxDate.val();
                    var date = new Date( data[3] );
            
                    if (
                        ( min === null && max === null ) ||
                        ( min === null && date <= max ) ||
                        ( min <= date   && max === null ) ||
                        ( min <= date   && date <= max )
                    ) {
                        return true;
                    }
                    return false;
                }
            );
            
            $(document).ready(function() {
                // Create date inputs
                minDate = new DateTime($('#min'), {
                    // format: 'MMMM Do YYYY'
                    format: 'M/D/YYYY'
                });
                maxDate = new DateTime($('#max'), {
                    //format: 'MMMM Do YYYY'
                    format: 'M/D/YYYY'
                });
            
                // DataTables initialisation
                //var table = $('#surface_area').DataTable();
            
                // Refilter the table
                $('#min, #max').on('change', function () {
                    inflowTable.draw();
                });
            });

        } else {
            inflow_table.style.display = "none";
        }

        if (selectedValue == 'Outflow'){
            dateFilterRow.style.display = "block";
            outflow_table.style.display = "block";
            var getSelectedCountry = document.getElementById('select_country');
            var getSelectedRiverBasin = document.getElementById('select_river_basin');
            
            // Filter by country
            outflowTable.columns(0).search( getSelectedCountry.value ).draw();
            $('#select_country').on('change', function () {
                outflowTable.columns(0).search( this.value ).draw();
            });
            // Filter by river basin
            $('#select_river_basin').on('change', function () {
                outflowTable.columns(1).search( this.value ).draw();
            });
            // Filter by reservoir
            $('#reservoir').on('change', function () {     
                outflowTable.columns(2).search( this.value ).draw();              
            });

            var minDate;
            var maxDate;
            
            // Custom filtering function which will search data in column four between two values
            $.fn.dataTable.ext.search.push(
                function( settings, data, dataIndex ) {
                    var min = minDate.val();
                    var max = maxDate.val();
                    var date = new Date( data[3] );
            
                    if (
                        ( min === null && max === null ) ||
                        ( min === null && date <= max ) ||
                        ( min <= date   && max === null ) ||
                        ( min <= date   && date <= max )
                    ) {
                        return true;
                    }
                    return false;
                }
            );
            
            $(document).ready(function() {
                // Create date inputs
                minDate = new DateTime($('#min'), {
                    // format: 'MMMM Do YYYY'
                    format: 'M/D/YYYY'
                });
                maxDate = new DateTime($('#max'), {
                    //format: 'MMMM Do YYYY'
                    format: 'M/D/YYYY'
                });
            
                // DataTables initialisation
                //var table = $('#surface_area').DataTable();
            
                // Refilter the table
                $('#min, #max').on('change', function () {
                    outflowTable.draw();
                });
            });
        } else {
            outflow_table.style.display = "none";
        }

        if (selectedValue == 'Surface Area'){
            dateFilterRow.style.display = "block";
            sarea_table.style.display = "block";
            var getSelectedCountry = document.getElementById('select_country');
            var getSelectedRiverBasin = document.getElementById('select_river_basin');
            
            // Filter by country
            sareaTable.columns(0).search( getSelectedCountry.value ).draw();
            $('#select_country').on('change', function () {
                sareaTable.columns(0).search( this.value ).draw();
            });
            // Filter by river basin
            $('#select_river_basin').on('change', function () {
                sareaTable.columns(1).search( this.value ).draw();
            });
            // Filter by reservoir
            $('#reservoir').on('change', function () {     
                sareaTable.columns(2).search( this.value ).draw();              
            });

            var minDate;
            var maxDate;
            
            // Custom filtering function which will search data in column four between two values
            $.fn.dataTable.ext.search.push(
                function( settings, data, dataIndex ) {
                    var min = minDate.val();
                    var max = maxDate.val();
                    var date = new Date( data[3] );
            
                    if (
                        ( min === null && max === null ) ||
                        ( min === null && date <= max ) ||
                        ( min <= date   && max === null ) ||
                        ( min <= date   && date <= max )
                    ) {
                        return true;
                    }
                    return false;
                }
            );
            
            $(document).ready(function() {
                // Create date inputs
                minDate = new DateTime($('#min'), {
                    // format: 'MMMM Do YYYY'
                    format: 'M/D/YYYY'
                });
                maxDate = new DateTime($('#max'), {
                    //format: 'MMMM Do YYYY'
                    format: 'M/D/YYYY'
                });
            
                // DataTables initialisation
                //var table = $('#surface_area').DataTable();
            
                // Refilter the table
                $('#min, #max').on('change', function () {
                    sareaTable.draw();
                });
            });
        } else {
            sarea_table.style.display = "none";
        }

        if (selectedValue == 'Rule Curve'){
            dateFilterRow.style.display = "none";
            rcurve_table.style.display = "block";
            var getSelectedCountry = document.getElementById('select_country');
            var getSelectedRiverBasin = document.getElementById('select_river_basin');
            
            // Filter by country
            rcurveTable.columns(0).search( getSelectedCountry.value ).draw();
            $('#select_country').on('change', function () {
                rcurveTable.columns(0).search( this.value ).draw();
            });
            // Filter by river basin
            $('#select_river_basin').on('change', function () {
                rcurveTable.columns(1).search( getSelectedRiverBasin.value ).draw();
            });
            // Filter by reservoir
            $('#reservoir').on('change', function () {     
                rcurveTable.columns(2).search( this.value ).draw();              
            });
            // dateFilterRow.style.display = "none";
        } else {
            rcurve_table.style.display = "none";
        }
    }); 
});

$(document).ready(function() {
    $("#rsvName").on('change', function(){
        var inflowData;
        var outflowData;

        var reservoirValue = this.value;
        var reservoirName = $("#rsvName option:selected").text();

        //console.log(reservoirName);
        //console.log(reservoirValue);

        if (reservoirName == reservoirName){
            $.ajax({
                type: "GET",
                url: "/static/data/map_data/inflow/"+ reservoirValue +".txt",
                async: false,
                success: function(data){
                    inflowData = data;
                }
            });
            $.ajax({
                type: "GET",
                url: "/static/data/map_data/outflow/"+ reservoirValue +".txt",
                async: false,
                success: function(data){
                    outflowData = data;
                }
            });
        }
        else {
            "No Data Found"
        }

        var inflow = []
        var outflow = []
        var inflowlines = inflowData.split('\n');
        for (i = 1; i < inflowlines.length; i++) {
            var items = inflowlines[i].split(',');
            inflow.push([new Date(items[0]).getTime(), +items[1]]);
        }

        // data = outflowdata();
        var outflowlines = outflowData.split('\n');
        for (i = 1; i < outflowlines.length; i++) {
        var items = outflowlines[i].split(',');
            outflow.push([new Date(items[0]).getTime(), +items[1]]);
        }
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        var chart = Highcharts.chart('chartDiv', {
            chart: {
                zoomType: 'x',
                panning: true,
                panKey: 'shift',
                style: {
                    fontFamily: 'serif',
                    fontSize: '12px',
                    color: "#000000"
                }
            },
            title: {
                text: "Comparison of " + reservoirName + " Reservoir Inflow-Outflow",
                style: {
                    font: '20px bold Times New Roman, sans-serif',
                    color: "#000000"
                }
            },
            xAxis: {
                type: 'datetime',
                title: {
                    text: 'Year',
                    style: {
                        font: '16px bold Times New Roman, sans-serif',
                        color: "#000000"
                    }
                },
                labels: {
                    style: {
                        font: '16px Times New Roman, sans-serif',
                        color: "#000000"
                    }
                }
            },
            yAxis: {
                title: {
                    text: 'Flow (cumecs)',
                    style: {
                        font: '16px bold Times New Roman, sans-serif',
                        color: "#000000"
                    }
                },
                labels: {
                    format: '{value:.1f}',
                    style: {
                        font: '16px Times New Roman, sans-serif',
                        color: "#000000"
                    }				
                },
                minTickInterval: 0.1
            },
            tooltip: {
                xDateFormat: '%d-%m-%Y',
                crosshairs: true,
                shared: true,
                valueDecimals: 1,
                valueSuffix: "cumecs"
            },
            legend: {},
            series: [
                {
                    name: 'Reservoir Inflow',
                    data: inflow,
                    type: 'spline',
                    marker: {
                        enabled: false
                    },
                    color:'#31a354',
                    zIndex: 1,
                    states: {
                        hover: {			
                        lineWidthPlus: 0
                        }
                    }
                },

                {
                    name: 'Reservoir Outflow (including diversion)',
                    data: outflow,
                    type: 'spline',
                    marker: {
                        enabled: false
                    },
                    color:'#FF5733',
                    zIndex: 1,
                    states: {
                        hover: {			
                        lineWidthPlus: 0
                        }
                    }
                },
            ]
        });
    }); 
});

var load = document.querySelector("#loader");

function loadfun() {
    load.style.display = 'none';
}
