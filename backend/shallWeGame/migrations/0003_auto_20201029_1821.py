# Generated by Django 3.1.2 on 2020-10-29 18:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shallWeGame', '0002_auto_20201029_1817'),
    ]

    operations = [
        migrations.AlterField(
            model_name='discorduser',
            name='avatar',
            field=models.CharField(max_length=100, null=True),
        ),
    ]