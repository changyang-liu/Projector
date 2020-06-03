# Generated by Django 3.0.6 on 2020-06-03 04:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0012_project_join_requests'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='likes',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='project',
            name='blurb',
            field=models.TextField(blank=True, max_length=125),
        ),
    ]
