from django.contrib import admin
from .models import Team
from .models import APIKey

@admin.register(APIKey)
class APIKeyAdmin(admin.ModelAdmin):
    list_display = ('user', 'key_name', 'key', 'created_at', 'updated_at')
    readonly_fields = ('key',) 
    
admin.site.register(Team)
