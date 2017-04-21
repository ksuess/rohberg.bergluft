# -*- coding: utf-8 -*-
from plone.app.contenttypes.testing import PLONE_APP_CONTENTTYPES_FIXTURE
from plone.app.robotframework.testing import REMOTE_LIBRARY_BUNDLE_FIXTURE
from plone.app.testing import applyProfile
from plone.app.testing import FunctionalTesting
from plone.app.testing import IntegrationTesting
from plone.app.testing import PloneSandboxLayer
from plone.testing import z2

import rohberg.bergluft


class RohbergBergluftLayer(PloneSandboxLayer):

    defaultBases = (PLONE_APP_CONTENTTYPES_FIXTURE,)

    def setUpZope(self, app, configurationContext):
        # Load any other ZCML that is required for your tests.
        # The z3c.autoinclude feature is disabled in the Plone fixture base
        # layer.
        self.loadZCML(package=rohberg.bergluft)

    def setUpPloneSite(self, portal):
        applyProfile(portal, 'rohberg.bergluft:default')


ROHBERG_BERGLUFT_FIXTURE = RohbergBergluftLayer()


ROHBERG_BERGLUFT_INTEGRATION_TESTING = IntegrationTesting(
    bases=(ROHBERG_BERGLUFT_FIXTURE,),
    name='RohbergBergluftLayer:IntegrationTesting'
)


ROHBERG_BERGLUFT_FUNCTIONAL_TESTING = FunctionalTesting(
    bases=(ROHBERG_BERGLUFT_FIXTURE,),
    name='RohbergBergluftLayer:FunctionalTesting'
)


ROHBERG_BERGLUFT_ACCEPTANCE_TESTING = FunctionalTesting(
    bases=(
        ROHBERG_BERGLUFT_FIXTURE,
        REMOTE_LIBRARY_BUNDLE_FIXTURE,
        z2.ZSERVER_FIXTURE
    ),
    name='RohbergBergluftLayer:AcceptanceTesting'
)
