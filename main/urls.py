from django.urls import path
from . import views

urlpatterns = [
    #path('', views.HomePage.as_view(), name='home'),
    path('', views.TeamList.as_view(), name='home'),
    path('about-mrc/', views.AboutMRCPage.as_view(), name='about-mrc'),
    path('about/', views.AboutPage.as_view(), name='about'),
    path('map/', views.MapPage.as_view(), name='map'),
    path('user-guide/', views.UserGuidePage.as_view(), name='user-guide'),
    path('testiframe/', views.TestIframePage.as_view(), name='testiframe'),
    path('people/<slug:slug>/', views.TeamDetailView.as_view(), name='team-detail'),
]