from rest_framework.routers import DefaultRouter
from django.urls import path, include

from .views import JogadorView, InimigosView, FatoresView


router = DefaultRouter()
router.register('jogadores', JogadorView)
router.register('inimigos', InimigosView)
router.register('fatores', FatoresView)

urlpatterns = [
    path('', include(router.urls)),  # nome do app
]