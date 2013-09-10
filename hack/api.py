from tastypie.resources import ModelResource
from tastypie import fields
from models import Company, EntryPoint, ICE


class ICEResource(ModelResource):

    class Meta:
        queryset = ICE.objects.all()
        resource_name = 'entry_point'


class EntryPointResource(ModelResource):
    ice = fields.ToManyField(ICEResource, 'ice', full=True) 

    class Meta:
        queryset = EntryPoint.objects.all()
        resource_name = 'entry_point'


class CompanyResource(ModelResource):
    entry_points = fields.ToManyField(EntryPointResource, 'entry_points', full=True) 

    class Meta:
        queryset = Company.objects.all()
        resource_name = 'company'
