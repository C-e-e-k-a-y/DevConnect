# DevConnect

A graph-powered developer networking platform built with React,
Django REST Framework, and CognoDB.

## Overview

DevConnect allows users to discover developers and explore
relationships between developers, skills, projects, and technologies.

The application demonstrates how a graph database can be used to
represent and query interconnected developer data.

## Features

- Developer directory
- Developer profiles
- Skill-based developer search
- Related developer recommendations
- Technology exploration
- Interactive knowledge graph
- Graph relationship visualization

## Technology Stack

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
- Django REST Framework

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

## Graph Model

### The database contains four main entity types:

- Developer
- Skill
- Project
- Technology

### Relationships include:

- HAS_SKILL
- WORKED_ON
- USES
- FOLLOWS

### Example:

```text
Developer
    |
    | HAS_SKILL
    ↓
Skill

Developer
    |
    | WORKED_ON
    ↓
Project
    |
    | USES
    ↓
Technology
```

## API Endpoints

### Get developers

GET /api/developers/

### Get developer profile

GET /api/developers/<name>/

### Get developer technologies

GET /api/developers/<name>/technologies/

### Get related developers

GET /api/developers/<name>/related/

### Search developers by skill

GET /api/search/?skill=React

### Get graph data

GET /api/graph/

## Running the Project

Run these commands sequentially in separate terminals for front and backend:

#### Backend

- cd backend
- python -m venv venv

#### Windows

- venv\Scripts\activate
- pip install -r requirements.txt
- python manage.py runserver

#### Frontend

- cd frontend
- npm install
- npm run dev

The frontend will be available at: http://localhost:5173

The backend will be available at: http://127.0.0.1:8000

## Sample Graph

The application visualizes relationships such as:

```text
Kareem Adeyemi
      |
      HAS_SKILL
      ↓
    React

Kareem Adeyemi
      |
      WORKED_ON
      ↓
E-Commerce Platform
      |
      USES
      ↓
  PostgreSQL
```
