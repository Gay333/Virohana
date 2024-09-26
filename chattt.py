import nltk
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import random
import string
from flask import Flask, request, jsonify
from flask_cors import CORS

# Download necessary nltk data
nltk.download('punkt')
nltk.download('wordnet')

# Load and preprocess data
with open("acne3.txt", 'r', errors='ignore') as file:
    raw = file.read().lower()

sent_tokens = nltk.sent_tokenize(raw)
word_tokens = nltk.word_tokenize(raw)

# Preprocessing
lemmer = WordNetLemmatizer()

def LemTokens(tokens):
    return [lemmer.lemmatize(token) for token in tokens]

remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)

def LemNormalize(text):
    return LemTokens(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))

# Greetings
GREETING_INPUTS = ("hello", "hi", "greetings", "sup", "what's up", "hey")
GREETING_RESPONSES = ["hi", "hey", "hello", "I am glad you are talking to me"]

def greeting(sentence):
    for word in sentence.split():
        if word.lower() in GREETING_INPUTS:
            return random.choice(GREETING_RESPONSES)

# Chatbot response
def chatbot_response(user_response):
    chatbot_response = ''
    sent_tokens.append(user_response)
    TfidfVec = TfidfVectorizer(tokenizer=LemNormalize, stop_words="english")
    tfidf = TfidfVec.fit_transform(sent_tokens)
    vals = cosine_similarity(tfidf[-1], tfidf)
    idx = vals.argsort()[0][-2]
    flat = vals.flatten()
    flat.sort()
    req_tfidf = flat[-2]
    if(req_tfidf == 0):
        chatbot_response = "I am sorry! I don't understand you."
        return chatbot_response
    else:
        chatbot_response = sent_tokens[idx]
        return chatbot_response

# Flask integration
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/chatbot', methods=['GET'])
def chatbot():
    user_input = request.args.get('user_input')
    if user_input.lower() == 'bye':
        return jsonify({'response': "Goodbye! Have a great day."})

    greeting_response = greeting(user_input)
    if greeting_response:
        return jsonify({'response': greeting_response})
    
    chat_response = chatbot_response(user_input)
    sent_tokens.remove(user_input)
    return jsonify({'response': chat_response})

if __name__ == '__main__':
    app.run(debug=True)
