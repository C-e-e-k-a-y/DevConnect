import os

from dotenv import load_dotenv
from neo4j import GraphDatabase

load_dotenv()


COGNODB_URI = os.getenv("COGNODB_URI")
COGNODB_USERNAME = os.getenv("COGNODB_USERNAME")
COGNODB_PASSWORD = os.getenv("COGNODB_PASSWORD")


driver = GraphDatabase.driver(COGNODB_URI, auth=(COGNODB_USERNAME, COGNODB_PASSWORD))


def verify_connection():
    try:
        driver.verify_connectivity()
        return True
    except Exception as error:
        print(f"Database connection failed: {error}")
        return False
