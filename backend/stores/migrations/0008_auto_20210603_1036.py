# Generated by Django 3.1.5 on 2021-06-03 09:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stores', '0007_visite'),
    ]

    operations = [
        migrations.AlterField(
            model_name='produitmag',
            name='prix',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=15, null=True),
        ),
    ]
