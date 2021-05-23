from django.db import models
# Create your models here.
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager, PermissionsMixin)
from django.db import models


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Les utilisateurs doivent avoir un email')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        if password is None:
            raise TypeError('Password should not be none')

        user = self.create_user(email, password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255,blank=True,null=True)
    last_name = models.CharField(max_length=255,blank=True,null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_merchant = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()


    def get_full_name(self):
        return self.username

    def get_short_name(self):
        return self.username
    
    def __str__(self):
        return f'{self.id}-Email: {self.email}   | Username: {self.username}  | created at: {self.created_at}'


class Wilayas(models.Model):
    code = models.IntegerField()
    nom = models.CharField(max_length=255)

    def __str__(self):
        return self.nom

class Communes(models.Model):
    code_postal = models.CharField(max_length=255)
    nom = models.CharField(max_length=255)
    wilaya = models.ForeignKey(Wilayas,null=True ,on_delete=models.SET_NULL)

    def __str__(self):
        return self.nom
    

class Categorie(models.Model):
    nom = models.CharField(max_length=56)
    _id = models.AutoField(primary_key=True, editable=False)
    def __str__(self):
        return self.nom

class Magasin(models.Model):
    nom = models.CharField(max_length=56)
    adresse = models.CharField(max_length=70,blank=True, null=True)
    telephone = models.CharField(max_length=17, blank=True, null=True)
    latitude = models.FloatField(null=True, blank=True,default=0.0)
    longitude = models.FloatField(null=True, blank=True,default=0.0)
    overture = models.TimeField(null=True, blank=True)
    fermeture = models.TimeField(null=True, blank=True)
    rating = models.DecimalField(
    max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    image = models.ImageField(null=True, blank=True,default='/shop-standart.jpg')
    date_created=models.DateTimeField(auto_now_add=True,null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True,blank=True)
    categorie = models.ForeignKey(Categorie, on_delete=models.SET_NULL, null=True,blank=True)
    commune = models.ForeignKey(Communes, on_delete=models.SET_NULL, null=True,blank=True)
    _id = models.AutoField(primary_key=True, editable=False)
    def __str__(self):
        return self.nom

class Produit(models.Model):
    nom = models.CharField(max_length=56)
    image = models.ImageField(null=True, blank=True,default='/produit-standard.jpg')
    date_created=models.DateTimeField(auto_now_add=True,null=True)
    categorie = models.ForeignKey(Categorie, on_delete=models.SET_NULL, null=True,blank=True)
    _id = models.AutoField(primary_key=True, editable=False)
    def __str__(self):
        return self.nom

class ProduitMag(models.Model):
    produit = models.ForeignKey(Produit, on_delete=models.CASCADE)
    magasin = models.ForeignKey(Magasin, on_delete=models.CASCADE)
    prix = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    date_created=models.DateTimeField(auto_now_add=True,null=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.produit.nom)

class Review(models.Model):
    magasin = models.ForeignKey(Magasin, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    date_created=models.DateTimeField(auto_now_add=True,null=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)

class Visite(models.Model):
    magasin = models.ForeignKey(Magasin, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    Visite_duration = models.TimeField(null=True, blank=True)
    date_created=models.DateTimeField(auto_now_add=True,null=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.user.username+"|"+self.magasin.nom)