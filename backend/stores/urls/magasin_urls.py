from django.urls import path
from stores.views import magasin_views as views

urlpatterns = [

    path('', views.getMagasins, name="magasins"),
    path('<str:pk>/', views.getMagasin, name="magasin"),
    path('<str:pk>/reviews/', views.createMagasinReview, name="create-review"),
    path('<str:pk>/visites/', views.createMagUsVisite, name="create-visite"),

   
]