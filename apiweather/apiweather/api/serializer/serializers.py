from rest_framework import serializers
from apiweather.models import Forecast, AccessKey

class ForecastSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forecast
        fields = ['id', 'country', 'city', 'lon', 'lat', 'updated']
        
class AccessKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = AccessKey
        fields = ['access_key']