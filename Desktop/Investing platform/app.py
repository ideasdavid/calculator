import os
import json
import requests
from flask import Flask, jsonify, request, render_template, redirect, url_for, session
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from bson import json_util
import bcrypt
import jwt
from datetime import datetime, timedelta
import time

# Initialize Flask app
app = Flask(__name__, static_folder='static', template_folder='templates')
app.secret_key = os.environ.get('SECRET_KEY', 'dev-secret-key')
CORS(app)

# Add debug logging for static files
@app.route('/static/<path:filename>')
def custom_static(filename):
    print(f"DEBUG: Serving static file: {filename}")
    try:
        full_path = os.path.join(app.static_folder, filename)
        print(f"DEBUG: Full path: {full_path}, Exists: {os.path.exists(full_path)}")
        return app.send_static_file(filename)
    except Exception as e:
        print(f"DEBUG: Error serving static file {filename}: {e}")
        return f"File not found: {filename}", 404

# MongoDB connection
try:
    mongo_uri = os.environ.get('MONGODB_URI', 'mongodb://localhost:27017/investimon')
    client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)
    # Force a connection to verify it works
    client.server_info()
    db = client.investimon
    print("Connected to MongoDB successfully")

    # Check if transactions are supported (requires replica set)
    try:
        # Try to start a session to check if transactions are supported
        with client.start_session() as test_session:
            transactions_supported = True
        print("MongoDB transactions are supported (replica set detected)")
    except Exception as tx_error:
        transactions_supported = False
        print(f"MongoDB transactions not supported (standalone mode): {tx_error}")
        print("Running in non-transactional mode")
except Exception as e:
    print(f"MongoDB connection error: {e}")
    print("Starting server without MongoDB...")
    db = None
    client = None
    transactions_supported = False

# News server connection
NEWS_API_URL = os.environ.get('NEWS_API_URL', 'http://127.0.0.1:59901/api/news')

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return redirect('/')

@app.route('/api/test')
def test():
    return jsonify({"message": "Server is running!"})

# Character routes
@app.route('/api/characters', methods=['GET'])
def get_characters():
    if db is None:
        # Mock data for when MongoDB is unavailable
        mock_characters = [
            {
                "_id": {"$oid": "mock_apple_id"},
                "name": "Apple Buddy",
                "companySymbol": "AAPL",
                "type": "Technology",
                "description": "A friendly character representing Apple Inc., known for innovation in consumer electronics, software, and services.",
                "level": 1,
                "experience": 0,
                "abilities": ["Innovation", "Brand Power", "Cash Rich"],
                "marketData": {
                    "currentPrice": 178.72,
                    "priceChange": 2.30,
                    "priceChangePercent": 1.3,
                    "lastUpdated": datetime.now().isoformat()
                },
                "imageUrl": "/static/images/characters/apple.svg"
            },
            {
                "_id": {"$oid": "mock_tesla_id"},
                "name": "Tesla Spark",
                "companySymbol": "TSLA",
                "type": "Automotive/Energy",
                "description": "An electric character representing Tesla, Inc., focused on electric vehicles, battery energy storage, and clean energy generation.",
                "level": 1,
                "experience": 0,
                "abilities": ["Disruption", "Electric Power", "Automation"],
                "marketData": {
                    "currentPrice": 172.63,
                    "priceChange": -3.20,
                    "priceChangePercent": -1.8,
                    "lastUpdated": datetime.now().isoformat()
                },
                "imageUrl": "/static/images/characters/tesla.svg"
            },
            {
                "_id": {"$oid": "mock_amazon_id"},
                "name": "Amazon Echo",
                "companySymbol": "AMZN",
                "type": "E-Commerce/Cloud",
                "description": "A versatile character representing Amazon.com, Inc., a global leader in e-commerce, cloud computing, and digital streaming.",
                "level": 1,
                "experience": 0,
                "abilities": ["Logistics", "Scale", "Diversification"],
                "marketData": {
                    "currentPrice": 183.95,
                    "priceChange": 1.75,
                    "priceChangePercent": 0.96,
                    "lastUpdated": datetime.now().isoformat()
                },
                "imageUrl": "/static/images/characters/amazon.svg"
            }
        ]
        print("DEBUG: Serving mock characters with image URLs:", [c["imageUrl"] for c in mock_characters])
        return json.dumps(mock_characters)
    
    characters = list(db.characters.find())
    print("DEBUG: Serving DB characters with image URLs:", [c.get("imageUrl") for c in characters])
    return json_util.dumps(characters)

