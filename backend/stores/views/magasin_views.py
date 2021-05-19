
from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from stores.models import Magasin,Review,Visite
from stores.serializers import MagasinSerializer,MagasinsSerializer

from rest_framework import status
from django.utils import timezone
import datetime


@api_view(['GET'])
def getMagasins(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    magasins = Magasin.objects.filter(
        nom__icontains=query).order_by('-date_created')

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
    print(data)
    visite = Visite.objects.create(
          user=user,
          magasin=magasin,
        
          Visite_duration=datetime.time(data['hours'],data['minutes'],data['seconds']),

    )
    return Response('Avis ajouté')