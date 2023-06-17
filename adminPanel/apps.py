from django.apps import AppConfig

class AdminPanelConfig(AppConfig):
    name = 'adminPanel'

    def ready(self):
        import adminPanel.signals.signals
