from rest_framework.routers import DefaultRouter
from apps.inactivos.api.api import InactivosViewSet

router = DefaultRouter()

router.register(r'inactivos',InactivosViewSet,basename = 'inactivos')
urlpatterns = router.urls