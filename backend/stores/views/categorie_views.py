from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response


from stores.models import Categorie
from stores.serializers import CategorieSerializer

from rest_framework import status

@api_view(['GET'])
def getCategories(request):
    categories=Categorie.objects.all()
    serializer = CategorieSerializer(categories, many=True)
    return Response(serializer.data)