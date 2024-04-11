# Generated by Django 5.0.3 on 2024-04-11 16:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Article",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=255)),
                ("tags", models.JSONField(default=list)),
            ],
        ),
        migrations.CreateModel(
            name="Content",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "content_type",
                    models.CharField(
                        choices=[
                            ("text", "Text"),
                            ("image", "Image"),
                            ("table", "Table"),
                        ],
                        max_length=50,
                    ),
                ),
                ("text", models.TextField(blank=True, null=True)),
                ("image_url", models.URLField(blank=True, null=True)),
                ("table_data", models.JSONField(blank=True, null=True)),
                (
                    "article",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="content",
                        to="articles.article",
                    ),
                ),
            ],
        ),
    ]
