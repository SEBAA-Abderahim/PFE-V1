from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from stores.models import Magasin
from stores.serializers import MagasinSerializer,MagasinsSerializer

from rest_framework import status


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
