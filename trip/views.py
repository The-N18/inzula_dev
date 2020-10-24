from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Trip
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import TripSerializer

class TripViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    """
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
