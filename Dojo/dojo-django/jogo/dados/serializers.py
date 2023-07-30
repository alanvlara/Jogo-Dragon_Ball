from rest_framework import serializers
from .models import  Fatores, Inimigos, Jogador



class FatoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fatores
        fields = '__all__'

class JogadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jogador
        fields = '__all__'

class InimigosSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Inimigos
        fields = '__all__'