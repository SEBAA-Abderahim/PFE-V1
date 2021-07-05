from stores.models import Magasin,ProdInd,Produit
from stores.Recherche import Recherche
import json
class KMedoid:
    def distCat(med,mag):
        if med.categorie_id==mag.categorie_id:
            return 0
        else:
             return 15
    
    def distZone(med,mag):
        dist=Recherche.distance(med.latitude,med.longitude,mag.latitude,mag.longitude)
        if(dist<5):
            return 0
        else:
            if dist<10:
                return 2
            else:
                 if dist<20:
                     return 5
                 else :
                     if dist<50:
                         return 10
                     else: return 12
    def distProd(med,mag):
        setmedprod=set(med.prods)
        setmagprod=set(mag.prods)
        tailleunion=len(setmedprod.union(setmagprod))
        tailleinter=len(setmedprod.intersection(setmagprod))
        resultat=tailleunion-tailleinter
        return resultat


    def dist(med,mag):
        distance=KMedoid.distCat(med,mag)+KMedoid.distZone(med,mag)+KMedoid.distProd(med,mag)
        return distance
    

    
    def algorithm(k):
        magasins=Magasin.objects.all()
        medoids=[m._id for m in magasins[:k]]
        matrice=[]
      

        change=1
        while change==1:
            change=0
            E=0
            matrice=[]
            for m in medoids:
                matrice.append({'classe_id':m,'mags':[]})
            
            non_medoids=magasins.exclude(_id__in=medoids)
            for m in non_medoids:
                mindist=KMedoid.dist(magasins.get(_id=medoids[0]),m)
                Min=0
                f=0
                for f in range(len(medoids)):
                    if(KMedoid.dist(magasins.get(_id=medoids[f]),m)<mindist):
                        mindist=KMedoid.dist(magasins.get(_id=medoids[f]),m)
                        Min=f
                E=E+mindist
             
                matrice[Min].get('mags').append(m._id)
          
            
            Elast=E
            
            
            for i in range(len(matrice)):
                
                           
                for j in range(len(list(matrice[i].get('mags')))):
                    Enew=0
                    medoids2=medoids
                    medoids2[i]=matrice[i]['mags'][j] 
                    non_medoids2=magasins.exclude(_id__in=medoids2)

                    for m in non_medoids2:
                        mindist2=KMedoid.dist(magasins.get(_id=medoids2[0]),m)
                        
                        for l in range(len(medoids2)):
                            if(KMedoid.dist(magasins.get(_id=medoids2[l]),m)<mindist2):
                                mindist2=KMedoid.dist(magasins.get(_id=medoids2[l]),m)
                        Enew=Enew+mindist2
                    if Enew-E <0 and Enew <Elast:
                        medoids=medoids2
                        Elast=Enew
                        change=1
            
                                
                                
        fj = json.dumps(matrice)
        f = open("clusters.json","w")
        f.write(fj)
        f.close()
    




    def algorithm2(k):
        magasins=Magasin.objects.all()
        medoids=list(magasins[:k])
        matrice=[]
        E=0
        for m in medoids:
            matrice.append({'classe_id':m._id,'mags':[]})
            
        non_medoids=magasins.exclude(_id__in=[m._id for m in medoids])
        for m in non_medoids:
                mindist=KMedoid.dist(medoids[0],m)
                Min=0
                f=0
                for f in range(len(medoids)):
                    if(KMedoid.dist(medoids[f],m)<mindist):
                        mindist=KMedoid.dist(medoids[f],m)
                        Min=f
                E=E+mindist
             
                matrice[Min].get('mags').append(m._id)
          

        change=1
        while change==1:
            change=0
            
            
          
            
            
            
            medoids2=medoids 
            i=0
            for i in range(len(matrice)):
                
                Elast=E 
                j=0
                for j in range(len(list(matrice[i].get('mags')))):
                    Enew=0
                    
                    medoids2[i]=magasins.get(_id=matrice[i]['mags'][j]) 
                    non_medoids2=magasins.exclude(_id__in=[m._id for m in medoids2])

                    for m in non_medoids2:
                        mindist2=KMedoid.dist(medoids2[0],m)
                        
                        for l in range(len(medoids2)):
                            if(KMedoid.dist(medoids2[l],m)<mindist2):
                                mindist2=KMedoid.dist(medoids2[l],m)
                        Enew=Enew+mindist2
                    if E-Enew<0 and Enew-Elast <0 :
                        medoids=medoids2
                        Elast=Enew
                        
                        change=1
                    else: 
                        change=0
        

        
        matrice=[]
        for m in medoids:
           matrice.append({'classe_id':m._id,'mags':[m._id]})
           
        non_medoids=magasins.exclude(_id__in=[m._id for m in medoids])
        for m in non_medoids:
            mindist=KMedoid.dist(medoids[0],m)
            Min=0
            f=0
            for f in range(len(medoids)):
                if(KMedoid.dist(medoids[f],m)<mindist):
                   mindist=KMedoid.dist(medoids[f],m)
                   Min=f
            E=E+mindist
        
            matrice[Min].get('mags').append(m._id)
            
                                
                                
        fj = json.dumps(matrice)
        f = open("clusters.json","w")
        f.write(fj)
        f.close()
        





