# Generated by Django 3.1.5 on 2021-05-11 13:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('stores', '0003_communes_wilayas'),
    ]

    operations = [
        migrations.AlterField(
            model_name='communes',
            name='wilaya',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='stores.wilayas'),
        ),
    ]
