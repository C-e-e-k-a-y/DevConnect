from django.urls import path

from . import views

urlpatterns = [
    path("developers/", views.developers, name="developers"),
    path("developers/<str:name>/", views.developer_profile, name="developer-profile"),
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
    path("graph/", views.graph_data, name="graph-data"),
]
