from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from datetime import datetime

# ---------- DATABASE SETUP ----------
engine = create_engine("sqlite:///taskforge.db", connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()


# ---------- MODELS ----------
class LeadModel(Base):
    __tablename__ = "leads"
    id = Column(Integer, primary_key=True)
    name = Column(String(160))
    phone = Column(String(50))
    message = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)


class JobModel(Base):
    __tablename__ = "jobs"
    id = Column(Integer, primary_key=True)
    title = Column(String(200))
    price = Column(Integer, default=0)
    status = Column(String(40), default="scheduled")
    created_at = Column(DateTime, default=datetime.utcnow)


Base.metadata.create_all(bind=engine)


# ---------- FASTAPI APP ----------
app = FastAPI(title="TaskForge API (MVP)")

# CORS: allow local frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Safe for local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- SCHEMAS ----------
class LeadIn(BaseModel):
    name: str
    phone: Optional[str] = None
    message: Optional[str] = None


class LeadOut(BaseModel):
    id: int
    name: str
    phone: Optional[str]
    message: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class JobIn(BaseModel):
    title: str
    price: int = 0


class JobOut(BaseModel):
    id: int
    title: str
    price: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


# ---------- HEALTH ----------
@app.get("/health")
def health():
    return {"ok": True}


# ---------- LEADS ----------
@app.get("/leads", response_model=List[LeadOut])
def list_leads():
    db = SessionLocal()
    leads = db.query(LeadModel).order_by(LeadModel.created_at.desc()).all()
    db.close()
    return leads


@app.post("/leads", response_model=LeadOut)
def create_lead(payload: LeadIn):
    db = SessionLocal()
    lead = LeadModel(name=payload.name, phone=payload.phone, message=payload.message)
    db.add(lead)
    db.commit()
    db.refresh(lead)
    db.close()
    return lead


@app.put("/leads/{lead_id}", response_model=LeadOut)
def update_lead(lead_id: int, payload: LeadIn):
    db = SessionLocal()
    lead = db.query(LeadModel).filter(LeadModel.id == lead_id).first()
    if not lead:
        db.close()
        raise HTTPException(status_code=404, detail="Lead not found")
    lead.name = payload.name
    lead.phone = payload.phone
    lead.message = payload.message
    db.commit()
    db.refresh(lead)
    db.close()
    return lead


@app.delete("/leads/{lead_id}")
def delete_lead(lead_id: int):
    db = SessionLocal()
    lead = db.query(LeadModel).filter(LeadModel.id == lead_id).first()
    if not lead:
        db.close()
        raise HTTPException(status_code=404, detail="Lead not found")
    db.delete(lead)
    db.commit()
    db.close()
    return {"ok": True, "message": f"Deleted lead {lead_id}"}


# ---------- JOBS ----------
@app.get("/jobs", response_model=List[JobOut])
def list_jobs():
    db = SessionLocal()
    jobs = db.query(JobModel).order_by(JobModel.created_at.desc()).all()
    db.close()
    return jobs


@app.post("/jobs", response_model=JobOut)
def create_job(payload: JobIn):
    db = SessionLocal()
    job = JobModel(title=payload.title, price=payload.price)
    db.add(job)
    db.commit()
    db.refresh(job)
    db.close()
    return job


@app.put("/jobs/{job_id}", response_model=JobOut)
def update_job(job_id: int, payload: JobIn):
    db = SessionLocal()
    job = db.query(JobModel).filter(JobModel.id == job_id).first()
    if not job:
        db.close()
        raise HTTPException(status_code=404, detail="Job not found")
    job.title = payload.title
    job.price = payload.price
    db.commit()
    db.refresh(job)
    db.close()
    return job


@app.delete("/jobs/{job_id}")
def delete_job(job_id: int):
    db = SessionLocal()
    job = db.query(JobModel).filter(JobModel.id == job_id).first()
    if not job:
        db.close()
        raise HTTPException(status_code=404, detail="Job not found")
    db.delete(job)
    db.commit()
    db.close()
    return {"ok": True, "message": f"Deleted job {job_id}"}
