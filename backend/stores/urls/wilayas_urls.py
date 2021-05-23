from django.urls import path
from stores.views import wilayas_views as views

urlpatterns = [
    
    path('', views.getWilayas, name="wilayas"),
    path('<str:pk>/communes/', views.getCommunes, name="communes"),
   
]