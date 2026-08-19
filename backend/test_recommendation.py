from api.database import driver


def test_recommendation():
    query = """
        MATCH (me:Developer)-[:WORKED_ON]->(project:Project)
              <-[:WORKED_ON]-(other:Developer)
        WHERE toLower(me.name) = toLower($developer_name)
          AND me <> other
        RETURN DISTINCT other.name AS developer, project.name AS shared_project
    """

    with driver.session() as session:
        result = session.run(query, developer_name="Kareem Adeyemi")

        for record in result:
            print(
                f"{record['developer']} "
                f"--> shared project: {record['shared_project']}"
            )


if __name__ == "__main__":
    test_recommendation()
