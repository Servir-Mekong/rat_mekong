'''
Created on Aug 11, 2019
@author: nbiswas
'''
# from osgeo import ogr

import ee
import os
ee.Initialize()


allreservoirs = ee.FeatureCollection("users/kamalhosen/reservoirs");

L8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_RT")

# geometry = table2
Date_Start = ee.Date('2013-01-01');
Date_End = ee.Date('2021-09-30');
cloud_thresh = 20;
        
def clipimage(img):
    return img.clip(bgeometry);


def getQABits(image, start, end, newName):
    #Compute the bits we need to extract.
    pattern = 0;
    for i in range(start, end+1):
       pattern += 2**i

    #Return a single band image of the extracted QA bits, giving the band a new name.
    return image.select([0], [newName]).bitwiseAnd(pattern).rightShift(start);

  
def cloud_shadows(image):
    # Select the QA band.
    QA = image.select(['BQA'])
    # Get the internal_cloud_algorithm_flag bit.
    return getQABits(QA, 7,8, 'Cloud_shadows').eq(1)
    
def clouds(image):
    QA = image.select(['BQA'])
    # Get the internal_cloud_algorithm_flag bit.
    return getQABits(QA, 4,4, 'Cloud').eq(0)

def maskClouds(image):
    cs = cloud_shadows(image)
    c = clouds(image)
    image = image.updateMask(cs)
    return image.updateMask(c)


def l8ndwi(img):
    ndwi = img.normalizedDifference(['B3', 'B5']).rename('NDWI');
    return img.addBands(ndwi);

def l8mndwi(img):
    ndwi = img.normalizedDifference(['B3', 'B6']).rename('MNDWI');
    return img.addBands(ndwi);

 # Calculation of WI
def l8wi(img):
    wi = img.expression(
    '1.7204 + 171 * GREEN + 3 * RED - 70 * NIR - 45 * SWIR1 - 71 * SWIR2', {
      'GREEN': img.select('B3'),
      'RED': img.select('B4'),
      'NIR': img.select('B5'),
      'SWIR1':img.select('B6'),
      'SWIR2':img.select('B7')
    }).rename('WI');
    return img.addBands(wi)

def l8aweinsh(img):
    aweinsh = img.expression(
    '4 * (GREEN - SWIR1) - (0.25 * NIR + 2.75 * SWIR2)', {
      'GREEN': img.select('B3'),
      'NIR': img.select('B5'),
      'SWIR1':img.select('B6'),
      'SWIR2':img.select('B7')
    }).rename('AWEINSH');
    return img.addBands(aweinsh)

def l8aweish(img):
    aweish = img.expression(
    'BLUE + 2.5 * GREEN - 1.5 * (NIR + SWIR1) - 0.25 * SWIR2', {
      'BLUE': img.select('B3'),
      'GREEN': img.select('B3'),
      'NIR': img.select('B5'),
      'SWIR1':img.select('B6'),
      'SWIR2':img.select('B7')
    }).rename('AWEISH');
    return img.addBands(aweish)

def tareadate(img):
    area = img.gte(-1).multiply(ee.Image.pixelArea()).divide(1e6).reduceRegion(
      reducer = ee.Reducer.sum(), 
      geometry = bgeometry, 
      scale = calcScale,
      maxPixels = 1e10
    ).get('B3')
    return img.set('rarea', area).set('date', ee.Date(img.get('system:time_start')).format('YYYY-MM-dd'))

def ndwiarea(img):
    area = img.gt(0).multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion(
      reducer = ee.Reducer.sum(), 
      geometry = bgeometry, 
      scale = calcScale,
      maxPixels = 10e9
    ).get('NDWI');
    return img.set('ndwi', area)
        
def mndwiarea(img):
    area = img.gt(0).multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion(
      reducer = ee.Reducer.sum(), 
      geometry = bgeometry, 
      scale = calcScale,
      maxPixels = 10e9
    ).get('MNDWI')
    return img.set('mndwi', area)

def wiarea(img):
    area = img.gt(0).multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion(
      reducer = ee.Reducer.sum(), 
      geometry = bgeometry, 
      scale = calcScale,
      maxPixels = 10e9
    ).get('WI')
    return img.set('wi', area)

