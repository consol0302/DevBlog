from fastapi import FastAPI, HTTPException
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from pydantic import BaseModel
import google.generativeai as genai

app = FastAPI(
    title="Blog API",
    description="FastAPI 기반 블로그 백엔드",
    version="1.0.0"
)

# 제미나이 키값
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "your-api-key-here")
genai.configure(api_key=GEMINI_API_KEY)

# 슈-파베이스
supabase_client: Client = create_client("https://hbypjezxxkevgbzkhjgj.supabase.co/", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhieXBqZXp4eGtldmdiemtoamdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzMjQzNTQsImV4cCI6MjA3ODkwMDM1NH0.933VwKz3oMEqppYQXN9n8fA58iV2aBpIA8RUGQTSwM0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def root():
    return "nothing"

@app.get('/')
def list():
    response = supabase_client.table("post").select("*").execute()
    return response.data

class Comment(BaseModel):
    target: int
    content: str

@app.post('/sendComment')
def sendComment(data: Comment):
    response = supabase_client.table("comment").insert({"target_id": data.target, "content": data.content}).execute()
    return True

class getPost(BaseModel):
    postId: int

@app.post('/postData')
def getPostData(data: getPost):
    response = supabase_client.table("post").select("*").eq("id", data.postId).execute()
    commentResponse = supabase_client.table("comment").select("*").eq("target_id", data.postId).execute()
    return [response.data, commentResponse.data]