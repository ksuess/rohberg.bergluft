from plone.app.layout.viewlets import common as base
from plone import api
import json


class GiganticHeaderViewlet(base.ViewletBase):
    """ Header with gigantic image
    """

    def show(self):
        # return self.context.aq_inner.id == "front-page"
        return True



class ShariffViewlet(base.ViewletBase):
    """ Social Media Sharing with Heise Shariff
    """
    def getDataServices(self):
        channels = api.portal.get_registry_record('bergluft.channels')
        return json.dumps(channels)