def aweisharea(img):
    area = img.gt(0).multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion(
      reducer = ee.Reducer.sum(), 
      geometry = bgeometry, 
      scale = calcScale,
      maxPixels = 10e9
    ).get('AWEISH')
    return img.set('aweish', area)

def aweinsharea(img):
    area = img.gt(0).multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion(
      reducer = ee.Reducer.sum(), 
      geometry = bgeometry, 
      scale = calcScale,
      maxPixels = 10e9
    ).get('AWEINSH')
    return img.set('aweinsh', area)


def extentseries(reservoir):
    rarea = bgeometry.area().divide(1000000)

    l8images = L8.filterDate(Date_Start,Date_End).filterBounds(bgeometry)
    clipl8 = l8images.map(clipimage)
    maskl8 = clipl8.map(maskClouds)
    bandl8 = maskl8.select(["B2", "B3","B4","B5","B6","B7"]);


    l8areas = bandl8.map(tareadate)
    l8areasp = l8areas.filter(ee.Filter.gt('rarea', rarea.getInfo()*0.80));
    
    ndwil8 = l8areasp.map(l8ndwi);
    mndwil8 = ndwil8.map(l8mndwi);
    #l8images = l8images.map(l8wi);
#    l8images = l8images.map(l8aweinsh);
    #l8images = l8images.map(l8aweish);
        
    # calculate ndwi for each image in imagecollection
    areandwil8 = mndwil8.map(ndwiarea);
    areaalll8 = areandwil8.map(mndwiarea);
#    l8images = l8images.map(wiarea);
#    l8images = l8images.map(aweisharea);
#    mosaics = l8images.map(aweinsharea)
    mosaics = ee.ImageCollection(areaalll8);
    mosaic = mosaics.sort('system:time_start', True);
    list = mosaic.reduceColumns(ee.Reducer.toList(4), ['date', 'rarea','ndwi','mndwi']).get('list');
#    print list.getInfo();
    return list.getInfo();
    
reservoirids = [1,2,3,4,5,6,7,8,9,10,11,12,13]

for reservoirid in reservoirids:
    if not os.path.exists('./static/data/sarea/L8/' + str(reservoirid) + '.txt'):
        open('./static/data/sarea/L8/' + str(reservoirid) + '.txt', 'w+').close()
        series = "Date,Rarea,NDWI,MNDWI"
        selected = allreservoirs.filter(ee.Filter.equals('id', reservoirid))
        rgeometry = selected.geometry()
        aarea = rgeometry.area().divide(1000000)
        areaval = aarea.getInfo()
        bgeometry = []
        if areaval <= 2.0:
    	    bgeometry = selected.geometry().buffer(1000)
        elif areaval >2.0 and areaval <=10.0:
    	    bgeometry = selected.geometry().buffer(2000)
        elif areaval >10.0 and areaval <=50.0:
    	    bgeometry = selected.geometry().buffer(3000)
        elif areaval >50.0 and areaval <=200.0:
    	    bgeometry = selected.geometry().buffer(4000)
        elif areaval >200.0:
    	    bgeometry = selected.geometry().buffer(5000);
    
        
        rarea = bgeometry.area().divide(1000000).getInfo()
        if rarea <= 50.0:
            calcScale = 30.0
        elif rarea > 50.0 and rarea <= 200:
            calcScale = 50.0
        elif rarea > 200.0 and rarea <= 500:
            calcScale = 100.0
        elif rarea > 500.0 and rarea <= 2000:
            calcScale = 200.0
        elif rarea > 2000.0:
            calcScale = 500.0
            
        print (str(reservoirid) + ',Reservoir Area: ' + str(areaval) + ',Reservoir Buffer Area: ' + str(rarea) + ',Computation Scale: ' + str(calcScale))
        
        try:        
            ppp = extentseries(selected);
            for xxx in ppp:
                series = series + '\n' + xxx[0] + "," + str(xxx[1]) + "," + str(xxx[2])+ "," +str(xxx[3])
                with open('./static/data/sarea/L8/' + str(reservoirid) + '.txt', 'w+') as txt:
                    txt.write(series)
            print ('Done with ' + str(reservoirid))
        except:
            print ('problem with ' + str(reservoirid))
            continue
    else:
        print (str(reservoirid) + " already calculated.")
 