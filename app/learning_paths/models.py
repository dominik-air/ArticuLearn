from django.db import models

class LearningPath(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Node(models.Model):
    learning_path = models.ForeignKey(
        LearningPath,
        related_name="%(class)s_nodes",
        on_delete=models.CASCADE
    )

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

class BadgeNode(Node):
    user_name = models.CharField(max_length=100)
    achievement = models.CharField(max_length=200)
    image_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f'{self.achievement} for {self.user_name}'
