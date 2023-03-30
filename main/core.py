import os
import ee
import datetime
# ee.Initialize()
from django.conf import settings

class MainGEEApi():

    # ===================== Precipitation Map ===================== */

    def getTileLayerUrl(self, ee_image_object):
        map_id = ee.Image(ee_image_object).getMapId()
        tile_url_template = str(map_id['tile_fetcher'].url_format)
        return tile_url_template

    def getPrecipMap(self, date):
        sub_basin = ee.FeatureCollection('projects/servir-mekong/Boundary/mekong_sub_basin')
        imerg_ic = ee.ImageCollection("NASA/GPM_L3/IMERG_V06")
        # now = datetime.datetime.now()
        format = '%Y-%m-%d'
        now = datetime.datetime.strptime(date, format)
        lastweek = now - datetime.timedelta(days=7)
        filter_ic = imerg_ic.filter(ee.Filter.date(lastweek, now))
        # Select the max precipitation and mask out low precipitation values.
        precipitation = filter_ic.select('precipitationCal').max()
        mask = precipitation.gt(0.5)
        precipitation = precipitation.updateMask(mask).clip(sub_basin)

        palette = [
            '000096','0064ff', '00b4ff', '33db80', '9beb4a',
            'ffeb00', 'ffb300', 'ff6400', 'eb1e00', 'af0000'
        ]
        precipMap = self.getTileLayerUrl(precipitation.visualize(palette=palette, min=0.0, max=15.0))
        return precipMap