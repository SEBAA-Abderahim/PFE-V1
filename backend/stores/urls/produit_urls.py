from django.urls import path
from stores.views import produit_views as views

urlpatterns = [

 
   path('delete/<str:pk>', views.deleteProduit, name="delete-produit"),
   path('update/<str:pk>', views.updateProduit, name="update-produit"),
   path('<str:pk>/list-produits/', views.getProduits, name="list-produits"),
    path('create/<str:pk>', views.createProduit, name="create-produit"),
    
   
]