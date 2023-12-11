from rest_framework.decorators import api_view, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import APIKey 
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import InflowSerializer, OutflowSerializer
import pandas as pd 
from django.conf import settings
import os

class ReservoirViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def getValue(self, rid):
        reservoir = rid
        data_url = 'static/data/sarea_tmsos/'+reservoir+'.csv'
        df = pd.read_csv(data_url)
        df = df.rename(columns={"date": "date", "area (km2)": "area"}) 
        df['area'] = df['area'].fillna(0)
        sdf = df.tail(2)
        d1 = sdf.head(1)
        d2 = sdf.tail(1)
        value = d2['area'].values[0] - d1['area'].values[0]
        data = value.round(3)
        return data

    def _get_increase_decrease(self):
        data = []
        path = 'static/data/sarea_tmsos/'  # Adjust the path as needed
        for file in os.listdir(path):
            id = file.split(".csv")[0]
            value = self.getValue(id)  # Ensure getValue is defined or imported
            json = {
                'ID': id,
                "Value": value
            }
            data.append(json)
        return Response(data)

    def _get_data(self, reservoir, data_type):
        if data_type == 'inflow':
            data_url = f"{settings.RESERVOIR_DATA_PATH}/inflow/{reservoir}.csv" #'static/data/inflow/' + reservoir + '.csv'
            divisor = 10**10
        elif data_type == 'outflow':
            data_url = f"{settings.RESERVOIR_DATA_PATH}/outflow/{reservoir}.csv" #'static/data/outflow/' + reservoir + '.csv'
            divisor = 10**6
        else:
            return Response({'error': 'Invalid data_type'}, status=400)

        df = pd.read_csv(data_url)
        ndf = df.rename(columns={"date": "date", f"{data_type} (m3/d)": data_type})
        ndf[data_type] = ndf[data_type] / divisor
        ndf[data_type] = ndf[data_type].round(0)
        data = ndf.to_json(orient='records')
        return Response(data)

    def _get_reservoir_info(self, reservoir): 
        file = 'static/data/reservoirs_info.csv'
        df = pd.read_csv(file)
        df = df[["ID","NAME", "COUNTRY", "LATITUDE", "LONGITITUDE", "STATUS", "YEAR", "AREA_SKM","CAP_MCM","DEPTH_M","CATCH_SKM","ELEV_MASL","DAM_LEN_M"]]
        df = df.loc[df['ID'] == reservoir]
        data = df.to_json(orient='records')
        return Response(data)
    
    @action(detail=False, methods=['get'])
    def data(self, request):
        data_type = request.GET.get('action') 
        reservoir = request.GET.get('r_id')
        
        if data_type == 'increase_decrease':
            return self._get_increase_decrease()
        elif data_type == 'get-reservoir-info':
            return self._get_reservoir_info(reservoir)
        else:
            return self._get_data(reservoir, data_type)