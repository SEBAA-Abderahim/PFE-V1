from django.db.models.query_utils import Q
from haversine import haversine, Unit
from stores.models import Magasin,ProdInd,Produit
import nltk #import the natural language toolkit library
from nltk.stem.snowball import FrenchStemmer #import the French stemming library
from nltk.corpus import stopwords #import stopwords from nltk corpus
import re #import the regular expressions library; will be used to strip punctuation
from collections import Counter #allows for counting the number of occurences in a list
class Recherche:
    w1=0.6
    w2=0.2
    w3=0.1
    w4=0.1
    p1=0.5
    p2=0.3
    p3=0.2
    sess=0
# create addNumbers static method
    @staticmethod
    def distance(long1,lat1,long2,lat2):
        place1=(long1,lat1)
        place2=(long2,lat2)
        return haversine(place1, place2)


    def get_nltk_text(raw,encoding='utf8'):
        '''create an nltk text using the passed argument (raw) after filtering out the commas'''
        #turn the raw text into an nltk text object
        no_commas = re.sub(r'[.|,|\']',' ', raw) #filter out all the commas, periods, and appostrophes using regex
        tokens = nltk.word_tokenize(no_commas) #generate a list of tokens from the raw text
        text=nltk.Text(tokens,encoding) #create a nltk text from those tokens
        return text
    

    def get_stopswords(type="veronis"):
        '''returns the veronis stopwords in unicode, or if any other value is passed, it returns the default nltk french stopwords'''
        if type=="veronis":
            #VERONIS STOPWORDS
            raw_stopword_list = ["Ap.", "Apr.", "GHz", "MHz", "USD", "a", "afin", "ah", "ai", "aie", "aient", "aies", "ait", "alors", "après", "as", "attendu", "au", "au-delà", "au-devant", "aucun", "aucune", "audit", "auprès", "auquel", "aura", "aurai", "auraient", "aurais", "aurait", "auras", "aurez", "auriez", "aurions", "aurons", "auront", "aussi", "autour", "autre", "autres", "autrui", "aux", "auxdites", "auxdits", "auxquelles", "auxquels", "avaient", "avais", "avait", "avant", "avec", "avez", "aviez", "avions", "avons", "ayant", "ayez", "ayons", "b", "bah", "banco", "ben", "bien", "bé", "c", "c'", "c'est", "c'était", "car", "ce", "ceci", "cela", "celle", "celle-ci", "celle-là", "celles", "celles-ci", "celles-là", "celui", "celui-ci", "celui-là", "celà", "cent", "cents", "cependant", "certain", "certaine", "certaines", "certains", "ces", "cet", "cette", "ceux", "ceux-ci", "ceux-là", "cf.", "cg", "cgr", "chacun", "chacune", "chaque", "chez", "ci", "cinq", "cinquante", "cinquante-cinq", "cinquante-deux", "cinquante-et-un", "cinquante-huit", "cinquante-neuf", "cinquante-quatre", "cinquante-sept", "cinquante-six", "cinquante-trois", "cl", "cm", "cm²", "comme", "contre", "d", "d'", "d'après", "d'un", "d'une", "dans", "de", "depuis", "derrière", "des", "desdites", "desdits", "desquelles", "desquels", "deux", "devant", "devers", "dg", "différentes", "différents", "divers", "diverses", "dix", "dix-huit", "dix-neuf", "dix-sept", "dl", "dm", "donc", "dont", "douze", "du", "dudit", "duquel", "durant", "dès", "déjà", "e", "eh", "elle", "elles", "en", "en-dehors", "encore", "enfin", "entre", "envers", "es", "est", "et", "eu", "eue", "eues", "euh", "eurent", "eus", "eusse", "eussent", "eusses", "eussiez", "eussions", "eut", "eux", "eûmes", "eût", "eûtes", "f", "fait", "fi", "flac", "fors", "furent", "fus", "fusse", "fussent", "fusses", "fussiez", "fussions", "fut", "fûmes", "fût", "fûtes", "g", "gr", "h", "ha", "han", "hein", "hem", "heu", "hg", "hl", "hm", "hm³", "holà", "hop", "hormis", "hors", "huit", "hum", "hé", "i", "ici", "il", "ils", "j", "j'", "j'ai", "j'avais", "j'étais", "jamais", "je", "jusqu'", "jusqu'au", "jusqu'aux", "jusqu'à", "jusque", "k", "kg", "km", "km²", "l", "l'", "l'autre", "l'on", "l'un", "l'une", "la", "laquelle", "le", "lequel", "les", "lesquelles", "lesquels", "leur", "leurs", "lez", "lors", "lorsqu'", "lorsque", "lui", "lès", "m", "m'", "ma", "maint", "mainte", "maintes", "maints", "mais", "malgré", "me", "mes", "mg", "mgr", "mil", "mille", "milliards", "millions", "ml", "mm", "mm²", "moi", "moins", "mon", "moyennant", "mt", "m²", "m³", "même", "mêmes", "n", "n'avait", "n'y", "ne", "neuf", "ni", "non", "nonante", "nonobstant", "nos", "notre", "nous", "nul", "nulle", "nº", "néanmoins", "o", "octante", "oh", "on", "ont", "onze", "or", "ou", "outre", "où", "p", "par", "par-delà", "parbleu", "parce", "parmi", "pas", "passé", "pendant", "personne", "peu", "plus", "plus_d'un", "plus_d'une", "plusieurs", "pour", "pourquoi", "pourtant", "pourvu", "près", "puisqu'", "puisque", "q", "qu", "qu'", "qu'elle", "qu'elles", "qu'il", "qu'ils", "qu'on", "quand", "quant", "quarante", "quarante-cinq", "quarante-deux", "quarante-et-un", "quarante-huit", "quarante-neuf", "quarante-quatre", "quarante-sept", "quarante-six", "quarante-trois", "quatorze", "quatre", "quatre-vingt", "quatre-vingt-cinq", "quatre-vingt-deux", "quatre-vingt-dix", "quatre-vingt-dix-huit", "quatre-vingt-dix-neuf", "quatre-vingt-dix-sept", "quatre-vingt-douze", "quatre-vingt-huit", "quatre-vingt-neuf", "quatre-vingt-onze", "quatre-vingt-quatorze", "quatre-vingt-quatre", "quatre-vingt-quinze", "quatre-vingt-seize", "quatre-vingt-sept", "quatre-vingt-six", "quatre-vingt-treize", "quatre-vingt-trois", "quatre-vingt-un", "quatre-vingt-une", "quatre-vingts", "que", "quel", "quelle", "quelles", "quelqu'", "quelqu'un", "quelqu'une", "quelque", "quelques", "quelques-unes", "quelques-uns", "quels", "qui", "quiconque", "quinze", "quoi", "quoiqu'", "quoique", "r", "revoici", "revoilà", "rien", "s", "s'", "sa", "sans", "sauf", "se", "seize", "selon", "sept", "septante", "sera", "serai", "seraient", "serais", "serait", "seras", "serez", "seriez", "serions", "serons", "seront", "ses", "si", "sinon", "six", "soi", "soient", "sois", "soit", "soixante", "soixante-cinq", "soixante-deux", "soixante-dix", "soixante-dix-huit", "soixante-dix-neuf", "soixante-dix-sept", "soixante-douze", "soixante-et-onze", "soixante-et-un", "soixante-et-une", "soixante-huit", "soixante-neuf", "soixante-quatorze", "soixante-quatre", "soixante-quinze", "soixante-seize", "soixante-sept", "soixante-six", "soixante-treize", "soixante-trois", "sommes", "son", "sont", "sous", "soyez", "soyons", "suis", "suite", "sur", "sus", "t", "t'", "ta", "tacatac", "tandis", "te", "tel", "telle", "telles", "tels", "tes", "toi", "ton", "toujours", "tous", "tout", "toute", "toutefois", "toutes", "treize", "trente", "trente-cinq", "trente-deux", "trente-et-un", "trente-huit", "trente-neuf", "trente-quatre", "trente-sept", "trente-six", "trente-trois", "trois", "très", "tu", "u", "un", "une", "unes", "uns", "v", "vers", "via", "vingt", "vingt-cinq", "vingt-deux", "vingt-huit", "vingt-neuf", "vingt-quatre", "vingt-sept", "vingt-six", "vingt-trois", "vis-à-vis", "voici", "voilà", "vos", "votre", "vous", "w", "x", "y", "z", "zéro", "à", "ç'", "ça", "ès", "étaient", "étais", "était", "étant", "étiez", "étions", "été", "étée", "étées", "étés", "êtes", "être", "ô"]
        else:
            #get French stopwords from the nltk kit
            raw_stopword_list = stopwords.words('french') #create a list of all French stopwords
        stopword_list = [word for word in raw_stopword_list] #make to decode the French stopwords as unicode objects rather than ascii
        return stopword_list
   
    def filter_stopwords(text,stopword_list):
        '''normalizes the words by turning them all lowercase and then filters out the stopwords'''
        words=[w.lower() for w in Recherche.get_nltk_text(text)] #normalize the words in the text, making them all lowercase
        #filtering stopwords
        filtered_words = [] #declare an empty list to hold our filtered words
        for word in words: #iterate over all words from the text
            if word not in stopword_list and word.isalpha() and len(word) > 1: #only add words that are not in the French stopwords list, are alphabetic, and are more than 1 character
                filtered_words.append(word) #add word to filter_words list if it meets the above conditions

        return filtered_words
    
    def stem_words(words):
        '''stems the word list using the French Stemmer'''
        #stemming words
        stemmed_words = [] #declare an empty list to hold our stemmed words
        stemmer = FrenchStemmer() #create a stemmer object in the FrenchStemmer class
        for word in words:
            stemmed_word=stemmer.stem(stemmer.stem(word)) #stem the word
            stemmed_words.append(stemmed_word) #add it to our stemmed word list
        stemmed_words.sort() #sort the stemmed_words
        return stemmed_words

    def print_words(words):
        '''clean print the unicode words'''
        for word in words:
            print(word)
    

    def normalizer_prod(Nom_produit):
        '''clean print the unicode words'''
        words=Recherche.filter_stopwords(Nom_produit,Recherche.get_stopswords(type="veronis")) 
        return Recherche.stem_words(words)

    def remplir_prod():
        magasins = Magasin.objects.all()
        for magasin in magasins:
            if magasin.produitmag_set.count()!=0:
                for pro in magasin.produitmag_set.all():       
                    for mot in Recherche.normalizer_prod(pro.produit.nom):
                        if mot in magasin.prods :
                           magasin.prods.update({mot:magasin.prods.get(mot)+1}) 
                           magasin.save()
                        if mot not in magasin.prods:
                           magasin.prods.update({mot:1})
                           magasin.save()
    
    
    def remplir_indexprod():
        produits=Produit.objects.all()
        for produit in produits:
            for mot in Recherche.normalizer_prod(produit.nom):
                if(ProdInd.objects.filter(nom=mot).count()==0):
                     ProdInd.objects.create(
                        nom=mot
                    )
    def remplir_indexprodmags():
        produits=ProdInd.objects.all()
        magasins = Magasin.objects.all()
        for produit in produits:
            for magasin in magasins:
                if produit.nom in magasin.prods:
                    produit.mags.update({str(magasin._id):magasin.prods.get(produit.nom)})
                    produit.save()
                else:
                    produit.mags.update({str(magasin._id):0})
                    produit.save()



    def Score_Géolocalisation(M,userlat,userlong):
        dist=Recherche.distance(M.latitude,M.longitude,userlat,userlong)
        if(dist<5):
            return 1.0
        else:
            if dist<10:
                return 0.8
            else:
                 if dist<20:
                     return 0.6
                 else :
                     if dist<50:
                         return 0.4
                     else: return 0.2
        


    def Score_Notation(M):
        Note=M.rating
        if(Note>4):
            return 1.0
        else:
            if Note>3:
                return 0.8
            else:
                 if Note>2:
                     return 0.6
                 else :
                     if Note>1:
                         return 0.4
                     else: return 0.2
    
    def Score_Comment(M):
        NbComment= M.review_set.exclude(Q(comment="")| Q(comment=None)).count()
        if(NbComment>10):
            return 1.0
        else:
            if NbComment>5:
                return 0.8
            else:
                 if NbComment>3:
                     return 0.6
                 else :
                     if NbComment>1:
                         return 0.4
                     else: return 0.2
    



    def Score_Similarite(mots,M):
        score=0
        for mot in mots:
            if ProdInd.objects.filter(nom=mot).count()!=0:
                p=ProdInd.objects.get(nom=mot)
                if p.mags.get(str(M._id))!=0:
                    score=score+(1+p.mags.get(str(M._id))/sum(M.prods.values()))/2
        
        return score


    def Score_Ordononcement(mots,latus,longus,M):
        score=Recherche.Score_Similarite(mots,M)*Recherche.w1+Recherche.Score_Géolocalisation(M,latus,longus)*Recherche.w2+Recherche.Score_Notation(M)*Recherche.w3+Recherche.Score_Comment(M)*Recherche.w4
        return score





            
    def Score_categorie(Q,M,cats):
        score=0
        if M.categorie_id in cats:
            score=score+1
        score=score/len(list(Q.motq))
        return score


    def Score_extension(Q,M,cats,etend):
        score=Recherche.Score_Similarite(list(Q.motq),M)*Recherche.p1+Recherche.Score_Similarite(list(etend),M)*Recherche.p2+Recherche.Score_categorie(Q,M,cats)*Recherche.p3
        return score

    def Score_OEXrdononcement(Q,latus,longus,M,cats,etend):
        score=Recherche.Score_extension(Q,M,cats,etend)*Recherche.w1+Recherche.Score_Géolocalisation(M,latus,longus)*Recherche.w2+Recherche.Score_Notation(M)*Recherche.w3+Recherche.Score_Comment(M)*Recherche.w4
        return score



    def extract_cats(mags):
        cats=[]
       
        for m in mags:
            cats.append(m.categorie_id)
        return list(set(cats))
    

    def extract_prods(mags):
        ps=[]
       
        for m in mags:
            ps.extend(m.prods.keys())
        return list(set(ps))







               

