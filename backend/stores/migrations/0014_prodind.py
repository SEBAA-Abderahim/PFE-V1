# Generated by Django 3.1.5 on 2021-06-07 13:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stores', '0013_auto_20210605_1457'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProdInd',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=56)),
                ('mags', models.JSONField(blank=True, default=dict, null=True)),
            ],
        ),
    ]