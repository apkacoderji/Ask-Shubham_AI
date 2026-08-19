import os
import json
from typing import List, Optional

from dotenv import load_dotenv
from groq import Groq
from pypdf import PdfReader
from pydantic import BaseModel

load_dotenv()

my_api_key = os.getenv("GROQ_API_KEY")
if not my_api_key:
    raise ValueError("Something is wrong with api key")

client = Groq(api_key=my_api_key)
model = "openai/gpt-oss-120b"


# ---- Schema ----

class Project(BaseModel):
    name: str
    description: str
    tech_stack: List[str]

class Experience(BaseModel):
    role: str
    organization: str
    duration: Optional[str] = None
    description: str

class Education(BaseModel):
    degree: str
    institution: str
    duration: Optional[str] = None

class ResumeData(BaseModel):
    name: str
    email: Optional[str] = None
    skills: List[str]
    education: List[Education]
    experience: List[Experience]
    projects: List[Project]


# ---- PDF extraction ----

def load_resume_pdf(filepath: str) -> str:
    reader = PdfReader(filepath)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text


# ---- LLM-based structuring ----

def extract_structured_resume(raw_text: str) -> ResumeData:
    extraction_prompt = f"""
Extract the following resume text into structured JSON matching this format:

{{
  "name": "string",
  "email": "string or null",
  "skills": ["string", ...],
  "education": [{{"degree": "string", "institution": "string", "duration": "string or null"}}],
  "experience": [{{"role": "string", "organization": "string", "duration": "string or null", "description": "string"}}],
  "projects": [{{"name": "string", "description": "string", "tech_stack": ["string", ...]}}]
}}

Only extract information present in the text. Do not invent anything. Return ONLY valid JSON, nothing else.

RESUME TEXT:
{raw_text}
"""

    response = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": extraction_prompt}],
        response_format={"type": "json_object"},
        temperature=0
    )

    raw_json = response.choices[0].message.content
    data = json.loads(raw_json)
    return ResumeData(**data)


# ---- Convert structured data back into readable text ----

def resume_to_text_summary(resume_data: ResumeData) -> str:
    education_lines = "\n".join(
        f"- {e.degree}, {e.institution} ({e.duration or 'N/A'})"
        for e in resume_data.education
    )
    experience_lines = "\n".join(
        f"- {e.role} at {e.organization} ({e.duration or 'N/A'}): {e.description}"
        for e in resume_data.experience
    )
    project_lines = "\n".join(
        f"- {p.name}: {p.description} [{', '.join(p.tech_stack)}]"
        for p in resume_data.projects
    )

    return f"""
Name: {resume_data.name}
Email: {resume_data.email or 'N/A'}

Skills: {', '.join(resume_data.skills)}

Education:
{education_lines}

Experience:
{experience_lines}

Projects:
{project_lines}
"""