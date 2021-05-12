from django.contrib import admin

# Register your models here.
from .models import *
admin.site.register(User)
admin.site.register(Wilayas)
admin.site.register(Communes)
admin.site.register(Categorie)
admin.site.register(Magasin)
admin.site.register(Produit)
admin.site.register(ProduitMag)
admin.site.register(Review)