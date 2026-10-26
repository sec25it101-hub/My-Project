from PIL import Image
import io

def analyze_image(file_storage):
    # Lightweight demo detector. It estimates whether an image contains
    # likely floating waste using simple image statistics.
    data = file_storage.read()
    image = Image.open(io.BytesIO(data)).convert("RGB")
    width, height = image.size
    pixels = list(image.resize((64, 64)).getdata())

    bright = sum(1 for r, g, b in pixels if r > 170 and g > 170 and b > 170)
    dark = sum(1 for r, g, b in pixels if r < 80 and g < 80 and b < 80)
    score = min(99, max(12, int((bright + dark) / len(pixels) * 120)))

    count = 1 if score > 45 else 0
    return {
        "count": count,
        "confidence": score,
        "message": "Potential floating plastic detected." if count else
                   "No strong plastic indication in this demo analysis.",
        "image_size": f"{width} x {height}"
    }
