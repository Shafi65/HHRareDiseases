
NIQ-Gene: Networking Interactive Questionnaire (NIQ) website
 to predict gene-disease mechanism 
Team members: Afreen Asif, Syed Hussain, Lee Ferenc, Phu Pham

What:
This project is a networking interactive website consisting of a customizable questionnaire about the gene of interest that helps predict the 3 main gene-disease mechanisms: gain of function, loss of function and dominant negative.
Who:
This tool will be best used by physicians, researchers and users with genetic/biology background who are interested in gene-disease mechanisms. Collected output data can be sent to Clingen for further validation by expert panels. 
Why
With the large amount of dataset and literature available online, it is time-consuming and overwhelming to go through and analyze them to conclude a most likely gene-disease mechanism, especially for people who are not specialized in clinical genetics. This networking interactive questionnaire will help users to quickly identify key information to distinguish among the three main mechanisms as a starting point for further validation. The networking feature of the website will help connect users looking up for the same gene and validate the search among users. We hope this tool will facilitate the study of gene-disease mechanisms, connect research and clinical groups interested in the same gene and extend the available dataset about gene-disease mechanisms. 
How
The questionnaire consists of multiple choice questions asking users about possible distinguishing features among 3 possible mechanisms such as: mutation type, change in affected protein function,  change in the spatial and temporal expression of the affected protein, inheritance pattern, three-dimensional structure of affected protein (single or multi subunit),.. 
The answer to each question will be assigned a scoring system (-1, 0, 1) 
Scores from all questions will be mathematically normalized into a final output with 0-10 score for each mechanism: gain of function, loss of function and dominant negative. The interactive feature of our website will allow users to change their answers and see the final score changing in real time to study how each evidence affects the final conclusion. 
With the limited time and expertise, we established this pilot pipeline: “Questionnaire - Scoring system - Final score output - Connecting users” as a starting point. Our questionnaire and scoring system can be adjusted by genetic experts later to improve accuracy. 
The gene - mechanism data collected from users will be stored on our system to allow new users who search for the same gene to have access to how many previous users got the same answers for that gene and history of other users. This is done using mongo db and all the data is stored in JSON format for easy look up.       
Where
References are used to build this tool:
OMIM: Online catalog of human genes and genetic disorders
CellXGene: Public datasets of high-dimensional single-cell data of various tissues (mostly homosapiens)
ClinVar Annotations
SnpEff: Genomic variant annotations and functional effect prediction 
Richards, S., Aziz, N., Bale, S. et al. Standards and guidelines for the interpretation of sequence variants: a joint consensus recommendation of the American College of Medical Genetics and Genomics and the Association for Molecular Pathology. Genet Med 17, 405–423 (2015). https://doi.org/10.1038/gim.2015.30
Gerasimavicius, L., Livesey, B.J. & Marsh, J.A. Loss-of-function, gain-of-function and dominant-negative mutations have profoundly different effects on protein structure. Nat Commun 13, 3895 (2022). https://doi.org/10.1038/s41467-022-31686-6 
Jung, S., Lee, S., Kim, S. et al. Identification of genomic features in the classification of loss- and gain-of-function mutation. BMC Med Inform Decis Mak 15 (Suppl 1), S6 (2015). https://doi.org/10.1186/1472-6947-15-S1-S6
Computational strength of our approach:
Our project leverages React along with Material-UI (MUI) to build a clean and user-friendly interface, ensuring an intuitive experience for users navigating the genomic variant scoring tool. The Flask backend handles request processing, applies a structured scoring matrix, and normalizes scores between 0-10 for accurate interpretation. Additionally, MongoDB efficiently stores user responses and scoring data, enabling researchers to easily look up gene-disease relationships over time. Designed with scalability in mind, the system can seamlessly expand to support a global user base, leveraging its flexible architecture to overcome accessibility and implementation challenges in diverse research and clinical settings.





