import ee, os
ee.Initialize()

allreservoirs = ee.FeatureCollection("users/kamalhosen/reservoirs");
srtm = ee.Image("USGS/SRTMGL1_003");

reservoirids = [1,2,3,4,5,6,7,8,9,10,11,12,13]

for selreservoir in reservoirids:
    if os.path.exists('./static/data/test/aec/' + str(selreservoir) + '.txt') == False:
    	selected = allreservoirs.filter(ee.Filter.equals('id', selreservoir));
    	rarea = selected.geometry().area().divide(1000000)
    	areaval = rarea.getInfo()
    	if areaval <= 2.0:
    		bufferscale = 1000
    	elif areaval >2.0 and areaval <=10.0:
    		bufferscale = 2000
    	elif areaval >10.0 and areaval <=50.0:
    		bufferscale = 3000
    	elif areaval >50.0 and areaval <=200.0:
    		bufferscale = 4000
    	elif areaval >200.0 and areaval <=500.0:
    		bufferscale = 5000
    	elif areaval >500.0:
    		bufferscale = 10000
    
    	polygon = selected.geometry().buffer(bufferscale);
    	
    	print(selreservoir, areaval, bufferscale, polygon.area().divide(1000000).getInfo())
        
    	dem = srtm.clip(polygon)
    	
    	rarea = selected.geometry().area().divide(1000000)
    	elevationdata =  ee.Dictionary(
            dem.reduceRegion(
                reducer = ee.Reducer.frequencyHistogram(), 
                geometry = polygon, 
                scale = 30,
                maxPixels = 10e9
            ).get("elevation"))
    	
    	elevationdata = elevationdata.getInfo()
    	
    	# elevationdata = sorted(elevationdata.keys())
    	
    	ppp = sorted(int(x) for x in elevationdata.keys())
    	accarea = 0
    	strtxt = "ID, Elevation,Area,CumArea"
    	for xxx in ppp:
    		accarea = accarea + elevationdata[str(xxx)]*30.0*30.0/1000000.0
    		strtxt = strtxt + '\n' + str(selreservoir)+',' + str(xxx) + ',' + str(elevationdata[str(xxx)]) + ',' + '{0:.2f}'.format(accarea)
    	
    	with open('./static/data/test/aec/' + str(selreservoir) + '.txt', 'w+') as txt:
    		txt.write(strtxt)
