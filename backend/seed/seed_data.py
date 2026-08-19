from api.database import driver


def seed_database():
    with driver.session() as session:
        session.run("""
            CREATE
                (kareem:Developer {
                    id: 'dev-001',
                    name: 'Kareem Adeyemi',
                    email: 'kareem@example.com',
                    role: 'Frontend Developer',
                    location: 'Lagos'
                }),

                (sarah:Developer {
                    id: 'dev-002',
                    name: 'Sarah Williams',
                    email: 'sarah@example.com',
                    role: 'Backend Developer',
                    location: 'Abuja'
                }),

                (david:Developer {
                    id: 'dev-003',
                    name: 'David Okafor',
                    email: 'david@example.com',
                    role: 'Full Stack Developer',
                    location: 'Lagos'
                }),

                (react:Skill {
                    id: 'skill-001',
                    name: 'React',
                    category: 'Frontend'
                }),

                (python:Skill {
                    id: 'skill-002',
                    name: 'Python',
                    category: 'Backend'
                }),

                (django:Skill {
                    id: 'skill-003',
                    name: 'Django',
                    category: 'Backend'
                }),

                (ecommerce:Project {
                    id: 'project-001',
                    name: 'E-Commerce Platform',
                    description: 'An online shopping platform',
                    status: 'Completed'
                }),

                (school:Project {
                    id: 'project-002',
                    name: 'School Management System',
                    description: 'A platform for managing school activities',
                    status: 'In Progress'
                }),

                (postgres:Technology {
                    id: 'tech-001',
                    name: 'PostgreSQL',
                    category: 'Database'
                }),

                (javascript:Technology {
                    id: 'tech-002',
                    name: 'JavaScript',
                    category: 'Programming Language'
                }),

                (kareem)-[:HAS_SKILL]->(react),
                (kareem)-[:HAS_SKILL]->(javascript),
                (sarah)-[:HAS_SKILL]->(python),
                (sarah)-[:HAS_SKILL]->(django),
                (david)-[:HAS_SKILL]->(react),
                (david)-[:HAS_SKILL]->(python),

                (kareem)-[:WORKED_ON]->(ecommerce),
                (sarah)-[:WORKED_ON]->(school),
                (david)-[:WORKED_ON]->(ecommerce),

                (ecommerce)-[:USES]->(postgres),
                (ecommerce)-[:USES]->(javascript),

                (kareem)-[:FOLLOWS]->(sarah),
                (sarah)-[:FOLLOWS]->(david),
                (david)-[:FOLLOWS]->(kareem)
        """)

        print("Database seeded successfully!")


if __name__ == "__main__":
    seed_database()
