from django.urls import path
from stores.views import magasin_views as views

urlpatterns = [

    path('', views.getMagasins, name="magasins"),
    path('<str:pk>/', views.getMagasin, name="magasin"),
    path('<str:pk>/reviews/', views.createMagasinReview, name="create-review"),
    path('<str:pk>/visites/', views.createMagUsVisite, name="create-visite"),
    path('<str:pk>/requetes/', views.createMagUsRequete, name="create-requete"),
    path('create', views.createMagasin, name="create-magasin"),
    path('<str:pk>/update', views.updateMagasin, name="update-magasin"),
    path('delete/<str:pk>', views.deleteMagasin, name="delete-magasin"),
    path('marchant', views.getMarchantMagasins, name="magasins-marchant"),
    path('upload/', views.uploadImage, name="image-upload"),
   
]