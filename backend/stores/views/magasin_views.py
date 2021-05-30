

from django.shortcuts import render, resolve_url

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from stores.models import Magasin,Review,Visite,Categorie, Communes,Wilayas,User
from stores.serializers import MagasinSerializer,MagasinsSerializer,MagasinsCreateSerializer,CategorieSerializer,WilayasSerializer,CommunesSerializer

from rest_framework import status
from django.utils import timezone
import datetime
from stores.MyFunctions import get_or_none
from dz_phone_number import DZPhoneNumber

@api_view(['GET'])
def getMagasins(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    magasins = Magasin.objects.filter(
        nom__icontains=query).order_by('-_id')

    page = request.query_params.get('page')
    paginator = Paginator(magasins, 48)

    try:
        magasins = paginator.page(page)
    except PageNotAnInteger:
        magasins = paginator.page(1)
    except EmptyPage:
        magasins = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    print('Page:', page)
    serializer = MagasinsSerializer(magasins, many=True)
    return Response({'magasins': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getMagasin(request, pk):
    magasin = Magasin.objects.get(_id=pk)
    serializer = MagasinSerializer(magasin, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createMagasinReview(request, pk):
    user = request.user
    magasin = Magasin.objects.get(_id=pk)
    data = request.data

  
       


    # 1- No Rating or 0
    if data['rating'] == 0:
        content = {'detail': 'Veillez selectioner une note!'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
          # 1 - Review already exists
        alreadyExists = magasin.review_set.filter(user=user).exists()
        if alreadyExists:
           
            reviwtoupdate = Review.objects.filter(user=user,magasin=magasin).order_by('-date_created')[0]
            reviwtoupdate.name=user.username
            reviwtoupdate.rating=data['rating']
            reviwtoupdate.comment=data['comment']
            reviwtoupdate.date_created=timezone.now()
            reviwtoupdate.save()
        else:
            review = Review.objects.create(
                user=user,
                magasin=magasin,
                name=user.username,
                rating=data['rating'],
                comment=data['comment'],
            )

        reviews = magasin.review_set.all()
        magasin.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        magasin.rating = total / len(reviews)
        magasin.save()

        return Response('Avis ajouté')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createMagUsVisite(request, pk):
    user = request.user
    magasin = Magasin.objects.get(_id=pk)
    data = request.data
    visite = Visite.objects.create(
          user=user,
          magasin=magasin,
        
          Visite_duration=datetime.time(data['hours'],data['minutes'],data['seconds']),

    )
    return Response('Avis ajouté')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createMagasin(request):
    user=request.user
    data = request.data
    if(data.get('telephone')):
        try:
            DZPhoneNumber( data['telephone'])
        except ValueError:
            content = {'detail': 'Ce numéro de telephone est erroné!!'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
            
      


    magasin = Magasin.objects.create(
   
        nom = data['nom'],
   
        categorie = Categorie.objects.get(_id=data['categorie']),

        user=user

    )

    if(data.get('telephone')):
         magasin.telephone = data['telephone']
         magasin.save()
    if(data.get('adresse')):
         magasin.adresse = data['adresse']
         magasin.save()
    if(data.get('latitude') ):
        try:
            float(data['latitude']) 
            magasin.latitude = data['latitude']
            magasin.save()
        except ValueError:
         content = {'detail': 'La latitude doit etre un numeric!!'}
         return Response(content, status=status.HTTP_400_BAD_REQUEST)
    if(data.get('longitude') ):
        try:
            float(data['longitude']) 
            magasin.longitude = data['longitude']
            magasin.save()
        except ValueError:
         content = {'detail': 'La longitude doit etre un numeric!!'}
         return Response(content, status=status.HTTP_400_BAD_REQUEST)
    if(data.get('overture')):
         magasin.overture= data['overture']
         magasin.save()
    if(data.get('fermeture')):
         magasin.fermeture = data['fermeture']
         magasin.save()
    if(data.get('commune')):
       
        magasin.commune = get_or_none(Communes,id=data['commune'])
        magasin.save()


    user.is_merchant=True
    user.save()
    if(request.FILES.get('image')):
        magasin.image =request.FILES.get('image')
        magasin.save()
    
    serializer = MagasinsCreateSerializer(magasin, many=False)
    return Response(serializer.data)
#upload magasin image
@api_view(['POST'])
def uploadImage(request):
    data = request.data

    magasin_id = data['magasin_id']
    magasin = Magasin.objects.get(_id=magasin_id)

    magasin.image = request.FILES.get('image')
    magasin.save()

    return Response('Image was uploaded')

#magasins du marchant
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMarchantMagasins(request):
    user = request.user
    data = request.data
    if user.is_merchant!=True:
        content = {'detail': 'Vous avez pas encore crée votre mgasin!'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    else:
        magasins=User.objects.get(id=user.id).magasin_set.all().order_by('-date_created')
        page = request.query_params.get('page')
        paginator = Paginator(magasins, 2)

        try:
            magasins = paginator.page(page)
        except PageNotAnInteger:
            magasins = paginator.page(1)
        except EmptyPage:
            magasins = paginator.page(paginator.num_pages)

        if page == None:
            page = 1

        page = int(page)
        print('Page:', page)
        serializer = MagasinsSerializer(magasins, many=True)
        return Response({'magasins': serializer.data, 'page': page, 'pages': paginator.num_pages})

##update magasin
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateMagasin(request,pk):
    user=request.user
    data = request.data
    magasin = Magasin.objects.get(_id=pk)
    if(data.get('telephone')):
        try:
            DZPhoneNumber( data['telephone'])
        except ValueError:
            content = {'detail': 'Ce numéro de telephone est erroné!!'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    ##starting update
    magasin.nom = data['nom']

    magasin.categorie = Categorie.objects.get(_id=data['categorie'])
    print(data['categorie'])

    magasin.user=user

    

    if(data.get('telephone')):
         magasin.telephone = data['telephone']
         magasin.save()
    if(data.get('adresse')):
         magasin.adresse = data['adresse']
         magasin.save()
    if(data.get('latitude') ):
        try:
            float(data['latitude']) 
            magasin.latitude = data['latitude']
            magasin.save()
        except ValueError:
         content = {'detail': 'La latitude doit etre un numeric!!'}
         return Response(content, status=status.HTTP_400_BAD_REQUEST)
    if(data.get('longitude') ):
        try:
            float(data['longitude']) 
            magasin.longitude = data['longitude']
            magasin.save()
        except ValueError:
         content = {'detail': 'La longitude doit etre un numeric!!'}
         return Response(content, status=status.HTTP_400_BAD_REQUEST)
    if(data.get('overture')):
         magasin.overture= data['overture']
         magasin.save()
    if(data.get('fermeture')):
         magasin.fermeture = data['fermeture']
         magasin.save()
    if(data.get('commune')):
       
        magasin.commune = get_or_none(Communes,id=data['commune'])
        magasin.save()


    user.is_merchant=True
    user.save()
    if(request.FILES.get('image')):
        magasin.image =request.FILES.get('image')
        magasin.save()
    
    serializer = MagasinsCreateSerializer(magasin, many=False)
    return Response(serializer.data)





##supr mag
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteMagasin(request,pk):
    user=request.user
    magasin = Magasin.objects.get(_id=pk)
    magasin.delete()
    if(user.magasin_set.count()==0):
            user.is_merchant=False
            user.save()
    return Response('Magasin Deleted')