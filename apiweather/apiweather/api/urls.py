from django.urls import include, path
from . import views

urlpatterns = [
    path('saveForecast', views.save_weather),
    path('listForecast', views.list_all_weather),
    path('deleteForecast/<int:forecast_id>', views.delete_forecast),
    path('saveAccessKey', views.save_access_key),
    path('getAccessKey', views.get_access_key)
]