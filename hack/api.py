from tastypie.resources import ModelResource
from tastypie import fields
from models import Company, EntryPoint, ICE

def dehydrate_children(self, bundle):
    """
    Filters out dead children and sorts them by lft.
    """
    live_children = [
        child for child
        in bundle.data.get('children')
        if child.data['live']
    ]
    sorted_children_by_uri = sorted(
        live_children,
        key=lambda child: child.data['position']
    )

    return sorted_children_by_uri

class ICEResource(ModelResource):

    class Meta:
        queryset = ICE.objects.all()
        resource_name = 'ice'
        ordering = 'order'

class EntryPointResource(ModelResource):
    ice = fields.ToManyField(ICEResource, 'ice', full=True) 

    def dehydrate(self, bundle):
        bundle.data['ice'] = sorted(bundle.data['ice'], key=lambda child: child.data['order'])
        return bundle

    class Meta:
        queryset = EntryPoint.objects.all()
        resource_name = 'entry_point'


class CompanyResource(ModelResource):
    entry_points = fields.ToManyField(EntryPointResource, 'entry_points', full=True) 

    class Meta:
        queryset = Company.objects.all()
        resource_name = 'company'
