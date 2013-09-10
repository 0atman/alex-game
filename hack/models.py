from django.db import models


class ICE(models.Model):
    name = models.CharField(max_length=200)
    body = models.TextField()
    
    def __unicode__(self):
        return self.name


class EntryPoint(models.Model):
    name = models.CharField(max_length=200)
    body = models.TextField()
    ice = models.ManyToManyField(ICE)
    
    def __unicode__(self):
        return self.name

class Company(models.Model):
    name = models.CharField(max_length=200)
    body = models.TextField()
    entry_points = models.ManyToManyField(EntryPoint)
    
    def __unicode__(self):
        return self.name
