from api.database import driver


def test_skills():
    query = """
        MATCH (d:Developer)-[:HAS_SKILL]->(skill:Skill)
        WHERE d.name = $developer_name
        RETURN skill.name AS skill
        ORDER BY skill.name
    """

    with driver.session() as session:
        result = session.run(query, developer_name="Kareem Adeyemi")

        for record in result:
            print(record["skill"])


if __name__ == "__main__":
    test_skills()
