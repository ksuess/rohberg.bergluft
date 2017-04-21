# -*- coding: utf-8 -*-
"""Setup tests for this package."""
from rohberg.bergluft.testing import ROHBERG_BERGLUFT_INTEGRATION_TESTING  # noqa
from plone import api

import unittest


class TestSetup(unittest.TestCase):
    """Test that rohberg.bergluft is properly installed."""

    layer = ROHBERG_BERGLUFT_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer['portal']
        self.installer = api.portal.get_tool('portal_quickinstaller')

    def test_product_installed(self):
        """Test if rohberg.bergluft is installed."""
        self.assertTrue(self.installer.isProductInstalled(
            'rohberg.bergluft'))

    def test_browserlayer(self):
        """Test that IRohbergBergluftLayer is registered."""
        from rohberg.bergluft.interfaces import (
            IRohbergBergluftLayer)
        from plone.browserlayer import utils
        self.assertIn(IRohbergBergluftLayer, utils.registered_layers())


class TestUninstall(unittest.TestCase):

    layer = ROHBERG_BERGLUFT_INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer['portal']
        self.installer = api.portal.get_tool('portal_quickinstaller')
        self.installer.uninstallProducts(['rohberg.bergluft'])

    def test_product_uninstalled(self):
        """Test if rohberg.bergluft is cleanly uninstalled."""
        self.assertFalse(self.installer.isProductInstalled(
            'rohberg.bergluft'))

    def test_browserlayer_removed(self):
        """Test that IRohbergBergluftLayer is removed."""
        from rohberg.bergluft.interfaces import IRohbergBergluftLayer
        from plone.browserlayer import utils
        self.assertNotIn(IRohbergBergluftLayer, utils.registered_layers())
