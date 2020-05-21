from django.db import models
from django.utils.translation import gettext_lazy as _

class Project(models.Model):

    # Main Fields
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField('Created At', auto_now_add=True)
    last_modified = models.DateTimeField('Last Modified', auto_now=True)
    owner = models.CharField(max_length=100)
    #owner = models.ForeignKey(User) #TODO: Change to this later after users are implemented
    #members = models.ManyToManyField(User) #TODO: Add this in after users are implemented

    #Choice fields
    class ProjectCategory(models.TextChoices):
        #Tentative. Add to this later when we know what categories to add
        GENERAL = 'GEN', _('General')
        TECH = 'TEC', _('Technology')
        SERVICE = 'SVC', _('Service')
        MEDIA = 'MED', _('Media')
        GAMES = 'GAM', _('Games')
    class ProjectStatus(models.TextChoices):
        ONGOING = 'ON', _('Ongoing')
        COMPLETED = 'CM', _('Completed')
        CANCELLED = 'CA', _('Cancelled')
    category = models.CharField(
        max_length=3,
        choices=ProjectCategory.choices,
    )
    status = models.CharField(
        max_length=2,
        choices=ProjectStatus.choices,
        default=ProjectStatus.ONGOING,
    )

    #Optional project fields
    logo = models.ImageField(upload_to='logos', default="default_logos/project_default.png")
    blurb = models.TextField(max_length=200, blank=True)
    description = models.TextField(blank=True)
    video = models.URLField(blank=True) #Youtube URL
    deck = models.URLField(blank=True) #Google slides URL


    #Methods
    def __str__(self):
        return self.name

