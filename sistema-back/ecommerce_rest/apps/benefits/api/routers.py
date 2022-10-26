from rest_framework.routers import DefaultRouter
from apps.benefits.api.api import BenefitsViewSet

router = DefaultRouter()

router.register(r'benefits',BenefitsViewSet,basename = 'benefits')
urlpatterns = router.urls