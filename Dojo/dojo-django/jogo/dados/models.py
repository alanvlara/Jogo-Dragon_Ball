from django.db import models

# Create your models here.
class Jogador(models.Model):
    nivel = models.IntegerField()
    vida = models.FloatField()
    vidaMaxima = models.IntegerField()
    ataqueMaximo = models.IntegerField()
    xp =  models.IntegerField()
    proximoNivel = models.IntegerField()
    chanceCritico = models.FloatField()
    urlNormal = models.CharField(max_length=250)
    urlAtacando = models.CharField(max_length=250)
    urlCurando = models.CharField(max_length=250)
    urlApanhando = models.CharField(max_length=250)
    urlCritico = models.CharField(max_length=250)
    # def __str__(self):
    #     return self.vida

class Inimigos(models.Model):
    nome = models.CharField(max_length=50)
    fase = models.IntegerField()
    vida = models.FloatField()
    vidaMaxima = models.IntegerField()
    experiencia = models.IntegerField()
    ataqueMaximo = models.IntegerField()
    tempoCura = models.IntegerField()
    tempoAtaque = models.IntegerField()
    urlNormal = models.CharField(max_length=250)
    urlAtacando = models.CharField(max_length=250)
    urlCurando = models.CharField(max_length=250)
    def __str__(self):
        return f'{self.nome} {self.fase}'

class Fatores(models.Model):
    heroi = models.CharField(max_length=50)
    faseAtual = models.IntegerField()
    fatorCura = models.FloatField()
    fatorXP = models.FloatField()
    fatorEvolucao = models.FloatField()
    playerAtacando = models.BooleanField(default=False)
    inimigoAtacando = models.BooleanField(default=False)
    playerCurando = models.BooleanField(default=False)
    inimigoCurando = models.BooleanField(default=False)
    def __str__(self):
        return f'{self.heroi} {self.faseAtual}'