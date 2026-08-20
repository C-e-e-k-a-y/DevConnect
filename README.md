# DevConnect

A graph-powered, full-stack developer networking platform built with React, Django, and CognoDB.

## 1. Overview

DevConnect allows users to discover developers and explore
relationships between developers, their skills, projects, and technologies.

The application demonstrates how a graph database can be used to represent and query interconnected developer data.

### Features

- Developer directory; browse registered developers.
- Developer profiles; view detailed developer profiles
- Skill-based developer search; search for developers based on their skills.
- Related developer recommendations; discover developers related to a particular developer.
- Technology exploration; explore technologies used by developers' projects.
- Interactive visualization of the knowledge graph of existing relationships; visually explore connections between developers, skills, projects, and technologies.

## 2. Why a Graph Database?

Unlike a traditional relational schema, where retrieving multi-level relationships may require several table joins, CognoDB stores these relationships directly as graph connections.

This is well suited because DevConnect focuses on relationships between developers, skills, projects,
and technologies, in which multi-hop traversal is highly involved.

Therefore the use of a graph database makes relationship-based queries such as finding related developers, shared skills, and project technologies more natural, simpler and faster to traverse.

## 3. Data Model

The DevConnect graph contains four main entity types:

- Developer
- Skill
- Project
- Technology

### Relationships

The graph contains the following relationships:

- `HAS_SKILL`
- `WORKED_ON`
- `USES`
- `FOLLOWS`

### Data Model Diagram

```text
                            ┌─────────────┐
                            │    Skill    │
                            └──────▲──────┘
                                   │
                                HAS_SKILL
                                   │
                                   │
┌─────────────┐             ┌──────┴──────┐
│  Developer  │────────────►│   Project   │
└──────┬──────┘ WORKED_ON   └──────┬──────┘
       │                           │
       │                           │ USES
       │ FOLLOWS                   │
       │                           ▼
       ▼                    ┌─────────────┐
┌─────────────┐             │ Technology  │
│  Developer  │             └─────────────┘
└─────────────┘
```

## 4. Technology Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router
- react-force-graph-2d

### Backend

- Python
- Django
- Django

### Database

- CognoDB
- Neo4j-compatible graph queries

## Architecture

```text
React Frontend
     |
     | HTTP / REST API
     ↓
Django Backend
     |
     | Neo4j Driver
     ↓
  CognoDB
```

## 5. Setup and Run Instructions

### Prerequisites

- VSCode (or any IDE)
- Python
- Node.js
- npm
- Git

### Clone the Repository

```
git clone https://github.com/C-e-e-k-a-y/DevConnect

cd DevConnect
```

### Create the CognoDB Instance

- Go to the CognoDB Cloud signup page: `https://console.cognodb.com/signup` and create your account.

- Create a free instance:
  **Free (c0) instance**
  Choose any available region that makes sense for you.

- When the instance is created, you should receive:

```
URI: bolt+s://<instance-id>.databases.cognodb.cloud

Username: cognodb

Password: ********
```

**Save those details immediately because they are shown only once.**

### Set Up the Backend

- Navigate to the backend directory:
  `cd backend`

- Create an env file and store those details:

```
COGNODB_URI=bolt+s://your-instance-id.databases.cognodb.cloud
COGNODB_USERNAME=cognodb
COGNODB_PASSWORD=your_actual_password
```

- Create a virtual environment:
  `python -m venv venv`

- Activate it on Windows:
  `venv\Scripts\activate`

- Install dependencies:
  `pip install -r requirements.txt`

- Run the database seed script:
  `python -m seed.seed_data`

- Start Django:
  `python manage.py runserver`

**The backend will be available at: http://127.0.0.1:8000**

### Set Up the Frontend

- Open another terminal and navigate to the frontend:
  `cd frontend`

- Install dependencies:
  `npm install`

- Start the development server:
  `npm run dev`

**The frontend will be available at: http://localhost:5173**

## 6. Main API Queries

### Get All Developers

Retrieves all developers stored in the graph.
This query is used by the developer directory on the frontend.

#### Endpoint:

`GET /api/developers/`

#### Cypher:

```
MATCH (d:Developer)
RETURN d
ORDER BY d.name
```

### Get Developer Profile

Retrieves detailed information about a developer, including their connected skills, projects, and technologies.

#### Endpoint:

`GET /api/developers/<name>/`

#### Cypher:

```
MATCH (d:Developer {name: $name})
OPTIONAL MATCH (d)-[:HAS_SKILL]->(s:Skill)
OPTIONAL MATCH (d)-[:WORKED_ON]->(p:Project)
OPTIONAL MATCH (p)-[:USES]->(t:Technology)

RETURN
    d,
    collect(DISTINCT s) AS skills,
    collect(DISTINCT p) AS projects,
    collect(DISTINCT t) AS technologies

```

($name) is the parameter to contain the developer name supplied by the user.

### Get Developer Technologies

Retrieves all technologies associated with projects worked on by the specified developer.

#### Endpoint:

`GET /api/developers/<name>/technologies/`

#### Cypher:

```
MATCH (d:Developer {name: $name})
      -[:WORKED_ON]->(p:Project)
      -[:USES]->(t:Technology)

RETURN DISTINCT t
ORDER BY t.name

```

### Get Related Developers

Finds developers who are related through shared graph connections, such as common projects or skills.

#### Endpoint:

`GET /api/developers/<name>/related/`

#### Cypher:

```
MATCH (d:Developer {name: $name})
MATCH (other:Developer)
WHERE other <> d
    AND (
        (d)-[:WORKED_ON]->(:Project)<-[:WORKED_ON]-(other)
        OR
        (d)-[:HAS_SKILL]->(:Skill)<-[:HAS_SKILL]-(other)
    )

RETURN DISTINCT
    other.name AS name,
    other.role AS role,
    other.location AS location
ORDER BY other.name
```

### Search Developers by Skill

Finds developers connected to the specified skill.
This allows users to discover developers based on their technical skills.

#### Endpoint:

`GET /api/search/?skill=React`

#### Cypher:

```
MATCH (d:Developer)-[:HAS_SKILL]->(s:Skill)
WHERE toLower(s.name) = toLower($skill)

RETURN DISTINCT
    d.id AS id,
    d.name AS name,
    d.email AS email,
    d.role AS role,
    d.location AS location
ORDER BY d.name
```

($skill) is the parameter to contain the developer skill supplied by the user.

### Get Graph Data

Retrieves the nodes and relationships required by the frontend graph visualization

#### Endpoint:

`GET /api/graph/`

#### Cypher:

```
MATCH (source)-[relationship]->(target)

RETURN
    source,
    type(relationship) AS relationship_type,
    target
```

## 7. UI Screenshots

Screenshots of the completed application are included below.

### Developer Directory

Add screenshot here.

### Developer Profile

Add screenshot here.

### Skill Search

Add screenshot here.

### Graph Explorer

Add screenshot here.
