from fastapi import FastAPI, HTTPException
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from pydantic import BaseModel
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()

app = FastAPI(
    title="Blog API",
    description="FastAPI 기반 블로그 백엔드",
    version="1.0.0"
)

class Settings(BaseSettings):
    supabase_url: str
    supabase_anon_key: str
    frontend_url: str
    
    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()

# 슈-파베이스
supabase_client: Client = create_client(
    settings.supabase_url,
    settings.supabase_anon_key
)

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