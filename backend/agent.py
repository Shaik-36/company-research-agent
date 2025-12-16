import os
from typing import List, Dict, Any
from pydantic import BaseModel, Field

# For this demo, we can use DuckDuckGo Search.
# If the user has an OpenAI key, we'll use it. Otherwise we could mock or fail gracefully?
# The instruction says "uses an LLM (assuming user has an API key...)"
from langchain_community.tools import DuckDuckGoSearchRun
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import JsonOutputParser

# Define the structure of the report again for the agent to populate
class Section(BaseModel):
    title: str = Field(description="Title of the section")
    content: str = Field(description="Detailed content of the section")
    sources: List[str] = Field(description="List of URLs used as sources")

class CompanyResearchReport(BaseModel):
    company_name: str = Field(description="Name of the company")
    sections: List[Section] = Field(description="List of report sections")

# Initialize tools
search_tool = DuckDuckGoSearchRun()

def research_company(company_name: str) -> Dict[str, Any]:
    """
    Orchestrates the research process.
    """
    # 1. Search for general info
    print(f"Searching for {company_name}...")
    try:
        results_general = search_tool.run(f"{company_name} company mission vision founders")
        results_competitors = search_tool.run(f"{company_name} competitors and market alternatives")
        results_culture = search_tool.run(f"{company_name} company work culture employees reviews glassdoor")
        results_tech = search_tool.run(f"{company_name} tech stack engineering blog")
    except Exception as e:
        print(f"Search failed: {e}")
        return {"error": str(e)}

    # 2. Synthesize with LLM
    # We check for OPENAI_API_KEY
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        return {
            "company_name": company_name,
            "sections": [
                {
                    "title": "Error",
                    "content": "OPENAI_API_KEY not found in environment variables. Please add it to .env in backend/.",
                    "sources": []
                }
            ]
        }

    llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
    
    parser = JsonOutputParser(pydantic_object=CompanyResearchReport)
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a research assistant suitable for prospective employees. Analyze the provided search results and generate a structured report."),
        ("user", """
        Research Company: {company_name}
        
        Search Results (General): {results_general}
        Search Results (Competitors): {results_competitors}
        Search Results (Culture): {results_culture}
        Search Results (Tech): {results_tech}
        
        Generate a comprehensive report with the following sections:
        1. Idea, Mission & Vision
        2. Founders & Key People
        3. Market & Competitors
        4. Work Culture & Financials
        5. Tech Stack & Location
        
        {format_instructions}
        """)
    ])

    chain = prompt | llm | parser

    print("Synthesizing report...")
    try:
        report = chain.invoke({
            "company_name": company_name,
            "results_general": results_general,
            "results_competitors": results_competitors,
            "results_culture": results_culture,
            "results_tech": results_tech,
            "format_instructions": parser.get_format_instructions()
        })
        return report
    except Exception as e:
        print(f"LLM Synthesis failed: {e}")
        return {"error": str(e)}

if __name__ == "__main__":
    # Test
    print(research_company("LangChain"))
