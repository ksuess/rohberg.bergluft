import json
import datetime
import pytz
import math

from plone.app.layout.viewlets import common as base
from plone import api

from Products.CMFCore.utils import getToolByName

def format_datetime_friendly_ago(date):
    """ Format date & time using site specific settings.

    @param date: datetime object
    """
    if date == None:
        return ""

    date = date.asdatetime() # zope DateTime -> python datetime

    # How long ago the timestamp is
    # See timedelta doc http://docs.python.org/lib/datetime-timedelta.html
    #since = datetime.datetime.utcnow() - date

    now = datetime.datetime.utcnow()
    now = now.replace(tzinfo=pytz.utc)

    since = now - date

    seconds = since.seconds + since.microseconds / 1E6 + since.days * 86400

    days = math.floor(seconds / (3600*24))

    if days <= 0 and seconds <= 0:
        # Timezone confusion, is in future
        return "moment ago"

    if days > 7:
        # Full date
        return date.strftime("%d.%m.%Y")
        # return date.strftime("%d.%m.%Y %H:%M")
    elif days >= 1:
        # Week day format
        return date.strftime("%A %H:%M")
    else:
        hours = math.floor(seconds/3600.0)
        minutes = math.floor((seconds % 3600) /60)
        if hours > 0:
            return "%d hours %d minutes ago" % (hours, minutes)
        else:
            if minutes > 0:
                return "%d minutes ago" % minutes
            else:
                return "few seconds ago"
                
                
class GiganticHeaderViewlet(base.ViewletBase):
    """ Header with gigantic image
    """

    def show(self):
        # return self.context.aq_inner.id == "front-page"
        return True



class ShariffViewlet(base.ViewletBase):
    """ Social Media Sharing with Heise Shariff
    """
    def show(self):
        shareable = getattr(self.context.aq_parent, "shareable", False)
        return shareable

    def getDataServices(self):
        channels = api.portal.get_registry_record('bergluft.channels')
        return json.dumps(channels)

class BergluftBylineViewlet(base.ViewletBase):
    """
    """

    def toLocalizedTime(self, time, long_format=None, time_only=None):
        """Convert time to localized time
        """
        util = getToolByName(self.context, 'translation_service')
        return util.ulocalized_time(time, long_format, time_only, self.context,
                                    domain='plonelocales')
                                    # 
    def getPubDate(self):
        dt = self.context.effective_date or self.context.modification_date
        dt_friendly = format_datetime_friendly_ago(dt)
        return dt_friendly

class GoogleTagManagerViewlet(base.ViewletBase):
    """ two snippets: header and body
    
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-schnupsi');</script>
    <!-- End Google Tag Manager -->
    
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-schnupsi"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    """

    def show(self):
        return True
        
    def GTMCode(self):
        gtmc = api.portal.get_registry_record('bergluft.GTMCode')
        return gtmc
        