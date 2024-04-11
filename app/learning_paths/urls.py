from .views import LearningPathViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'learning_paths', LearningPathViewSet)

urlpatterns = router.urls
