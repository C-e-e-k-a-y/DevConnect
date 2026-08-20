from api.database import driver


def seed_database():
    with driver.session() as session:

        # CLEAR EXISTING DEVELOPMENT DATA

        session.run("""
            MATCH (n)
            DETACH DELETE n
        """)

        session.run("""
            CREATE

            // ============================================
            // DEVELOPERS
            // ============================================

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

            (aisha:Developer {
                id: 'dev-004',
                name: 'Aisha Bello',
                email: 'aisha@example.com',
                role: 'Full Stack Developer',
                location: 'Lagos'
            }),

            (michael:Developer {
                id: 'dev-005',
                name: 'Michael Chen',
                email: 'michael@example.com',
                role: 'Backend Developer',
                location: 'Port Harcourt'
            }),

            (chinedu:Developer {
                id: 'dev-006',
                name: 'Chinedu Eze',
                email: 'chinedu@example.com',
                role: 'Frontend Developer',
                location: 'Enugu'
            }),

            (grace:Developer {
                id: 'dev-007',
                name: 'Grace Mensah',
                email: 'grace@example.com',
                role: 'Full Stack Developer',
                location: 'Accra'
            }),

            (daniel:Developer {
                id: 'dev-008',
                name: 'Daniel Adekunle',
                email: 'daniel@example.com',
                role: 'Backend Developer',
                location: 'Ibadan'
            }),

            (fatima:Developer {
                id: 'dev-009',
                name: 'Fatima Ibrahim',
                email: 'fatima@example.com',
                role: 'Frontend Developer',
                location: 'Kano'
            }),

            (samuel:Developer {
                id: 'dev-010',
                name: 'Samuel Johnson',
                email: 'samuel@example.com',
                role: 'DevOps Engineer',
                location: 'Lagos'
            }),

            (blessing:Developer {
                id: 'dev-011',
                name: 'Blessing Okoro',
                email: 'blessing@example.com',
                role: 'Frontend Developer',
                location: 'Owerri'
            }),

            (ibrahim:Developer {
                id: 'dev-012',
                name: 'Ibrahim Musa',
                email: 'ibrahim@example.com',
                role: 'Backend Developer',
                location: 'Kaduna'
            }),

            (olivia:Developer {
                id: 'dev-013',
                name: 'Olivia Thompson',
                email: 'olivia@example.com',
                role: 'Full Stack Developer',
                location: 'Lagos'
            }),

            (tunde:Developer {
                id: 'dev-014',
                name: 'Tunde Balogun',
                email: 'tunde@example.com',
                role: 'Software Engineer',
                location: 'Lagos'
            }),

            (esther:Developer {
                id: 'dev-015',
                name: 'Esther Nwosu',
                email: 'esther@example.com',
                role: 'Backend Developer',
                location: 'Enugu'
            }),


            // ============================================
            // SKILLS
            // ============================================

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

            (nodeSkill:Skill {
                id: 'skill-005',
                name: 'Node.js',
                category: 'Backend'
            }),

            (typescriptSkill:Skill {
                id: 'skill-006',
                name: 'TypeScript',
                category: 'Programming Language'
            }),

            (postgresSkill:Skill {
                id: 'skill-007',
                name: 'PostgreSQL',
                category: 'Database'
            }),

            (mongodbSkill:Skill {
                id: 'skill-008',
                name: 'MongoDB',
                category: 'Database'
            }),

            (graphSkill:Skill {
                id: 'skill-009',
                name: 'Graph Databases',
                category: 'Database'
            }),

            (restSkill:Skill {
                id: 'skill-010',
                name: 'REST API',
                category: 'Backend'
            }),

            (tailwindSkill:Skill {
                id: 'skill-011',
                name: 'Tailwind CSS',
                category: 'Frontend'
            }),


            // ============================================
            // PROJECTS
            // ============================================

            (ecommerce:Project {
                id: 'project-001',
                name: 'E-Commerce Platform',
                description: 'An online shopping platform with product management, payments and order processing.',
                status: 'Completed'
            }),

            (school:Project {
                id: 'project-002',
                name: 'School Management System',
                description: 'A platform for managing students, courses, grades and school activities.',
                status: 'In Progress'
            }),

            (healthconnect:Project {
                id: 'project-003',
                name: 'HealthConnect',
                description: 'A healthcare platform connecting patients with healthcare professionals.',
                status: 'Completed'
            }),

            (fintrack:Project {
                id: 'project-004',
                name: 'FinTrack',
                description: 'A personal finance management platform for tracking income and expenses.',
                status: 'In Progress'
            }),

            (devconnect:Project {
                id: 'project-005',
                name: 'DevConnect',
                description: 'A developer networking platform for discovering developers through skills, projects and technologies.',
                status: 'Completed'
            }),

            (eventhub:Project {
                id: 'project-006',
                name: 'EventHub',
                description: 'An event discovery and management platform.',
                status: 'Completed'
            }),

            (lms:Project {
                id: 'project-007',
                name: 'Learning Management System',
                description: 'An online platform for managing courses, lessons, assignments and student progress.',
                status: 'In Progress'
            }),

            (taskflow:Project {
                id: 'project-008',
                name: 'TaskFlow',
                description: 'A collaborative project and task management application.',
                status: 'Completed'
            }),


            // ============================================
            // TECHNOLOGIES
            // ============================================

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

            (nodeTech:Technology {
                id: 'tech-005',
                name: 'Node.js',
                category: 'Runtime'
            }),

            (typescriptTech:Technology {
                id: 'tech-006',
                name: 'TypeScript',
                category: 'Programming Language'
            }),

            (mongodbTech:Technology {
                id: 'tech-007',
                name: 'MongoDB',
                category: 'Database'
            }),

            (neo4jTech:Technology {
                id: 'tech-008',
                name: 'Neo4j',
                category: 'Graph Database'
            }),

            (redisTech:Technology {
                id: 'tech-009',
                name: 'Redis',
                category: 'Caching'
            }),

            (dockerTech:Technology {
                id: 'tech-010',
                name: 'Docker',
                category: 'DevOps'
            }),

            (expressTech:Technology {
                id: 'tech-011',
                name: 'Express.js',
                category: 'Backend Framework'
            }),

            (tailwindTech:Technology {
                id: 'tech-012',
                name: 'Tailwind CSS',
                category: 'CSS Framework'
            }),


            // ============================================
            // HAS_SKILL RELATIONSHIPS
            // ============================================

            // Kareem
            (kareem)-[:HAS_SKILL]->(reactSkill),
            (kareem)-[:HAS_SKILL]->(javascriptSkill),
            (kareem)-[:HAS_SKILL]->(typescriptSkill),

            // Sarah
            (sarah)-[:HAS_SKILL]->(pythonSkill),
            (sarah)-[:HAS_SKILL]->(djangoSkill),
            (sarah)-[:HAS_SKILL]->(restSkill),

            // David
            (david)-[:HAS_SKILL]->(reactSkill),
            (david)-[:HAS_SKILL]->(pythonSkill),
            (david)-[:HAS_SKILL]->(javascriptSkill),
            (david)-[:HAS_SKILL]->(restSkill),

            // Aisha
            (aisha)-[:HAS_SKILL]->(reactSkill),
            (aisha)-[:HAS_SKILL]->(nodeSkill),
            (aisha)-[:HAS_SKILL]->(typescriptSkill),
            (aisha)-[:HAS_SKILL]->(mongodbSkill),

            // Michael
            (michael)-[:HAS_SKILL]->(pythonSkill),
            (michael)-[:HAS_SKILL]->(nodeSkill),
            (michael)-[:HAS_SKILL]->(postgresSkill),
            (michael)-[:HAS_SKILL]->(restSkill),

            // Chinedu
            (chinedu)-[:HAS_SKILL]->(reactSkill),
            (chinedu)-[:HAS_SKILL]->(javascriptSkill),
            (chinedu)-[:HAS_SKILL]->(typescriptSkill),

            // Grace
            (grace)-[:HAS_SKILL]->(pythonSkill),
            (grace)-[:HAS_SKILL]->(reactSkill),
            (grace)-[:HAS_SKILL]->(djangoSkill),
            (grace)-[:HAS_SKILL]->(restSkill),

            // Daniel
            (daniel)-[:HAS_SKILL]->(pythonSkill),
            (daniel)-[:HAS_SKILL]->(djangoSkill),
            (daniel)-[:HAS_SKILL]->(postgresSkill),

            // Fatima
            (fatima)-[:HAS_SKILL]->(reactSkill),
            (fatima)-[:HAS_SKILL]->(javascriptSkill),
            (fatima)-[:HAS_SKILL]->(tailwindSkill),

            // Samuel
            (samuel)-[:HAS_SKILL]->(nodeSkill),
            (samuel)-[:HAS_SKILL]->(typescriptSkill),
            (samuel)-[:HAS_SKILL]->(graphSkill),

            // Blessing
            (blessing)-[:HAS_SKILL]->(reactSkill),
            (blessing)-[:HAS_SKILL]->(javascriptSkill),
            (blessing)-[:HAS_SKILL]->(typescriptSkill),

            // Ibrahim
            (ibrahim)-[:HAS_SKILL]->(pythonSkill),
            (ibrahim)-[:HAS_SKILL]->(djangoSkill),
            (ibrahim)-[:HAS_SKILL]->(mongodbSkill),
            (ibrahim)-[:HAS_SKILL]->(restSkill),

            // Olivia
            (olivia)-[:HAS_SKILL]->(reactSkill),
            (olivia)-[:HAS_SKILL]->(nodeSkill),
            (olivia)-[:HAS_SKILL]->(typescriptSkill),
            (olivia)-[:HAS_SKILL]->(graphSkill),

            // Tunde
            (tunde)-[:HAS_SKILL]->(javascriptSkill),
            (tunde)-[:HAS_SKILL]->(nodeSkill),
            (tunde)-[:HAS_SKILL]->(postgresSkill),
            (tunde)-[:HAS_SKILL]->(restSkill),

            // Esther
            (esther)-[:HAS_SKILL]->(pythonSkill),
            (esther)-[:HAS_SKILL]->(djangoSkill),
            (esther)-[:HAS_SKILL]->(postgresSkill),
            (esther)-[:HAS_SKILL]->(graphSkill),


            // ============================================
            // WORKED_ON RELATIONSHIPS
            // ============================================

            // E-Commerce Platform
            (kareem)-[:WORKED_ON]->(ecommerce),
            (david)-[:WORKED_ON]->(ecommerce),
            (aisha)-[:WORKED_ON]->(ecommerce),
            (chinedu)-[:WORKED_ON]->(ecommerce),

            // School Management System
            (sarah)-[:WORKED_ON]->(school),
            (david)-[:WORKED_ON]->(school),
            (daniel)-[:WORKED_ON]->(school),
            (esther)-[:WORKED_ON]->(school),

            // HealthConnect
            (aisha)-[:WORKED_ON]->(healthconnect),
            (michael)-[:WORKED_ON]->(healthconnect),
            (grace)-[:WORKED_ON]->(healthconnect),
            (ibrahim)-[:WORKED_ON]->(healthconnect),

            // FinTrack
            (michael)-[:WORKED_ON]->(fintrack),
            (tunde)-[:WORKED_ON]->(fintrack),
            (olivia)-[:WORKED_ON]->(fintrack),

            // DevConnect
            (kareem)-[:WORKED_ON]->(devconnect),
            (samuel)-[:WORKED_ON]->(devconnect),
            (olivia)-[:WORKED_ON]->(devconnect),
            (esther)-[:WORKED_ON]->(devconnect),

            // EventHub
            (chinedu)-[:WORKED_ON]->(eventhub),
            (fatima)-[:WORKED_ON]->(eventhub),
            (blessing)-[:WORKED_ON]->(eventhub),
            (tunde)-[:WORKED_ON]->(eventhub),

            // Learning Management System
            (sarah)-[:WORKED_ON]->(lms),
            (grace)-[:WORKED_ON]->(lms),
            (daniel)-[:WORKED_ON]->(lms),
            (ibrahim)-[:WORKED_ON]->(lms),

            // TaskFlow
            (david)-[:WORKED_ON]->(taskflow),
            (michael)-[:WORKED_ON]->(taskflow),
            (samuel)-[:WORKED_ON]->(taskflow),
            (olivia)-[:WORKED_ON]->(taskflow),


            // ============================================
            // TECHNOLOGY RELATIONSHIPS
            // ============================================

            // E-Commerce Platform
            (ecommerce)-[:USES]->(postgres),
            (ecommerce)-[:USES]->(javascriptTech),
            (ecommerce)-[:USES]->(reactTech),
            (ecommerce)-[:USES]->(tailwindTech),

            // School Management System
            (school)-[:USES]->(postgres),
            (school)-[:USES]->(djangoTech),
            (school)-[:USES]->(javascriptTech),
            (school)-[:USES]->(redisTech),

            // HealthConnect
            (healthconnect)-[:USES]->(postgres),
            (healthconnect)-[:USES]->(djangoTech),
            (healthconnect)-[:USES]->(reactTech),
            (healthconnect)-[:USES]->(redisTech),

            // FinTrack
            (fintrack)-[:USES]->(nodeTech),
            (fintrack)-[:USES]->(typescriptTech),
            (fintrack)-[:USES]->(postgres),
            (fintrack)-[:USES]->(redisTech),

            // DevConnect
            (devconnect)-[:USES]->(reactTech),
            (devconnect)-[:USES]->(javascriptTech),
            (devconnect)-[:USES]->(neo4jTech),
            (devconnect)-[:USES]->(djangoTech),

            // EventHub
            (eventhub)-[:USES]->(reactTech),
            (eventhub)-[:USES]->(nodeTech),
            (eventhub)-[:USES]->(mongodbTech),
            (eventhub)-[:USES]->(tailwindTech),

            // Learning Management System
            (lms)-[:USES]->(djangoTech),
            (lms)-[:USES]->(reactTech),
            (lms)-[:USES]->(postgres),
            (lms)-[:USES]->(redisTech),

            // TaskFlow
            (taskflow)-[:USES]->(reactTech),
            (taskflow)-[:USES]->(nodeTech),
            (taskflow)-[:USES]->(mongodbTech),
            (taskflow)-[:USES]->(typescriptTech),


            // ============================================
            // FOLLOWS RELATIONSHIPS
            // ============================================

            (kareem)-[:FOLLOWS]->(sarah),
            (kareem)-[:FOLLOWS]->(david),
            (kareem)-[:FOLLOWS]->(aisha),

            (sarah)-[:FOLLOWS]->(david),
            (sarah)-[:FOLLOWS]->(grace),
            (sarah)-[:FOLLOWS]->(daniel),

            (david)-[:FOLLOWS]->(kareem),
            (david)-[:FOLLOWS]->(aisha),
            (david)-[:FOLLOWS]->(michael),

            (aisha)-[:FOLLOWS]->(kareem),
            (aisha)-[:FOLLOWS]->(olivia),
            (aisha)-[:FOLLOWS]->(grace),

            (michael)-[:FOLLOWS]->(aisha),
            (michael)-[:FOLLOWS]->(tunde),
            (michael)-[:FOLLOWS]->(samuel),

            (chinedu)-[:FOLLOWS]->(kareem),
            (chinedu)-[:FOLLOWS]->(fatima),
            (chinedu)-[:FOLLOWS]->(blessing),

            (grace)-[:FOLLOWS]->(sarah),
            (grace)-[:FOLLOWS]->(olivia),
            (grace)-[:FOLLOWS]->(ibrahim),

            (daniel)-[:FOLLOWS]->(sarah),
            (daniel)-[:FOLLOWS]->(esther),
            (daniel)-[:FOLLOWS]->(ibrahim),

            (fatima)-[:FOLLOWS]->(chinedu),
            (fatima)-[:FOLLOWS]->(blessing),
            (fatima)-[:FOLLOWS]->(olivia),

            (samuel)-[:FOLLOWS]->(olivia),
            (samuel)-[:FOLLOWS]->(tunde),
            (samuel)-[:FOLLOWS]->(david),

            (blessing)-[:FOLLOWS]->(fatima),
            (blessing)-[:FOLLOWS]->(chinedu),
            (blessing)-[:FOLLOWS]->(kareem),

            (ibrahim)-[:FOLLOWS]->(daniel),
            (ibrahim)-[:FOLLOWS]->(grace),
            (ibrahim)-[:FOLLOWS]->(esther),

            (olivia)-[:FOLLOWS]->(aisha),
            (olivia)-[:FOLLOWS]->(samuel),
            (olivia)-[:FOLLOWS]->(tunde),

            (tunde)-[:FOLLOWS]->(michael),
            (tunde)-[:FOLLOWS]->(samuel),
            (tunde)-[:FOLLOWS]->(olivia),

            (esther)-[:FOLLOWS]->(daniel),
            (esther)-[:FOLLOWS]->(ibrahim),
            (esther)-[:FOLLOWS]->(olivia)
        """)

        print("Database seeded successfully!")


if __name__ == "__main__":
    seed_database()
