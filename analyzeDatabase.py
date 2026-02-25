import csv
import json
import uuid
import random
import psycopg2
from datetime import datetime
from openai import OpenAI
import os

# ==============================
# CONFIG
# ==============================

INPUT_CSV = "transcripts.csv"

# PostgreSQL connection
DB_CONFIG = {
    "host": "localhost",
    "database": "call_intelligence_db",
    "user": "postgres",
    "password": "SBD",
    "port": "5432"
}

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))  # Uses OPENAI_API_KEY from environment


# ==============================
# LLM ANALYSIS FUNCTION
# ==============================

def analyze_call(transcript: str) -> dict:

    system_prompt = """
    You are an AI call analysis engine for a telecom company.

    Speaker 1 is the Agent.
    Speaker 2 is the Customer.

    Return ONLY valid JSON.
    Do NOT include explanations.
    """

    user_prompt = f"""
    Analyze this telecom call transcript.

    Return JSON with EXACTLY these fields:

    {{
    "customer_sentiment": "",
    "sentiment_score": 0.0,
    "churn_risk_level": "",
    "churn_confidence": 0.0,
    "churn_trigger_reasons": [],
    "upsell_detected": false,
    "upsell_confidence": 0.0,
    "suggested_product": null,
    "objection_category": "",
    "resolution_status": "",
    "empathy_score": 0,
    "clarity_score": 0,
    "professionalism_score": 0,
    "call_summary": ""
    }}

    Transcript:
    {transcript}
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        temperature=0,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
    )

    return json.loads(response.choices[0].message.content.strip())


# ==============================
# MAIN PIPELINE
# ==============================

def main():
    id = 1
    conn = psycopg2.connect(**DB_CONFIG)
    cursor = conn.cursor()

    with open(INPUT_CSV, newline="", encoding="utf-8") as infile:

        reader = csv.DictReader(infile)

        for row in reader:

            transcript = row.get("text", "").strip()

            if not transcript:
                print("⚠️ Empty transcript, skipping")
                continue

            try:
                analysis = analyze_call(transcript)

                # Generate IDs
                customer_id = str(uuid.uuid4())
                call_id = str(uuid.uuid4())
                transcript_id = str(uuid.uuid4())
                analysis_id = str(uuid.uuid4())

                id += 1

                # 1️⃣ Insert Customer
                cursor.execute("""
                INSERT INTO customers
                (customer_id, account_number, segment, plan_type, status)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (account_number) DO NOTHING;
                """, (
                    customer_id,
                    str(customer_id)[:8],
                    "postpaid",
                    "basic",
                    "active"
                ))

                # 2️⃣ Insert Call
                cursor.execute("""
                INSERT INTO calls
                (call_id, customer_id, agent_id, call_start,
                 call_duration_seconds, call_channel, call_status)
                VALUES (%s, %s, %s, %s, %s, %s, %s);
                """, (
                    call_id,
                    customer_id,
                    "agent_001",
                    datetime.now(),
                    300,
                    "inbound",
                    "completed"
                ))

                # 3️⃣ Insert Transcript
                cursor.execute("""
                INSERT INTO transcripts
                (transcript_id, call_id, full_text, language, model_used)
                VALUES (%s, %s, %s, %s, %s);
                """, (
                    transcript_id,
                    call_id,
                    transcript,
                    "en",
                    "whisper-small"
                ))

                # 4️⃣ Insert AI Analysis
                cursor.execute("""
                INSERT INTO call_ai_analysis (
                    analysis_id,
                    call_id,
                    model_version,
                    customer_sentiment,
                    sentiment_score,
                    churn_risk_level,
                    churn_confidence,
                    churn_trigger_reasons,
                    upsell_detected,
                    upsell_confidence,
                    suggested_product,
                    objection_category,
                    resolution_status,
                    empathy_score,
                    clarity_score,
                    professionalism_score,
                    call_summary
                )
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);
                """, (
                    analysis_id,
                    call_id,
                    "v1",
                    analysis["customer_sentiment"],
                    analysis["sentiment_score"],
                    analysis["churn_risk_level"],
                    analysis["churn_confidence"],
                    analysis["churn_trigger_reasons"],
                    analysis["upsell_detected"],
                    analysis["upsell_confidence"],
                    analysis["suggested_product"],
                    analysis["objection_category"],
                    analysis["resolution_status"],
                    analysis["empathy_score"],
                    analysis["clarity_score"],
                    analysis["professionalism_score"],
                    analysis["call_summary"]
                ))

                conn.commit()
                print("✅ Inserted call into PostgreSQL")

            except Exception as e:
                conn.rollback()
                print("❌ Error:", e)

    cursor.close()
    conn.close()


if __name__ == "__main__":
    main()