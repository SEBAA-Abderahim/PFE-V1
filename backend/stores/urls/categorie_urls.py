from django.urls import path
from stores.views import categorie_views as views

urlpatterns = [

 
    path('', views.getCategories, name="categories"),
    
   
]