# Generated by Django 4.0.4 on 2022-04-20 02:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts_app', '0002_remove_userprofile_id_alter_userprofile_user'),
        ('comments_rackets_app', '0004_racket_secondary_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='racket',
            name='points',
            field=models.FloatField(default=0),
        ),
        migrations.CreateModel(
            name='RatingComment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comments', models.TextField(blank=True)),
                ('spin_rating', models.FloatField(default=6)),
                ('maneuverable_rating', models.FloatField(default=6)),
                ('flexibility_rating', models.FloatField(default=6)),
                ('comfort_rating', models.FloatField(default=6)),
                ('control_rating', models.FloatField(default=6)),
                ('power_rating', models.FloatField(default=6)),
                ('serving_rating', models.FloatField(default=6)),
                ('stable_rating', models.FloatField(default=6)),
                ('racket_sweet_spot_rating', models.FloatField(default=6)),
                ('volley_rating', models.FloatField(default=6)),
                ('overall_rating', models.FloatField(default=0)),
                ('audience', models.CharField(default='Beginner', max_length=50)),
                ('racket', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='comments_rackets_app.racket')),
                ('userprofile', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='accounts_app.userprofile')),
            ],
        ),
        migrations.CreateModel(
            name='OverallRacketRating',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('spin_rating', models.FloatField(default=0)),
                ('maneuverable_rating', models.FloatField(default=0)),
                ('flexibility_rating', models.FloatField(default=0)),
                ('comfort_rating', models.FloatField(default=0)),
                ('control_rating', models.FloatField(default=0)),
                ('power_rating', models.FloatField(default=0)),
                ('serving_rating', models.FloatField(default=0)),
                ('stable_rating', models.FloatField(default=0)),
                ('racket_sweet_spot_rating', models.FloatField(default=0)),
                ('volley_rating', models.FloatField(default=0)),
                ('audience_beginner', models.FloatField(default=0)),
                ('audience_intermediate', models.FloatField(default=0)),
                ('audience_advanced', models.FloatField(default=0)),
                ('racket', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='comments_rackets_app.racket')),
            ],
        ),
    ]