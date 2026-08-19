from api.database import driver


def seed_database():
    with driver.session() as session:

        # Clear existing development data
        session.run("""
            MATCH (n)
            DETACH DELETE n
        """)

        session.run("""
            CREATE

                // =========================
                // DEVELOPERS
                // =========================

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

                // =========================
                // SKILLS
                // =========================

                (reactSkill:Skill {
                    id: 'skill-001',
                    name: 'React',
                    category: 'Frontend'
                }),

                (javascriptSkill:Skill {
                    id: 'skill-002',
                    name: 'JavaScript',
                    category: 'Programming Language'
                }),

                (pythonSkill:Skill {
                    id: 'skill-003',
                    name: 'Python',
                    category: 'Backend'
                }),

                (djangoSkill:Skill {
                    id: 'skill-004',
                    name: 'Django',
                    category: 'Backend'
                }),

                // =========================
                // PROJECTS
                // =========================

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

                // =========================
                // TECHNOLOGIES
                // =========================

                (postgres:Technology {
                    id: 'tech-001',
                    name: 'PostgreSQL',
                    category: 'Database'
                }),

                (javascriptTech:Technology {
                    id: 'tech-002',
                    name: 'JavaScript',
                    category: 'Programming Language'
                }),

                (reactTech:Technology {
                    id: 'tech-003',
                    name: 'React',
                    category: 'Frontend Framework'
                }),

                (djangoTech:Technology {
                    id: 'tech-004',
                    name: 'Django',
                    category: 'Backend Framework'
                }),

                // =========================
                // SKILL RELATIONSHIPS
                // =========================

                (kareem)-[:HAS_SKILL]->(reactSkill),
                (kareem)-[:HAS_SKILL]->(javascriptSkill),

                (sarah)-[:HAS_SKILL]->(pythonSkill),
                (sarah)-[:HAS_SKILL]->(djangoSkill),

                (david)-[:HAS_SKILL]->(reactSkill),
                (david)-[:HAS_SKILL]->(pythonSkill),
                (david)-[:HAS_SKILL]->(javascriptSkill),

                // =========================
                // PROJECT RELATIONSHIPS
                // =========================

                (kareem)-[:WORKED_ON]->(ecommerce),
                (sarah)-[:WORKED_ON]->(school),
                (david)-[:WORKED_ON]->(ecommerce),

                // =========================
                // TECHNOLOGY RELATIONSHIPS
                // =========================

                (ecommerce)-[:USES]->(postgres),
                (ecommerce)-[:USES]->(javascriptTech),
                (ecommerce)-[:USES]->(reactTech),

                (school)-[:USES]->(postgres),
                (school)-[:USES]->(djangoTech),
                (school)-[:USES]->(javascriptTech),

                // =========================
                // FOLLOW RELATIONSHIPS
                // =========================

                (kareem)-[:FOLLOWS]->(sarah),
                (sarah)-[:FOLLOWS]->(david),
                (david)-[:FOLLOWS]->(kareem)
        """)

        print("Database seeded successfully!")


if __name__ == "__main__":
    seed_database()
