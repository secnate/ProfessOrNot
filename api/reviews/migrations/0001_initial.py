# Generated by Django 2.2.6 on 2019-11-08 03:19

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('professors', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('courses', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('rating', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)])),
                ('comment', models.CharField(default='', max_length=255)),
                ('course', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='courses.Course')),
                ('professor', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='professors.Professor')),
                ('reviewer', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('reviewer', 'professor', 'course')},
            },
        ),
    ]
