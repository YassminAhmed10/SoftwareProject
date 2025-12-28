from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Creates test admin and employee users'

    def handle(self, *args, **kwargs):
        # Create admin user
        admin_email = 'yassmin@admin.com'
        if not User.objects.filter(email=admin_email).exists():
            admin = User.objects.create_user(
                username='yassmin_admin',
                email=admin_email,
                password='123',
                first_name='Yassmin',
                last_name='Admin',
                is_staff=True
            )
            self.stdout.write(self.style.SUCCESS(f'Successfully created admin user: {admin_email}'))
        else:
            self.stdout.write(self.style.WARNING(f'Admin user {admin_email} already exists'))

        # Create employee user
        employee_email = 'zeina@employee.com'
        if not User.objects.filter(email=employee_email).exists():
            employee = User.objects.create_user(
                username='zeina_employee',
                email=employee_email,
                password='456',
                first_name='Zeina',
                last_name='Employee'
            )
            self.stdout.write(self.style.SUCCESS(f'Successfully created employee user: {employee_email}'))
        else:
            self.stdout.write(self.style.WARNING(f'Employee user {employee_email} already exists'))

        self.stdout.write(self.style.SUCCESS('\nTest users created successfully!'))
        self.stdout.write(self.style.SUCCESS('Admin: yassmin@admin.com / 123'))
        self.stdout.write(self.style.SUCCESS('Employee: zeina@employee.com / 456'))
