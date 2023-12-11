from django.urls import path
from . import views, api
from django.conf.urls import include, url

urlpatterns = [
    #path('', views.HomePage.as_view(), name='home'),
    path('', views.TeamList.as_view(), name='home'),
    path('technical-note/', views.TechNotePage.as_view(), name='technical-note'),
    path('about/', views.AboutPage.as_view(), name='about'),
    path('map/', views.MapPage.as_view(), name='map'),
    # path('map2/', views.MapPage2.as_view(), name='map2'),
    path('table/', views.TablePage.as_view(), name='table'),
    path('user-guide/', views.UserGuidePage.as_view(), name='user-guide'),
    path('about/disclaimer/', views.DisclaimerPage.as_view(), name='disclaimer'),
    path('people/<slug:slug>/', views.TeamDetailView.as_view(), name='team-detail'),
    path('get_aec_chart/', views.get_aec_chart),
    path('get_inflow_chart/', views.get_inflow_chart),
    path('get_precip_chart/', views.get_precip),
    path('get_outflow_chart/', views.get_outflow_chart),
    path('get_sarea_chart/', views.get_sarea_chart),
    path('get_deltas_chart/', views.get_deltas_chart),
    path('get_rc_chart/', views.get_rc_chart),
    path('get_increase_decrease/', views.get_increase_decrease),
    path('get_reservoir/', views.get_reservoir),
    path('get_reservoir_info/', views.get_reservoir_info),
    path('api/ratmekong/', api.ReservoirViewSet.as_view({'get': 'data'}), name='reservoir-data-api'),
]
