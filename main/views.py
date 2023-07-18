from django.utils import timezone
from django.shortcuts import render
from django.views.generic import TemplateView, DetailView
from django.views.generic.list import ListView
from .models import Team
from django.http import JsonResponse, HttpResponse
from datetime import date
import os
import pandas as pd
import json
from . core import MainGEEApi
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.clickjacking import xframe_options_exempt
import geopandas as gpd

class TeamDetailView(DetailView):
    model = Team
    template_name = 'team-details.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['now'] = timezone.now()
        return context

class TeamList(ListView):
    context_object_name = 'team_list'
    queryset = Team.objects.all().order_by('-updated_on')
    template_name = 'home.html'

class TechNotePage(TemplateView):
    template_name = "technical-note.html"

class AboutPage(TemplateView):
    template_name = "about.html"

class MapPage(TemplateView):
    template_name = "mapviewer.html"

class TablePage(TemplateView):
    template_name = "table.html"

class UserGuidePage(TemplateView):
    template_name = "user-guide.html"

# class IframePage(TemplateView):
#     template_name = "iframe.html"

class DisclaimerPage(TemplateView):
    template_name = "disclaimer.html"

# class MapPage2(TemplateView):
#     template_name = "map2.html"

@csrf_exempt
@xframe_options_exempt
def get_aec_chart(request):
    reservoir = request.GET.get('r_id') #request.GET.get['r_id']
    data_url = 'static/data/aec/'+reservoir+'.csv'
    df = pd.read_csv(data_url)
    data = df.to_json(orient='records')
    return JsonResponse(data, safe=False)

@csrf_exempt
@xframe_options_exempt
def get_inflow_chart(request):
    reservoir = request.GET.get('r_id') #request.GET.get['r_id']
    data_url = 'static/data/inflow/'+reservoir+'.csv'
    df = pd.read_csv(data_url)
    ndf = df.rename(columns={"date": "date", "inflow (m3/d)": "inflow"})
    ndf['inflow'] = ndf['inflow']/10000000000 # (10^10)
    ndf['inflow'] = ndf['inflow'].round(0)
    data = ndf.to_json(orient='records')
    return JsonResponse(data, safe=False)

@csrf_exempt
@xframe_options_exempt
def get_outflow_chart(request):
    reservoir = request.GET.get('r_id') #request.GET.get['r_id']
    data_url = 'static/data/outflow/'+reservoir+'.csv'
    df = pd.read_csv(data_url)
    ndf = df.rename(columns={"date": "date", "outflow (m3/d)": "outflow"})
    ndf['outflow'] = ndf['outflow']/1000000 # (10^6)
    ndf['outflow'] = ndf['outflow'].round(0)
    data = ndf.to_json(orient='records')
    return JsonResponse(data, safe=False)

@csrf_exempt
@xframe_options_exempt
def get_sarea_chart(request):
    reservoir = request.GET.get('r_id') #request.GET.get['r_id']
    data_url = 'static/data/sarea_tmsos/'+reservoir+'.csv'
    df = pd.read_csv(data_url)
    ndf = df.rename(columns={"date": "date", "area (km2)": "area"})
    ndf['area'] = ndf['area'].round(0)
    data = ndf.to_json(orient='records')
    return JsonResponse(data, safe=False)

@csrf_exempt
@xframe_options_exempt
def get_deltas_chart(request):
    reservoir = request.GET.get('r_id') #request.GET.get['r_id']
    data_url = 'static/data/dels/'+reservoir+'.csv'
    df = pd.read_csv(data_url)
    ndf = df.rename(columns={"date": "date", "dS (m3)": "dels"})
    ndf['dels'] = ndf['dels']/1000000 # (10^6)
    ndf['dels'] = ndf['dels'].round(2)
    data = ndf.to_json(orient='records')
    return JsonResponse(data, safe=False)

@csrf_exempt
@xframe_options_exempt
def get_rc_chart(request):
    reservoir = request.GET.get('r_id') 
    data_url = 'static/data/rc/'+reservoir+'.txt'
    df = pd.read_csv(data_url)
    ndf = df.rename(columns={"Month": "Month", "S/Smax": "value"})
    data = ndf.to_json(orient='records')
    return JsonResponse(data, safe=False)

def getValue(rid):
    reservoir = rid
    data_url = 'static/data/sarea_tmsos/'+reservoir+'.csv'
    df = pd.read_csv(data_url)
    df = df.rename(columns={"date": "date", "area (km2)": "area"}) 
    df['area'] = df['area'].fillna(0)
    sdf = df.tail(2)
    d1 = sdf.head(1)
    d2 = sdf.tail(1)
    # print(d1)
    # print(d2)
    value = d2['area'].values[0] - d1['area'].values[0]
    data = value.round(3)
    return data

@csrf_exempt
@xframe_options_exempt
def get_increase_decrease(request):
    data = []
    path = 'static/data/sarea_tmsos/'
    for file in os.listdir(path):
        # print(file)
        id = file.split(".csv")
        value = getValue(id[0])
        json = {
            'ID': id[0],
            "Value": value
        }
        data.append(json)
    # print(data)
    return JsonResponse(data, safe=False)

@csrf_exempt
@xframe_options_exempt
def get_reservoir(request):
    data = 'static/data/geojson/reservoirs_38.geojson'
    gdf = gpd.read_file(data)
    # Define the user-defined order
    user_defined_order = ['China', 'Laos', 'Thailand', 'Cambodia', 'Vietnam']

    # Convert the attribute column to a Categorical data type with the specified order
    gdf['COUNTRY'] = pd.Categorical(gdf['COUNTRY'], categories=user_defined_order, ordered=True)

    # Sort the GeoDataFrame based on the attribute column
    sorted_gdf = gdf.sort_values(by='COUNTRY')
    # gdf = gdf.sort_values('COUNTRY')
    # print(sorted_gdf)
    data = sorted_gdf.to_json()
    return JsonResponse(data, safe=False)

@csrf_exempt
@xframe_options_exempt
def get_reservoir_info(request):
    reservoir = request.GET.get('r_id') 
    file = 'static/data/reservoirs_info.csv'
    df = pd.read_csv(file)
    df = df[["ID","NAME", "COUNTRY", "LATITUDE", "LONGITITUDE", "STATUS", "YEAR", "AREA_SKM","CAP_MCM","DEPTH_M","CATCH_SKM","ELEV_MASL","DAM_LEN_M"]]
    df = df.loc[df['ID'] == reservoir]
    data = df.to_json(orient='records')
    print(data)
    return JsonResponse(data, safe=False)

@csrf_exempt
@xframe_options_exempt
def get_precip(request):
    reservoir = request.GET.get('r_id') #request.GET.get['r_id']
    data_url = 'static/data/precip/'+reservoir+'.txt'
    df = pd.read_csv(data_url)
    ndf = df.rename(columns={"Date": "date", "Precipitation(mm)": "precip"})
    ndf['precip'] = ndf['precip'].round(3)
    data = ndf.to_json(orient='records')
    return JsonResponse(data, safe=False)