from api.database import verify_connection

if __name__ == "__main__":
    if verify_connection():
        print("✅ CognoDB connection successful!")
    else:
        print("❌ CognoDB connection failed.")
