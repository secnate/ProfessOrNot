# Generated by Django 3.0.3 on 2020-02-17 17:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0005_auto_20200217_1710'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='quizquestion',
            options={'ordering': ['id']},
        ),
    ]