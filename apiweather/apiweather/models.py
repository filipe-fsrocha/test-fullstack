from django.db import  models

class Forecast(models.Model):
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    lon = models.IntegerField()
    lat = models.IntegerField()
    updated = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.city
    
class AccessKey(models.Model):
    access_key = models.CharField(max_length=255)
    
    def __str__(self):
        return self.access_key