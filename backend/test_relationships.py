from api.database import driver


def test_relationships():
    query = """
        MATCH (d:Developer)-[r:WORKED_ON]->(p:Project)
        RETURN d.name AS developer, type(r) AS relationship, p.name AS project
        ORDER BY developer
    """

    with driver.session() as session:
        result = session.run(query)

        for record in result:
            print(
                f"{record['developer']} "
                f"--{record['relationship']}--> "
                f"{record['project']}"
            )


if __name__ == "__main__":
    test_relationships()
