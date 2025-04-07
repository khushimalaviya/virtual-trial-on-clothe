# from flask import Flask, request, jsonify
# import requests
# import json
# import os

# app = Flask(__name__)

# PIXELCUT_API_URL = "https://api.developer.pixelcut.ai/v1/try-on"
# PIXELCUT_API_KEY = "sk_5d34fe9279924ea5a05afee3e71a29ba"  # 🔴 Replace with a valid API Key

# @app.route("/virtual-trial", methods=["POST"])
# def process_image():
#     try:
#         data = request.json
#         print("📥 Received Data:", data)  # Debugging print

#         if not data:
#             return jsonify({"error": "No JSON data received"}), 400

#         user_img_path = data.get("userImage")
#         outfit_img_path = data.get("outfitImage")

#         if not user_img_path or not outfit_img_path:
#             return jsonify({"error": "Missing required fields (userImage, outfitImage)"}), 400

#         print(f"🔍 User Image Path: {user_img_path}")
#         print(f"🔍 Outfit Image Path: {outfit_img_path}")

#         # Check if input is a URL or a local file path
#         def is_url(path):
#             return path.startswith("http://") or path.startswith("https://")

#         if not (is_url(user_img_path) or os.path.exists(user_img_path)):
#             return jsonify({"error": "User image not found or invalid"}), 404

#         if not (is_url(outfit_img_path) or os.path.exists(outfit_img_path)):
#             return jsonify({"error": "Outfit image not found or invalid"}), 404

#         # Prepare request for Pixelcut API
#         payload = json.dumps({
#             "person_image_url": user_img_path,
#             "garment_image_url": outfit_img_path
#         })
#         headers = {
#             'Content-Type': 'application/json',
#             'Accept': 'application/json',
#             'X-API-KEY': PIXELCUT_API_KEY
#         }

#         # Call Pixelcut API
#         response = requests.post(PIXELCUT_API_URL, headers=headers, data=payload)
        
#         try:
#             pixelcut_response = response.json()
#         except json.JSONDecodeError:
#             return jsonify({"error": "Invalid response from Pixelcut API"}), 500

#         if response.status_code == 200 and "result_url" in pixelcut_response:
#             result_image_url = pixelcut_response["result_url"]
#             print(f"✅ Generated Result URL: {result_image_url}")  # Print result URL
#             return jsonify({"success": True, "resultImage": result_image_url})
#         else:
#             return jsonify({"error": "Failed to generate virtual trial", "details": pixelcut_response}), 500

#     except Exception as e:
#         print("❌ Server Error:", str(e))  # Debugging print
#         return jsonify({"error": "Internal Server Error", "details": str(e)}), 500

# if __name__ == "__main__":
#     app.run(port=5000, debug=True)

from flask import Flask, request, jsonify
import requests
import os
import cloudinary
import cloudinary.uploader

app = Flask(__name__)

# 🔹 Configure Cloudinary
cloudinary.config(
    cloud_name="ddqmel7sm",  # Replace with your Cloudinary Cloud Name
    api_key="911362626644736",        # Replace with your API Key
    api_secret="fjo1DmGCHvUKYhE8lIZUEiyVBmE"   # Replace with your API Secret
)

PIXELCUT_API_URL = "https://api.developer.pixelcut.ai/v1/try-on"
PIXELCUT_API_KEY = "sk_7f01461fe1374db695c63f754f484db6"  # Replace with valid API Key

@app.route("/virtual-trial", methods=["POST"])
def process_image():
    try:
        data = request.json
        print("📥 Received Data:", data)

        if not data:
            return jsonify({"error": "No JSON data received"}), 400

        user_img_path = data.get("userImage")
        outfit_img_path = data.get("outfitImage")

        if not user_img_path or not outfit_img_path:
            return jsonify({"error": "Missing required fields (userImage, outfitImage)"}), 400

        # 🔹 Upload images to Cloudinary
        user_upload = cloudinary.uploader.upload(user_img_path)
        outfit_upload = cloudinary.uploader.upload(outfit_img_path)

        user_public_url = user_upload["secure_url"]
        outfit_public_url = outfit_upload["secure_url"]

        print(f"🌍 Public User Image URL: {user_public_url}")
        print(f"🌍 Public Outfit Image URL: {outfit_public_url}")

        # 🔹 Prepare request for Pixelcut API
        payload = {
            "person_image_url": user_public_url,
            "garment_image_url": outfit_public_url
        }
        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-API-KEY': PIXELCUT_API_KEY
        }

        # 🔹 Call Pixelcut API
        response = requests.post(PIXELCUT_API_URL, headers=headers, json=payload)

        try:
            pixelcut_response = response.json()
        except requests.exceptions.JSONDecodeError:
            return jsonify({"error": "Invalid response from Pixelcut API"}), 500

        if response.status_code == 200 and "result_url" in pixelcut_response:
            result_image_url = pixelcut_response["result_url"]
            print(f"✅ Generated Result URL: {result_image_url}")
            return jsonify({"success": True, "resultImage": result_image_url})
        else:
            return jsonify({"error": "Failed to generate virtual trial", "details": pixelcut_response}), 500

    except Exception as e:
        print("❌ Server Error:", str(e))
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(port=4000, debug=True)
