# Generated by Django 5.1.2 on 2024-10-21 09:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0014_rename_preferences1_profile_preference1_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='preference1',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='preference2',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='preference3',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]