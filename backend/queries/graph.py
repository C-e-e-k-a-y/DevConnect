from api.database import driver


def get_graph_data():
    query = """
        MATCH (source)-[relationship]->(target)
        RETURN
            source,
            type(relationship) AS relationship_type,
            target
    """

    with driver.session() as session:
        result = session.run(query)

        nodes = {}
        links = []

        for record in result:
            source = record["source"]
            target = record["target"]
            relationship_type = record["relationship_type"]

            source_id = source["id"]
            target_id = target["id"]

            if source_id not in nodes:
                nodes[source_id] = {
                    "id": source_id,
                    "name": source["name"],
                    "type": list(source.labels)[0],
                }

            if target_id not in nodes:
                nodes[target_id] = {
                    "id": target_id,
                    "name": target["name"],
                    "type": list(target.labels)[0],
                }

            links.append(
                {
                    "source": source_id,
                    "target": target_id,
                    "relationship": relationship_type,
                }
            )

        return {
            "nodes": list(nodes.values()),
            "links": links,
        }
