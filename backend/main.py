from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List

app = FastAPI(title="Company Research Agent API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ResearchRequest(BaseModel):
    company_name: str

from agent import CompanyResearchReport, Section
@app.get("/")
async def root():
    return {"message": "Company Research Agent API is running"}

@app.post("/research", response_model=CompanyResearchReport)
def research_company_endpoint(request: ResearchRequest):
    from agent import research_company
    report = research_company(request.company_name)
    if "error" in report:
        raise HTTPException(status_code=500, detail=report["error"])
    return report
