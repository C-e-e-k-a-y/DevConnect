from api.database import driver


def get_all_developers():
    query = """
        MATCH (d:Developer)
        RETURN d
        ORDER BY d.name
    """

    with driver.session() as session:
        result = session.run(query)

        return [record["d"] for record in result]
