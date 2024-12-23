from flask import Flask, request, jsonify
from flask_cors import CORS
from rag_model import answer_question

app = Flask(__name__)
# Configure CORS to allow requests from your frontend
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

@app.route('/api/rag', methods=['POST'])
def handle_question():
    try:
        data = request.json
        question = data.get('query')
        if not question:
            return jsonify({'error': 'No question provided'}), 400
        
        answer = answer_question(question)
        return jsonify({'answer': answer})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)