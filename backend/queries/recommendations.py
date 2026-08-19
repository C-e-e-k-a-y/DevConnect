from api.database import driver


def get_developer_technologies(developer_name):
    query = """
        MATCH (d:Developer)-[:WORKED_ON]->(p:Project)-[:USES]->(t:Technology)
        WHERE toLower(d.name) = toLower($developer_name)
        RETURN DISTINCT t
        ORDER BY t.name
    """

    with driver.session() as session:
        result = session.run(query, developer_name=developer_name)

        return [record["t"] for record in result]


# def get_related_developers(developer_name):
#     query = """
#         MATCH (me:Developer)-[:WORKED_ON]->(project:Project)
#               <-[:WORKED_ON]-(other:Developer)
#         WHERE toLower(me.name) = toLower($developer_name)
#           AND me <> other
#         RETURN DISTINCT other
#         ORDER BY other.name
#     """

#     with driver.session() as session:
#         result = session.run(
#             query,
#             developer_name=developer_name
#         )

#         return [record["other"] for record in result]


def get_related_developers(developer_name):
    query = """
        MATCH (me:Developer)-[:WORKED_ON]->(project:Project)
              <-[:WORKED_ON]-(other:Developer)
        WHERE toLower(me.name) = toLower($developer_name)
          AND me <> other
        RETURN DISTINCT other
        ORDER BY other.name
    """

    with driver.session() as session:
        result = session.run(query, developer_name=developer_name)

        return [record["other"] for record in result]
