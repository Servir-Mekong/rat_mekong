# Generated by Django 3.2.8 on 2021-11-09 04:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('position', models.CharField(max_length=200)),
                ('about', models.TextField()),
                ('img', models.ImageField(upload_to='')),
                ('website', models.URLField()),
                ('linkedin', models.URLField()),
            ],
        ),
    ]
