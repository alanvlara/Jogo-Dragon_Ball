from rest_framework import viewsets
from .serializers import JogadorSerializer, InimigosSerializer, FatoresSerializer
from .serializers import FatoresSerializer
from .models import  Fatores, Jogador, Inimigos


class JogadorView(viewsets.ModelViewSet):
    queryset = Jogador.objects.all()
    serializer_class = JogadorSerializer
    http_method_names = ['get', 'post', 'put', 'delete'] 
    

class InimigosView(viewsets.ModelViewSet):
    queryset = Inimigos.objects.all()
    serializer_class = InimigosSerializer
    http_method_names = ['get', 'post', 'put', 'delete'] 

class FatoresView(viewsets.ModelViewSet):
    queryset = Fatores.objects.all()
    serializer_class = FatoresSerializer
    http_method_names = ['get', 'post', 'put', 'delete'] 