@app.route('/api/characters/<character_id>', methods=['GET'])
def get_character(character_id):
    if db is None:
        # Mock data for when MongoDB is unavailable
        mock_characters = {
            "mock_apple_id": {
                "_id": {"$oid": "mock_apple_id"},
                "name": "Apple Buddy",
                "companySymbol": "AAPL",
                "type": "Technology",
                "description": "A friendly character representing Apple Inc., known for innovation in consumer electronics, software, and services.",
                "level": 1,
                "experience": 0,
                "abilities": ["Innovation", "Brand Power", "Cash Rich"],
                "marketData": {
                    "currentPrice": 178.72,
                    "priceChange": 2.30,
                    "priceChangePercent": 1.3,
                    "lastUpdated": datetime.now().isoformat()
                },
                "imageUrl": "/static/images/characters/apple.svg"
            },
            "mock_tesla_id": {
                "_id": {"$oid": "mock_tesla_id"},
                "name": "Tesla Spark",
                "companySymbol": "TSLA",
                "type": "Automotive/Energy",
                "description": "An electric character representing Tesla, Inc., focused on electric vehicles, battery energy storage, and clean energy generation.",
                "level": 1,
                "experience": 0,
                "abilities": ["Disruption", "Electric Power", "Automation"],
                "marketData": {
                    "currentPrice": 172.63,
                    "priceChange": -3.20,
                    "priceChangePercent": -1.8,
                    "lastUpdated": datetime.now().isoformat()
                },
                "imageUrl": "/static/images/characters/tesla.svg"
            },
            "mock_amazon_id": {
                "_id": {"$oid": "mock_amazon_id"},
                "name": "Amazon Echo",
                "companySymbol": "AMZN",
                "type": "E-Commerce/Cloud",
                "description": "A versatile character representing Amazon.com, Inc., a global leader in e-commerce, cloud computing, and digital streaming.",
                "level": 1,
                "experience": 0,
                "abilities": ["Logistics", "Scale", "Diversification"],
                "marketData": {
                    "currentPrice": 183.95,
                    "priceChange": 1.75,
                    "priceChangePercent": 0.96,
                    "lastUpdated": datetime.now().isoformat()
                },
                "imageUrl": "/static/images/characters/amazon.svg"
            }
        }
        
        character = mock_characters.get(character_id)
        if not character:
            return jsonify({"error": "Character not found"}), 404
        
        return json.dumps(character)
    
    try:
        character = db.characters.find_one({"_id": ObjectId(character_id)})
        if not character:
            return jsonify({"error": "Character not found"}), 404
        
        return json_util.dumps(character)
    except Exception as e:
        return jsonify({"error": f"Error retrieving character: {str(e)}"}), 500

@app.route('/character/<character_id>')
def character_detail(character_id):
    if db is None:
        # Mock data for when MongoDB is unavailable
        mock_characters = {
            "mock_apple_id": {
                "_id": {"$oid": "mock_apple_id"},
                "name": "Apple Buddy",
                "companySymbol": "AAPL",
                "type": "Technology",
                "description": "A friendly character representing Apple Inc., known for innovation in consumer electronics, software, and services.",
                "level": 1,
                "experience": 0,
                "abilities": ["Innovation", "Brand Power", "Cash Rich"],
                "marketData": {
                    "currentPrice": 178.72,
                    "priceChange": 2.30,
                    "priceChangePercent": 1.3,
                    "lastUpdated": datetime.now()
                },
                "imageUrl": "/static/images/characters/apple.svg"
            },
            "mock_tesla_id": {
                "_id": {"$oid": "mock_tesla_id"},
                "name": "Tesla Spark",
                "companySymbol": "TSLA",
                "type": "Automotive/Energy",
                "description": "An electric character representing Tesla, Inc., focused on electric vehicles, battery energy storage, and clean energy generation.",
                "level": 1,
                "experience": 0,
                "abilities": ["Disruption", "Electric Power", "Automation"],
                "marketData": {
                    "currentPrice": 172.63,
                    "priceChange": -3.20,
                    "priceChangePercent": -1.8,
                    "lastUpdated": datetime.now()
                },
                "imageUrl": "/static/images/characters/tesla.svg"
            },
            "mock_amazon_id": {
                "_id": {"$oid": "mock_amazon_id"},
                "name": "Amazon Echo",
                "companySymbol": "AMZN",
                "type": "E-Commerce/Cloud",
                "description": "A versatile character representing Amazon.com, Inc., a global leader in e-commerce, cloud computing, and digital streaming.",
                "level": 1,
                "experience": 0,
                "abilities": ["Logistics", "Scale", "Diversification"],
                "marketData": {
                    "currentPrice": 183.95,
                    "priceChange": 1.75,
                    "priceChangePercent": 0.96,
                    "lastUpdated": datetime.now()
                },
                "imageUrl": "/static/images/characters/amazon.svg"
            }
        }
        
        character = mock_characters.get(character_id)
        if not character:
            return render_template('error.html', message="Character not found"), 404
        
        return render_template('character.html', character=character)
    
    try:
        character = db.characters.find_one({"_id": ObjectId(character_id)})
        if not character:
            return render_template('error.html', message="Character not found"), 404
        
        return render_template('character.html', character=character)
    except Exception as e:
        return render_template('error.html', message=f"Error retrieving character: {str(e)}"), 500

