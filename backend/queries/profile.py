from api.database import driver


def get_developer_profile(developer_name):
    with driver.session() as session:

        developer_result = session.run(
            """
            MATCH (d:Developer)
            WHERE toLower(d.name) = toLower($developer_name)
            RETURN d
            """,
            developer_name=developer_name,
        )

        developer_record = developer_result.single()

        if developer_record is None:
            return None

        developer = developer_record["d"]

        skills_result = session.run(
            """
            MATCH (d:Developer)-[:HAS_SKILL]->(skill:Skill)
            WHERE toLower(d.name) = toLower($developer_name)
            RETURN skill
            ORDER BY skill.name
            """,
            developer_name=developer_name,
        )

        skills = [record["skill"] for record in skills_result]

        projects_result = session.run(
            """
            MATCH (d:Developer)-[:WORKED_ON]->(project:Project)
            WHERE toLower(d.name) = toLower($developer_name)
            RETURN project
            ORDER BY project.name
            """,
            developer_name=developer_name,
        )

        projects = [record["project"] for record in projects_result]

        technologies_result = session.run(
            """
            MATCH (d:Developer)-[:WORKED_ON]->(project:Project)
                  -[:USES]->(technology:Technology)
            WHERE toLower(d.name) = toLower($developer_name)
            RETURN DISTINCT technology
            ORDER BY technology.name
            """,
            developer_name=developer_name,
        )

        technologies = [record["technology"] for record in technologies_result]

        return {
            "developer": developer,
            "skills": skills,
            "projects": projects,
            "technologies": technologies,
        }
