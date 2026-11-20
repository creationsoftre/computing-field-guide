export const grcModules = [
  { id: "grc-foundations", number: "01", title: "Governance & security foundations", summary: "Translate obligations and security principles into a system security plan.", objective: "Explain how laws, standards, organizational requirements, and the CIA triad shape a security plan.", lab: "Security gap analyzer" },
  { id: "grc-risk", number: "02", title: "Risk management & assessment", summary: "Classify assets, assess uncertainty, and choose a proportionate treatment.", objective: "Identify assets, compare qualitative and quantitative assessment, and apply the NIST RMF lifecycle.", lab: "Risk assessment calculator" },
  { id: "grc-controls", number: "03", title: "Controls & risk prioritization", summary: "Select controls, record risks, and track residual exposure over time.", objective: "Use control families and a risk register to prioritize remediation by business context.", lab: "Risk register" },
  { id: "grc-continuity", number: "04", title: "Business continuity & recovery", summary: "Connect impact analysis to recovery objectives, testing, and resilience.", objective: "Distinguish BCP from DRP and evaluate RTO/RPO performance after a disruption.", lab: "RTO/RPO timeline" },
  { id: "grc-audit", number: "05", title: "Auditing & communication", summary: "Turn evidence into findings, owners, remediation, and clear stakeholder updates.", objective: "Evaluate controls, communicate risk, and create an actionable audit response.", lab: "Audit simulator" },
];

export const glossary = [
  ["Availability", "Information and services are accessible when authorized users need them.", "Redundant hosts keep a payroll service online during maintenance.", "Foundations"],
  ["Compliance", "Meeting an applicable obligation; it is not automatically the same as security or certification.", "A vendor maps its controls to a customer contract.", "Foundations"],
  ["Confidentiality", "Preventing unauthorized disclosure of information.", "Encryption and least privilege protect a patient record.", "Foundations"],
  ["Integrity", "Preserving accuracy, completeness, and trustworthiness.", "A signed hash reveals that a download changed.", "Foundations"],
  ["Risk", "The effect of uncertainty on objectives, often considered through likelihood and impact.", "A vulnerable internet-facing server could interrupt sales.", "Risk"],
  ["Threat", "A circumstance or actor with the potential to cause harm.", "A criminal group targeting exposed remote access.", "Risk"],
  ["Vulnerability", "A weakness that a threat could exploit.", "An unpatched operating system on a public server.", "Risk"],
  ["Inherent risk", "Exposure before considering existing controls.", "The raw risk of a critical database with no backups.", "Risk"],
  ["Residual risk", "Exposure remaining after controls are applied.", "A short outage window remains after a failover design.", "Risk"],
  ["Risk appetite", "The broad amount and type of risk an organization is willing to pursue or retain.", "A startup accepts more delivery risk than a hospital may.", "Risk"],
  ["Risk tolerance", "The acceptable variation around an objective or appetite.", "A service may tolerate ten minutes of monthly downtime.", "Risk"],
  ["Security gap analysis", "A comparison of current controls with a required or selected baseline.", "A team finds that access reviews are not performed quarterly.", "Foundations"],
  ["Safeguard", "An administrative, technical, or physical measure that protects an asset.", "A policy, MFA, or locked server room.", "Risk"],
  ["NIST RMF", "A seven-step process for managing security and privacy risk in systems.", "Prepare, categorize, select, implement, assess, authorize, monitor.", "Risk"],
  ["Control effectiveness", "How well a control is designed and operating for its intended purpose.", "A policy exists, but sampled evidence shows reviews are late.", "Controls"],
  ["RTO", "Recovery time objective: target maximum time to restore a service after disruption.", "Restore the ordering API within four hours.", "Continuity"],
  ["RPO", "Recovery point objective: maximum tolerable data loss expressed as time.", "Backups must lose no more than fifteen minutes of orders.", "Continuity"],
  ["Business continuity plan", "A plan for maintaining essential operations during disruption.", "Staff move to manual order intake while a system is offline.", "Continuity"],
  ["Disaster recovery plan", "A plan for restoring affected technology, infrastructure, and services.", "A runbook rebuilds a database from a verified backup.", "Continuity"],
  ["Audit evidence", "Information used to support a conclusion about a criterion or control.", "A configuration export, interview note, or ticket sample.", "Audit"],
  ["Risk register", "A maintained record of risks, owners, treatments, status, and review dates.", "A table tracks an exposed API until remediation is verified.", "Controls"],
];

export const quiz = [
  { q: "Which CIA property is most directly supported by redundancy?", options: ["Confidentiality", "Integrity", "Availability"], answer: 2, why: "Redundancy helps a service remain accessible when a component fails." },
  { q: "What should happen first in a gap analysis?", options: ["Pick a remediation vendor", "Identify the baseline", "Accept every gap"], answer: 1, why: "You need a defined requirement or baseline before comparing current controls." },
  { q: "Which RMF step follows Implement?", options: ["Assess", "Prepare", "Categorize"], answer: 0, why: "The seven-step order is Prepare, Categorize, Select, Implement, Assess, Authorize, Monitor." },
  { q: "What does RPO measure?", options: ["Time to restore service", "Acceptable data loss interval", "Audit frequency"], answer: 1, why: "RPO is about how far back data may need to be recovered; RTO is restoration time." },
  { q: "Which is an example of risk transfer?", options: ["Buying cyber insurance", "Discontinuing a service", "Patching a server"], answer: 0, why: "Insurance shares a defined financial impact with another party; it does not remove the underlying risk." },
];

export const references = [
  ["NIST SP 800-37 Rev. 2", "Risk Management Framework for Information Systems and Organizations", "https://csrc.nist.gov/pubs/sp/800/37/r2/final"],
  ["NIST SP 800-53 Rev. 5", "Security and Privacy Controls for Information Systems and Organizations", "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final"],
  ["NIST SP 800-30 Rev. 1", "Guide for Conducting Risk Assessments", "https://csrc.nist.gov/pubs/sp/800/30/r1/final"],
  ["NIST SP 800-34 Rev. 1", "Contingency Planning Guide for Federal Information Systems", "https://csrc.nist.gov/pubs/sp/800/34/r1/final"],
  ["NIST CSF 2.0", "Cybersecurity Framework 2.0", "https://www.nist.gov/cyberframework"],
  ["PCI Security Standards Council", "PCI DSS document library", "https://www.pcisecuritystandards.org/standards/pci-dss/"],
];