# User authentication routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    if db is None:
        return jsonify({"error": "Database not available"}), 503
    
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    
    # Check if user already exists
    existing_user = db.users.find_one({"username": username})
    if existing_user:
        return jsonify({"error": "Username already exists"}), 400
    
    # Hash password and create user
    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    user_id = db.users.insert_one({
        "username": username,
        "password": hashed_pw,
        "created_at": datetime.now(),
        "balance": 10000,  # Starting balance
        "experience": 0
    }).inserted_id
    
    # Generate token
    token = jwt.encode({
        'user_id': str(user_id),
        'username': username,
        'exp': datetime.utcnow() + timedelta(days=1)
    }, app.secret_key, algorithm='HS256')
    
    # Convert token to string if it's bytes (PyJWT 1.x returns bytes)
    if isinstance(token, bytes):
        token = token.decode('utf-8')
    
    return jsonify({
        "token": token,
        "user": {
            "id": str(user_id),
            "username": username,
            "balance": 10000,
            "experience": 0
        }
    })

@app.route('/api/auth/login', methods=['POST'])
def login():
    if db is None:
        print("Database connection not available")
        return jsonify({"error": "Database not available"}), 503
    
    try:
        # Validate that we have JSON data
        if not request.is_json:
            print("Request does not contain JSON data")
            return jsonify({"error": "Request must be JSON"}), 400
            
        data = request.json
        if not data:
            print("Empty JSON data in request")
            return jsonify({"error": "Invalid JSON data in request"}), 400
            
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            print(f"Missing credentials: username={username is not None}, password={password is not None}")
            return jsonify({"error": "Username and password are required"}), 400
        
        print(f"Looking up user: {username}")
        user = db.users.find_one({"username": username})
        
        if not user:
            print(f"User not found: {username}")
            return jsonify({"error": "Invalid credentials"}), 401
            
        # Ensure password field exists in user record
        if 'password' not in user:
            print(f"User {username} has no password field")
            return jsonify({"error": "Invalid user record"}), 500
            
        # Check password
        valid_password = bcrypt.checkpw(password.encode('utf-8'), user['password'])
        if not valid_password:
            print(f"Invalid password for user: {username}")
            return jsonify({"error": "Invalid credentials"}), 401
        
        # Generate token
        token = jwt.encode({
            'user_id': str(user['_id']),
            'username': user['username'],
            'exp': datetime.utcnow() + timedelta(days=1)
        }, app.secret_key, algorithm='HS256')
        
        # Convert token to string if it's bytes (PyJWT 1.x returns bytes)
        if isinstance(token, bytes):
            token = token.decode('utf-8')
        
        print(f"Login successful for user: {username}")
        return jsonify({
            "token": token,
            "user": {
                "id": str(user['_id']),
                "username": user['username'],
                "balance": user.get('balance', 10000),
                "experience": user.get('experience', 0)
            }
        })
    except Exception as e:
        import traceback
        print(f"Login error: {str(e)}")
        print(traceback.format_exc())
        return jsonify({"error": f"Login failed: {str(e)}"}), 500

# News routes
@app.route('/api/news', methods=['GET'])
def get_news():
    max_retries = 3
    retry_delay = 0.5
    last_error = None
    
    for retry in range(max_retries):
        try:
            # Try the default port first
            response = requests.get(NEWS_API_URL, timeout=3)
            if response.status_code != 200 and '59901' in NEWS_API_URL:
                # If default port fails, try the fallback port
                fallback_url = NEWS_API_URL.replace('59901', '59902')
                print(f"Primary news API failed, trying fallback URL: {fallback_url}")
                response = requests.get(fallback_url, timeout=3)
                
            response.raise_for_status()
            return jsonify(response.json())
        except Exception as e:
            last_error = e
            print(f"Error fetching news (attempt {retry+1}/{max_retries}): {e}")
            time.sleep(retry_delay)
            retry_delay *= 2  # Exponential backoff
    
    # If all retries failed
    print(f"All retries failed when fetching news: {last_error}")
    return jsonify({
        "error": "Failed to fetch news", 
        "details": str(last_error),
        "dummy_data": True,
        "summary": {
            "date": datetime.now().strftime("%Y-%m-%d"),
            "overview": "Market data unavailable"
        },
        "news": []
    }), 200  # Return 200 with empty data rather than 500 error

