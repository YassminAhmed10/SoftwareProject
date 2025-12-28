# track_visitor/models.py
from django.db import models
from django.utils import timezone


class Visitor(models.Model):
    ip = models.GenericIPAddressField(unique=True)
    user_agent = models.CharField(max_length=255, blank=True, null=True)
    visit_count = models.IntegerField(default=0)
    first_visit = models.DateTimeField(auto_now_add=True)
    last_visit = models.DateTimeField(default=timezone.now)
    
    class Meta:
        ordering = ['-last_visit']
        verbose_name = 'Visitor'
        verbose_name_plural = 'Visitors'
    
    def __str__(self):
        return f"{self.ip} - {self.visit_count} visits"


class VisitorLog(models.Model):
    visitor = models.ForeignKey(Visitor, on_delete=models.CASCADE, related_name='logs')
    page_visited = models.CharField(max_length=255)
    referer = models.URLField(blank=True, null=True, max_length=500)
    user_agent = models.CharField(max_length=255, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-timestamp']
        verbose_name = 'Visitor Log'
        verbose_name_plural = 'Visitor Logs'
    
    def __str__(self):
        return f"{self.visitor.ip} - {self.page_visited} at {self.timestamp}"