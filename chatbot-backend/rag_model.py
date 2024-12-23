import pandas as pd
import faiss
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from sklearn.feature_extraction.text import TfidfVectorizer
import torch
import os

# Bước 1: Tải và xử lý dữ liệu
def load_data():
    try:
        # Try different encodings if ISO-8859-1 doesn't work
        encodings = ['ISO-8859-1', 'utf-8', 'cp1252']
        for encoding in encodings:
            try:
                file_path = r'C:\Users\Dell\OneDrive\Máy tính\ChatBot_RAG\chatbot-backend\questionDataVer2.csv'
                data = pd.read_csv(file_path, sep=";", header=None, 
                                 names=['Question', 'Answer'], 
                                 encoding=encoding)
                return data
            except UnicodeDecodeError:
                continue
        raise Exception("Could not read the CSV file with any of the attempted encodings")
    except Exception as e:
        raise Exception(f"Error loading data: {str(e)}")

# Load data
data = load_data()

# Bước 2: Tạo vector từ các câu hỏi sử dụng TF-IDF
vectorizer = TfidfVectorizer()
question_vectors = vectorizer.fit_transform(data['Question'])

# Bước 3: Chuyển đổi sang dense và xây dựng chỉ mục FAISS
dense_vectors = question_vectors.toarray().astype('float32')
faiss.normalize_L2(dense_vectors)
index = faiss.IndexFlatL2(dense_vectors.shape[1])
index.add(dense_vectors)

# Bước 4: Tải mô hình generator từ Hugging Face
model_name = "t5-small"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

def retrieve(question, top_k=1):
    query_vector = vectorizer.transform([question]).toarray().astype('float32')
    faiss.normalize_L2(query_vector)
    _, indices = index.search(query_vector, top_k)
    return data.iloc[indices[0]]

def generate_answer(context, question):
    input_text = f"question: {question} context: {context}"
    inputs = tokenizer(input_text, return_tensors="pt", max_length=512, truncation=True)
    outputs = model.generate(inputs["input_ids"], max_length=100, num_beams=4, early_stopping=True)
    return tokenizer.decode(outputs[0], skip_special_tokens=True)

def answer_question(user_question):
    try:
        retrieved_data = retrieve(user_question)
        context = retrieved_data['Answer'].iloc[0]
        return generate_answer(context, user_question)
    except Exception as e:
        raise Exception(f"Error generating answer: {str(e)}")

# Remove the interactive loop since we're using the API now