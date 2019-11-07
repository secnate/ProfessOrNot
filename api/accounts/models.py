from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.db import models
from schools.models import School


class MyUserManager(BaseUserManager):
    def create_user(self, email, password, name, **extra_fields):
        if not email:
            raise ValueError('Email must be set')
        if not name:
            raise ValueError('Name must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save()
        return user

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, null=True)
    name = models.CharField(max_length=69)
    school = models.ForeignKey(School, on_delete=models.CASCADE, default=1)
    is_active = models.BooleanField(
        'active',
        default=True,
        help_text='Is the accounts account currently active',
    )
    USERNAME_FIELD = 'email'
    objects = MyUserManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name
    def get_email(self):
        return self.email