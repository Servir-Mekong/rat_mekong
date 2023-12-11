from rest_framework import serializers

class InflowSerializer(serializers.Serializer):
    date = serializers.CharField() #.DateField()
    inflow = serializers.DecimalField(max_digits=20, decimal_places=0)

class OutflowSerializer(serializers.Serializer):
    date = serializers.DateField()
    outflow = serializers.DecimalField(max_digits=20, decimal_places=0)