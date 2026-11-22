'use strict';
// Stable course content. Live advisories, when approved, remain separately versioned.
const CYBERSECURITY_FUTURE_COURSE = {
  "id": "cyber-security-of-the-future",
  "slug": "cyber-security-of-the-future",
  "title": "The Cyber Security of the Future: AI Defense, Zero Trust and Practical Labs",
  "description": "A future-ready, Nigeria-relevant cybersecurity pathway from basic digital safety to defensive engineering, AI security, incident response and post-quantum readiness. Includes real decision exercises, fictional lab datasets and reviewed security guidance.",
  "skillIds": [],
  "category": "Cybersecurity & AI Safety",
  "estimatedHours": 60,
  "modules": [
    {
      "id": "csf-m0",
      "title": "Module 0: Cyber Foundations and Digital Identity",
      "lessons": [
        {
          "id": "csf-0-l1",
          "title": "Core principles and safe decisions",
          "content": [
            "By the end of this module you should be able to: Explain assets, trust, confidentiality, integrity and availability; identify safer recovery and MFA practices.",
            "Why the principles matter: Sharing passwords for speed means nobody can reliably attribute changes to the responsible user.",
            "Practice context: An account recovery route can fail if the device and email used to recover one another are both lost. The scenario is fictional and uses no real victim or system data."
          ],
          "keyTakeaways": [
            "Explain assets, trust, confidentiality, integrity and availability; identify safer recovery and MFA practices.",
            "Sharing passwords for speed means nobody can reliably attribute changes to the responsible user.",
            "Use evidence, least privilege and explicit authorization instead of guessing."
          ]
        },
        {
          "id": "csf-0-l2",
          "title": "Worked example and reasoning",
          "content": [
            "Read the situation: An account recovery route can fail if the device and email used to recover one another are both lost.",
            "Decide: A school creates one shared password for all staff.",
            "Defensible response: Replace shared credentials with named accounts, restricted roles, MFA and a documented emergency recovery process.",
            "Explain your evidence, your uncertainty and the smallest reversible next action. Risky technical or financial actions must be approved outside the AI model."
          ],
          "keyTakeaways": [
            "Replace shared credentials with named accounts, restricted roles, MFA and a documented emergency recovery process.",
            "Separate observed facts from predictions and recommended actions.",
            "For high-impact decisions, require human confirmation and a rollback plan."
          ]
        },
        {
          "id": "csf-0-l3",
          "title": "Practical lab, portfolio and return refresher",
          "content": [
            "Practical objective: Map your own fictitious accounts to owners, access rights and independent recovery choices.",
            "Open the no-cost interactive lab hub at /cybersecurity-labs and select Lab L0: Digital Identity Baseline. Complete the simulated questions, record your reasoning and download a local Markdown worksheet.",
            "Advanced practical challenge: open /cybersecurity-challenges for offline deterministic exercises involving SOC event triage, access policy, vulnerability applicability, cryptographic prioritization and AI-agent authorization.",
            "Submit the worksheet only through an approved course process. A simulated choice alone does not certify competence. Review official resources and any instructor-approved change brief before applying advice to a real system."
          ],
          "keyTakeaways": [
            "Companion: Lab L0: Digital Identity Baseline",
            "Produce a reproducible evidence worksheet with a clear safety boundary.",
            "The refreshable threat briefing supplements—not silently replaces—these stable principles."
          ]
        }
      ],
      "quiz": {
        "id": "csf-m0-quiz",
        "questions": [
          {
            "id": "csf-m0-q1",
            "question": "Who should be able to reset an employee account?",
            "options": [
              "Any colleague using the shared Wi-Fi",
              "An identity-verification workflow operated by an authorized administrator",
              "Anyone who knows the phone number"
            ],
            "correctIndex": 1,
            "explanation": "Replace shared credentials with named accounts, restricted roles, MFA and a documented emergency recovery process."
          },
          {
            "id": "csf-m0-q2",
            "question": "Which statement describes acceptable cybersecurity laboratory practice?",
            "options": [
              "Test any third-party website if it appears public",
              "Use only fictional fixtures or systems you own or have explicit written authorization to test",
              "Capture real learner passwords to prove a risk"
            ],
            "correctIndex": 1,
            "explanation": "Authorization and privacy are mandatory safety boundaries; beginner simulations use invented data."
          },
          {
            "id": "csf-m0-q3",
            "question": "What belongs in a defensible lab evidence record?",
            "options": [
              "Claim that all uncertain stages are confirmed",
              "Only a final score",
              "Actions, timestamps or sample evidence identifiers, uncertainty, and the smallest safe recommended next action"
            ],
            "correctIndex": 2,
            "explanation": "Evidence-based reflection is assessed separately from multiple-choice correctness."
          }
        ]
      }
    },
    {
      "id": "csf-m1",
      "title": "Module 1: Shifting Threat Landscape and Attack Surfaces",
      "lessons": [
        {
          "id": "csf-1-l1",
          "title": "Core principles and safe decisions",
          "content": [
            "By the end of this module you should be able to: Map evidenced attack stages to MITRE ATT&CK and locate control points; distinguish a confirmed incident from speculation.",
            "Why the principles matter: The ATT&CK map is a structured evidence model, not a story to complete by guessing.",
            "Practice context: A university business receives a forged supplier invoice and its source-control system contains an accidentally committed fake secret. The scenario is fictional and uses no real victim or system data."
          ],
          "keyTakeaways": [
            "Map evidenced attack stages to MITRE ATT&CK and locate control points; distinguish a confirmed incident from speculation.",
            "The ATT&CK map is a structured evidence model, not a story to complete by guessing.",
            "Use evidence, least privilege and explicit authorization instead of guessing."
          ]
        },
        {
          "id": "csf-1-l2",
          "title": "Worked example and reasoning",
          "content": [
            "Read the situation: A university business receives a forged supplier invoice and its source-control system contains an accidentally committed fake secret.",
            "Decide: A report shows use of a stolen cloud account but no evidence of malicious code.",
            "Defensible response: Mark account abuse as confirmed and execution as unknown; do not invent techniques to fill a diagram.",
            "Explain your evidence, your uncertainty and the smallest reversible next action. Risky technical or financial actions must be approved outside the AI model."
          ],
          "keyTakeaways": [
            "Mark account abuse as confirmed and execution as unknown; do not invent techniques to fill a diagram.",
            "Separate observed facts from predictions and recommended actions.",
            "For high-impact decisions, require human confirmation and a rollback plan."
          ]
        },
        {
          "id": "csf-1-l3",
          "title": "Practical lab, portfolio and return refresher",
          "content": [
            "Practical objective: Document the trust claim, attacker goal and technique evidence; then prepare a read-only component inventory and SBOM plan.",
            "Open the no-cost interactive lab hub at /cybersecurity-labs and select Lab L1: Threat Chain Mapping. Complete the simulated questions, record your reasoning and download a local Markdown worksheet.",
            "Advanced practical challenge: open /cybersecurity-challenges for offline deterministic exercises involving SOC event triage, access policy, vulnerability applicability, cryptographic prioritization and AI-agent authorization.",
            "Submit the worksheet only through an approved course process. A simulated choice alone does not certify competence. Review official resources and any instructor-approved change brief before applying advice to a real system."
          ],
          "keyTakeaways": [
            "Companion: Lab L1: Threat Chain Mapping",
            "Produce a reproducible evidence worksheet with a clear safety boundary.",
            "The refreshable threat briefing supplements—not silently replaces—these stable principles."
          ]
        }
      ],
      "quiz": {
        "id": "csf-m1-quiz",
        "questions": [
          {
            "id": "csf-m1-q1",
            "question": "What should an analyst do when a breach report lacks evidence for a stage?",
            "options": [
              "Label that stage unknown",
              "Assign the most dramatic technique",
              "Treat all possibilities as confirmed"
            ],
            "correctIndex": 0,
            "explanation": "Mark account abuse as confirmed and execution as unknown; do not invent techniques to fill a diagram."
          },
          {
            "id": "csf-m1-q2",
            "question": "Which statement describes acceptable cybersecurity laboratory practice?",
            "options": [
              "Test any third-party website if it appears public",
              "Use only fictional fixtures or systems you own or have explicit written authorization to test",
              "Capture real learner passwords to prove a risk"
            ],
            "correctIndex": 1,
            "explanation": "Authorization and privacy are mandatory safety boundaries; beginner simulations use invented data."
          },
          {
            "id": "csf-m1-q3",
            "question": "What belongs in a defensible lab evidence record?",
            "options": [
              "Claim that all uncertain stages are confirmed",
              "Only a final score",
              "Actions, timestamps or sample evidence identifiers, uncertainty, and the smallest safe recommended next action"
            ],
            "correctIndex": 2,
            "explanation": "Evidence-based reflection is assessed separately from multiple-choice correctness."
          }
        ]
      }
    },
    {
      "id": "csf-m2",
      "title": "Module 2: AI-Powered Threats and Defending AI Systems",
      "lessons": [
        {
          "id": "csf-2-l1",
          "title": "Core principles and safe decisions",
          "content": [
            "By the end of this module you should be able to: Explain indirect prompt injection, tool privilege and source grounding; propose a human approval boundary.",
            "Why the principles matter: Source separation alone cannot authorize a refund; authorization and amount checks must be enforced by non-model code.",
            "Practice context: A customer-support summarizer reads a ticket that attempts to direct its refund tool. The scenario is fictional and uses no real victim or system data."
          ],
          "keyTakeaways": [
            "Explain indirect prompt injection, tool privilege and source grounding; propose a human approval boundary.",
            "Source separation alone cannot authorize a refund; authorization and amount checks must be enforced by non-model code.",
            "Use evidence, least privilege and explicit authorization instead of guessing."
          ]
        },
        {
          "id": "csf-2-l2",
          "title": "Worked example and reasoning",
          "content": [
            "Read the situation: A customer-support summarizer reads a ticket that attempts to direct its refund tool.",
            "Decide: A model says a refund is justified and suggests a payment destination.",
            "Defensible response: Generate a reviewable recommendation, never a direct unapproved financial action.",
            "Explain your evidence, your uncertainty and the smallest reversible next action. Risky technical or financial actions must be approved outside the AI model."
          ],
          "keyTakeaways": [
            "Generate a reviewable recommendation, never a direct unapproved financial action.",
            "Separate observed facts from predictions and recommended actions.",
            "For high-impact decisions, require human confirmation and a rollback plan."
          ]
        },
        {
          "id": "csf-2-l3",
          "title": "Practical lab, portfolio and return refresher",
          "content": [
            "Practical objective: Treat ticket text as data, keep policy enforcement outside the model, bind account identity server-side and require verified approval for funds movement.",
            "Open the no-cost interactive lab hub at /cybersecurity-labs and select Lab L3: Defend a Summarizer. Complete the simulated questions, record your reasoning and download a local Markdown worksheet.",
            "Advanced practical challenge: open /cybersecurity-challenges for offline deterministic exercises involving SOC event triage, access policy, vulnerability applicability, cryptographic prioritization and AI-agent authorization.",
            "Submit the worksheet only through an approved course process. A simulated choice alone does not certify competence. Review official resources and any instructor-approved change brief before applying advice to a real system."
          ],
          "keyTakeaways": [
            "Companion: Lab L3: Defend a Summarizer",
            "Produce a reproducible evidence worksheet with a clear safety boundary.",
            "The refreshable threat briefing supplements—not silently replaces—these stable principles."
          ]
        }
      ],
      "quiz": {
        "id": "csf-m2-quiz",
        "questions": [
          {
            "id": "csf-m2-q1",
            "question": "What should a summarizer do with hidden commands in a document?",
            "options": [
              "Run them if the wording looks official",
              "Ignore document content completely",
              "Describe them as untrusted data and avoid granting new authority"
            ],
            "correctIndex": 2,
            "explanation": "Generate a reviewable recommendation, never a direct unapproved financial action."
          },
          {
            "id": "csf-m2-q2",
            "question": "Which statement describes acceptable cybersecurity laboratory practice?",
            "options": [
              "Test any third-party website if it appears public",
              "Use only fictional fixtures or systems you own or have explicit written authorization to test",
              "Capture real learner passwords to prove a risk"
            ],
            "correctIndex": 1,
            "explanation": "Authorization and privacy are mandatory safety boundaries; beginner simulations use invented data."
          },
          {
            "id": "csf-m2-q3",
            "question": "What belongs in a defensible lab evidence record?",
            "options": [
              "Claim that all uncertain stages are confirmed",
              "Only a final score",
              "Actions, timestamps or sample evidence identifiers, uncertainty, and the smallest safe recommended next action"
            ],
            "correctIndex": 2,
            "explanation": "Evidence-based reflection is assessed separately from multiple-choice correctness."
          }
        ]
      }
    },
    {
      "id": "csf-m3",
      "title": "Module 3: Zero Trust and Modern Identity",
      "lessons": [
        {
          "id": "csf-3-l1",
          "title": "Core principles and safe decisions",
          "content": [
            "By the end of this module you should be able to: Apply least privilege and per-request authorization to users, devices, services and AI agents.",
            "Why the principles matter: A strong sign-in does not automatically grant access to every dataset or action.",
            "Practice context: A nonprofit has staff, volunteers, a finance dashboard and a third-party marketing assistant. The scenario is fictional and uses no real victim or system data."
          ],
          "keyTakeaways": [
            "Apply least privilege and per-request authorization to users, devices, services and AI agents.",
            "A strong sign-in does not automatically grant access to every dataset or action.",
            "Use evidence, least privilege and explicit authorization instead of guessing."
          ]
        },
        {
          "id": "csf-3-l2",
          "title": "Worked example and reasoning",
          "content": [
            "Read the situation: A nonprofit has staff, volunteers, a finance dashboard and a third-party marketing assistant.",
            "Decide: A volunteer can view fundraising reports but requests an export of all donor identities.",
            "Defensible response: Deny the export absent a verified need and explicit scoped authorization.",
            "Explain your evidence, your uncertainty and the smallest reversible next action. Risky technical or financial actions must be approved outside the AI model."
          ],
          "keyTakeaways": [
            "Deny the export absent a verified need and explicit scoped authorization.",
            "Separate observed facts from predictions and recommended actions.",
            "For high-impact decisions, require human confirmation and a rollback plan."
          ]
        },
        {
          "id": "csf-3-l3",
          "title": "Practical lab, portfolio and return refresher",
          "content": [
            "Practical objective: Design roles and restrictions; map phishing-resistant sign-in options and short-lived scoped credentials; include access review and expiry.",
            "Open the no-cost interactive lab hub at /cybersecurity-labs and select Lab L4: Zero Trust Policy Builder. Complete the simulated questions, record your reasoning and download a local Markdown worksheet.",
            "Advanced practical challenge: open /cybersecurity-challenges for offline deterministic exercises involving SOC event triage, access policy, vulnerability applicability, cryptographic prioritization and AI-agent authorization.",
            "Submit the worksheet only through an approved course process. A simulated choice alone does not certify competence. Review official resources and any instructor-approved change brief before applying advice to a real system."
          ],
          "keyTakeaways": [
            "Companion: Lab L4: Zero Trust Policy Builder",
            "Produce a reproducible evidence worksheet with a clear safety boundary.",
            "The refreshable threat briefing supplements—not silently replaces—these stable principles."
          ]
        }
      ],
      "quiz": {
        "id": "csf-m3-quiz",
        "questions": [
          {
            "id": "csf-m3-q1",
            "question": "What most directly limits damage from a compromised volunteer account?",
            "options": [
              "Permanent finance-admin access",
              "Scoped permissions checked for each protected operation",
              "A hidden navigation tab"
            ],
            "correctIndex": 1,
            "explanation": "Deny the export absent a verified need and explicit scoped authorization."
          },
          {
            "id": "csf-m3-q2",
            "question": "Which statement describes acceptable cybersecurity laboratory practice?",
            "options": [
              "Test any third-party website if it appears public",
              "Use only fictional fixtures or systems you own or have explicit written authorization to test",
              "Capture real learner passwords to prove a risk"
            ],
            "correctIndex": 1,
            "explanation": "Authorization and privacy are mandatory safety boundaries; beginner simulations use invented data."
          },
          {
            "id": "csf-m3-q3",
            "question": "What belongs in a defensible lab evidence record?",
            "options": [
              "Claim that all uncertain stages are confirmed",
              "Only a final score",
              "Actions, timestamps or sample evidence identifiers, uncertainty, and the smallest safe recommended next action"
            ],
            "correctIndex": 2,
            "explanation": "Evidence-based reflection is assessed separately from multiple-choice correctness."
          }
        ]
      }
    },
    {
      "id": "csf-m4",
      "title": "Module 4: Cloud, APIs and DevSecOps",
      "lessons": [
        {
          "id": "csf-4-l1",
          "title": "Core principles and safe decisions",
          "content": [
            "By the end of this module you should be able to: Identify API object-level authorization, cloud misconfiguration, secrets exposure and safe CI gates.",
            "Why the principles matter: Hiding IDs on the frontend is not an authorization control.",
            "Practice context: A booking application checks whether staff are logged in but trusts the customer ID supplied by a browser. The scenario is fictional and uses no real victim or system data."
          ],
          "keyTakeaways": [
            "Identify API object-level authorization, cloud misconfiguration, secrets exposure and safe CI gates.",
            "Hiding IDs on the frontend is not an authorization control.",
            "Use evidence, least privilege and explicit authorization instead of guessing."
          ]
        },
        {
          "id": "csf-4-l2",
          "title": "Worked example and reasoning",
          "content": [
            "Read the situation: A booking application checks whether staff are logged in but trusts the customer ID supplied by a browser.",
            "Decide: A user changes an ID in a request to view another person's booking.",
            "Defensible response: The service must check identity and permission for that exact record rather than trusting the provided ID.",
            "Explain your evidence, your uncertainty and the smallest reversible next action. Risky technical or financial actions must be approved outside the AI model."
          ],
          "keyTakeaways": [
            "The service must check identity and permission for that exact record rather than trusting the provided ID.",
            "Separate observed facts from predictions and recommended actions.",
            "For high-impact decisions, require human confirmation and a rollback plan."
          ]
        },
        {
          "id": "csf-4-l3",
          "title": "Practical lab, portfolio and return refresher",
          "content": [
            "Practical objective: Draw the authorization boundary and define a server-side ownership check, input validation and CI checks for committed secrets and dependencies.",
            "Open the no-cost interactive lab hub at /cybersecurity-labs and select Lab L7: Secure App Review. Complete the simulated questions, record your reasoning and download a local Markdown worksheet.",
            "Advanced practical challenge: open /cybersecurity-challenges for offline deterministic exercises involving SOC event triage, access policy, vulnerability applicability, cryptographic prioritization and AI-agent authorization.",
            "Submit the worksheet only through an approved course process. A simulated choice alone does not certify competence. Review official resources and any instructor-approved change brief before applying advice to a real system."
          ],
          "keyTakeaways": [
            "Companion: Lab L7: Secure App Review",
            "Produce a reproducible evidence worksheet with a clear safety boundary.",
            "The refreshable threat briefing supplements—not silently replaces—these stable principles."
          ]
        }
      ],
      "quiz": {
        "id": "csf-m4-quiz",
        "questions": [
          {
            "id": "csf-m4-q1",
            "question": "Where must booking ownership be verified?",
            "options": [
              "On the API server for every relevant request",
              "Only inside the mobile UI",
              "In a public tutorial video"
            ],
            "correctIndex": 0,
            "explanation": "The service must check identity and permission for that exact record rather than trusting the provided ID."
          },
          {
            "id": "csf-m4-q2",
            "question": "Which statement describes acceptable cybersecurity laboratory practice?",
            "options": [
              "Test any third-party website if it appears public",
              "Use only fictional fixtures or systems you own or have explicit written authorization to test",
              "Capture real learner passwords to prove a risk"
            ],
            "correctIndex": 1,
            "explanation": "Authorization and privacy are mandatory safety boundaries; beginner simulations use invented data."
          },
          {
            "id": "csf-m4-q3",
            "question": "What belongs in a defensible lab evidence record?",
            "options": [
              "Claim that all uncertain stages are confirmed",
              "Only a final score",
              "Actions, timestamps or sample evidence identifiers, uncertainty, and the smallest safe recommended next action"
            ],
            "correctIndex": 2,
            "explanation": "Evidence-based reflection is assessed separately from multiple-choice correctness."
          }
        ]
      }
    },
    {
      "id": "csf-m5",
      "title": "Module 5: Cryptography and Post-Quantum Readiness",
      "lessons": [
        {
          "id": "csf-5-l1",
          "title": "Core principles and safe decisions",
          "content": [
            "By the end of this module you should be able to: Explain TLS, lifecycle management, CBOM, crypto-agility and the purpose of NIST FIPS 203–205 and IR 8547.",
            "Why the principles matter: NIST's final FIPS 203, 204 and 205 and October 2026 transition guidance are the baseline for review.",
            "Practice context: A school archive must keep selected records confidential for many years, but its vendors use unspecified cryptography. The scenario is fictional and uses no real victim or system data."
          ],
          "keyTakeaways": [
            "Explain TLS, lifecycle management, CBOM, crypto-agility and the purpose of NIST FIPS 203–205 and IR 8547.",
            "NIST's final FIPS 203, 204 and 205 and October 2026 transition guidance are the baseline for review.",
            "Use evidence, least privilege and explicit authorization instead of guessing."
          ]
        },
        {
          "id": "csf-5-l2",
          "title": "Worked example and reasoning",
          "content": [
            "Read the situation: A school archive must keep selected records confidential for many years, but its vendors use unspecified cryptography.",
            "Decide: A vendor advertises unspecified 'quantum-proof' encryption without technical documentation.",
            "Defensible response: Request verified algorithm support, interoperability evidence and a migration plan; do not alter production on a claim alone.",
            "Explain your evidence, your uncertainty and the smallest reversible next action. Risky technical or financial actions must be approved outside the AI model."
          ],
          "keyTakeaways": [
            "Request verified algorithm support, interoperability evidence and a migration plan; do not alter production on a claim alone.",
            "Separate observed facts from predictions and recommended actions.",
            "For high-impact decisions, require human confirmation and a rollback plan."
          ]
        },
        {
          "id": "csf-5-l3",
          "title": "Practical lab, portfolio and return refresher",
          "content": [
            "Practical objective: Inventory key exchange, signatures and certificates by owner, usage and upgrade pathway; prioritize longer-lived sensitive data.",
            "Open the no-cost interactive lab hub at /cybersecurity-labs and select Lab L5: Post-Quantum Migration Planner. Complete the simulated questions, record your reasoning and download a local Markdown worksheet.",
            "Advanced practical challenge: open /cybersecurity-challenges for offline deterministic exercises involving SOC event triage, access policy, vulnerability applicability, cryptographic prioritization and AI-agent authorization.",
            "Submit the worksheet only through an approved course process. A simulated choice alone does not certify competence. Review official resources and any instructor-approved change brief before applying advice to a real system."
          ],
          "keyTakeaways": [
            "Companion: Lab L5: Post-Quantum Migration Planner",
            "Produce a reproducible evidence worksheet with a clear safety boundary.",
            "The refreshable threat briefing supplements—not silently replaces—these stable principles."
          ]
        }
      ],
      "quiz": {
        "id": "csf-m5-quiz",
        "questions": [
          {
            "id": "csf-m5-q1",
            "question": "Which action should precede cryptographic replacement?",
            "options": [
              "Replacing all keys immediately",
              "Designing an original algorithm",
              "Inventorying dependencies, data sensitivity, owners and vendor plans"
            ],
            "correctIndex": 2,
            "explanation": "Request verified algorithm support, interoperability evidence and a migration plan; do not alter production on a claim alone."
          },
          {
            "id": "csf-m5-q2",
            "question": "Which statement describes acceptable cybersecurity laboratory practice?",
            "options": [
              "Test any third-party website if it appears public",
              "Use only fictional fixtures or systems you own or have explicit written authorization to test",
              "Capture real learner passwords to prove a risk"
            ],
            "correctIndex": 1,
            "explanation": "Authorization and privacy are mandatory safety boundaries; beginner simulations use invented data."
          },
          {
            "id": "csf-m5-q3",
            "question": "What belongs in a defensible lab evidence record?",
            "options": [
              "Claim that all uncertain stages are confirmed",
              "Only a final score",
              "Actions, timestamps or sample evidence identifiers, uncertainty, and the smallest safe recommended next action"
            ],
            "correctIndex": 2,
            "explanation": "Evidence-based reflection is assessed separately from multiple-choice correctness."
          }
        ]
      }
    },
    {
      "id": "csf-m6",
      "title": "Module 6: IoT, OT and Critical Infrastructure",
      "lessons": [
        {
          "id": "csf-6-l1",
          "title": "Core principles and safe decisions",
          "content": [
            "By the end of this module you should be able to: Describe safety-first security, segmentation, device identity and controlled change in cyber-physical settings.",
            "Why the principles matter: Availability and physical safety may outrank convenience in OT; exercises must be non-disruptive.",
            "Practice context: A fictional campus laboratory connects IoT sensors and its finance laptop through the same broad network. The scenario is fictional and uses no real victim or system data."
          ],
          "keyTakeaways": [
            "Describe safety-first security, segmentation, device identity and controlled change in cyber-physical settings.",
            "Availability and physical safety may outrank convenience in OT; exercises must be non-disruptive.",
            "Use evidence, least privilege and explicit authorization instead of guessing."
          ]
        },
        {
          "id": "csf-6-l2",
          "title": "Worked example and reasoning",
          "content": [
            "Read the situation: A fictional campus laboratory connects IoT sensors and its finance laptop through the same broad network.",
            "Decide: A student proposes unplanned active scanning of a real medical device.",
            "Defensible response: Refuse unapproved active testing, use a fully simulated lab and seek safety-owner authorization.",
            "Explain your evidence, your uncertainty and the smallest reversible next action. Risky technical or financial actions must be approved outside the AI model."
          ],
          "keyTakeaways": [
            "Refuse unapproved active testing, use a fully simulated lab and seek safety-owner authorization.",
            "Separate observed facts from predictions and recommended actions.",
            "For high-impact decisions, require human confirmation and a rollback plan."
          ]
        },
        {
          "id": "csf-6-l3",
          "title": "Practical lab, portfolio and return refresher",
          "content": [
            "Practical objective: Sketch separate sensor and administration zones; define permitted telemetry destinations, logging and safe rollback steps.",
            "Open the no-cost interactive lab hub at /cybersecurity-labs and select Lab S3: Advisory Applicability. Complete the simulated questions, record your reasoning and download a local Markdown worksheet.",
            "Advanced practical challenge: open /cybersecurity-challenges for offline deterministic exercises involving SOC event triage, access policy, vulnerability applicability, cryptographic prioritization and AI-agent authorization.",
            "Submit the worksheet only through an approved course process. A simulated choice alone does not certify competence. Review official resources and any instructor-approved change brief before applying advice to a real system."
          ],
          "keyTakeaways": [
            "Companion: Lab S3: Advisory Applicability",
            "Produce a reproducible evidence worksheet with a clear safety boundary.",
            "The refreshable threat briefing supplements—not silently replaces—these stable principles."
          ]
        }
      ],
      "quiz": {
        "id": "csf-m6-quiz",
        "questions": [
          {
            "id": "csf-m6-q1",
            "question": "What is an acceptable first step for security testing on fragile real-world controllers?",
            "options": [
              "Obtain explicit permission, scope and safety review",
              "Scan publicly exposed controllers at random",
              "Disable safety interlocks to prove a point"
            ],
            "correctIndex": 0,
            "explanation": "Refuse unapproved active testing, use a fully simulated lab and seek safety-owner authorization."
          },
          {
            "id": "csf-m6-q2",
            "question": "Which statement describes acceptable cybersecurity laboratory practice?",
            "options": [
              "Test any third-party website if it appears public",
              "Use only fictional fixtures or systems you own or have explicit written authorization to test",
              "Capture real learner passwords to prove a risk"
            ],
            "correctIndex": 1,
            "explanation": "Authorization and privacy are mandatory safety boundaries; beginner simulations use invented data."
          },
          {
            "id": "csf-m6-q3",
            "question": "What belongs in a defensible lab evidence record?",
            "options": [
              "Claim that all uncertain stages are confirmed",
              "Only a final score",
              "Actions, timestamps or sample evidence identifiers, uncertainty, and the smallest safe recommended next action"
            ],
            "correctIndex": 2,
            "explanation": "Evidence-based reflection is assessed separately from multiple-choice correctness."
          }
        ]
      }
    },
    {
      "id": "csf-m7",
      "title": "Module 7: Incident Response, Forensics and Resilience",
      "lessons": [
        {
          "id": "csf-7-l1",
          "title": "Core principles and safe decisions",
          "content": [
            "By the end of this module you should be able to: Reconstruct events from synthetic evidence, distinguish facts from hypotheses and design a tested restore plan.",
            "Why the principles matter: High-impact containment and recovery must be human approved and have an audit trail.",
            "Practice context: A fictional business loses account access after suspicious administrator sign-ins, while its backup status is unknown. The scenario is fictional and uses no real victim or system data."
          ],
          "keyTakeaways": [
            "Reconstruct events from synthetic evidence, distinguish facts from hypotheses and design a tested restore plan.",
            "High-impact containment and recovery must be human approved and have an audit trail.",
            "Use evidence, least privilege and explicit authorization instead of guessing."
          ]
        },
        {
          "id": "csf-7-l2",
          "title": "Worked example and reasoning",
          "content": [
            "Read the situation: A fictional business loses account access after suspicious administrator sign-ins, while its backup status is unknown.",
            "Decide: An alert says a backup task ran last night.",
            "Defensible response: Confirm the backup is restorable; a scheduled backup does not demonstrate recoverability.",
            "Explain your evidence, your uncertainty and the smallest reversible next action. Risky technical or financial actions must be approved outside the AI model."
          ],
          "keyTakeaways": [
            "Confirm the backup is restorable; a scheduled backup does not demonstrate recoverability.",
            "Separate observed facts from predictions and recommended actions.",
            "For high-impact decisions, require human confirmation and a rollback plan."
          ]
        },
        {
          "id": "csf-7-l3",
          "title": "Practical lab, portfolio and return refresher",
          "content": [
            "Practical objective: Build a timeline, preserve synthetic evidence identifiers, prioritize containment proposals and define a restore test.",
            "Open the no-cost interactive lab hub at /cybersecurity-labs and select Lab L6: Ransomware Tabletop. Complete the simulated questions, record your reasoning and download a local Markdown worksheet.",
            "Advanced practical challenge: open /cybersecurity-challenges for offline deterministic exercises involving SOC event triage, access policy, vulnerability applicability, cryptographic prioritization and AI-agent authorization.",
            "Submit the worksheet only through an approved course process. A simulated choice alone does not certify competence. Review official resources and any instructor-approved change brief before applying advice to a real system."
          ],
          "keyTakeaways": [
            "Companion: Lab L6: Ransomware Tabletop",
            "Produce a reproducible evidence worksheet with a clear safety boundary.",
            "The refreshable threat briefing supplements—not silently replaces—these stable principles."
          ]
        }
      ],
      "quiz": {
        "id": "csf-m7-quiz",
        "questions": [
          {
            "id": "csf-m7-q1",
            "question": "What best supports the assertion that a service can recover?",
            "options": [
              "An advertisement for backup software",
              "A successful recent restore test",
              "The presence of a backup folder icon"
            ],
            "correctIndex": 1,
            "explanation": "Confirm the backup is restorable; a scheduled backup does not demonstrate recoverability."
          },
          {
            "id": "csf-m7-q2",
            "question": "Which statement describes acceptable cybersecurity laboratory practice?",
            "options": [
              "Test any third-party website if it appears public",
              "Use only fictional fixtures or systems you own or have explicit written authorization to test",
              "Capture real learner passwords to prove a risk"
            ],
            "correctIndex": 1,
            "explanation": "Authorization and privacy are mandatory safety boundaries; beginner simulations use invented data."
          },
          {
            "id": "csf-m7-q3",
            "question": "What belongs in a defensible lab evidence record?",
            "options": [
              "Claim that all uncertain stages are confirmed",
              "Only a final score",
              "Actions, timestamps or sample evidence identifiers, uncertainty, and the smallest safe recommended next action"
            ],
            "correctIndex": 2,
            "explanation": "Evidence-based reflection is assessed separately from multiple-choice correctness."
          }
        ]
      }
    },
    {
      "id": "csf-m8",
      "title": "Module 8: Governance, Privacy and Career Practice",
      "lessons": [
        {
          "id": "csf-8-l1",
          "title": "Core principles and safe decisions",
          "content": [
            "By the end of this module you should be able to: Write proportionate Nigerian organization policies, explain risk to leaders and produce an evidence-backed portfolio.",
            "Why the principles matter: The NDPA 2023 and relevant obligations require case-specific review; learning content is not legal advice.",
            "Practice context: A faith-based organization handles donation records, children’s sign-ups and contact details. The scenario is fictional and uses no real victim or system data."
          ],
          "keyTakeaways": [
            "Write proportionate Nigerian organization policies, explain risk to leaders and produce an evidence-backed portfolio.",
            "The NDPA 2023 and relevant obligations require case-specific review; learning content is not legal advice.",
            "Use evidence, least privilege and explicit authorization instead of guessing."
          ]
        },
        {
          "id": "csf-8-l2",
          "title": "Worked example and reasoning",
          "content": [
            "Read the situation: A faith-based organization handles donation records, children’s sign-ups and contact details.",
            "Decide: A manager demands a universal legal deadline without specifying the jurisdiction or incident facts.",
            "Defensible response: Escalate for current legal verification and document facts first.",
            "Explain your evidence, your uncertainty and the smallest reversible next action. Risky technical or financial actions must be approved outside the AI model."
          ],
          "keyTakeaways": [
            "Escalate for current legal verification and document facts first.",
            "Separate observed facts from predictions and recommended actions.",
            "For high-impact decisions, require human confirmation and a rollback plan."
          ]
        },
        {
          "id": "csf-8-l3",
          "title": "Practical lab, portfolio and return refresher",
          "content": [
            "Practical objective: Classify data, minimize collection, assign retention owners, document incident escalation and communicate risk without fabricated legal deadlines.",
            "Open the no-cost interactive lab hub at /cybersecurity-labs and select Lab L8: Privacy and Governance. Complete the simulated questions, record your reasoning and download a local Markdown worksheet.",
            "Advanced practical challenge: open /cybersecurity-challenges for offline deterministic exercises involving SOC event triage, access policy, vulnerability applicability, cryptographic prioritization and AI-agent authorization.",
            "Submit the worksheet only through an approved course process. A simulated choice alone does not certify competence. Review official resources and any instructor-approved change brief before applying advice to a real system."
          ],
          "keyTakeaways": [
            "Companion: Lab L8: Privacy and Governance",
            "Produce a reproducible evidence worksheet with a clear safety boundary.",
            "The refreshable threat briefing supplements—not silently replaces—these stable principles."
          ]
        }
      ],
      "quiz": {
        "id": "csf-m8-quiz",
        "questions": [
          {
            "id": "csf-m8-q1",
            "question": "What is the most defensible response to an uncertain breach-notification deadline?",
            "options": [
              "Invent a universally applicable deadline",
              "Check applicable current law, facts and professional guidance",
              "Publish all affected records"
            ],
            "correctIndex": 1,
            "explanation": "Escalate for current legal verification and document facts first."
          },
          {
            "id": "csf-m8-q2",
            "question": "Which statement describes acceptable cybersecurity laboratory practice?",
            "options": [
              "Test any third-party website if it appears public",
              "Use only fictional fixtures or systems you own or have explicit written authorization to test",
              "Capture real learner passwords to prove a risk"
            ],
            "correctIndex": 1,
            "explanation": "Authorization and privacy are mandatory safety boundaries; beginner simulations use invented data."
          },
          {
            "id": "csf-m8-q3",
            "question": "What belongs in a defensible lab evidence record?",
            "options": [
              "Claim that all uncertain stages are confirmed",
              "Only a final score",
              "Actions, timestamps or sample evidence identifiers, uncertainty, and the smallest safe recommended next action"
            ],
            "correctIndex": 2,
            "explanation": "Evidence-based reflection is assessed separately from multiple-choice correctness."
          }
        ]
      }
    }
  ]
};
module.exports = { CYBERSECURITY_FUTURE_COURSE };