# Challenge routes
@app.route('/api/challenges', methods=['GET'])
def get_challenges():
    if db is None:
        # Mock data for when MongoDB is unavailable
        mock_challenges = [
            {
                "id": "ch001",
                "title": "News Detective",
                "description": "Read the latest news for all three characters and find out which one has the most exciting news!",
                "type": "quiz",
                "difficulty": "easy",
                "rewards": {
                    "experience": 50,
                    "cash": 500
                },
                "options": [
                    {"id": "a", "text": "Apple Buddy"},
                    {"id": "b", "text": "Tesla Spark"},
                    {"id": "c", "text": "Amazon Echo"}
                ],
                "hint": "Look at each character's latest news and price changes to find the most exciting story!",
                "status": "available"
            },
            {
                "id": "ch002",
                "title": "Collect Them All!",
                "description": "Own at least one character from each type (Technology, Automotive/Energy, E-Commerce).",
                "type": "achievement",
                "difficulty": "medium",
                "rewards": {
                    "experience": 100,
                    "cash": 1000
                },
                "hint": "Collecting different types of characters is like collecting different types of trading cards - it's good to have variety!",
                "status": "available"
            }
        ]
        return jsonify(mock_challenges)
    
    try:
        # Get challenges from database
        challenges = list(db.challenges.find({}, {'_id': 0}))
        
        # If user is authenticated, personalize challenge status
        if 'user_id' in session:
            user_id = session['user_id']
            user = db.users.find_one({"_id": ObjectId(user_id)})
            user_level = user.get('level', 1) if user else 1
            
            # Check completed challenges
            completed_challenges = user.get('completed_challenges', []) if user else []
            
            for challenge in challenges:
                if challenge['id'] in completed_challenges:
                    challenge['status'] = 'completed'
                elif challenge.get('requirements', {}).get('min_level', 1) > user_level:
                    challenge['status'] = 'locked'
                else:
                    challenge['status'] = 'available'
        else:
            # For non-authenticated users, just show available challenges
            for challenge in challenges:
                challenge['status'] = 'available'
        
        return jsonify(challenges)
    except Exception as e:
        print(f"Error retrieving challenges: {e}")
        return jsonify({"error": f"Error retrieving challenges: {str(e)}"}), 500

@app.route('/api/challenges/<challenge_id>', methods=['GET'])
def get_challenge(challenge_id):
    if db is None:
        return jsonify({"error": "Database not available"}), 503
    
    try:
        challenge = db.challenges.find_one({"id": challenge_id}, {'_id': 0})
        if not challenge:
            return jsonify({"error": "Challenge not found"}), 404
        
        # If the challenge is dynamic (like the news-based quiz), populate the correct answer
        if challenge.get('correct_answer') == 'dynamic' and challenge.get('type') == 'quiz':
            try:
                news_response = requests.get(NEWS_API_URL)
                if news_response.status_code == 200:
                    news_data = news_response.json()
                    news_items = news_data.get('news', [])
                    
                    # Find most positive character
                    positive_changes = {}
                    for item in news_items:
                        char_name = item.get('characterName')
                        if char_name not in positive_changes:
                            positive_changes[char_name] = 0
                        
                        price_change = item.get('priceChange', 0)
                        positive_changes[char_name] += price_change
                    
                    # Set the correct answer based on most positive character
                    if positive_changes:
                        most_positive = max(positive_changes.items(), key=lambda x: x[1])
                        if most_positive[0] == 'Apple Buddy':
                            challenge['correct_answer'] = 'a'
                        elif most_positive[0] == 'Tesla Spark':
                            challenge['correct_answer'] = 'b'
                        elif most_positive[0] == 'Amazon Echo':
                            challenge['correct_answer'] = 'c'
            except Exception as e:
                print(f"Error processing dynamic challenge: {e}")
                # Fall back to a default answer if there's an error
                challenge['correct_answer'] = 'a'
        
        # Check if challenge is already completed by the user
        if 'user_id' in session:
            user_id = session['user_id']
            user = db.users.find_one({"_id": ObjectId(user_id)})
            
            if user and challenge['id'] in user.get('completed_challenges', []):
                challenge['status'] = 'completed'
            elif user and challenge.get('requirements', {}).get('min_level', 1) > user.get('level', 1):
                challenge['status'] = 'locked'
            else:
                challenge['status'] = 'available'
        else:
            challenge['status'] = 'available'
        
        return jsonify(challenge)
    except Exception as e:
        return jsonify({"error": f"Error retrieving challenge: {str(e)}"}), 500

