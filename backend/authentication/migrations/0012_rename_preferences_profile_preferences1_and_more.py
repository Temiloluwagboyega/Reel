# Generated by Django 5.1.2 on 2024-10-17 16:21

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0011_remove_profile_preferences_profile_preferences'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='preferences',
            new_name='preferences1',
        ),
        migrations.AddField(
            model_name='profile',
            name='preferences2',
            field=models.CharField(default=django.utils.timezone.now, max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profile',
            name='preferences3',
            field=models.CharField(default=django.utils.timezone.now, max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profile',
            name='preferences4',
            field=models.CharField(default=django.utils.timezone.now, max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profile',
            name='preferences5',
            field=models.CharField(default=django.utils.timezone.now, max_length=50),
            preserve_default=False,
        ),
    ]