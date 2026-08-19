from django.shortcuts import render
from django.http import JsonResponse

from queries.developers import get_all_developers
from queries.search import get_developers_by_skill
from queries.recommendations import (
    get_developer_technologies,
    get_related_developers,
)


def developers(request):
    if request.method != "GET":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    developers_data = get_all_developers()

    data = []

    for developer in developers_data:
        data.append(
            {
                "id": developer["id"],
                "name": developer["name"],
                "email": developer["email"],
                "role": developer["role"],
                "location": developer["location"],
            }
        )

    return JsonResponse({"developers": data})


def search_developers(request):
    if request.method != "GET":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    skill = request.GET.get("skill")

    if not skill:
        return JsonResponse({"error": "The 'skill' parameter is required"}, status=400)

    developers_data = get_developers_by_skill(skill)

    data = [
        {
            "id": developer["id"],
            "name": developer["name"],
            "email": developer["email"],
            "role": developer["role"],
            "location": developer["location"],
        }
        for developer in developers_data
    ]

    return JsonResponse({"skill": skill, "developers": data})


def developer_technologies(request, name):
    if request.method != "GET":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    technologies = get_developer_technologies(name)

    data = [
        {
            "id": technology["id"],
            "name": technology["name"],
            "category": technology["category"],
        }
        for technology in technologies
    ]

    return JsonResponse({"developer": name, "technologies": data})


def related_developers(request, name):
    if request.method != "GET":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    developers_data = get_related_developers(name)

    data = [
        {
            "name": developer["name"],
            "role": developer["role"],
            "location": developer["location"],
        }
        for developer in developers_data
    ]

    return JsonResponse({"developer": name, "related_developers": data})
