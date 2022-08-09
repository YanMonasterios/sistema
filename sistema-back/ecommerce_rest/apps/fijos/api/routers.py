from rest_framework.routers import DefaultRouter
from apps.fijos.api.api import FijosViewSet

router = DefaultRouter()

router.register(r'fijos',FijosViewSet,basename = 'fijos')
urlpatterns = router.urls