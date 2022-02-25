from django.utils import timezone
from django.shortcuts import render
from django.views.generic import TemplateView, DetailView
from django.views.generic.list import ListView
from .models import Team
from django.http import JsonResponse
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

    # queryset = team.objects.all()
    # template_name = 'home.html'

    # model = team

    # def get_context_data(self, **kwargs):
    #     context = super(TeamList, self).get_context_data(**kwargs)
    #     context['now'] = timezone.now()
    #     return context

# class HomePage(TemplateView):
#     template_name = "home.html"

class AboutMRCPage(TemplateView):
    template_name = "about-mrc.html"

class AboutPage(TemplateView):
    template_name = "about.html"

class MapPage(TemplateView):
    template_name = "map.html"

class UserGuidePage(TemplateView):
    template_name = "user-guide.html"

class TestIframePage(TemplateView):
    template_name = "iframe.html"

class DisclaimerPage(TemplateView):
    template_name = "disclaimer.html"

