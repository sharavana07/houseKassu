from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)  # Allows requests from frontend

# Load the trained model
model = joblib.load('model.pkl')

# Manual label encoding mappings
label_map = {
    'mainroad': {'yes': 1, 'no': 0},
    'guestroom': {'yes': 1, 'no': 0},
    'basement': {'yes': 1, 'no': 0},
    'hotwaterheating': {'yes': 1, 'no': 0},
    'airconditioning': {'yes': 1, 'no': 0},
    'prefarea': {'yes': 1, 'no': 0},
    'furnishingstatus': {
        'furnished': 0,
        'semi-furnished': 1,
        'unfurnished': 2
    }
}

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Prepare input for the model
    input_data = [
        float(data['area']),
        int(data['bedrooms']),
        int(data['bathrooms']),
        int(data['stories']),
        label_map['mainroad'][data['mainroad']],
        label_map['guestroom'][data['guestroom']],
        label_map['basement'][data['basement']],
        label_map['hotwaterheating'][data['hotwaterheating']],
        label_map['airconditioning'][data['airconditioning']],
        int(data['parking']),
        label_map['prefarea'][data['prefarea']],
        label_map['furnishingstatus'][data['furnishingstatus']]
    ]

    # Predict price
    prediction = model.predict([input_data])[0]
    return jsonify({'predicted_price': round(prediction, 2)})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
