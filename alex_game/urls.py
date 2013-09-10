from django.conf.urls import patterns, include, url
from tastypie.api import Api
from hack.api import CompanyResource
from django.contrib import admin


admin.autodiscover()
v1_api = Api(api_name='v1')
v1_api.register(CompanyResource())

urlpatterns = patterns('',
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),

    (r'^api/', include(v1_api.urls)),
)
