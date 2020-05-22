# Generated by Django 3.0.6 on 2020-05-22 10:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0006_auto_20200516_0642'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='blurb',
            field=models.TextField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='project',
            name='logo',
            field=models.ImageField(default='default_logos/project_default.png', upload_to='logos'),
        ),
    ]