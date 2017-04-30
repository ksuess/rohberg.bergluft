# -*- coding: utf-8 -*-
from datetime import date
from plone.app.registry.browser.controlpanel import ControlPanelFormWrapper
from plone.app.registry.browser.controlpanel import RegistryEditForm
from plone.z3cform import layout
from zope import schema
from zope.interface import Interface


class IBergluftControlPanel(Interface):

     channels = schema.List(
         title=u'Social Media Channels',
         description=u'["facebook","twitter","googleplus","linkedin", "pinterest", "tumblr","mail","print","info"] See Shariff for more channels.',
         default=[u'facebook', u'twitter', u'mail', u'info'],
         missing_value=[u'facebook', u'twitter', u'mail', u'info'],
         value_type=schema.TextLine(),
         required=False
     )



class BergluftControlPanelForm(RegistryEditForm):
    schema = IBergluftControlPanel
    schema_prefix = "bergluft"
    label = u'Bergluft Settings'


BergluftControlPanelView = layout.wrap_form(
    BergluftControlPanelForm, ControlPanelFormWrapper)