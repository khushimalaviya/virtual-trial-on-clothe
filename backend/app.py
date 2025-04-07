# import traceback
# from flask import Flask, request, jsonify, send_file
# import cv2
# import numpy as np
# import torch
# from torchvision import transforms
# from PIL import Image
# import mediapipe as mp
# import os

# app = Flask(__name__)

# # Load the DeepLabV3 model for human parsing
# try:
#     model = torch.hub.load('pytorch/vision:v0.10.0', 'deeplabv3_resnet101', pretrained=True)
#     model.eval()
# except Exception as e:
#     print(f"Error loading model: {e}")
#     traceback.print_exc()

# # Pose estimation setup
# mp_pose = mp.solutions.pose
# pose = mp_pose.Pose()

# def segment_human(image_path):
#     try:
#         img = Image.open(image_path).convert("RGB")
#         preprocess = transforms.Compose([
#             transforms.Resize((512, 512)),
#             transforms.ToTensor(),
#         ])
#         img_tensor = preprocess(img).unsqueeze(0)

#         with torch.no_grad():
#             output = model(img_tensor)['out'][0]

#         segmentation_mask = output.argmax(0).byte().numpy()
#         return segmentation_mask
#     except Exception as e:
#         print(f"Error in segmentation: {e}")
#         traceback.print_exc()
#         return None

# def detect_pose(image_path):
#     try:
#         image = cv2.imread(image_path)
#         rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
#         result = pose.process(rgb_image)

#         if result.pose_landmarks:
#             for landmark in result.pose_landmarks.landmark:
#                 x, y = int(landmark.x * image.shape[1]), int(landmark.y * image.shape[0])
#                 cv2.circle(image, (x, y), 5, (0, 255, 0), -1)

#         return image
#     except Exception as e:
#         print(f"Error in pose detection: {e}")
#         traceback.print_exc()
#         return None

# @app.route('/virtual-tryon', methods=['POST'])
# def virtual_tryon():
#     try:
#         if 'person' not in request.files or 'clothing' not in request.files:
#             return jsonify({'error': 'Missing files'}), 400

#         person_file = request.files['person']
#         cloth_file = request.files['clothing']

#         person_path = "uploads/person.jpg"
#         cloth_path = "uploads/cloth.jpg"
#         person_file.save(person_path)
#         cloth_file.save(cloth_path)

#         # Process images (Segmentation & Pose Estimation)
#         mask = segment_human(person_path)
#         pose_img = detect_pose(person_path)

#         if mask is None or pose_img is None:
#             return jsonify({'error': 'Image processing failed'}), 500

#         # Save output images
#         mask_output_path = "outputs/mask.png"
#         pose_output_path = "outputs/pose.png"
#         cv2.imwrite(mask_output_path, mask * 20)
#         cv2.imwrite(pose_output_path, pose_img)

#         return send_file(mask_output_path, mimetype='image/png')

#     except Exception as e:
#         print(f"Unexpected error: {e}")
#         traceback.print_exc()
#         return jsonify({'error': 'Internal Server Error', 'message': str(e)}), 500

# if __name__ == '__main__':
#     os.makedirs("uploads", exist_ok=True)
#     os.makedirs("outputs", exist_ok=True)
#     app.run(host='0.0.0.0', port=4000, debug=True)
