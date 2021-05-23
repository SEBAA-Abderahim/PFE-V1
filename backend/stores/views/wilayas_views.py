from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response


from stores.models import Categorie
from stores.serializers import WilayasSerializer,CommunesSerializer
from stores.models import Communes,Wilayas
from rest_framework import status



@api_view(['GET'])
def getWilayas(request):
    wilayas=Wilayas.objects.all()
    serializer = WilayasSerializer(wilayas, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getCommunes(request, pk):
    communes=Wilayas.objects.get(id=pk).communes_set.all()
    serializer =CommunesSerializer(communes, many=True)
    return Response(serializer.data)