from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["genome_scoring_db"]
collection = db["variant_scores"]

# Define the scoring matrix
scoring_matrix = {
    "What is the classification of the genetic variant?": {
        "Single nucleotide variation": {"LoF": 0, "GoF": 0, "Dominant Negative": 0},
        "Duplication": {"LoF": -1, "GoF": 1, "Dominant Negative": 1},
        "Deletion": {"LoF": 1, "GoF": -1, "Dominant Negative": 0},
        "Translocation": {"LoF": 1, "GoF": 1, "Dominant Negative": 0},
        "Others": {"LoF": 0, "GoF": 0, "Dominant Negative": 0},
    },
    "If the variant is involved in a protein product, does the protein have a new function / involve a new biological pathway?": {
        "Yes": {"LoF": -1, "GoF": 1, "Dominant Negative": 0},
        "No": {"LoF": 1, "GoF": -1, "Dominant Negative": 0},
    },
    "Is the protein expressed at a different developmental period?": {
        "Yes": {"LoF": -1, "GoF": 1, "Dominant Negative": -1},
        "No": {"LoF": 0, "GoF": -1, "Dominant Negative": 0},
    },
    "If not expressed in expected tissues, is it expressed elsewhere?": {
        "Yes": {"LoF": -1, "GoF": 1, "Dominant Negative": -1},
        "No": {"LoF": 0, "GoF": -1, "Dominant Negative": 0},
    },
    "If expressed in expected places, what are the expression levels?": {
        "Higher": {"LoF": -1, "GoF": 1, "Dominant Negative": -1},
        "Normal": {"LoF": -1, "GoF": -1, "Dominant Negative": -1},
        "Lower / None": {"LoF": 1, "GoF": -1, "Dominant Negative": 1},
    },
    "Does the affected protein have multiple subunits?": {
        "Yes": {"LoF": 0, "GoF": 0, "Dominant Negative": 1},
        "No": {"LoF": 0, "GoF": 0, "Dominant Negative": -1},
    },
    "How protein degradation is affected by the variant?": {
        "Increased": {"LoF": 1, "GoF": -1, "Dominant Negative": 1},
        "Normal": {"LoF": 0, "GoF": 0, "Dominant Negative": 0},
        "Decreased": {"LoF": -1, "GoF": 1, "Dominant Negative": -1},
    },
    "What is the inheritance pattern of the variant?": {
        "Autosomal recessive": {"LoF": 1, "GoF": -1, "Dominant Negative": -1},
        "Autosomal dominant": {"LoF": -1, "GoF": 1, "Dominant Negative": 1},
        "X-linked recessive": {"LoF": 1, "GoF": -1, "Dominant Negative": -1},
        "X-linked dominant": {"LoF": -1, "GoF": 1, "Dominant Negative": 1},
        "Y-linked": {"LoF": 0, "GoF": 0, "Dominant Negative": 0},
        "Mitochondrial inheritance": {"LoF": 0, "GoF": 0, "Dominant Negative": 0},
    },
    "Is the gene mutated known to have haploinsufficiency?": {
        "Yes": {"LoF": 1, "GoF": -1, "Dominant Negative": -1},
        "No": {"LoF": -1, "GoF": 1, "Dominant Negative": 1},
    },
    "Which class is the gene associated with?": {
        "Signalling Molecules": {"LoF": -1, "GoF": 1, "Dominant Negative": -1},
        "Transporters": {"LoF": -1, "GoF": 1, "Dominant Negative": 1},
        "Transcription Factors": {"LoF": 1, "GoF": -1, "Dominant Negative": 0},
        "Receptors": {"LoF": -1, "GoF": -1, "Dominant Negative": 1},
        "Enzymes": {"LoF": -1, "GoF": 1, "Dominant Negative": -1},
        "Nucleic Acid Binding": {"LoF": 1, "GoF": -1, "Dominant Negative": -1},
        "None of Above": {"LoF": 0, "GoF": 0, "Dominant Negative": 0},
    },
    "Are the mutations in the gene clustered?": {
        "Yes": {"LoF": -1, "GoF": 1, "Dominant Negative": 1},
        "No": {"LoF": 1, "GoF": -1, "Dominant Negative": -1},
}
}

# Calculate min and max possible scores for normalization
min_score = {
    "LoF": sum(min(values["LoF"] for values in scoring_matrix[q].values()) for q in scoring_matrix),
    "GoF": sum(min(values["GoF"] for values in scoring_matrix[q].values()) for q in scoring_matrix),
    "Dominant Negative": sum(min(values["Dominant Negative"] for values in scoring_matrix[q].values()) for q in scoring_matrix),
}

max_score = {
    "LoF": sum(max(values["LoF"] for values in scoring_matrix[q].values()) for q in scoring_matrix),
    "GoF": sum(max(values["GoF"] for values in scoring_matrix[q].values()) for q in scoring_matrix),
    "Dominant Negative": sum(max(values["Dominant Negative"] for values in scoring_matrix[q].values()) for q in scoring_matrix),
}

def normalize_score(raw_score, mechanism):
    """Normalize the raw score to a range of 0-10."""
    if max_score[mechanism] == min_score[mechanism]:
        return 0  # Avoid division by zero
    return round(((raw_score - min_score[mechanism]) / (max_score[mechanism] - min_score[mechanism])) * 10, 2)

@app.route("/")
def home():
    return "Welcome to the Rare Disease Variant Scoring Tool!"

@app.route("/calculate-scores", methods=["POST"])
def calculate_scores():
    data = request.json
    if not data:
        return jsonify({"error": "No data received!"}), 400

    gene = data.get("gene")
    disease = data.get("disease")
    answers = data.get("answers")

    if not gene or not disease:
        return jsonify({"error": "Gene and Disease fields are required!"}), 400

    if not answers:
        return jsonify({"error": "No questionnaire answers provided!"}), 400

    scores = {"LoF": 0, "GoF": 0, "Dominant Negative": 0}
    
    for question, answer in answers.items():
        if question in scoring_matrix and answer in scoring_matrix[question]:
            for mechanism, score in scoring_matrix[question][answer].items():
                scores[mechanism] += score

    # Normalize scores to a range of 0-10
    normalized_scores = {
        "LoF": normalize_score(scores["LoF"], "LoF"),
        "GoF": normalize_score(scores["GoF"], "GoF"),
        "Dominant Negative": normalize_score(scores["Dominant Negative"], "Dominant Negative"),
    }

    likely_mechanism = max(normalized_scores, key=normalized_scores.get)

    # Store result in MongoDB
    collection.insert_one({
        "gene": gene,
        "disease": disease,
        "answers": answers,
        "scores": normalized_scores,
        "likely_mechanism": likely_mechanism,
        "timestamp": datetime.utcnow()
    })

    return jsonify({
        "gene": gene,
        "disease": disease,
        "scores": normalized_scores,
        "likely_mechanism": likely_mechanism
    })

if __name__ == "__main__":
    app.run(debug=True)