import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Paper,
  TextField,
  Grid,
  Box,
} from "@mui/material";

function App() {
  const [gene, setGene] = useState("");
  const [disease, setDisease] = useState("");
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);

  const questions = [
    {
      id: "location",
      text: "Where is the location of the genomic variant?",
      options: ["Intron", "Exon", "Mitochondrial DNA", "Others"],
    },
    {
      id: "classification",
      text: "What is the classification of the genetic variant?",
      options: [
        "Single nucleotide variation",
        "Duplication",
        "Deletion",
        "Translocation",
        "Others",
      ],
    },
    {
      id: "protein_new_function",
      text: "If the variant is involved in a protein product, does the protein have a new function / involve a new biological pathway?",
      options: ["Yes", "No"],
    },
    {
      id: "developmental_expression",
      text: "Is the protein expressed at a different developmental period?",
      options: ["Yes", "No"],
    },
    {
      id: "expression_location",
      text: "If not expressed in expected tissues, is it expressed elsewhere?",
      options: ["Yes", "No"],
    },
    {
      id: "expression_levels",
      text: "If expressed in expected places, what are the expression levels?",
      options: ["Higher", "Normal", "Lower / None"],
    },
    {
      id: "protein_subunits",
      text: "Does the affected protein have multiple subunits?",
      options: ["Yes", "No"],
    },
    {
      id: "protein_degradation",
      text: "How protein degradation is affected by the variant?",
      options: ["Increased", "Normal", "Decreased"],
    },
    {
      id: "inheritance_pattern",
      text: "What is the inheritance pattern of the variant?",
      options: [
        "Autosomal recessive",
        "Autosomal dominant",
        "X-linked recessive",
        "X-linked dominant",
        "Y-linked",
        "Mitochondrial inheritance",
      ],

    
    },
    {
      id: "haploinsufficiency",
      text: "Is the gene mutated known to have haploinsufficiency?",
      options: ["Yes", "No"],
    },
    {
      id: "gene_class",
      text: "Which class is the gene associated with?",
      options: [
        "Signalling Molecules",
        "Transporters",
        "Transcription Factors",
        "Receptors",
        "Enzymes",
        "Nucleic Acid Binding",
        "None of Above"
      ],
    },
    {
      id: "mutations_clustered",
      text: "Are the mutations in the gene clustered?",
      options: ["Yes", "No"],
    }
  ];

  const handleAnswer = (questionText, answer) => {
    setAnswers((prev) => ({ ...prev, [questionText]: answer }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = { gene, disease, answers };
      const response = await axios.post("http://localhost:5000/calculate-scores", payload);
      setResult(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "40px", marginBottom: "40px" }}>
      <Paper elevation={3} style={{ padding: "30px", borderRadius: "15px", backgroundColor: "#f5f5f5" }}>
        {!showQuestions ? (
          <>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              style={{ fontWeight: 600, color: "#2c3e50" }}
            >
              Genomic Variant Scoring Tool
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
              gutterBottom
              style={{ marginBottom: "30px" }}
            >
              Enter the Gene and Disease before starting the questionnaire.
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Gene Name"
                  variant="outlined"
                  margin="normal"
                  value={gene}
                  onChange={(e) => setGene(e.target.value)}
                  InputProps={{ style: { backgroundColor: "#ffffff" } }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Disease Name"
                  variant="outlined"
                  margin="normal"
                  value={disease}
                  onChange={(e) => setDisease(e.target.value)}
                  InputProps={{ style: { backgroundColor: "#ffffff" } }}
                />
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="center" marginTop="30px">
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => setShowQuestions(true)}
                disabled={!gene || !disease}
                style={{ backgroundColor: "#3498db", color: "#ffffff" }}
              >
                Start Questionnaire
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              style={{ fontWeight: 600, color: "#2c3e50", marginBottom: "30px" }}
            >
              Gene: {gene} | Disease: {disease}
            </Typography>
            {questions.map((question) => (
              <Card
                key={question.id}
                variant="outlined"
                style={{ marginBottom: "20px", backgroundColor: "#ffffff" }}
              >
                <CardContent>
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend" style={{ fontWeight: 600, color: "#34495e" }}>
                      {question.text}
                    </FormLabel>
                    <RadioGroup
                      name={question.text}
                      onChange={(e) => handleAnswer(question.text, e.target.value)}
                    >
                      {question.options.map((option) => (
                        <FormControlLabel
                          key={option}
                          value={option}
                          control={<Radio color="primary" />}
                          label={option}
                          style={{ color: "#2c3e50" }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </CardContent>
              </Card>
            ))}
            <Box display="flex" justifyContent="center" marginTop="30px">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={loading}
                size="large"
                style={{ backgroundColor: "#3498db", color: "#ffffff" }}
              >
                {loading ? <CircularProgress size={24} style={{ color: "#ffffff" }} /> : "Calculate Scores"}
              </Button>
            </Box>
          </>
        )}

        {result && result.scores && (
          <Paper
            elevation={3}
            style={{ marginTop: "30px", padding: "20px", borderRadius: "15px", backgroundColor: "#ffffff" }}
          >
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              style={{ fontWeight: 600, color: "#2c3e50" }}
            >
              Results for {result.gene} related to {result.disease}
            </Typography>
            <Typography variant="body1" align="center" style={{ color: "#34495e" }}>
              <strong>Loss of Function (LoF):</strong> {result.scores.LoF}
            </Typography>
            <Typography variant="body1" align="center" style={{ color: "#34495e" }}>
              <strong>Gain of Function (GoF):</strong> {result.scores.GoF}
            </Typography>
            <Typography variant="body1" align="center" style={{ color: "#34495e" }}>
              <strong>Dominant Negative:</strong> {result.scores["Dominant Negative"]}
            </Typography>
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: "20px", fontWeight: 600, color: "#2c3e50" }}
            >
              Based on the responses for {result.gene} related to {result.disease}, it is likely a{" "}
              {result.likely_mechanism === "LoF"
                ? "Loss of Function (LoF)"
                : result.likely_mechanism === "GoF"
                ? "Gain of Function (GoF)"
                : "Dominant Negative"}
              .
            </Typography>
          </Paper>
        )}
      </Paper>
    </Container>
  );
}

export default App;