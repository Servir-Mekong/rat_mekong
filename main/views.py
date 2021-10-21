from django.shortcuts import render
from django.views.generic import TemplateView

class HomePage(TemplateView):
    template_name = "home.html"

class MapPage(TemplateView):
    template_name = "map.html"

class AboutPage(TemplateView):
    template_name = "about.html"

class UserGuidePage(TemplateView):
    template_name = "user-guide.html"

class TestIframePage(TemplateView):
    template_name = "iframe.html"