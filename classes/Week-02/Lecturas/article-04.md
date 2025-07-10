# Software quality assurance models in small and medium organisations: a comparison

- Alok Mishra* and Deepti Mishra
- Department of Computer Engineering
- Atilim University, Ankara – Turkey
- E-mail: alok@atilim.edu.tr
- E-mail: deepti@atilim.edu.tr

*Corresponding author

## Abstract:
Presently, the majority of software development including outsourcing is carried out by small- and medium-sized software development organisations all over the world. These organisations are not capable of bearing the cost of implementing available software quality models like CMM, SPICE, ISO, etc. Therefore, there is a need to address this problem. In this paper, we have tried to compare the main characteristics, benefits, and limitations of the models for small and medium software development organisations. We believe that this effort will contribute towards the development of a standardised quality improvement model for small- and medium-sized software development organisations.

- Keywords: process; software quality; small and medium organisation; SME.

Reference to this paper should be made as follows: Mishra, A. and Mishra, D. (2006) ‘Software quality assurance models in small and medium organisations: a comparison’, Int. J. Information Technology and Management, Vol. 5, No. 1, pp.4–20.
Biographical notes: Alok Mishra is Assistant Professor of Computer Engineering at Atilim University, Ankara, Turkey. His areas of interest are software engineering, information system, information and knowledge management and object oriented analysis and design. He has extensive experience of distance and online education related to computers, information technology and management courses. He has published over 15 articles and book reviews related to software engineering and information systems in refereed journals and conferences. His research has appeared in Journal of Electronics Information and Planning, International Journal of Information and Computing Science, Government Information Quarterly etc.
Deepti Mishra earned her BSc (Mathematics) in 1991 at Bhopal University, India. In 1994, she completed her Master’s Degree in Computer Application at Jiwaji University, India. After a brief stint in software development, she joined Bhopal University, India as Lecturer (1996–1998) and also worked at MCRP University, India (1999), Rajeev Gandhi Technical University, India (2000–2002). She joined Atilim University, Turkey in 2003. In 2004, she received her PhD Degree in Computer Science at Rani Durgawati University, Jabalpur, India in the field of Software Engineering. Currently, she is working as Assistant Professor in Computer Engineering Department at Atilim University, Turkey. Her research interests include software process improvement, databases and testing and maintenance of software.
Copyright © 2006 Inderscience Enterprises Ltd.
Software quality assurance models in small and medium organisations 5
1 Introduction
Quality models and standards have been developed to improve product quality. Software quality is defined as all characteristics of a product that bear on its ability to satisfy explicit and implicit needs of the user (ISO/IES 9126, 1991). According to Pressman (2002), software quality is defined as conformance to explicitly documented development standards, and implicit characteristics that are expected of all professionally developed software. Therefore, this definition suggests three requirements for quality assurance that are to be met by the developer (Galin, 2004):
1 specific formal requirements, which refer mainly to the outputs of the software system
2 software quality standards mentioned in the contract
3 Good Software Engineering Practices (GSEP), reflecting state-of-the-art professional practices, to be met by the developer even though not explicitly mentioned in the contract.
Today, only few software organisations around the world achieve a high-quality level for their development process. A considerable amount of software is produced worldwide by Small- and Medium-sized Enterprises (SMEs) ranging from one to about 50 employees (Gresse et al., 2003). In this context, German and Brazil software market of these companies was around 77% and 69% during 2001 (Quality and Productivity of the Brasilian Software Sector, 2001). It is further supported by Richardson (2002) that there is need for small software companies in Irish sector to improve their software process. A vast majority of software producers, which have not yet implemented a methodology for software quality assurance, are paying high costs of production and systems maintenance, and therefore being displaced from the global market, not being on the same competitiveness level than companies that possess a quality assurance method (Herrera and Trejo Ramirez, 2003). There are several models for software quality assurance, such as the Capability Maturity Model (CMM), the Software Process Improvement and Capability dEtermination (SPICE), and the ISO 9000 norm from the International Standardization Organization. These models provide quality patterns that a company should implement to improve its software development process (Herrera and Trejo Ramirez, 2003). Unfortunately, the successful implementation of such models is not generally possible within the context of small- and medium-sized software organisations because they are not capable of bearing the cost of implementing these software quality models and software process improvement programs. The proper implementation of software engineering techniques is a difficult task for small organisation as they often operate on limited resources and with strict time constraints. Cultural issues like resistance to change from the employees or the management areas, who regard the extra work required for quality assurance as a useless and complicated burden put on the developing team. According to Biro et al. (2002), national culture also affects the process improvement methods. Due to budget constraints, services of a consultant organisation to improve the software quality are not possible; still, the need for a good quality assurance program is becoming more evident, and managers are striving to achieve international quality standards that, in the long run, result in lower production cost (Herrera and Trejo Ramirez, 2003).
6 A. Mishra and D. Mishra
The objective of this paper is to compare the available software quality improvement models for small- and medium-sized software development organisations. For this purpose, Software Quality Improvement Model for Small Organisations (SQIMSO), A Methodology for Self-Diagnosis for Software Quality Assurance, Software Process Matrix (SPM Model), and GOAL Question Metric (GQM) Lightweight are analysed and compared.
The remainder of this paper is organised as follows: The following section describes definition of small organisation and small project; afterwards, the main characteristics of each model are described briefly. The benefits and limitations of the models are then presented and discussed. A comparison of these models based on certain criteria followed later on. Finally, the paper concludes with directions for future research in this area.
2 Definition of small organisation and small project
In a 1998 SEPG conference panel on the CMM and small projects, small was defined as “3–4 months in duration with five or fewer staff” (Hadden, 1998). Brodman and Johnson define a small organisation as fewer than 50 software developers and a small project as fewer than 20 developers (Johnson et al., 1998).
Table 1 Defining a ‘small’ project
Variant of ‘small’ Number of people Amount of time Small 3–5 6 months Very small 2–3 4 months Tiny 1–2 2 months Individual 1 1 week Ridiculous 1 1 hour
3 Characteristics of software quality models for small and medium organisations
3.1 Software Quality Improvement Model for Small Organisations (SQIMSO)
SQIMSO processes model structure is based on SPICE processes model structure adapted to fit the practices of small software organisations. In SQIMSO, the following three main critical issues are considered (Zeineddine and Mansour, 2003):
1 Every improvement program should be wide enough to include three main facts: process quality, product quality, and human resources management.
2 Any process quality model should answer the question, ‘How to do?’
3 Any suggested quality model should be practical enough to be implemented by small software organisations for saving cost and time.
Software quality assurance models in small and medium organisations 7
SQIMSO discusses quality improvement strategy from three dimensions: process, capability, and methods. Software process can be defined as an environment of capable interrelated resources managing a sequence of activities using appropriate methods and practices to develop a software product that conforms to customers’ requirements. The requirements are not the only input to the process. In addition, supplier objectives add to customer requirements in order to construct the process input. In fact, this factor is important because it is related directly to the process itself and provides guidance for assessors to know what are the limits and restrictions for software process improvements.
Process capability is defined as the range of expected results that can be achieved by following a process or the ability of a process to achieve a required goal. It can be measured by maturity key process areas to determine the level of current capability and maturity achievement. This measurement helps organisation’s management to develop appropriate quality improvement strategy. The levels of capability and maturity will be used as measurement tools to determine the current status of work environment. Passing from one level to another will lead the organisation to achieve better process quality results.
Methods are procedures, patterns, techniques, metrics, roadmaps, and other tools used to develop software products that meet customers’ requirements and achieve suppliers’ business objectives. Methods are defined to provide guidance and suggest a way of implementation, i.e., to facilitate initiating and implementing software process improvements. Methods have great influence on product quality conformity, and wrong selection may sometimes lead to project failure. Methods vary depending on the characteristics of the project. Once methods are selected and defined, it is the role of quality assurance teams to control methods implementation and to assess and report any deficiencies.
3.2 A methodology for self-diagnosis for software quality
This methodology for self diagnosis is based on concepts, goals, and activities defined by Capability Maturity Model (CMM) which can be used by a small or micro organisation as a part of internal audit plan. The methodology can generate a simple diagnosis, or help generate an action plan. This methodology has tried to adapt CMM for small-scale organisations by adding some additional questionnaires to help the organisations understand their current status and find out the areas for improvement. With the help of these questionnaires, small- and medium-scale organisations will be able to use CMM. The main goal of this methodology is to gather facts that help in taking a ‘snapshot’ of the current processes implemented by the organisation, so it is possible to understand them and then to identify strengths and areas of improvement, thus determining the degree of completeness of every one of the KPAs (Key Process Areas) of the CMM model. In order to gather this information related to the current processes of the organisation, researchers have created three questionnaires (Herrera and Trejo Ramirez, 2003):
1 the Extended Maturity Questionnaire (EMQ)
2 the Goals, Activities, and Responsibilities matrix (GAR)
3 the directed questionnaire.
8 A. Mishra and D. Mishra
The CMM describes activities and practices required to achieve a maturity level within the software developing processes. A company that wishes to improve its processes through CMM must achieve the mentioned levels in a progressive, continuous, and ascending manner; that is, the lower levels are the basis for the upper levels. The first step is to assess the maturity level of the organisation and for this purpose, official questionnaires are designed as a list of nonhierarchical, binary questions, so that figuring out the maturity level of the company is straightforward. Once the current maturity level is known, this model helps to identify the key practices required to increase the maturity of processes.
3.2.1 The Extended Maturity Questionnaire (EMQ)
EMQ is based on the Maturity Questionnaire developed by SEI. This questionnaire includes some questions about specific KPAs allowing for YES, NO, I DON’T KNOW, or NOT APPLIED answer. All questions are related to goals and commitments for each KPA, but not to specific activities which should be performed to achieve such goals. The direct application of the Maturity Questionnaire in small and micro organisations results in a great majority of questions answered with a ‘NO’, the main reason for this tendency being that many of the goals proposed in the questionnaire are only partially achieved. Therefore, EMQ is modified by researchers, allowing for YES, NO, or PARTIALLY (for describing incomplete goals) answer. The purpose of EMQ is to guide the system’s administrator of a small organisation so that he or she can answer the questions in a way that reflects more accurately the status of the organisation. With this questionnaire, the administrator is capable of identifying the goals and commitments that are being only partially fulfilled so that they can be included in the improvement plan by the audit leader in charge of the self-diagnostic process.
3.2.2 The Goals, Activities, and Responsibilities Matrix (GAR)
The success of a model based on CMM depends on the complete achievement of certain goals and commitments for every KPA. These goals include measuring, documenting, reviewing, and validation activities for software quality assurance. There is a close relationship among goals, activities, and abilities, which are not that immediately apparent from the 344 pages description of the CMM standard (Bush, 1995). It is obvious, then, that assimilating and interpreting this amount of information is a long and difficult process. In order to facilitate the task of the software administrators, a matrix is proposed. This matrix includes relationship between abilities (variables), activities (practices and subpractices associated to each KPA), goals and commitments (objectives to achieve in each KPA), as well as the responsible individuals (the client, the requirement analyst, the software engineering group, the manager, the quality assurance group) for each KPA.
When this matrix is used as a control within the life cycle of the project, it works not only as a diagnosis on the quality of the project, but also as a guide of action that helps project manager to correct deficiencies and achieve the goals required by the KPA, thus providing an improvement in the overall process.
Software quality assurance models in small and medium organisations 9
GAR Matrix can be automated by means of an an expert system, by transforming the relationships between rules, responsible (the person concerned) and activities into inference rules that can be triggered by a knowledge base consisting on the answers given to the questions inside the matrix. The expert system could help an internal or external auditor in evaluating the maturity of the development processes, by determining the degree of satisfaction of each KPA according to CMM. In this way, by having the knowledge base and by filling the questionnaire, we could get a rating of the state of the organisation, with no extra work, except for the documentation of activities.
The original CMM is representing as a text, the GAR provides a visual representation, which simplifies comprehension of the vast amount of information required for the evaluation of goals.
3.2.3 The directed questionnaire
The last format of Self-Diagnosis Methodology is a direct questionnaire with which a lead auditor can construct a knowledge base. This questionnaire has the essence of the original Maturity Questionnaire from CMM, but in this case each new question is generated based on the answer on the previous questions. So a new question may be directed to complement information obtained earlier, or to confirm such information. In any case, useless questions are discarded.
3.2.4 Evaluating the result of the self diagnosis
The results obtained from the questionnaires answer the basic question: Are the Key Process areas required by CMM for a certain level achieved? For each KPA, there are four possible answers: the KPA is either fully achieved, partially achieved, not achieved, or it doesn’t apply. The KPAs that are partially achieved or not achieved are the areas of opportunity for improvement. And that should be part of an action plan.
3.3 Software Process Matrix (SPM) model
SPM is based on Quality Function Deployment (QFD). This model helps the organisation in finding the relative importance of software processes. For the high priority processes, the practices that need to be worked on are determined by Software Process Matrix (SPM). The complete SPM provides the organisation with a ranked list of actions, which can be input to their software process improvement strategy. SPM model uses self-assessment within the organisations and demonstrates the following characteristics (Richardson, 2002):
• relates to the company’s business goals
• focuses on the most important software process
• gives maximum value for money
• proposes improvements which have maximum effect in as short time as possible • provides fast Return On Investment (ROI)
10 A. Mishra and D. Mishra
• be process-oriented
• relates to other software models
• be flexible and easy to use.
The SPM can be used to establish an improvement strategy based on QFD. QFD is a way “to assure the design quality while the product is still in the design stage” (Akao, 1990) and as a “quality system focused on delivering products and services that satisfy customers” (Mazur, 1994). In order to collect and maintain the voice of the customer throughout the production life cycle, QFD uses series of matrices which convert the customer’s voice into a final product. Different models are available for use, and according to Cohen (1995), the model adapted by American Standards Institute (Four-phase model), which contain four matrices (Hauser and Clausing, 1988), is probably the most widely described and used model in the USA. The SPM is based on the first matrix of this model, The House of Quality.
Initially, the ‘voice of the customer’ is collected, and the relative importance of each customer requirement is measured. In the house of quality matrix, these requirements are used to identify design characteristics which have the greatest impact on customer requirements. Although QFD consists of many matrices, the main focus is often this matrix, as using it alone can have a significant effect on the product development process (Fortuna, 1988). The matrix is normally broken down into six rooms:
1 customer requirements (WHATs)
2 design characteristics (HOWs)
3 overall importance of customer requirements
4 relationship between customer requirements and design characteristics 5 importance of design characteristics
6 interrelationships between design characteristics.
Using QFD, the software process model is treated as the customer where software processes are the customer requirements. These processes were identified from software process literature. Examples of processes are:
• definition and documentation processes
• systematic assessment of suppliers’ software process suitability • systematic implementation of software design
• systematic planning of project work flow and estimates.
The design characteristics are the practices which must be followed for processes to be successful. These practices were also identified from the software process literature. Examples of practices are:
• testing the customer’s operation before software implementation • prototyping or simulating critical elements of the software
• maintaining and tracing product item histories.
Software quality assurance models in small and medium organisations 11
A crucial part of the development of the software process matrix was to identify the relationships between processes and practices. Those which are explicitly mentioned in the literature were easily identified. Using expert opinions and various statistical techniques, other relationships between processes and practices were identified, resulting in the development and verification of the software process matrix, which was then validated in the industry.
For a small company to use any software process model to their advantage, it is imperative that the effort expended is minimal. The SPM provides them with a generic section that has been completed previously and can be used in their company. From the company’s point of view, all they need to provide are the measurements for calculating the overall importance of the software process considering the following (Richardson, 2002):
• current capability as assessed using a self-assessment questionnaire • future capability as input from management
• importance of software process to the business
• competitive analysis
• market leverage for company-specific requirement, e.g., ISO certification.
Allowing management to choose whether or not to include figures for competitive analysis and market leverage allows flexibility within the model. Using standard QFD calculations, and referring to following figure, which contains specific company data, the Importance of Process (D) is calculated as [1 + (B – A) ∗ 0.2] ∗ C.
Table 2 Specific company data
Practices Processes
User
requests determine
Define
interfaces of the software
Develop and document unit
Current
achievement (1 – 5)
Future
achievement (1 – 5)
Improvement to company (1 – 5)
Importance of process (1 – 5)
requirements
system
certification A B C D
Development of system
requirement and design
Development of detailed design
Systems
acceptance testing
Importance of Practice
• • 2 3 3 3.6
• ° 2 4 5 7 ∇ ∇ 3 3 2 2 95.4 34.4 14.6
Source: Adopted from Richardson (2002)
12 A. Mishra and D. Mishra
In the example given above, it can be seen that they are ranked from most to least important as:
• development of detailed design
• development of system requirements and design
• systems acceptance testing.
Using the value of the relationships between processes and practices, the importance of each practice is calculated as:
∑ Importance of process ∗ Relationship value
which in the case of ‘User requests determine requirements’ is
(3.6 ∗ 9) + (7.0 ∗ 9) + (2 ∗ 0) = 95.4.
This provides the following prioritised list of practices:
• user requests determine requirements
• define interfaces of the software system
• develop and document unit verification.
Practices with the highest values are the most important, and therefore it is suggested that these should be worked on first in the organisation. From this, the priorities to be included in any software process improvement action plan are established and can help the organisation to determine their improvement strategy. The complete SPM provides the organisation with a ranked list of actions which can be input to their software process improvement strategy. This ranked list can be combined with cost figures and time-effective calculations thus taking these factors into account when determining the action plan for the organisation.
3.4 Goal Question Metric (GQM) lightweight
The main idea behind this model is that ‘software measurement is a necessity for controlling software projects and improving quality’. This model is based on GQM. ‘GQM Lightweight’ is a customised GQM model that combines the existing model adapted to specific characteristics and limitations of small software companies. The Goal Question Metric (GQM) paradigm (Basili et al., 1994; Basili and Rombach, 1988; Basili and Weiss, 1984) has been proposed as a goal-oriented approach for the measurement of products and processes in software engineering. It is a mechanism for defining and evaluating a set of operational goals, using measurement. GQM represents a systematic approach for tailoring and integrating goals with models of the software processes, products, and quality perspectives of interest, based upon the specific needs of the project and the organisation. This model is a result of adapting the existing GQM process models to the specific characteristics and limitations of small software companies.
Software quality assurance models in small and medium organisations 13
Table 3 Overview of GQM lightweight and comparison with two existing GQM approaches
Phases
Planning Definition
Approach for SMEs GQM lightweight
Introduce measurement program
Define measurement goals, goal formalisation
Define questions
GQM method
(van Sloingen and Berghout, 1999)
Establish GQM
team, create project plan, training
and promotion
Select improvement areas, select
application project and establish
project team
Define measurement goals, conduct GQM interview, review or
produce software process models
Define questions and hypothesis and review
Goal-driven
measurement
(Park et al., 1996)
Identify business goals, identify what to know or learn
Identify subgoals, Identify entities and attributes, formalise measurement goals
Identify quantifiable questions
Produce analysis plan Identify indicators and data elements
(Reuse of quality and resource
Define metrics Define measures and review
Define measures
models)
Produce GQM plan, define data collection procedures, define data instruments
Produce data collection plan, create metrics base
Produce GQM plan, produce
measurement plan
Trial period, hold a kick-off session
Identify the actions needed to implement measures, prepare a plan
Data collection Collect and validate data Create metrics base
Store data collected Collect and check
data collection form,
Store measurement
data in metrics base
Interpretation
Data analysis Define analysis sheets and
presentation slides
Data interpretation
– feedback session
Packaging Packaging results
Prepare feedback session, organise and hold feedback session, report measures resulting product
Source: Adopted from Gresse et al. (2003)
14 A. Mishra and D. Mishra
GQM lightweight is based on Gresse von Wangenheim (2002) and Gresse et al. (1995) with respect to its principal phases and activities. However, each of these activities has been customised keeping in view limited resources and predominant informality in small software companies.
The planning phase prepares the establishment of software measurement in the organisation. In SME, no separate measurement team will be established due to small number of employees and informal structures of the organisations. Kick-off session is important to get the approval and opinion of all the people. Feedback session can be helpful towards motivation. According to Gresse et al. (2003) identification and selection of measurement goals is easier in SMEs due to the fact that less people are involved in the pilot project, and goals definition process is often more restricted.
During the data collection phase, the data are collected according to the procedures specified in the measurement plan. By developing suitable data collection instruments and integrating into the software process, effort can be reduced substantially.
The interpretation phase aims at the periodic analysis of the collected data and interpretation during feedback sessions involving project personnel following the GQM plan bottom-up. In the Packaging phase, the measurement results including the collected data and its interpretation are analysed, packaged, and stored in a way suited to the organisational context so that this knowledge can be reused in future software projects and measurement programs. Here focus should be on documenting the GQM plan, the results of the feedback sessions, and cost and benefits report.
4 Benefits and limitations of software quality models for small and medium organisations
The following table presents the summarised benefits of the four software quality models.
Software quality assurance models in small and medium organisations 15
Table 4 Benefits and limitations of software quality models for small and medium organisations
Limitations
It does not expect from the practitioner the knowledge
of international standards or quality models practices,
and maturity is not required, but it is expected to gain.
Practitioners may add or modify suggested methods.
This may lead to misuse of the model or many different
implementations to appear which may result in
nonstandardisation of the model.
All questionnaires need not be used; it depends on the
experience of the auditor and overall state of
the organisation.
This methodology considers only the special
characteristics of the Latin American organisations.
Benefits Models
SQIMSO provides a practical framework. The organisations SQIMSO
improve their software product quality and provide software
practitioner with quality culture and skills.
Practical and comprehensive
Saves cost and time by decreasing the quality turnover level
Emphasises continuous improvement through quality values
and culture
Efficient communication to meet the newly designed
quality system
Importance to teamwork and fair distribution of jobs
and responsibilities
Emphasises empowering employees with necessary knowledge
and skills
Emphasises giving more value to working people as well as
software process and the product
Applying the given questionnaires to the project Self-diagnosis
provides a quantitative analysis
methodology
produces analytic views
shows strength and weakness
identifies areas of improvement
provides recommendations
suggests an improvement plan
A small or microorganisation can evaluate its processes in an
inexpensive way before submitting itself to the
actual certification.
This methodology can generate a simple diagnosis and help
generate an action plan.
16 A. Mishra and D. Mishra
Table 4 Benefits and limitations of software quality models for small and medium organisations (continued)
Limitations
No guidelines for self-assessment Considerable experience is expected from the practitioner
To maximise productivity and quality gains, knowledge
management and organisational learning with respect to
the quality and resource models have to be integrated
into the measurement process.
Further empirical validation is required with reference
to other quality models to assess its impact on
software measurement.
Benefits Models
Improved customer satisfaction SPI models
Relates to the company’s business goals
Focuses on the most important software process
Gives maximum value for money
Proposes improvements which have maximum effect in as short
time as possible
Provides fast Return On Investment (ROI)
Increased competitiveness
Flexible
Reuse of context-specific models developed in past within a
similar context
GQM lightweight
This approach balances the trade-off between relying upon
universal quality models and reused context-specific models.
Organisation-specific models can frequently be reused.
Reuse of models will reduce overheads.
Software quality assurance models in small and medium organisations 17
5 Comparisons of SQIMSO, self-diagnosis, SPM, and GQM lightweight models
The following table provides the comparisons of the models on certain characteristics. Table 5 Comparisons of software quality models for small and medium organisations
Comparison
criteria SQIMSO Self-diagnosis SPM model GQM lightweight
Based on models Based on SPICE processes model
structure
Based on CMM Based on QFD Based on existing GQM process models
especially (Gresse von
Wangenheim, 2002;
Gresse et al., 1995)
Key question? What to do? How to do?
Where am I? What should I do?
What? How? What to? How?
What is new? Based on
international quality
standards, models,
surveys
Flexibility Practitioners may add or modify methods;
elimination is
not preferred.
Helps in recognising the current situation with EMQ
questionnaire. Also, relationship among abilities, activities, goals, and
commitments for every KPA in matrix format is given,
which can be
automated with expert system.
Defined methods, tools and elimination are not preferred.
Not flexible.
First, a list
of processes
considering
business objectives and other factors is made; then a
prioritised list of processes with the help of SPM, which gives the
relationship
between processes and practices,
is made.
Flexible as
company need not include all factors for the
measurement of overall importance of software
processes.
Responsiveness to technological
change
It enhances GQM by including planning, reuse of quality and resource models, data collection,
interpretation, and packaging phases
Structured process, customised according to the organisation’s requirements context.
Practitioner’s knowledge level
Does not expect from the practitioner the knowledge of
international
standards or quality models practices; maturity is not
required but it is expected to gain
Does not need much experience and easy to use.
Needs considerable experience
especially during self-assessment.
Certain measurement experience is required
18 A. Mishra and D. Mishra
Table 5 Comparisons of software quality models for small and medium organisations (continued)
Comparison
criteria SQIMSO Self-diagnosis SPM model GQM lightweight
Implementation details
Provision of
sufficient
guidelines that can be adopted during implementation to customise
according to needs
Helps in
self-assessment of current maturity level of an organisation and generate an action plan accordingly. It can also be used as a pre-appraisal towards an official appraisal by the SEI.
Off-the-shelf model extensible
Organisation-specific models can frequently be reused
Continuous/phased Continuous approach
Achievement of
each attribute
enhances capability
of the process
Staged approach
Achievement of each KPA enhances
capability of the process
Continuous
approach
Achievement of each practice
enhances capability of the process
Phased approach
Main focus? Focus on business objectives of the
organisation
Focus on standards Focus on business objectives of the
organisation and
software processes
most important to
the business
More likely to address the specific needs than universal framework.
Outcome To be objective and quantitative
Constraint(s) Methods vary depending on the
characteristics of
the project.
Method selection is
tedious but required
for best
implementation
Based on
questionnaires, not objective
Considers current situation of
the organisation
Objective and
quantitative
Measuring the importance of
software processes requires
considerable
experience
Based on goal quality metrics approach
Reuse is done in an ad hoc, informal manner.
Knowledge
management and organisational
learning should be systematically
integrated.
Origin Europe Latin America Japan Germany and Brazil
6 Conclusion
Small- and medium-sized organisations are facing problems due to their limited resources for investment in improving software quality and productivity. Existing software process models are not easily applicable in small and medium organisations and require extensive infrastructure. Therefore, we had studied four available software quality models for small and medium organisations. We have observed that in adapting any quality model, organisations should consider the following criteria in choosing the best applicable model:
Software quality assurance models in small and medium organisations 19
• size of organisation
• available funding and resources
• recognition requirement for suppliers
• software or broader requirements.
Each model is having its benefits and limitations. Organisations should select the model keeping in view their constraints and expectations. However, each model should be empirically validated further to know its outcome and also impact of the approach on software measurement in small and medium organisations.
References
Akao, Y. (1990) QFD: Integrating Customer Requirements into Product Design, USA: Productivity Press.
Basili, V. and Rombach, D. (1988) ‘The TAME project: towards improvement-oriented software environments’, IEEE Transactions on Software Engineering, Vol. 14, No. 6. Basili, V. and Weiss, D. (1984) ‘A methodology for collecting valid software engineering data’, IEEE Transactions on Software Engineering, Vol. 10, No. 6, pp.728–738.
Basili, V., Caldiera, G. and Rombach, D. (1994) ‘Experience factory’, in J. Marciniak (Ed.) Encyclopedia of Software Enginering, John Wiley & Sons, Vol. 1.
Biro, M., Messnarz, R. and Davison, A.G. (2002) ‘The impact of national cultural factors on the effectiveness of process improvement methods: the third dimension’, Software Quality Professional, Vol. 4, No. 4, pp.34–41.
Bush, M. (1995) CMM: The Capability Maturity Model. Guidelines for Improving the Software Process, Carnegie Mellon University, Software Engineering Institute, SEI Series in Software Engineering, Addison-Wesley.
Cohen, L. (1995) Quality Function Deployment, How to Make QFD Work for You, USA: Addison-Wesley.
Fortuna, R.M. (1988) ‘Beyond quality: taking SPC upstream’, Quality Progress, June, pp.23–28. Galin, D. (2004) Software Quality Assurance, From Theory to Implementation, 1st edition, Pearson, Addison-Wesley.
Gresse von Wangenheim, C. (2002) ‘Planning and executing GQM based software measurement’, Technical Report LQPS001.01E, UNIVALI, Sao Jose, Brazil.
Gresse, C., Hoisl, B. and Wüst, J. (1995) ‘A process model for GQM based measurement’, Technical Report STTI-95-04-E, Software Technology Transfer Initiative, University of Kaiserslautern, Germany.
Gresse, C., Punter T. and Anacleto, A. (2003) Software Measurement for Small and Medium Enterprises – A Brazilian-German View on Extending the GQM Method, Available at www.sj.univali.br/prof/Christiane%20Gresse%20Von%20Wangenheim/papers/ease2003.pdf
Hadden, R. (1998) ‘How scalable are CMM key practices?’, Crosstalk: The Journal of Defense Software Engineering, April, Vol. 11, No. 4, pp.18–20, 23.
Hauser, J.R. and Clausing, D. (1988) ‘The house of quality’, Harvard Business Review, May–June, pp.63–73.
Herrera, E.M. and Trejo Ramirez, R.A. (2003) ‘A methodology for self-diagnosis for software quality assurance in small and medium-sized industries in Latin America’, The Electronic Journal on Information Systems in Developing Countries, Vol. 15, No. 4, pp.1–13.
ISO/IES 9126 (1991) Information Technology – Software Product Evaluation – Quality Characteristics and Guidelines for their Use, International Organisation for Standardisation.
20 A. Mishra and D. Mishra
Johnson, D., Johnson, L. and Brodman, J.G. (1998) ‘Applying the CMM to small organizations and small projects’, Proceedings of the 1998 Software Engineering Process Group Conference, Chicago, IL.
Mazur, G. (1994) ‘QFD for small business – a shortcut through the “Maze of Matrices”’, Transactions from the Sixth Symposium on Quality Function Deployment, Michigan, November,
pp.375–386.
Park, R., Goethert, W. and Florac, W. (1996) ‘Goal-driven software measurement – a guidebook’, CMU/SE-96-HB-002.
Pressman, R.S. (2002) Software Engineering – A practitioner’s Approach, 6th edition, McGraw-Hill.
Quality and Productivity of the Brasilian Software Sector (2001) Quality and Productivity of the Brasilian Software Sector (in Portuguese), Ministerio da Ciencia e Tecnologia, Brazil.
Richardson, I. (2002) ‘SPI models: what characteristics are required for small software development companies?’, Software Quality Journal, Vol. 10, pp.101–114.
van Sloingen, R. and Berghout, E. (1999) The Goal/Question/Metric Method – A Practical Guide for Quality Improvement of Software Development, McGraw-Hill.
Zeineddine, R. and Mansour, N. (2003) ‘Software quality improvement model for small organizations’, ISCIS, Lecture Notes in Computer Science (LNCS) 2869, pp.1027–1034.
View publication stats