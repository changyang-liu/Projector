from django.db import models

# Create your models here.

class Project(models.Model):
    name = models.CharField(max_length=32)
    pub_date = models.DateTimeField('Date Added')
