# Generated by Django 5.1.2 on 2024-10-17 13:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0009_selectedprefrence_alter_profile_preferences'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='preferences',
            field=models.ManyToManyField(to='authentication.selectedprefrence'),
        ),
    ]