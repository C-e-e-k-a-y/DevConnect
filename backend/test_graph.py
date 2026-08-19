from api.database import driver


def test_graph():
    with driver.session() as session:
        result = session.run("""
            MATCH (d:Developer)
            RETURN d.name AS name, d.role AS role
        """)

        for record in result:
            print(f"{record['name']} - {record['role']}")


if __name__ == "__main__":
    test_graph()
