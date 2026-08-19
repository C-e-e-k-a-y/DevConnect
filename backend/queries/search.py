from api.database import driver


def get_developers_by_skill(skill):
    query = """
        MATCH (d:Developer)-[:HAS_SKILL]->(s:Skill)
        WHERE toLower(s.name) = toLower($skill)
        RETURN d
        ORDER BY d.name
    """

    with driver.session() as session:
        result = session.run(query, skill=skill)

        return [record["d"] for record in result]
