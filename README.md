# Ask Shubham AI 🤖

An AI powered hiring assistant that lets recruiters and hiring managers explore my candidacy through natural conversation instead of reading a static resume.

Ask questions about my education, technical skills, projects, and experience, and get accurate, context aware answers grounded in my resume and a structured candidate profile, not hallucinated ones.

---

## Overview

Ask Shubham AI replaces static resume reading with an interactive conversational experience for recruiters. It answers recruiter focused questions while staying grounded in verified information, so responses are accurate and reliable instead of invented.

---

## Features

- AI powered recruiter chatbot with session based conversation memory (each session is isolated by a UUID)
- Resume aware, grounded responses using a structured candidate profile
- Custom resume parser with Pydantic validated structured extraction
- Streaming AI responses for a smooth chat experience
- Markdown formatted answers
- Prompt injection resistance
- Modern, responsive user interface
- Fast, lightweight FastAPI backend

---

## Tech Stack

**Frontend**
- React
- TypeScript
- Vite

**Backend**
- Python
- FastAPI
- Pydantic

**AI**
- Groq API
- Llama 3.3 70B Versatile

**Resume Processing**
- Custom resume parser
- PDF parsing (pypdf)

---

## How It Works

1. The application loads the candidate's resume.
2. The resume is parsed into structured information.
3. Additional candidate context is merged with the parsed resume.
4. Recruiter questions are sent to the AI along with this candidate context and the session's conversation history.
5. Responses stream back in real time, staying grounded in the provided information.

---

## Getting Started

### Prerequisites
- Python 3.11 or higher
- Node.js 18 or higher
- A Groq API key from console.groq.com

### Backend Setup

```bash
git clone https://github.com/apkacoderji/Ask-Shubham_AI.git
cd Ask-Shubham_AI/backend

python -m venv venv
venv\Scripts\activate      # Windows
source venv/bin/activate   # macOS/Linux

pip install -r requirements.txt

echo "GROQ_API_KEY=your_key_here" > .env

uvicorn main:app --reload
```

### Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Check your terminal output for the exact ports once both are running.

---

## Key Design Principles

- Grounded AI responses, no hallucinated skills or experience
- Professional, recruiter focused communication
- Prompt injection resistance
- Short, concise, factual answers
- Modern conversational user experience

---

## Future Improvements

- Resume upload support (currently loads a fixed resume)
- Multiple candidate profiles
- Voice interaction
- Recruiter analytics dashboard
- Authentication
- Docker deployment
- Cloud deployment

---

## Project Motivation

Recruiters often spend only a few seconds reviewing a resume. Ask Shubham AI creates a more interactive hiring experience, letting recruiters instantly explore a candidate's background through conversation instead of manually scanning a document.

The project also reflects hands on experience with AI application development, backend engineering, API integration, prompt engineering, and full stack development.

---

## Author

**Shubham Negi**
B.Tech Computer Science Engineering student, exploring AI Engineering

- GitHub: [@apkacoderji](https://github.com/apkacoderji)
- Email: shubhamnegi041@gmail.com / ahh1976shubh@gmail.com

---

⭐ If you found this project interesting, consider giving it a star.
