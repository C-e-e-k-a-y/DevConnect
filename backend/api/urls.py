from django.urls import path

from . import views

urlpatterns = [
    path("developers/", views.developers, name="developers"),
    path(
        "developers/<str:name>/technologies/",
        views.developer_technologies,
        name="developer-technologies",
    ),
    path(
        "developers/<str:name>/related/",
        views.related_developers,
        name="related-developers",
    ),
    path("search/", views.search_developers, name="search-developers"),
]