@app.route('/api/challenges/<challenge_id>/submit', methods=['POST'])
def submit_challenge(challenge_id):
    if db is None:
        return jsonify({"error": "Database not available"}), 503
    
    # Try to get user from token first, then fall back to session
    user_id = verify_token()
    
    # If no token, check session (backwards compatibility)
    if not user_id and 'user_id' in session:
        user_id = session['user_id']
    
    if not user_id:
        return jsonify({"error": "Authentication required"}), 401
    
    data = request.json
    
    try:
        challenge = db.challenges.find_one({"id": challenge_id})
        if not challenge:
            return jsonify({"error": "Challenge not found"}), 404
        
        user = db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        # Check if challenge is already completed
        if challenge['id'] in user.get('completed_challenges', []):
            return jsonify({"error": "Challenge already completed", "success": False})
        
        # Validate the submission based on challenge type
        success = False
        message = ""
        
        if challenge['type'] == 'quiz':
            user_answer = data.get('answer')
            correct_answer = challenge['correct_answer']
            
            if user_answer == correct_answer:
                success = True
                message = "Correct! You've completed this challenge."
            else:
                success = False
                message = "Incorrect answer. Try again!"
        
        elif challenge['type'] == 'achievement':
            # Verify achievement requirements (simplified for now)
            success = True
            message = "Achievement unlocked!"
        
        elif challenge['type'] in ['timebound', 'scenario']:
            # These would require more complex logic
            # For now, let's assume they're passed
            success = True
            message = "Challenge completed successfully!"
        
        # Update user data if successful
        if success:
            # Add to completed challenges
            completed_challenges = user.get('completed_challenges', [])
            completed_challenges.append(challenge['id'])
            
            # Add rewards
            current_xp = user.get('experience', 0)
            current_balance = user.get('balance', 0)
            
            rewards = challenge.get('rewards', {})
            new_xp = current_xp + rewards.get('experience', 0)
            new_balance = current_balance + rewards.get('cash', 0)
            
            # Update user level if needed (simple level system)
            current_level = user.get('level', 1)
            new_level = max(current_level, int(new_xp / 500) + 1)  # 500 XP per level
            
            # Update user in database
            db.users.update_one(
                {"_id": ObjectId(user_id)},
                {"$set": {
                    "completed_challenges": completed_challenges,
                    "experience": new_xp,
                    "balance": new_balance,
                    "level": new_level
                }}
            )
            
            # Prepare rewards summary
            rewards_summary = {
                "xp": rewards.get('experience', 0),
                "cash": rewards.get('cash', 0),
                "level_up": new_level > current_level,
                "new_level": new_level if new_level > current_level else None,
                "special_items": rewards.get('special_item', None)
            }
            
            return jsonify({
                "success": True,
                "message": message,
                "rewards": rewards_summary
            })
        
        return jsonify({
            "success": False,
            "message": message
        })
    
    except Exception as e:
        return jsonify({"error": f"Error processing challenge submission: {str(e)}"}), 500

# Portfolio and Trading routes
@app.route('/api/portfolio', methods=['GET'])
def get_portfolio():
    if db is None:
        return jsonify({"error": "Database not available"}), 503
    
    # Try to get user from token first, then fall back to session
    user_id = verify_token()
    
    # If no token, check session (backwards compatibility)
    if not user_id and 'user_id' in session:
        user_id = session['user_id']
    
    if not user_id:
        return jsonify({"error": "Authentication required"}), 401
    
    try:
        user = db.users.find_one({"_id": ObjectId(user_id)})
        
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        # Get user's portfolio
        portfolio = user.get('portfolio', [])
        
        # If the user doesn't have a portfolio yet, initialize it
        if not portfolio:
            return jsonify([])
        
        # Get full character details for each owned character
        portfolio_details = []
        for item in portfolio:
            character = db.characters.find_one({"_id": ObjectId(item['character_id'])})
            if character:
                portfolio_item = {
                    "character_id": str(character["_id"]),
                    "name": character["name"],
                    "companySymbol": character["companySymbol"],
                    "type": character["type"],
                    "imageUrl": character["imageUrl"],
                    "quantity": item["quantity"],
                    "averagePurchasePrice": item["averagePurchasePrice"],
                    "currentPrice": character["marketData"]["currentPrice"],
                    "totalValue": item["quantity"] * character["marketData"]["currentPrice"],
                    "profitLoss": (character["marketData"]["currentPrice"] - item["averagePurchasePrice"]) * item["quantity"],
                    "profitLossPercent": ((character["marketData"]["currentPrice"] - item["averagePurchasePrice"]) / item["averagePurchasePrice"]) * 100 if item["averagePurchasePrice"] > 0 else 0
                }
                portfolio_details.append(portfolio_item)
        
        return jsonify(portfolio_details)
    
    except Exception as e:
        return jsonify({"error": f"Error retrieving portfolio: {str(e)}"}), 500

