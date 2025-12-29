# tasks/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('pending/', views.pending_tasks, name='pending_tasks'),
    path('complete/<int:task_id>/', views.complete_task, name='complete_task'),
    path('create/', views.create_task, name='create_task'),
    path('all/', views.all_tasks, name='all_tasks'),
    path('<int:task_id>/', views.task_detail, name='task_detail'),
    path('<int:task_id>/update/', views.update_task, name='update_task'),
    path('<int:task_id>/delete/', views.delete_task, name='delete_task'),
    path('priority/<str:priority>/', views.tasks_by_priority, name='tasks_by_priority'),
    path('', views.task_list, name='task_list'),
]