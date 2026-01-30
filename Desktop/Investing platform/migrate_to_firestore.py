"""
Migration script to move data from MongoDB to Firestore
Run this once to migrate your existing data
"""
import os
import json
from pymongo import MongoClient
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

# Initialize MongoDB
mongo_uri = os.environ.get('MONGODB_URI', 'mongodb://localhost:27017/investimon')
mongo_client = MongoClient(mongo_uri)
mongo_db = mongo_client.investimon

# Initialize Firebase Admin
# NOTE: You'll need to download the service account key from Firebase Console
# and save it as 'serviceAccountKey.json' in this directory
try:
    cred = credentials.Certificate('serviceAccountKey.json')
    firebase_admin.initialize_app(cred)
    firestore_db = firestore.client()
    print("✅ Firebase initialized successfully")
except Exception as e:
    print(f"❌ Error initializing Firebase: {e}")
    print("Make sure you have serviceAccountKey.json in this directory")
    exit(1)

def migrate_users():
    """Migrate users from MongoDB to Firestore"""
    print("\n📦 Migrating users...")
    users = mongo_db.users.find()
    count = 0

    for user in users:
        try:
            user_id = str(user['_id'])

            # Convert portfolio items
            portfolio = []
            if 'portfolio' in user:
                for item in user['portfolio']:
                    portfolio.append({
                        'characterId': item.get('character_id', ''),
                        'characterName': item.get('character_name', ''),
                        'quantity': item.get('quantity', 0),
                        'averagePurchasePrice': item.get('averagePurchasePrice', 0),
                        'purchasedAt': item.get('purchasedAt', datetime.now())
                    })

            # Create Firestore document
            firestore_db.collection('users').document(user_id).set({
                'email': user.get('email', ''),
                'name': user.get('name', ''),
                'role': user.get('role', 'child'),
                'age': user.get('age'),
                'balance': user.get('balance', 10000),
                'portfolio': portfolio,
                'experience': user.get('experience', 0),
                'level': user.get('level', 1),
                'createdAt': user.get('createdAt', datetime.now())
            })

            count += 1
            print(f"  ✓ Migrated user: {user.get('email', user_id)}")

        except Exception as e:
            print(f"  ✗ Error migrating user {user.get('email', '')}: {e}")

    print(f"✅ Migrated {count} users")

def migrate_characters():
    """Migrate characters from MongoDB to Firestore"""
    print("\n📦 Migrating characters...")
    characters = mongo_db.characters.find()
    count = 0

    for character in characters:
        try:
            char_id = str(character['_id'])

            firestore_db.collection('characters').document(char_id).set({
                'name': character.get('name', ''),
                'companySymbol': character.get('companySymbol', ''),
                'companyName': character.get('companyName', ''),
                'type': character.get('type', ''),
                'description': character.get('description', ''),
                'imageUrl': character.get('imageUrl', ''),
                'level': character.get('level', 1),
                'experience': character.get('experience', 0),
                'traits': character.get('traits', {}),
                'marketData': character.get('marketData', {}),
                'evolution': character.get('evolution', {}),
                'createdAt': character.get('createdAt', datetime.now())
            })

            count += 1
            print(f"  ✓ Migrated character: {character.get('name', char_id)}")

        except Exception as e:
            print(f"  ✗ Error migrating character {character.get('name', '')}: {e}")

    print(f"✅ Migrated {count} characters")

def migrate_transactions():
    """Migrate transactions from MongoDB to Firestore"""
    print("\n📦 Migrating transactions...")
    transactions = mongo_db.transactions.find()
    count = 0

    for transaction in transactions:
        try:
            # Let Firestore auto-generate the ID
            firestore_db.collection('transactions').add({
                'userId': transaction.get('user_id', ''),
                'characterId': transaction.get('character_id', ''),
                'characterName': transaction.get('character_name', ''),
                'type': transaction.get('type', ''),
                'quantity': transaction.get('quantity', 0),
                'price': transaction.get('price', 0),
                'total': transaction.get('total', 0),
                'profitLoss': transaction.get('profit_loss', 0),
                'timestamp': transaction.get('timestamp', datetime.now())
            })

            count += 1
            if count % 100 == 0:
                print(f"  Migrated {count} transactions...")

        except Exception as e:
            print(f"  ✗ Error migrating transaction: {e}")

    print(f"✅ Migrated {count} transactions")

def main():
    """Run the migration"""
    print("=" * 60)
    print("MongoDB to Firestore Migration")
    print("=" * 60)

    print("\n⚠️  WARNING: This will copy all data from MongoDB to Firestore")
    print("Make sure your Firebase project is ready and serviceAccountKey.json is in place")

    response = input("\nContinue? (yes/no): ")
    if response.lower() != 'yes':
        print("Migration cancelled")
        return

    try:
        migrate_users()
        migrate_characters()
        migrate_transactions()

        print("\n" + "=" * 60)
        print("✅ Migration completed successfully!")
        print("=" * 60)
        print("\nNext steps:")
        print("1. Verify data in Firebase Console")
        print("2. Test the application with Firestore")
        print("3. Update your production environment to use Firestore")

    except Exception as e:
        print(f"\n❌ Migration failed: {e}")

if __name__ == '__main__':
    main()
