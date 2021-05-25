
from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response


from stores.models import Categorie,ProduitMag,Magasin,Produit
from stores.serializers import CategorieSerializer,ProduitMagSerializer,ProduitSerializer

from rest_framework import status
##supr mag
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteProduit(request,pk):

    produit = ProduitMag.objects.get(_id=pk)
    produit.delete()
   
    return Response('Produit Deleted')


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProduit(request,pk):
    data=request.data
    produit = ProduitMag.objects.get(_id=pk)
    produit.prix=data['prix']
    produit.save()
   
    return Response('Produit modifié')


@api_view(['GET'])
def getProduits(request, pk):
    produits=Categorie.objects.get(_id=pk).produit_set.all()
    serializer =ProduitSerializer(produits, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProduit(request,pk):
 
    data = request.data
    magasin = Magasin.objects.get(_id=pk)
    print(data.get('categorie'))
    categorie=Categorie.objects.get(_id=data.get('categorie'))
    if(not data.get('produit') and not data.get('nouveauproduit') ):
        content = {'detail': 'Vous devez choisir un produit!!'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    else:
        if data.get('nouveauproduit'):
            if(Produit.objects.filter(nom=data['nouveauproduit']).count()!=0):
                        content = {'detail': 'le nouveau produit que vous voulez ajouter figure deja dans la liste a produits!!'}
                        return Response(content, status=status.HTTP_400_BAD_REQUEST)
            else:
                produit=Produit.objects.create(
                    categorie=categorie,
                    nom=data['nouveauproduit']
                )
                if(request.FILES.get('image')):
                    produit.image =request.FILES.get('image')
                    produit.save()
                produitmag=ProduitMag.objects.create(
                    produit=produit,
                    magasin=magasin
                )
                if(data.get('prix')):
                    produitmag.prix=data['prix']
                    produitmag.save()

        else:
            produit=Produit.objects.get(_id=data['produit'])
            if(ProduitMag.objects.filter(produit=produit,magasin=magasin ).count()!=0):
                content = {'detail': 'Vous avez deja ajouter ce  produit!!'}
                return Response(content, status=status.HTTP_400_BAD_REQUEST)

            produitmag=ProduitMag.objects.create(
                    produit=produit,
                    magasin=magasin
                )
            if(data.get('prix')):
                    produitmag.prix=data['prix']
                    produitmag.save()

    
    serializer = ProduitMagSerializer(produitmag, many=False)
    return Response(serializer.data)
