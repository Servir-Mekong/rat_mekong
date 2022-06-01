from django.urls import path
from . import views
from django.conf.urls import include, url

urlpatterns = [
    #path('', views.HomePage.as_view(), name='home'),
    path('', views.TeamList.as_view(), name='home'),
    path('about-mrc/', views.AboutMRCPage.as_view(), name='about-mrc'),
    path('about/', views.AboutPage.as_view(), name='about'),
    path('map/', views.MapPage.as_view(), name='map'),
    path('table/', views.TablePage.as_view(), name='table'),
    path('user-guide/', views.UserGuidePage.as_view(), name='user-guide'),
    path('about/disclaimer/', views.DisclaimerPage.as_view(), name='disclaimer'),
    path('iframe/', views.IframePage.as_view(), name='iframe'),
    path('people/<slug:slug>/', views.TeamDetailView.as_view(), name='team-detail'),
    url(r'^ajax/chartdata/$', views.getChartData),
    url(r'^ajax/inflowdata/$', views.getInflow)
]