@app.route('/api/portfolio/buy', methods=['POST'])
def buy_character():
    if db is None:
        return jsonify({"error": "Database not available"}), 503

    # Try to get user from token first, then fall back to session
    user_id = verify_token()

    # If no token, check session (backwards compatibility)
    if not user_id and 'user_id' in session:
        user_id = session['user_id']

    if not user_id:
        return jsonify({"error": "Authentication required"}), 401

    data = request.json
    character_id = data.get('character_id')
    quantity = int(data.get('quantity', 1))

    if not character_id:
        return jsonify({"error": "Character ID is required"}), 400

    if quantity <= 0:
        return jsonify({"error": "Quantity must be greater than 0"}), 400

    try:
        # READ operations first (before any writes)
        user = db.users.find_one({"_id": ObjectId(user_id)})

        if not user:
            return jsonify({"error": "User not found"}), 404

        character = db.characters.find_one({"_id": ObjectId(character_id)})

        if not character:
            return jsonify({"error": "Character not found"}), 404

        # Calculate transaction cost
        price = character["marketData"]["currentPrice"]
        total_cost = price * quantity

        # Check if user has enough funds
        user_balance = user.get('balance', 0)

        if user_balance < total_cost:
            return jsonify({
                "success": False,
                "error": "Insufficient funds",
                "balance": user_balance,
                "cost": total_cost
            }), 400

        # Get portfolio data
        portfolio = user.get('portfolio', [])
        existing_item = next((item for item in portfolio if item['character_id'] == str(character["_id"])), None)

        # Calculate experience and level data
        current_exp = user.get('experience', 0)
        trade_exp = min(50, int(total_cost * 0.01))  # 1% of trade value up to 50 XP
        new_exp = current_exp + trade_exp
        current_level = user.get('level', 1)
        new_level = max(current_level, int(new_exp / 500) + 1)  # 500 XP per level
        new_balance = user_balance - total_cost

        # Now WRITE operations - all updates in a single operation when possible
        if existing_item:
            # Update existing portfolio item
            new_quantity = existing_item['quantity'] + quantity
            new_avg_price = ((existing_item['averagePurchasePrice'] * existing_item['quantity']) + (price * quantity)) / new_quantity

            # Update the portfolio item and user data in one operation
            db.users.update_one(
                {"_id": ObjectId(user_id), "portfolio.character_id": str(character["_id"])},
                {"$set": {
                    "portfolio.$.quantity": new_quantity,
                    "portfolio.$.averagePurchasePrice": new_avg_price,
                    "balance": new_balance,
                    "experience": new_exp,
                    "level": new_level
                }}
            )
        else:
            # Add new portfolio item
            portfolio_item = {
                "character_id": str(character["_id"]),
                "quantity": quantity,
                "averagePurchasePrice": price,
                "purchasedAt": datetime.now()
            }

            db.users.update_one(
                {"_id": ObjectId(user_id)},
                {
                    "$push": {"portfolio": portfolio_item},
                    "$set": {
                        "balance": new_balance,
                        "experience": new_exp,
                        "level": new_level
                    }
                }
            )

        # Record transaction
        transaction = {
            "user_id": str(user["_id"]),
            "character_id": str(character["_id"]),
            "character_name": character["name"],
            "type": "buy",
            "quantity": quantity,
            "price": price,
            "total": total_cost,
            "timestamp": datetime.now()
        }

        db.transactions.insert_one(transaction)

        return jsonify({
            "success": True,
            "message": f"Successfully purchased {quantity} shares of {character['name']}",
            "transaction": {
                "character": character["name"],
                "quantity": quantity,
                "price": price,
                "total": total_cost
            },
            "newBalance": new_balance,
            "experienceGained": trade_exp,
            "levelUp": new_level > current_level,
            "newLevel": new_level if new_level > current_level else None
        })

    except Exception as e:
        return jsonify({"error": f"Purchase error: {str(e)}"}), 500

