"""
Label reader: uses Claude's vision capabilities to extract structured information
from a wine bottle label image (base64 or URL) or raw text.
"""

import base64
import re
import anthropic

from api.models.wine import ParsedLabel


LABEL_EXTRACTION_PROMPT = """You are a wine label expert. Extract the following information from this California wine label.
Return ONLY a JSON object with these exact keys (use null for missing fields):

{
  "winery": "the winery/producer name",
  "wine_name": "specific wine name or tier (e.g. 'Reserve', 'Estate', 'To Kalon Vineyard')",
  "vintage": 2019,
  "grape_variety": "primary grape variety (e.g. 'Cabernet Sauvignon')",
  "appellation": "the AVA or appellation (e.g. 'Napa Valley', 'Oakville', 'Russian River Valley')",
  "alcohol_pct": 14.5,
  "estate_bottled": true,
  "reserve": false,
  "raw_label_text": "all readable text from the label"
}

Be precise. For grape_variety, use the full name. For appellation, use the most specific AVA listed.
If there are multiple grape varieties listed, use the dominant one.
Return only valid JSON, nothing else."""


def parse_label(
    image_base64: str | None = None,
    image_url: str | None = None,
    raw_text: str | None = None,
) -> ParsedLabel:
    client = anthropic.Anthropic()

    if raw_text:
        # text-only path: ask Claude to parse the typed label
        message = client.messages.create(
            model="claude-opus-4-6",
            max_tokens=1024,
            messages=[
                {
                    "role": "user",
                    "content": f"{LABEL_EXTRACTION_PROMPT}\n\nLabel text:\n{raw_text}",
                }
            ],
        )
        content = message.content[0].text
    elif image_base64 or image_url:
        # vision path
        if image_base64:
            # detect media type
            if image_base64.startswith("/9j/"):
                media_type = "image/jpeg"
            elif image_base64.startswith("iVBOR"):
                media_type = "image/png"
            else:
                media_type = "image/jpeg"  # default
            image_content = {
                "type": "image",
                "source": {
                    "type": "base64",
                    "media_type": media_type,
                    "data": image_base64,
                },
            }
        else:
            image_content = {
                "type": "image",
                "source": {
                    "type": "url",
                    "url": image_url,
                },
            }

        message = client.messages.create(
            model="claude-opus-4-6",
            max_tokens=1024,
            messages=[
                {
                    "role": "user",
                    "content": [
                        image_content,
                        {"type": "text", "text": LABEL_EXTRACTION_PROMPT},
                    ],
                }
            ],
        )
        content = message.content[0].text
    else:
        raise ValueError("Must provide image_base64, image_url, or raw_text")

    # parse the JSON response
    # strip markdown code fences if present
    content = re.sub(r"```json\s*", "", content)
    content = re.sub(r"```\s*", "", content)
    content = content.strip()

    import json
    data = json.loads(content)

    return ParsedLabel(
        winery=data.get("winery"),
        wine_name=data.get("wine_name"),
        vintage=data.get("vintage"),
        grape_variety=data.get("grape_variety"),
        appellation=data.get("appellation"),
        alcohol_pct=data.get("alcohol_pct"),
        estate_bottled=data.get("estate_bottled"),
        reserve=data.get("reserve"),
        raw_label_text=data.get("raw_label_text"),
    )
