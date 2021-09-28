from rest_framework.decorators import api_view

from django.http import JsonResponse
from django.views.decorators.csrf import  csrf_exempt
from django.core.exceptions import ObjectDoesNotExist

from apiweather.models import Forecast, AccessKey
from apiweather.api.serializer.serializers import ForecastSerializer, AccessKeySerializer

from datetime import datetime
import json

INTERNAL_ERROR = {
    'error': 'Ocorreu um erro interno no servidor'
}

@api_view(["GET"])
@csrf_exempt
def list_all_weather(request):
    find_all = Forecast.objects.all()
    serializer = ForecastSerializer(find_all, many=True)
    return JsonResponse({ 'data': serializer.data }, safe=False, status=200)

@api_view(["POST"])
@csrf_exempt
def save_weather(request):
    paylod = json.loads(request.body)
    
    try:
        
        find_forecast = Forecast.objects.filter(city=paylod['city'])
        
        if find_forecast:
            find_forecast.update(updated=datetime.now())
            return JsonResponse({}, safe=False, status=201)
        
        Forecast.objects.create(
            country=paylod['country'],
            city=paylod['city'],
            lon=paylod['lon'],
            lat=paylod['lat']
        )
        return JsonResponse({}, safe=False, status=201)
    except Exception as e:
        print(e)
        return JsonResponse(INTERNAL_ERROR, safe=False, status=500)
              
@api_view(["DELETE"])
@csrf_exempt
def delete_forecast(request, forecast_id):
    try:
        forecast = Forecast.objects.filter(id=forecast_id)
        forecast.delete()
        return JsonResponse({}, safe=False, status=404)
    except ObjectDoesNotExist as e:
        return JsonResponse({ 'error': str(e) }, safe=False, status=404)
    except Exception as e:
        print(e)
        return JsonResponse(INTERNAL_ERROR, safe=False, status=500)
    
@api_view(["POST"])
@csrf_exempt
def save_access_key(request):
    payload = json.loads(request.body)
    
    try:
        access_key = AccessKey.objects.all()
        if access_key:
            access_key.update(access_key=payload['accessKey'])
            return JsonResponse({}, safe=False, status=201)
        
        AccessKey.objects.create(access_key=payload['accessKey'])
        return JsonResponse({}, safe=False, status=201)
    except Exception:
        return JsonResponse({}, safe=False, status=201)
    
@api_view(["GET"])
@csrf_exempt
def get_access_key(request):
    find_access_key = AccessKey.objects.all().first()
    serializer = AccessKeySerializer(find_access_key)
    return JsonResponse({ 'accessKey': serializer.data.get('access_key')}, safe=False, status=200)