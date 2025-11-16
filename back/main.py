from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from pydantic import BaseModel
import supabase 
import os
from mangum import Mangum

handler = Mangum(app)

app = FastAPI(
    title="Blog API",
    description="FastAPI 기반 블로그 백엔드",
    version="1.0.0"
)

supabase: Client = create_client("https://oujekswpyehyoixvnodf.supabase.co/", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91amVrc3dweWVoeW9peHZub2RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMDQxNjYsImV4cCI6MjA3ODY4MDE2Nn0.ycBrPlJEc9s4XAbHngEwLeakPvvL4wVjL0QGU35LBgo")

# CORS 설정 (React 프론트엔드와 통신)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def root():
    return "no"


@app.get('/list')
def list():
    response = (
        supabase.table("post").select("*").execute()
    )
    return response.data


class Comment(BaseModel):
    target: int
    content: str

@app.post('/sendComment')
def sendComment(data: Comment):
    response = (
        supabase.table("comment").insert({"target_id": data.target, "content": data.content}).execute()
    )
    return True


class getPost(BaseModel):
    postId: int

@app.post('/postData')
def getPostData(data: getPost):
    response = (
        supabase.table("post").select("*").eq("id", data.postId).execute()
    )
    commentResponse = (
        supabase.table("comment").select("*").eq("target_id", data.postId).execute()
    )
    return [response.data, commentResponse.data]