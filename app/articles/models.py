from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=255)
    tags = models.JSONField(default=list)

    def __str__(self):
        return self.title

class Content(models.Model):
    ARTICLE_CONTENT_TYPES = [
        ('text', 'Text'),
        ('image', 'Image'),
        ('table', 'Table'),
    ]
    article = models.ForeignKey(Article, related_name='content', on_delete=models.CASCADE)
    content_type = models.CharField(max_length=50, choices=ARTICLE_CONTENT_TYPES)
    text = models.TextField(blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)
    table_data = models.JSONField(blank=True, null=True)

    def __str__(self):
        return f"{self.article.title} - {self.get_content_type_display()}"
