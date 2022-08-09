from rest_framework.routers import DefaultRouter

from apps.hired.api.api import UserViewSet

router = DefaultRouter()

router.register('', UserViewSet, basename="hired")

urlpatterns = router.urls