@app.route('/api/portfolio/sell', methods=['POST'])
def sell_character():
    if db is None:
        return jsonify({"error": "Database not available"}), 503

    # Try to get user from token first, then fall back to session
    user_id = verify_token()

    # If no token, check session (backwards compatibility)
    if not user_id and 'user_id' in session:
        user_id = session['user_id']

    if not user_id:
        return jsonify({"error": "Authentication required"}), 401

    data = request.json
    character_id = data.get('character_id')
    quantity = int(data.get('quantity', 1))

    if not character_id:
        return jsonify({"error": "Character ID is required"}), 400

    if quantity <= 0:
        return jsonify({"error": "Quantity must be greater than 0"}), 400

    try:
        # READ operations first (before any writes)
        user = db.users.find_one({"_id": ObjectId(user_id)})

        if not user:
            return jsonify({"error": "User not found"}), 404

        character = db.characters.find_one({"_id": ObjectId(character_id)})

        if not character:
            return jsonify({"error": "Character not found"}), 404

        # Check if user owns this character
        portfolio = user.get('portfolio', [])
        existing_item = next((item for item in portfolio if item['character_id'] == str(character["_id"])), None)

        if not existing_item:
            return jsonify({"error": "You don't own this character"}), 400

        if existing_item['quantity'] < quantity:
            return jsonify({"error": f"You only own {existing_item['quantity']} shares of this character"}), 400

        # Calculate sale value
        price = character["marketData"]["currentPrice"]
        total_value = price * quantity

        # Calculate profit/loss
        profit_loss = (price - existing_item['averagePurchasePrice']) * quantity

        # Calculate new values
        new_quantity = existing_item['quantity'] - quantity
        user_balance = user.get('balance', 0)
        new_balance = user_balance + total_value

        # Calculate experience and level data
        current_exp = user.get('experience', 0)
        trade_exp = min(50, int(total_value * 0.01))  # 1% of trade value up to 50 XP
        new_exp = current_exp + trade_exp
        current_level = user.get('level', 1)
        new_level = max(current_level, int(new_exp / 500) + 1)  # 500 XP per level

        # Now WRITE operations - all updates in a single operation when possible
        if new_quantity == 0:
            # Remove the portfolio item if quantity becomes zero
            db.users.update_one(
                {"_id": ObjectId(user_id)},
                {
                    "$pull": {"portfolio": {"character_id": str(character["_id"])}},
                    "$set": {
                        "balance": new_balance,
                        "experience": new_exp,
                        "level": new_level
                    }
                }
            )
        else:
            # Update the quantity
            db.users.update_one(
                {"_id": ObjectId(user_id), "portfolio.character_id": str(character["_id"])},
                {
                    "$set": {
                        "portfolio.$.quantity": new_quantity,
                        "balance": new_balance,
                        "experience": new_exp,
                        "level": new_level
                    }
                }
            )

        # Record transaction
        transaction = {
            "user_id": str(user["_id"]),
            "character_id": str(character["_id"]),
            "character_name": character["name"],
            "type": "sell",
            "quantity": quantity,
            "price": price,
            "total": total_value,
            "profit_loss": profit_loss,
            "timestamp": datetime.now()
        }

        db.transactions.insert_one(transaction)

        return jsonify({
            "success": True,
            "message": f"Successfully sold {quantity} shares of {character['name']}",
            "transaction": {
                "character": character["name"],
                "quantity": quantity,
                "price": price,
                "total": total_value,
                "profitLoss": profit_loss
            },
            "newBalance": new_balance,
            "experienceGained": trade_exp,
            "levelUp": new_level > current_level,
            "newLevel": new_level if new_level > current_level else None
        })

    except Exception as e:
        return jsonify({"error": f"Sale error: {str(e)}"}), 500

# Token verification function
def verify_token():
    # Get token from Authorization header
    auth_header = request.headers.get('Authorization', '')
    token = auth_header.replace('Bearer ', '') if auth_header else ''
    
    if not token:
        return None
    
    try:
        # Decode the token
        # Make sure token is a string for the jwt.decode function
        if isinstance(token, bytes):
            token = token.decode('utf-8')
            
        payload = jwt.decode(token, app.secret_key, algorithms=['HS256'])
        return payload['user_id']
    except Exception as e:
        print(f"Token verification error: {e}")
        return None

@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    if db is None:
        return jsonify({"error": "Database not available"}), 503
    
    # Try to get user from token first, then fall back to session
    user_id = verify_token()
    
    # If no token, check session (backwards compatibility)
    if not user_id and 'user_id' in session:
        user_id = session['user_id']
    
    if not user_id:
        return jsonify({"error": "Authentication required"}), 401
    
    try:
        # Get user's transactions
        transactions = list(db.transactions.find(
            {"user_id": str(user_id)},
            {'_id': 1, 'character_name': 1, 'type': 1, 'quantity': 1, 'price': 1, 'total': 1, 'profit_loss': 1, 'timestamp': 1}
        ).sort("timestamp", -1))  # Sort by most recent first
        
        return json_util.dumps(transactions)
    
    except Exception as e:
        return jsonify({"error": f"Error retrieving transactions: {str(e)}"}), 500

@app.route('/portfolio')
def portfolio_page():
    return render_template('portfolio.html')

@app.route('/transactions')
def transactions_page():
    return render_template('transactions.html')

# Status page for checking system health
@app.route('/status')
def status():
    mongodb_status = "Connected" if db is not None else "Disconnected"
    
    # Check news server
    try:
        news_response = requests.get(NEWS_API_URL)
        news_data = news_response.json() if news_response.status_code == 200 else []
        
        # Check if this is the new format with summary and news items
        if isinstance(news_data, dict) and 'news' in news_data:
            news_items_count = len(news_data.get('news', []))
        else:
            news_items_count = len(news_data)
            
        news_status = f"Connected: {news_items_count} news items" if news_response.status_code == 200 else f"Error: {news_response.status_code}"
    except Exception as e:
        news_status = f"Error: {str(e)}"
        news_data = []
    
    return render_template('status.html', 
                          mongodb_status=mongodb_status,
                          news_status=news_status,
                          news_data=news_data)

# Error template for clean error messages
@app.route('/error')
def error():
    message = request.args.get('message', 'An unknown error occurred')
    return render_template('error.html', message=message)

