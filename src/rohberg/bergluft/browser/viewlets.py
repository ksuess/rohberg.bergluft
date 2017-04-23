from plone.app.layout.viewlets import common as base

class GiganticHeaderViewlet(base.ViewletBase):
    """ Header with gigantic image
    """

    def show(self):
        # return self.context.aq_inner.id == "front-page"
        return True
