from django.shortcuts import render
from cars.models import Car
from models.models import Model
from .models import Order
from django.http import JsonResponse

# Create your views here.

def main_view(request):
    qs = Car.objects.all()
    return render(request, 'orders/main.html', {'qs': qs})

def get_json_car_data(request):
    qs_val = list(Car.objects.values())
    return JsonResponse({'data':qs_val})

def get_json_model_data(request, *args, **kwargs):
    selected_car = kwargs.get('car')
    obj_models = list(Model.objects.filter(car__name=selected_car).values())
    return JsonResponse({'data':obj_models})

def create_order(request):
    if request.is_ajax():
        car = request.POST.get('car')
        print(car)
        car_obj = Car.objects.get(name=car)
        model = request.POST.get('model')
        print(model)
        model_obj = Model.objects.get(name=model, car__name=car_obj.name)
        Order.objects.create(car=car_obj, model=model_obj)
        return JsonResponse({'create':True})
    return JsonResponse({'created': False}, safe=False)