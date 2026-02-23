from faster_whisper import WhisperModel
import pandas as pd
import os

# ---------------- CONFIG ----------------
AUDIO_DIR = "CallDataTest"
OUTPUT_CSV = "transcripts.csv"
WHISPER_MODEL = "small.en"
# ----------------------------------------

print("Loading Whisper model...")

model = WhisperModel(
    WHISPER_MODEL,
    device="cpu",
    compute_type="int8"
)

rows = []

audio_files = [
    f for f in os.listdir(AUDIO_DIR)
    if f.lower().endswith((".wav", ".mp3", ".flac"))
]

for call_id in audio_files:
    filepath = os.path.join(AUDIO_DIR, call_id)
    print(f"\nProcessing {call_id}")

    # Transcribe full file directly
    segments, info = model.transcribe(
        filepath,
        language="en",
        beam_size=1
    )

    full_text = ""
    for segment in segments:
        full_text += segment.text + " "

    full_text = full_text.strip()

    rows.append({
        "call_id": call_id,
        "duration_sec": round(info.duration, 2),
        "detected_language": info.language,
        "text": full_text
    })

    print(full_text)

# Save results
df = pd.DataFrame(rows)
df.to_csv(OUTPUT_CSV, index=False)

print("\n✅ Transcription complete")
print(f"Saved to {OUTPUT_CSV}")
