import os.path
from django_configglue.utils import configglue
from schema import FenchurchSchema

# get absolute path for config files
current_dir = os.path.dirname(os.path.abspath(__file__))
config_files = map(lambda x: os.path.join(current_dir, x),
        ['../cfg/main.cfg',
         '../../local_config/local.cfg',
         '../cfg/local.cfg'])

# make django aware of configglue-based configuration
configglue(FenchurchSchema, config_files, locals())
INSTALLED_APPS.append('django_jenkins')
