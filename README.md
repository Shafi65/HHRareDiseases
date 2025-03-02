# **NIQ-Gene: Networking Interactive Questionnaire (NIQ) Website**
### *Predicting Gene-Disease Mechanisms*

## **Team Members**
- **Afreen Asif**  
- **Syed Hussain**  
- **Lee Ferenc**  
- **Phu Pham**  

---

## **Overview**
**NIQ-Gene** is a **networking interactive website** designed to facilitate the prediction of gene-disease mechanisms. Through a customizable **questionnaire**, users can evaluate a gene of interest and predict one of the three primary mechanisms:

- **Gain of Function (GOF)**
- **Loss of Function (LOF)**
- **Dominant Negative (DN)**

---

## **Target Audience**
This tool is best suited for:
- **Physicians**
- **Researchers**
- **Geneticists & Biologists**

Users can submit their collected data to **ClinGen** for further validation by expert panels, ensuring scientific accuracy and real-world applicability.

---

## **Why NIQ-Gene?**
With the **vast amount of genetic datasets and literature available online**, it is often **time-consuming** and **overwhelming** to analyze and conclude the most likely gene-disease mechanism, especially for those without a specialization in clinical genetics.

### **Key Benefits:**
- **Quick Identification**: Helps users distinguish among the three primary gene-disease mechanisms efficiently.
- **Networking Feature**: Connects users researching the same gene, fostering collaboration and validation.
- **Data Contribution**: Expands the available dataset for gene-disease mechanisms through user contributions.

---

## **How It Works**
The questionnaire consists of multiple-choice questions focusing on key distinguishing features, such as:
- **Mutation Type**
- **Impact on Protein Function**
- **Changes in Spatial & Temporal Expression**
- **Inheritance Pattern**
- **Protein Structure (Single or Multi-Subunit)**

### **Scoring System**
Each answer is assigned a score (-1, 0, 1). These scores are:
- **Mathematically normalized** into a **0-10** scale for each mechanism (**GOF, LOF, DN**).
- **Displayed in real-time**, allowing users to modify their answers and observe the impact.

### **Networking and Data Storage**
- User responses are stored in a **MongoDB database** in **JSON format**.
- New users can view **previous responses** to see patterns in gene-disease associations.

---

## **Tech Stack & Computational Strength**
- **Frontend**: [React.js](https://react.dev/) with **Material-UI (MUI)** for a seamless and intuitive user experience.
- **Backend**: [Flask](https://flask.palletsprojects.com/) for request processing and structured scoring.
- **Database**: [MongoDB](https://www.mongodb.com/) for scalable and efficient data storage.
- **Scalability**: Designed to support a **global user base**, adaptable for research and clinical use.

---

## **References & Supporting Literature**
### **Primary Data Sources**
- [OMIM](https://www.omim.org/): Catalog of human genes and genetic disorders.
- [CellXGene](https://cellxgene.cziscience.com/): High-dimensional single-cell data across various tissues.
- [ClinVar](https://www.ncbi.nlm.nih.gov/clinvar/): Repository of genomic variations and clinical significance.
- [SnpEff](https://pcingola.github.io/SnpEff/): Genomic variant annotation and functional effect prediction.

### **Relevant Research Papers**
1. Richards, S., Aziz, N., Bale, S. et al. **Standards and guidelines for sequence variant interpretation**. *Genet Med*, 17, 405–423 (2015). [DOI: 10.1038/gim.2015.30](https://doi.org/10.1038/gim.2015.30)
2. Gerasimavicius, L., Livesey, B.J. & Marsh, J.A. **Impact of different mutations on protein structure**. *Nat Commun*, 13, 3895 (2022). [DOI: 10.1038/s41467-022-31686-6](https://doi.org/10.1038/s41467-022-31686-6)
3. Jung, S., Lee, S., Kim, S. et al. **Classification of loss- and gain-of-function mutations**. *BMC Med Inform Decis Mak*, 15 (Suppl 1), S6 (2015). [DOI: 10.1186/1472-6947-15-S1-S6](https://doi.org/10.1186/1472-6947-15-S1-S6)

---

## **Future Improvements**
This project serves as a **pilot version** with a functional pipeline:
1. **Questionnaire Development**
2. **Scoring System Implementation**
3. **Final Score Output & Interpretation**
4. **User Networking & Data Sharing**

Future versions will incorporate:
- Expert-reviewed **questionnaire refinements** to enhance accuracy.
- Improved **user collaboration features** for data validation.
- Expanded **genomic datasets** to support more genes and conditions.

---

## **Contributions & Feedback**
We welcome contributions and feedback! If you are interested in improving NIQ-Gene, feel free to:
- **Submit issues** for feature suggestions or bugs.
- **Contribute** to the repository via pull requests.
- **Join discussions** to enhance the platform’s usability and accuracy.

---

## **License**
This project is released under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## **Contact**
For inquiries, collaborations, or contributions, please reach out to any of the **team members**.

---

**NIQ-Gene** | *Facilitating Gene-Disease Mechanism Research* 🚀


