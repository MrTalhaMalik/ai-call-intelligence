import csv
import json
import os
from openai import OpenAI

# ==============================
# CONFIG
# ==============================

INPUT_CSV = "transcripts.csv"
OUTPUT_CSV = "analyzed_calls.csv"

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# ==============================
# LLM ANALYSIS FUNCTION
# ==============================

def analyze_call(transcript: str) -> dict:
    """
    Analyzes telecom call transcript and extracts structured business intelligence.
    """

    system_prompt = """
    You are an AI call analysis engine for a telecom company.

    Speaker 1 is the Agent.
    Speaker 2 is the Customer.

    You MUST return valid JSON only.
    Do NOT include explanations.
    Do NOT include markdown.
    Do NOT include additional keys.
    Return ONLY the specified fields.
    If information is unclear, return null.
    All confidence values must be floats between 0 and 1.
    All score values must follow defined ranges.
    Boolean values must be true or false (not strings).
    """


    user_prompt = f"""
    Analyze the following telecom customer service call transcript.

    Tasks:

    1) customer_sentiment:
    Must be exactly one of:
    Positive, Neutral, Frustrated, Angry

    2) sentiment_score:
    Float between 0 and 1 (higher = more positive sentiment)

    3) churn_risk_level:
    Must be exactly one of:
    Low, Medium, High

    4) churn_confidence:
    Float between 0 and 1

    5) churn_trigger_reasons:
    Array of short strings.
    If none, return empty array [].

    6) upsell_detected:
    Boolean (true or false)

    7) upsell_confidence:
    Float between 0 and 1.
    If upsell_detected is false, return 0.

    8) suggested_product:
    Short string.
    If no upsell, return null.

    9) objection_category:
    Must be exactly one of:
    Price, Network Quality, Billing Issue,
    Competitor Mention, Service Quality,
    Technical Issue, None, Other

    10) resolution_status:
        Must be exactly one of:
        Resolved, Partially Resolved, Not Resolved

    11) empathy_score:
        Integer between 1 and 10

    12) clarity_score:
        Integer between 1 and 10

    13) professionalism_score:
        Integer between 1 and 10

    14) call_summary:
        Maximum 3 sentences.
        Business-focused summary only.

    Transcript:
    --------------------
    {transcript}
    --------------------

    Return JSON in EXACTLY this structure:

    {
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
    }
    """


    response = client.chat.completions.create(
        model="gpt-4o-mini",
        temperature=0,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
    )

    content = response.choices[0].message.content.strip()

    return json.loads(content)

# ==============================
# MAIN PIPELINE
# ==============================

def main():
    with open(INPUT_CSV, newline="", encoding="utf-8") as infile, \
         open(OUTPUT_CSV, "w", newline="", encoding="utf-8") as outfile:

        reader = csv.DictReader(infile)

        fieldnames = reader.fieldnames + [
            "customer_sentiment",
            "sentiment_score",
            "churn_risk_level",
            "churn_confidence",
            "churn_trigger_reasons",
            "upsell_detected",
            "upsell_confidence",
            "suggested_product",
            "objection_category",
            "resolution_status",
            "empathy_score",
            "clarity_score",
            "professionalism_score",
            "call_summary"
        ]

        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()

        for row in reader:
            transcript = row.get("text", "").strip()

            if not transcript:
                print("⚠️ Empty transcript, skipping")
                continue

            try:
                analysis = analyze_call(transcript)

                required_keys = [
                    "customer_sentiment",
                    "sentiment_score",
                    "churn_risk_level",
                    "churn_confidence",
                    "churn_trigger_reasons",
                    "upsell_detected",
                    "upsell_confidence",
                    "suggested_product",
                    "objection_category",
                    "resolution_status",
                    "empathy_score",
                    "clarity_score",
                    "professionalism_score",
                    "call_summary"
                ]

                for key in required_keys:
                    if key not in analysis:
                        raise ValueError(f"Missing key: {key}")


                # Map flat JSON keys to CSV columns
                row["customer_sentiment"] = analysis.get("customer_sentiment")
                row["sentiment_score"] = analysis.get("sentiment_score")
                row["churn_risk_level"] = analysis.get("churn_risk_level")
                row["churn_confidence"] = analysis.get("churn_confidence")
                row["churn_trigger_reasons"] = json.dumps(analysis.get("churn_trigger_reasons", []))
                row["upsell_detected"] = analysis.get("upsell_detected")
                row["upsell_confidence"] = analysis.get("upsell_confidence")
                row["suggested_product"] = analysis.get("suggested_product")
                row["objection_category"] = analysis.get("objection_category")
                row["resolution_status"] = analysis.get("resolution_status")
                row["empathy_score"] = analysis.get("empathy_score")
                row["clarity_score"] = analysis.get("clarity_score")
                row["professionalism_score"] = analysis.get("professionalism_score")
                row["call_summary"] = analysis.get("call_summary")

                writer.writerow(row)
                print("✅ Processed call")
                print(analysis)

            except Exception as e:
                print("❌ Error processing call:", e)

if __name__ == "__main__":
    main()
