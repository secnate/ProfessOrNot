# Generated by Django 3.0.3 on 2020-02-17 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='quizquestion',
            name='type',
            field=models.CharField(default='sc', max_length=2),
        ),
    ]