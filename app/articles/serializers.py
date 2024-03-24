from rest_framework import serializers
from .models import Article, Content

class ContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Content
        fields = ['id', 'content_type', 'text', 'image_url', 'table_data']

class ArticleSerializer(serializers.ModelSerializer):
    content = ContentSerializer(many=True, read_only=True)
    class Meta:
        model = Article
        fields = ['id', 'title', 'tags', 'content']
