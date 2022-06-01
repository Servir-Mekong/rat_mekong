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

class TeamDetailView(DetailView):
    model = Team
    template_name = 'team-details.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['now'] = timezone.now()
        return context


class TeamList(ListView):
    context_object_name = 'team_list'
    queryset = Team.objects.all()
    template_name = 'home.html'

class AboutMRCPage(TemplateView):
    template_name = "about-mrc.html"

class AboutPage(TemplateView):
    template_name = "about.html"

class MapPage(TemplateView):
    template_name = "map.html"

class TablePage(TemplateView):
    template_name = "table.html"

class UserGuidePage(TemplateView):
    template_name = "user-guide.html"

class IframePage(TemplateView):
    template_name = "iframe.html"

class DisclaimerPage(TemplateView):
    template_name = "disclaimer.html"

def getChartData(request):
    reservoir = "Lam_Pao"
    start_from = 2015
    end_to = 2020
    data = pd.read_csv("static/data/map_data/outflow/"+reservoir+".txt")
    filtered_data = data.loc[(pd.DatetimeIndex(data["Date"]).year >= start_from) & (pd.DatetimeIndex(data["Date"]).year <= end_to)]
    # fdata = filtered_data.to_json()
    # return JsonResponse(fdata, safe=False)
    # return HttpResponse(filtered_data, content_type='text/plain')
    filename = "static/data/map_data/dummy.txt"
    content = filtered_data
    response = HttpResponse(content, content_type='text/plain')
    response['Content-Disposition'] = 'attachment; filename={0}'.format(filename)
    return response

def getInflow(request):
    data_url = "static/data/table_data/merge/inflow_all.txt"
    data = pd.read_csv(data_url)
    fdata = data.to_json()
    return JsonResponse(fdata, safe=False)
