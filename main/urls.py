from django.urls import path
from . import views

urlpatterns = [
    #path('', views.HomePage.as_view(), name='home'),
    path('', views.TeamList.as_view(), name='home'),
    path('map/', views.MapPage.as_view(), name='map'),
    path('about/', views.AboutPage.as_view(), name='about'),
    path('user-guide/', views.UserGuidePage.as_view(), name='user-guide'),
    path('testiframe/', views.TestIframePage.as_view(), name='testiframe'),
    path('<slug:slug>/', views.TeamDetailView.as_view(), name='team-detail'),
]