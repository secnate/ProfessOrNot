# Generated by Django 3.0.3 on 2020-02-17 17:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0003_auto_20200217_1615'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='quizquestion',
            options={'ordering': ['-id']},
        ),
    ]
