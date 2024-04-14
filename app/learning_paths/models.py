from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

class LearningPath(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

    def get_all_activity_nodes(self):
        return self.activitynodes.all()

    def get_all_badge_nodes(self):
        return self.badgenodes.all()


def get_default_content_type():
    return ContentType.objects.get(app_label="learning_paths", model="Node").pk


class Node(models.Model):
    learning_path = models.ForeignKey(
        LearningPath,
        on_delete=models.CASCADE
    )
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, default=get_default_content_type)
    object_id = models.PositiveIntegerField(default=get_default_content_type)
    content_object = GenericForeignKey('content_type', 'object_id')

    class Meta:
        abstract = True

class ActivityNode(Node):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    ACTIVITY_TYPE_CHOICES = [
        ('Article', 'Article'),
        ('Video', 'Video'),
        ('Quiz', 'Quiz'),
        ('Exercise', 'Exercise'),
    ]
    type = models.CharField(max_length=50, choices=ACTIVITY_TYPE_CHOICES)
    unlocked = models.BooleanField(default=False)
    current = models.BooleanField(default=False)
    finished = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Activity Node"
        verbose_name_plural = "Activity Nodes"

class BadgeNode(Node):
    user_name = models.CharField(max_length=100)
    achievement = models.CharField(max_length=200)
    image_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f'{self.achievement} for {self.user_name}'

    class Meta:
        verbose_name = "Badge Node"
        verbose_name_plural = "Badge Nodes"
