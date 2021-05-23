from djoser.serializers import UserCreateSerializer
from djoser.serializers import UserSerializer
from .models import *
from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id','username','email', 'first_name', 'last_name','is_merchant','password')


class UserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User
        fields = ('id','username', 'first_name', 'last_name','is_merchant')

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class VisiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visite
        fields = '__all__'

class ProduitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produit
        fields = '__all__'

class ProduitMagSerializer(serializers.ModelSerializer):
    produit_nom = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = ProduitMag
        fields = '__all__'
    
    def get_produit_nom(self, obj):
        produit_nom = obj.produit
        serializer = ProduitSerializer(produit_nom, many=False)
        return serializer.data

class WilayasSerializer(serializers.ModelSerializer):
    nom = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model =Wilayas
        fields = '__all__'
    def get_nom(self, obj):
        return obj.nom

class CommunesSerializer(serializers.ModelSerializer):
    wilaya = serializers.CharField(read_only=True)
    class Meta:
        model =Communes
        fields = '__all__'
    def get_wilaya(self, obj):
        wilaya = obj.wilaya.nom
        serializer = WilayasSerializer(wilaya, many=False)
        return serializer.data

class CategorieSerializer(serializers.ModelSerializer):
    nom = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model =Categorie
        fields = '__all__'
    def get_nom(self, obj):
        return obj.nom
    

class MagasinSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    produits = serializers.SerializerMethodField(read_only=True)
    commune = serializers.SerializerMethodField(read_only=True)
    categorie = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Magasin
        fields = '__all__'
    
    def get_reviews(self, obj):
        reviews = obj.review_set.order_by('-date_created') 
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data
    
    def get_produits(self, obj):
        produits = obj.produitmag_set.all()
        serializer = ProduitMagSerializer(produits, many=True)
        return serializer.data
    
    def get_commune(self, obj):
        commune = obj.commune
        serializer = CommunesSerializer(commune, many=False)
        return serializer.data
    
    def get_categorie(self, obj):
        categorie = obj.categorie
        serializer = CategorieSerializer(categorie, many=False)
        return serializer.data

class MagasinsSerializer(serializers.ModelSerializer):
    commune = serializers.SerializerMethodField(read_only=True)
    categorie = serializers.CharField(read_only=True)
    class Meta:
        model = Magasin
        fields = '__all__'

    def get_categorie(self, obj):
        categorie = obj.categorie.nom
        serializer = CategorieSerializer(categorie, many=False)
        return serializer.data
    
    def get_commune(self, obj):
        commune = obj.commune
        serializer = CommunesSerializer(commune, many=False)
        return serializer.data


##create magasin
class MagasinsCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Magasin
        fields = '__all__'