@app.route('/test-images')
def test_images():
    return render_template('test_images.html')

@app.route('/debug')
def debug_page():
    return app.send_static_file('debug.html')

@app.route('/challenges')
def challenges_page():
    return render_template('challenges.html')

@app.route('/financial-literacy')
def financial_literacy_page():
    return render_template('financial_literacy.html')

# Financial literacy routes
@app.route('/api/financial-literacy', methods=['GET'])
def get_financial_literacy_modules():
    if db is None:
        # Mock data for when MongoDB is unavailable
        mock_modules = [
            {
                "id": "fm001",
                "title": "The Magic of Saving",
                "description": "Learn how your money can grow over time with the magic of interest!",
                "difficulty": "easy",
                "rewards": {
                    "experience": 75,
                    "cash": 750
                },
                "status": "available"
            },
            {
                "id": "fm002",
                "title": "What is the Stock Market?",
                "description": "Discover how companies and people can share ownership through stocks - like owning a tiny piece of your favorite shop!",
                "difficulty": "easy",
                "rewards": {
                    "experience": 75,
                    "cash": 750
                },
                "status": "available"
            }
        ]
        return jsonify(mock_modules)
    
    try:
        # Get modules from database
        modules = list(db.financial_literacy.find({}, {'_id': 0}))
        
        # If user is authenticated, personalize module status
        if 'user_id' in session:
            user_id = session['user_id']
            user = db.users.find_one({"_id": ObjectId(user_id)})
            user_level = user.get('level', 1) if user else 1
            completed_modules = user.get('completed_modules', []) if user else []
            
            for module in modules:
                if module['id'] in completed_modules:
                    module['status'] = 'completed'
                elif module.get('requirements', {}).get('min_level', 1) > user_level:
                    module['status'] = 'locked'
                else:
                    module['status'] = 'available'
        
        return jsonify(modules)
    except Exception as e:
        return jsonify({"error": f"Error retrieving financial literacy modules: {str(e)}"}), 500

@app.route('/api/financial-literacy/<module_id>', methods=['GET'])
def get_financial_literacy_module(module_id):
    if db is None:
        return jsonify({"error": "Database not available"}), 503
    
    try:
        module = db.financial_literacy.find_one({"id": module_id}, {'_id': 0})
        if not module:
            return jsonify({"error": "Module not found"}), 404
        
        return jsonify(module)
    except Exception as e:
        return jsonify({"error": f"Error retrieving module: {str(e)}"}), 500

@app.route('/api/financial-literacy/<module_id>/complete', methods=['POST'])
def complete_financial_literacy_module(module_id):
    # This route will be called when a user completes a module
    if db is None:
        return jsonify({"error": "Database not available"}), 503
    
    # Verify user authentication
    auth_result = verify_token()
    if isinstance(auth_result, tuple):
        return auth_result
    
    user_id = auth_result
    
    try:
        # Get the module
        module = db.financial_literacy.find_one({"id": module_id})
        if not module:
            return jsonify({"error": "Module not found"}), 404
        
        # Get the user
        user = db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        # Check if module is already completed
        completed_modules = user.get('completed_modules', [])
        if module_id in completed_modules:
            return jsonify({"success": True, "message": "Module already completed"}), 200
        
        # Update user experience and cash
        current_experience = user.get('experience', 0)
        current_level = user.get('level', 1)
        current_balance = user.get('balance', 0)
        
        new_experience = current_experience + module['rewards']['experience']
        new_balance = current_balance + module['rewards']['cash']
        
        # Check if user leveled up (simplified level calculation)
        level_up = False
        new_level = current_level
        
        # Calculate experience required for next level: level * 1000
        exp_for_next_level = current_level * 1000
        if new_experience >= exp_for_next_level:
            new_level = current_level + 1
            level_up = True
        
        # Add module to completed modules
        if module_id not in completed_modules:
            completed_modules.append(module_id)
        
        # Update user in database
        db.users.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {
                "experience": new_experience,
                "level": new_level,
                "balance": new_balance,
                "completed_modules": completed_modules
            }}
        )
        
        # Create transaction record
        transaction = {
            "user_id": user_id,
            "type": "module_completion",
            "module_id": module_id,
            "module_title": module['title'],
            "rewards": {
                "experience": module['rewards']['experience'],
                "cash": module['rewards']['cash']
            },
            "timestamp": datetime.now()
        }
        db.transactions.insert_one(transaction)
        
        # Return success response
        return jsonify({
            "success": True,
            "message": "Module completed successfully",
            "level_up": level_up,
            "new_level": new_level,
            "rewards": {
                "xp": module['rewards']['experience'],
                "cash": module['rewards']['cash']
            }
        }), 200
        
    except Exception as e:
        return jsonify({"error": f"Error completing module: {str(e)}"}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3000))
    app.run(host='0.0.0.0', port=port, debug=True) 