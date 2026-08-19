from queries.recommendations import (
    get_developer_technologies,
    get_related_developers,
)

print("\n--- Kareem's Technologies ---")

technologies = get_developer_technologies("Kareem Adeyemi")

for technology in technologies:
    print(technology["name"])


print("\n--- Developers Related to Kareem ---")

developers = get_related_developers("Kareem Adeyemi")

for developer in developers:
    print(developer["name"])
