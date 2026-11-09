/* Generated from catalog.json. */
window.STUDYGOAT_CATALOG = {
  "schemaVersion": 1,
  "checked": "2026-11-09",
  "sources": {
    "sec701": {
      "publisher": "CompTIA",
      "title": "Security+ SY0-701 exam objectives",
      "url": "https://comptiacdn.azureedge.net/webcontent/docs/default-source/exam-objectives/comptia-security-sy0-701-exam-objectives-(6-0).pdf",
      "version": "6.0",
      "sections": [
        "1.1",
        "1.2",
        "1.3",
        "1.4"
      ],
      "status": "verified",
      "effective": "SY0-701 baseline; current revision requires recheck",
      "checked": "2026-11-09",
      "reviewBy": "2026-12-09",
      "rights": "Original summaries only. Source remains copyrighted; no exam questions copied."
    },
    "secversion": {
      "publisher": "CompTIA",
      "title": "Current Security+ V7 and V8 availability",
      "url": "https://www.comptia.org/en-us/certifications/security/v7/",
      "version": "Unconfirmed",
      "sections": [
        "Exam availability"
      ],
      "status": "needs-review",
      "effective": "Direct version pages inaccessible on check date",
      "checked": "2026-11-09",
      "reviewBy": "2026-12-09",
      "rights": "Original summaries only. Source remains copyrighted; no exam questions copied."
    },
    "nist12": {
      "publisher": "NIST",
      "title": "An Introduction to Information Security",
      "url": "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-12r1.pdf",
      "version": "SP 800-12 Rev. 1",
      "sections": [
        "2",
        "9.1",
        "10.1",
        "10.3",
        "10.5",
        "10.7"
      ],
      "status": "verified",
      "effective": "June 2017",
      "checked": "2026-11-09",
      "reviewBy": "2026-12-09",
      "rights": "US government publication. Original educational scenarios and summaries."
    },
    "faaacs": {
      "publisher": "FAA",
      "title": "Remote Pilot Airman Certification Standards",
      "url": "https://www.faa.gov/training_testing/testing/acs/uas_acs.pdf",
      "version": "FAA-S-ACS-10B",
      "sections": [
        "I.B",
        "II.B",
        "V.F"
      ],
      "status": "verified",
      "effective": "April 2021",
      "checked": "2026-11-09",
      "reviewBy": "2026-12-09",
      "rights": "US government document. Original questions, not actual test items."
    },
    "part107": {
      "publisher": "FAA / eCFR",
      "title": "14 CFR Part 107",
      "url": "https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-107",
      "version": "Current online text on check date",
      "sections": [
        "107.15",
        "107.19",
        "107.31",
        "107.33",
        "107.37",
        "107.41",
        "107.49",
        "107.51"
      ],
      "status": "verified",
      "effective": "See document",
      "checked": "2026-11-09",
      "reviewBy": "2026-12-09",
      "rights": "US federal regulations; original practice scenarios."
    }
  },
  "tracks": [
    {
      "id": "security701",
      "code": "Security+ SY0-701",
      "name": "Security foundations",
      "version": "SY0-701, objectives 6.0",
      "status": "partial",
      "notice": "Partial foundation course. Current CompTIA availability and latest objective revision need rechecking. SY0-801 is not represented here. Original practice, not CompTIA exam questions.",
      "gaps": [
        "Threats and vulnerabilities",
        "Architecture",
        "Operations",
        "Governance and risk",
        "Remaining details of objectives 1.1 to 1.4",
        "Performance-based exercises and full exam blueprint"
      ],
      "objectives": [
        "1.1",
        "1.2",
        "1.3",
        "1.4",
        "2.1",
        "2.2",
        "2.3",
        "2.4",
        "2.5",
        "3.1",
        "3.2",
        "3.3",
        "3.4",
        "4.1",
        "4.2",
        "4.3",
        "4.4",
        "4.5",
        "4.6",
        "4.7",
        "4.8",
        "4.9",
        "5.1",
        "5.2",
        "5.3",
        "5.4",
        "5.5",
        "5.6"
      ],
      "topics": [
        {
          "id": "security701_cia",
          "name": "Confidentiality, integrity and availability",
          "objectives": [
            "1.2"
          ],
          "refs": [
            {
              "source": "sec701",
              "section": "1.2"
            },
            {
              "source": "nist12",
              "section": "2"
            }
          ],
          "notes": [
            "Confidentiality limits disclosure to authorized recipients.",
            "Integrity protects against unauthorized change or destruction.",
            "Availability concerns timely, reliable access."
          ],
          "gloss": [
            [
              "Confidentiality",
              "Protection against unauthorized disclosure"
            ],
            [
              "Integrity",
              "Protection against unauthorized alteration"
            ],
            [
              "Availability",
              "Timely and reliable access"
            ],
            [
              "CIA",
              "Confidentiality, integrity and availability"
            ]
          ],
          "lessons": [
            {
              "t": "Confidentiality, integrity and availability",
              "objectives": [
                "1.2"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.2"
                },
                {
                  "source": "nist12",
                  "section": "2"
                }
              ],
              "idea": [
                "Confidentiality limits disclosure to authorized recipients.",
                "Integrity protects against unauthorized change or destruction.",
                "Availability concerns timely, reliable access."
              ],
              "recipe": [
                "Read the scenario and identify the relevant facts.",
                "Apply the principle to this situation.",
                "Explain why the alternatives do not fit."
              ],
              "oops": [
                "Assuming a practice score proves readiness for an official assessment."
              ],
              "eli": "",
              "steps": [
                {
                  "text": "A university portal stores student schedules."
                },
                {
                  "text": "An outsider reads a private schedule: confidentiality is affected."
                },
                {
                  "text": "Someone changes a classroom without permission: integrity is affected."
                },
                {
                  "text": "Students cannot reach the portal: availability is affected."
                }
              ]
            }
          ],
          "bank": [
            {
              "id": "security701_cia_01",
              "q": "An outsider reads a private student record. Which property is directly lost?",
              "c": [
                "Confidentiality",
                "Availability",
                "Processing speed",
                "Redundancy"
              ],
              "why": "The failure is unauthorized disclosure.",
              "objectives": [
                "1.2"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.2"
                },
                {
                  "source": "nist12",
                  "section": "2"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "security701_cia_02",
              "q": "A stored invoice amount is changed without approval. Which property is directly affected?",
              "c": [
                "Integrity",
                "Confidentiality",
                "Capacity",
                "Authentication"
              ],
              "why": "The content has been altered without authorization.",
              "objectives": [
                "1.2"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.2"
                },
                {
                  "source": "nist12",
                  "section": "2"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "security701_cia_03",
              "q": "A service outage prevents authorized customers from checking their accounts. Which goal is directly affected?",
              "c": [
                "Availability",
                "Confidentiality",
                "Non-repudiation",
                "Data classification"
              ],
              "why": "The service cannot be accessed when needed.",
              "objectives": [
                "1.2"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.2"
                },
                {
                  "source": "nist12",
                  "section": "2"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "security701_cia_04",
              "q": "Which scenario primarily illustrates an integrity failure?",
              "c": [
                "An attacker changes a saved bank routing number",
                "An outsider reads a private memo",
                "A power outage takes a site offline",
                "A legitimate user forgets a password"
              ],
              "why": "The stored value was changed without authorization.",
              "objectives": [
                "1.2"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.2"
                },
                {
                  "source": "nist12",
                  "section": "2"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "security701_cia_05",
              "q": "A portal is reachable, but its saved grades have been secretly altered. Which conclusion fits?",
              "c": [
                "Availability alone does not establish integrity",
                "Reachability proves the grades are correct",
                "Only confidentiality can be affected",
                "Integrity and availability mean the same thing"
              ],
              "why": "Being online does not prove that stored values are unmodified.",
              "objectives": [
                "1.2"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.2"
                },
                {
                  "source": "nist12",
                  "section": "2"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "security701_cia_06",
              "q": "A backup restores access after a disk failure. Which CIA goal does restored access support?",
              "c": [
                "Availability",
                "Confidentiality",
                "Authorization",
                "Non-repudiation"
              ],
              "why": "Restoring access supports availability; it does not by itself prove other protections.",
              "objectives": [
                "1.2"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.2"
                },
                {
                  "source": "nist12",
                  "section": "2"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            }
          ]
        },
        {
          "id": "security701_access",
          "name": "Identity, permissions and audit records",
          "objectives": [
            "1.2"
          ],
          "refs": [
            {
              "source": "sec701",
              "section": "1.2"
            },
            {
              "source": "nist12",
              "section": "10.1"
            },
            {
              "source": "nist12",
              "section": "10.3"
            },
            {
              "source": "nist12",
              "section": "10.7"
            }
          ],
          "notes": [
            "Authentication verifies a claimed identity.",
            "Authorization determines permitted actions.",
            "Audit records support accountability.",
            "Use only the privileges needed for assigned work."
          ],
          "gloss": [
            [
              "Authentication",
              "Verification of a claimed identity"
            ],
            [
              "Authorization",
              "Decision about permitted actions"
            ],
            [
              "Accounting",
              "Recording activity for accountability"
            ],
            [
              "Least privilege",
              "Only the access needed for assigned duties"
            ]
          ],
          "lessons": [
            {
              "t": "Identity, permissions and audit records",
              "objectives": [
                "1.2"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.2"
                },
                {
                  "source": "nist12",
                  "section": "10.1"
                },
                {
                  "source": "nist12",
                  "section": "10.3"
                },
                {
                  "source": "nist12",
                  "section": "10.7"
                }
              ],
              "idea": [
                "Authentication verifies a claimed identity.",
                "Authorization determines permitted actions.",
                "Audit records support accountability.",
                "Use only the privileges needed for assigned work."
              ],
              "recipe": [
                "Read the scenario and identify the relevant facts.",
                "Apply the principle to this situation.",
                "Explain why the alternatives do not fit."
              ],
              "oops": [
                "Assuming a practice score proves readiness for an official assessment."
              ],
              "eli": "",
              "steps": [
                {
                  "text": "A staff member signs in to a document service."
                },
                {
                  "text": "The service verifies the identity claim: authentication."
                },
                {
                  "text": "A permission check allows viewing but denies editing: authorization."
                },
                {
                  "text": "An activity record records the action for later review."
                }
              ]
            }
          ],
          "bank": [
            {
              "id": "security701_access_01",
              "q": "A system verifies that a user controls a registered authenticator. Which process is this?",
              "c": [
                "Authentication",
                "Authorization",
                "Availability",
                "Archiving"
              ],
              "why": "The system is checking the identity claim.",
              "objectives": [
                "1.2"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.2"
                },
                {
                  "source": "nist12",
                  "section": "10.1"
                },
                {
                  "source": "nist12",
                  "section": "10.3"
                },
                {
                  "source": "nist12",
                  "section": "10.7"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "security701_access_02",
              "q": "A signed-in user is denied permission to edit a file. Which decision is being enforced?",
              "c": [
                "Authorization",
                "Authentication",
                "Compression",
                "Replication"
              ],
              "why": "Permissions determine allowed actions after sign-in.",
              "objectives": [
                "1.2"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.2"
                },
                {
                  "source": "nist12",
                  "section": "10.1"
                },
                {
                  "source": "nist12",
                  "section": "10.3"
                },
                {
                  "source": "nist12",
                  "section": "10.7"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "security701_access_03",
              "q": "A log records who accessed a file and when. Which AAA function does this support?",
              "c": [
                "Accounting",
                "Authorization",
                "Availability",
                "Encryption"
              ],
              "why": "Accounting records activity for later accountability.",
              "objectives": [
                "1.2"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.2"
                },
                {
                  "source": "nist12",
                  "section": "10.1"
                },
                {
                  "source": "nist12",
                  "section": "10.3"
                },
                {
                  "source": "nist12",
                  "section": "10.7"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "security701_access_04",
              "q": "A temporary intern only needs to read one project folder. Which permission fits least privilege?",
              "c": [
                "Read access to that folder",
                "Administrator access to all servers",
                "Write access to every shared folder",
                "The supervisor's password"
              ],
              "why": "The requested scope matches the assigned work.",
              "objectives": [
                "1.2"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.2"
                },
                {
                  "source": "nist12",
                  "section": "10.1"
                },
                {
                  "source": "nist12",
                  "section": "10.3"
                },
                {
                  "source": "nist12",
                  "section": "10.7"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "security701_access_05",
              "q": "A successful login is followed by a failed permission check. Which statement fits?",
              "c": [
                "A verified identity may still lack permission",
                "Authentication grants every permission",
                "The login must have failed",
                "Audit logging grants access"
              ],
              "why": "Authentication and authorization answer different questions.",
              "objectives": [
                "1.2"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.2"
                },
                {
                  "source": "nist12",
                  "section": "10.1"
                },
                {
                  "source": "nist12",
                  "section": "10.3"
                },
                {
                  "source": "nist12",
                  "section": "10.7"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "security701_access_06",
              "q": "Which evidence best helps trace a file change to an account?",
              "c": [
                "A protected audit record of the change",
                "The screen resolution",
                "The folder icon color",
                "A list of printer models"
              ],
              "why": "Audit records support tracing actions; their protection matters.",
              "objectives": [
                "1.2"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.2"
                },
                {
                  "source": "nist12",
                  "section": "10.1"
                },
                {
                  "source": "nist12",
                  "section": "10.3"
                },
                {
                  "source": "nist12",
                  "section": "10.7"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            }
          ]
        },
        {
          "id": "security701_change",
          "name": "Planning and controlling changes",
          "objectives": [
            "1.3"
          ],
          "refs": [
            {
              "source": "sec701",
              "section": "1.3"
            },
            {
              "source": "nist12",
              "section": "10.5"
            }
          ],
          "notes": [
            "Review security impact before changing a system.",
            "Test changes and obtain appropriate approval.",
            "Prepare a backout plan and update documentation."
          ],
          "gloss": [
            [
              "Impact analysis",
              "Review of likely effects before a change"
            ],
            [
              "Backout plan",
              "Planned return to the previous working state"
            ],
            [
              "Maintenance window",
              "Scheduled period for planned system work"
            ],
            [
              "Version control",
              "Tracking revisions to managed files"
            ]
          ],
          "lessons": [
            {
              "t": "Planning and controlling changes",
              "objectives": [
                "1.3"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.3"
                },
                {
                  "source": "nist12",
                  "section": "10.5"
                }
              ],
              "idea": [
                "Review security impact before changing a system.",
                "Test changes and obtain appropriate approval.",
                "Prepare a backout plan and update documentation."
              ],
              "recipe": [
                "Read the scenario and identify the relevant facts.",
                "Apply the principle to this situation.",
                "Explain why the alternatives do not fit."
              ],
              "oops": [
                "Assuming a practice score proves readiness for an official assessment."
              ],
              "eli": "",
              "steps": [
                {
                  "text": "A team plans a firewall rule change."
                },
                {
                  "text": "Identify dependent services and test expected access."
                },
                {
                  "text": "Obtain approval and prepare the previous configuration for rollback."
                },
                {
                  "text": "After the change, validate behavior and update the recorded configuration."
                }
              ]
            }
          ],
          "bank": [
            {
              "id": "security701_change_01",
              "q": "Before a firewall change, a team checks which services could stop working. What is this?",
              "c": [
                "Impact analysis",
                "Data exfiltration",
                "Password spraying",
                "Key escrow"
              ],
              "why": "It evaluates the expected effects of the planned change.",
              "objectives": [
                "1.3"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.3"
                },
                {
                  "source": "nist12",
                  "section": "10.5"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "security701_change_02",
              "q": "A new configuration breaks an essential service. Which prepared document guides returning to the previous state?",
              "c": [
                "Backout plan",
                "Asset purchase receipt",
                "Password policy alone",
                "Public marketing plan"
              ],
              "why": "A backout plan describes recovery from an unsuccessful change.",
              "objectives": [
                "1.3"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.3"
                },
                {
                  "source": "nist12",
                  "section": "10.5"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "security701_change_03",
              "q": "A tested change is ready. What should happen before its planned deployment under change control?",
              "c": [
                "Obtain the required approval",
                "Skip the change record",
                "Delete the old configuration",
                "Disable all logging"
              ],
              "why": "Approval is part of a managed change process.",
              "objectives": [
                "1.3"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.3"
                },
                {
                  "source": "nist12",
                  "section": "10.5"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "security701_change_04",
              "q": "Why record a firewall configuration change?",
              "c": [
                "So the documented state matches the managed system",
                "So testing becomes unnecessary",
                "So all users gain access",
                "So rollback can never happen"
              ],
              "why": "Accurate records support later operation and review.",
              "objectives": [
                "1.3"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.3"
                },
                {
                  "source": "nist12",
                  "section": "10.5"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "security701_change_05",
              "q": "Which action best tests whether an approved change achieved its intended result?",
              "c": [
                "Validate expected behavior after deployment",
                "Assume approval means success",
                "Erase the test results",
                "Ignore user-reported failures"
              ],
              "why": "Approval alone does not demonstrate that the deployed change works.",
              "objectives": [
                "1.3"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.3"
                },
                {
                  "source": "nist12",
                  "section": "10.5"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "security701_change_06",
              "q": "Why identify application dependencies before a service restart?",
              "c": [
                "To assess effects on connected components",
                "To avoid documenting the restart",
                "To replace user authentication",
                "To make every restart risk-free"
              ],
              "why": "A restart can affect dependent services as well as the changed component.",
              "objectives": [
                "1.3"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.3"
                },
                {
                  "source": "nist12",
                  "section": "10.5"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            }
          ]
        },
        {
          "id": "security701_crypto",
          "name": "Encryption and digital signatures",
          "objectives": [
            "1.4"
          ],
          "refs": [
            {
              "source": "sec701",
              "section": "1.4"
            },
            {
              "source": "nist12",
              "section": "9.1"
            }
          ],
          "notes": [
            "Encryption transforms readable data into ciphertext.",
            "Symmetric encryption uses a shared secret key.",
            "Public-key cryptography uses paired public and private keys.",
            "A digital signature supports integrity and origin authentication. A signature alone does not hide a message."
          ],
          "gloss": [
            [
              "Plaintext",
              "Readable data before encryption"
            ],
            [
              "Ciphertext",
              "Encrypted representation of data"
            ],
            [
              "Symmetric encryption",
              "Encryption using a shared secret key"
            ],
            [
              "Digital signature",
              "Cryptographic evidence supporting origin and integrity"
            ]
          ],
          "lessons": [
            {
              "t": "Encryption and digital signatures",
              "objectives": [
                "1.4"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.4"
                },
                {
                  "source": "nist12",
                  "section": "9.1"
                }
              ],
              "idea": [
                "Encryption transforms readable data into ciphertext.",
                "Symmetric encryption uses a shared secret key.",
                "Public-key cryptography uses paired public and private keys.",
                "A digital signature supports integrity and origin authentication. A signature alone does not hide a message."
              ],
              "recipe": [
                "Read the scenario and identify the relevant facts.",
                "Apply the principle to this situation.",
                "Explain why the alternatives do not fit."
              ],
              "oops": [
                "Assuming a practice score proves readiness for an official assessment."
              ],
              "eli": "",
              "steps": [
                {
                  "text": "A team distributes a signed software release."
                },
                {
                  "text": "The publisher uses its private signing key."
                },
                {
                  "text": "Recipients verify using the corresponding public key."
                },
                {
                  "text": "Verification supports origin and integrity. It does not prove the software is harmless."
                }
              ]
            }
          ],
          "bank": [
            {
              "id": "security701_crypto_01",
              "q": "What is the encrypted representation of readable information called?",
              "c": [
                "Ciphertext",
                "Plaintext",
                "Audit trail",
                "Access list"
              ],
              "why": "Ciphertext is the encrypted representation.",
              "objectives": [
                "1.4"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.4"
                },
                {
                  "source": "nist12",
                  "section": "9.1"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "security701_crypto_02",
              "q": "Which key arrangement describes symmetric encryption?",
              "c": [
                "A shared secret key for encryption and decryption",
                "A public key alone for every operation",
                "No key material",
                "An audit log instead of a key"
              ],
              "why": "Symmetric encryption relies on a shared secret.",
              "objectives": [
                "1.4"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.4"
                },
                {
                  "source": "nist12",
                  "section": "9.1"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "security701_crypto_03",
              "q": "Which key does a publisher protect when producing digital signatures?",
              "c": [
                "Its private signing key",
                "Every recipient's public key",
                "A public website address",
                "The signature itself"
              ],
              "why": "The private signing key must remain under the signer's control.",
              "objectives": [
                "1.4"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.4"
                },
                {
                  "source": "nist12",
                  "section": "9.1"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "security701_crypto_04",
              "q": "Which key verifies a digital signature made with a private signing key?",
              "c": [
                "The corresponding public key",
                "An unrelated private key",
                "A file permission bit",
                "The recipient's password"
              ],
              "why": "Verification uses the public key paired with the signing key.",
              "objectives": [
                "1.4"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.4"
                },
                {
                  "source": "nist12",
                  "section": "9.1"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "security701_crypto_05",
              "q": "A message has a valid signature but is sent in readable form. What is not provided by the signature alone?",
              "c": [
                "Confidentiality",
                "Evidence of origin",
                "Evidence of integrity",
                "Verification against the signing key"
              ],
              "why": "A signature does not itself conceal the message.",
              "objectives": [
                "1.4"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.4"
                },
                {
                  "source": "nist12",
                  "section": "9.1"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "security701_crypto_06",
              "q": "Does a valid software signature alone prove the software has no malicious behavior?",
              "c": [
                "No, it supports origin and integrity, not harmlessness",
                "Yes, every signed file is safe",
                "Yes, if the file is large",
                "Yes, without checking trust in the signing key"
              ],
              "why": "A signature is not a behavioral security assessment.",
              "objectives": [
                "1.4"
              ],
              "refs": [
                {
                  "source": "sec701",
                  "section": "1.4"
                },
                {
                  "source": "nist12",
                  "section": "9.1"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            }
          ]
        }
      ],
      "exam": {
        "mode": "practice",
        "count": 10,
        "minutes": 10
      },
      "checked": "2026-11-09"
    },
    {
      "id": "faa107",
      "code": "FAA Part 107",
      "name": "Remote pilot regulations foundation",
      "version": "UAG / ACS-10B",
      "status": "partial",
      "notice": "Partial UAG preparation. Examples assume ordinary Part 107 operations with no waiver unless stated. TRUST and CAP sUAS qualifications are separate. This app grants no FAA certificate.",
      "gaps": [
        "Full ACS coverage",
        "Sectional chart interpretation and licensed illustrations",
        "Weather reports and forecasting",
        "Loading and performance",
        "Remote ID, night operations and operations over people",
        "Radio procedures, emergency decisions and 60-question blueprint"
      ],
      "objectives": [
        "I.B",
        "II.B",
        "V.F"
      ],
      "topics": [
        {
          "id": "faa107_responsibility",
          "name": "Remote pilot and crew responsibility",
          "objectives": [
            "I.B",
            "V.F"
          ],
          "refs": [
            {
              "source": "faaacs",
              "section": "I.B"
            },
            {
              "source": "part107",
              "section": "107.15"
            },
            {
              "source": "part107",
              "section": "107.19"
            },
            {
              "source": "part107",
              "section": "107.49"
            }
          ],
          "notes": [
            "The remote pilot in command has final operational responsibility.",
            "Check aircraft condition before each flight.",
            "Brief participants and check weather, airspace, hazards, control links and available power."
          ],
          "gloss": [
            [
              "Remote PIC",
              "Remote pilot in command"
            ],
            [
              "Preflight",
              "Checks and preparation before flight"
            ],
            [
              "Control link",
              "Connection used to control the aircraft"
            ],
            [
              "Contingency procedure",
              "Planned response to a possible problem"
            ]
          ],
          "lessons": [
            {
              "t": "Remote pilot and crew responsibility",
              "objectives": [
                "I.B",
                "V.F"
              ],
              "refs": [
                {
                  "source": "faaacs",
                  "section": "I.B"
                },
                {
                  "source": "part107",
                  "section": "107.15"
                },
                {
                  "source": "part107",
                  "section": "107.19"
                },
                {
                  "source": "part107",
                  "section": "107.49"
                }
              ],
              "idea": [
                "The remote pilot in command has final operational responsibility.",
                "Check aircraft condition before each flight.",
                "Brief participants and check weather, airspace, hazards, control links and available power."
              ],
              "recipe": [
                "Read the scenario and identify the relevant facts.",
                "Apply the principle to this situation.",
                "Explain why the alternatives do not fit."
              ],
              "oops": [
                "Assuming a practice score proves readiness for an official assessment."
              ],
              "eli": "",
              "steps": [
                {
                  "text": "A client wants one more aerial photograph."
                },
                {
                  "text": "The crew detects a control-link fault before takeoff."
                },
                {
                  "text": "The remote PIC checks airworthiness and control links rather than accepting client pressure."
                },
                {
                  "text": "A schedule cannot justify operating an unsafe aircraft."
                }
              ]
            }
          ],
          "bank": [
            {
              "id": "faa107_responsibility_01",
              "q": "Who has final authority over the operation of a Part 107 small UAS?",
              "c": [
                "The remote pilot in command",
                "The paying client",
                "The property owner",
                "The newest observer"
              ],
              "why": "Section 107.19 assigns operational authority and responsibility to the remote PIC.",
              "objectives": [
                "I.B",
                "V.F"
              ],
              "refs": [
                {
                  "source": "faaacs",
                  "section": "I.B"
                },
                {
                  "source": "part107",
                  "section": "107.15"
                },
                {
                  "source": "part107",
                  "section": "107.19"
                },
                {
                  "source": "part107",
                  "section": "107.49"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "faa107_responsibility_02",
              "q": "When must the remote PIC check that the aircraft is in a condition for safe operation?",
              "c": [
                "Before each flight",
                "Only after purchase",
                "Only after a crash",
                "Once per calendar year"
              ],
              "why": "Section 107.15 requires a check before each flight.",
              "objectives": [
                "I.B",
                "V.F"
              ],
              "refs": [
                {
                  "source": "faaacs",
                  "section": "I.B"
                },
                {
                  "source": "part107",
                  "section": "107.15"
                },
                {
                  "source": "part107",
                  "section": "107.19"
                },
                {
                  "source": "part107",
                  "section": "107.49"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "faa107_responsibility_03",
              "q": "A preflight control-link check fails. Which action fits the preflight requirement?",
              "c": [
                "Resolve the problem before flying",
                "Launch to test it over a crowd",
                "Ignore it if the camera works",
                "Transfer responsibility to the client"
              ],
              "why": "Section 107.49 requires working control links before flight.",
              "objectives": [
                "I.B",
                "V.F"
              ],
              "refs": [
                {
                  "source": "faaacs",
                  "section": "I.B"
                },
                {
                  "source": "part107",
                  "section": "107.15"
                },
                {
                  "source": "part107",
                  "section": "107.19"
                },
                {
                  "source": "part107",
                  "section": "107.49"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "faa107_responsibility_04",
              "q": "Which briefing belongs before flight?",
              "c": [
                "Roles, hazards and emergency procedures",
                "Only the preferred photo filter",
                "Only the invoice number",
                "Only the pilot's preferred lunch stop"
              ],
              "why": "Section 107.49 includes briefings for participants.",
              "objectives": [
                "I.B",
                "V.F"
              ],
              "refs": [
                {
                  "source": "faaacs",
                  "section": "I.B"
                },
                {
                  "source": "part107",
                  "section": "107.15"
                },
                {
                  "source": "part107",
                  "section": "107.19"
                },
                {
                  "source": "part107",
                  "section": "107.49"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "faa107_responsibility_05",
              "q": "During flight, the crew discovers the aircraft is no longer safe to operate. Which rule applies?",
              "c": [
                "Do not continue the unsafe flight",
                "Continue until the battery is empty",
                "Continue if the client accepts the risk",
                "Continue if it is below 400 feet"
              ],
              "why": "Section 107.15 prohibits continuing when the aircraft is known to be unsafe.",
              "objectives": [
                "I.B",
                "V.F"
              ],
              "refs": [
                {
                  "source": "faaacs",
                  "section": "I.B"
                },
                {
                  "source": "part107",
                  "section": "107.15"
                },
                {
                  "source": "part107",
                  "section": "107.19"
                },
                {
                  "source": "part107",
                  "section": "107.49"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "faa107_responsibility_06",
              "q": "Before a powered aircraft flight, what must the remote PIC verify about available power?",
              "c": [
                "It is enough for the intended operational time",
                "It is exactly half charged",
                "It exceeds yesterday's reading",
                "It can power the camera only"
              ],
              "why": "Section 107.49 addresses sufficient available power for the intended operation.",
              "objectives": [
                "I.B",
                "V.F"
              ],
              "refs": [
                {
                  "source": "faaacs",
                  "section": "I.B"
                },
                {
                  "source": "part107",
                  "section": "107.15"
                },
                {
                  "source": "part107",
                  "section": "107.19"
                },
                {
                  "source": "part107",
                  "section": "107.49"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            }
          ]
        },
        {
          "id": "faa107_airspace",
          "name": "Airspace and collision avoidance",
          "objectives": [
            "I.B",
            "II.B"
          ],
          "refs": [
            {
              "source": "faaacs",
              "section": "II.B"
            },
            {
              "source": "part107",
              "section": "107.31"
            },
            {
              "source": "part107",
              "section": "107.33"
            },
            {
              "source": "part107",
              "section": "107.37"
            },
            {
              "source": "part107",
              "section": "107.41"
            }
          ],
          "notes": [
            "Prior ATC authorization is required in Class B, C and D and airport-designated Class E surface areas.",
            "Small UAS must yield and avoid collision hazards.",
            "Visual observers must maintain effective communication with the crew.",
            "A camera feed alone does not meet the ordinary visual-line-of-sight rule."
          ],
          "gloss": [
            [
              "ATC",
              "Air traffic control"
            ],
            [
              "VLOS",
              "Visual line of sight"
            ],
            [
              "Visual observer",
              "Crew member assisting direct visual observation"
            ],
            [
              "Authorization",
              "Required permission for a specified operation"
            ]
          ],
          "lessons": [
            {
              "t": "Airspace and collision avoidance",
              "objectives": [
                "I.B",
                "II.B"
              ],
              "refs": [
                {
                  "source": "faaacs",
                  "section": "II.B"
                },
                {
                  "source": "part107",
                  "section": "107.31"
                },
                {
                  "source": "part107",
                  "section": "107.33"
                },
                {
                  "source": "part107",
                  "section": "107.37"
                },
                {
                  "source": "part107",
                  "section": "107.41"
                }
              ],
              "idea": [
                "Prior ATC authorization is required in Class B, C and D and airport-designated Class E surface areas.",
                "Small UAS must yield and avoid collision hazards.",
                "Visual observers must maintain effective communication with the crew.",
                "A camera feed alone does not meet the ordinary visual-line-of-sight rule."
              ],
              "recipe": [
                "Read the scenario and identify the relevant facts.",
                "Apply the principle to this situation.",
                "Explain why the alternatives do not fit."
              ],
              "oops": [
                "Assuming a practice score proves readiness for an official assessment."
              ],
              "eli": "",
              "steps": [
                {
                  "text": "A planned flight lies in Class D airspace."
                },
                {
                  "text": "Obtain the required ATC authorization before operating."
                },
                {
                  "text": "Brief how the observer will communicate traffic sightings."
                },
                {
                  "text": "If other aircraft approach, yield and remain well clear."
                }
              ]
            }
          ],
          "bank": [
            {
              "id": "faa107_airspace_01",
              "q": "A standard Part 107 flight is planned in Class D airspace. What is required under 107.41?",
              "c": [
                "Prior ATC authorization",
                "Only landowner approval",
                "Only a camera permit",
                "No permission below 100 feet"
              ],
              "why": "Class D is among the airspace classes covered by 107.41.",
              "objectives": [
                "I.B",
                "II.B"
              ],
              "refs": [
                {
                  "source": "faaacs",
                  "section": "II.B"
                },
                {
                  "source": "part107",
                  "section": "107.31"
                },
                {
                  "source": "part107",
                  "section": "107.33"
                },
                {
                  "source": "part107",
                  "section": "107.37"
                },
                {
                  "source": "part107",
                  "section": "107.41"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "faa107_airspace_02",
              "q": "Which Class E area is specifically named in 107.41?",
              "c": [
                "The airport-designated surface area within its lateral boundaries",
                "Every place where any Class E airspace exists overhead",
                "Only Class E above 18,000 feet",
                "No Class E area"
              ],
              "why": "The rule names the surface area designated for an airport.",
              "objectives": [
                "I.B",
                "II.B"
              ],
              "refs": [
                {
                  "source": "faaacs",
                  "section": "II.B"
                },
                {
                  "source": "part107",
                  "section": "107.31"
                },
                {
                  "source": "part107",
                  "section": "107.33"
                },
                {
                  "source": "part107",
                  "section": "107.37"
                },
                {
                  "source": "part107",
                  "section": "107.41"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "faa107_airspace_03",
              "q": "A crew says its live camera feed replaces direct visual observation on a standard unwaived flight. Is that sufficient?",
              "c": [
                "No, a camera feed alone does not satisfy 107.31",
                "Yes, if the video is high definition",
                "Yes, if the client watches",
                "Yes, if recording is enabled"
              ],
              "why": "The ordinary rule requires the specified ability to see the aircraft without devices other than corrective lenses.",
              "objectives": [
                "I.B",
                "II.B"
              ],
              "refs": [
                {
                  "source": "faaacs",
                  "section": "II.B"
                },
                {
                  "source": "part107",
                  "section": "107.31"
                },
                {
                  "source": "part107",
                  "section": "107.33"
                },
                {
                  "source": "part107",
                  "section": "107.37"
                },
                {
                  "source": "part107",
                  "section": "107.41"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "faa107_airspace_04",
              "q": "What must a visual observer maintain with the remote PIC and person manipulating controls?",
              "c": [
                "Effective communication",
                "A separate paid contract",
                "Identical camera settings",
                "A written message only after landing"
              ],
              "why": "Section 107.33 requires effective communication throughout the operation.",
              "objectives": [
                "I.B",
                "II.B"
              ],
              "refs": [
                {
                  "source": "faaacs",
                  "section": "II.B"
                },
                {
                  "source": "part107",
                  "section": "107.31"
                },
                {
                  "source": "part107",
                  "section": "107.33"
                },
                {
                  "source": "part107",
                  "section": "107.37"
                },
                {
                  "source": "part107",
                  "section": "107.41"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "faa107_airspace_05",
              "q": "A helicopter approaches the operating area. What is the small UAS right-of-way duty?",
              "c": [
                "Give way and remain well clear",
                "Require the helicopter to climb",
                "Pass ahead at the same altitude",
                "Hold course because it is smaller"
              ],
              "why": "Section 107.37 requires the small UAS to yield.",
              "objectives": [
                "I.B",
                "II.B"
              ],
              "refs": [
                {
                  "source": "faaacs",
                  "section": "II.B"
                },
                {
                  "source": "part107",
                  "section": "107.31"
                },
                {
                  "source": "part107",
                  "section": "107.33"
                },
                {
                  "source": "part107",
                  "section": "107.37"
                },
                {
                  "source": "part107",
                  "section": "107.41"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "faa107_airspace_06",
              "q": "Does landowner permission replace required ATC airspace authorization?",
              "c": [
                "No, the airspace requirement still applies",
                "Yes, for all Class B flights",
                "Yes, when the land is private",
                "Yes, if no fee is charged"
              ],
              "why": "Property permission does not replace the separate 107.41 requirement.",
              "objectives": [
                "I.B",
                "II.B"
              ],
              "refs": [
                {
                  "source": "faaacs",
                  "section": "II.B"
                },
                {
                  "source": "part107",
                  "section": "107.31"
                },
                {
                  "source": "part107",
                  "section": "107.33"
                },
                {
                  "source": "part107",
                  "section": "107.37"
                },
                {
                  "source": "part107",
                  "section": "107.41"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            }
          ]
        },
        {
          "id": "faa107_limits",
          "name": "Operating limits and units",
          "objectives": [
            "I.B"
          ],
          "refs": [
            {
              "source": "faaacs",
              "section": "I.B"
            },
            {
              "source": "part107",
              "section": "107.51"
            }
          ],
          "notes": [
            "Without an applicable waiver, groundspeed is limited to 87 knots or 100 mph.",
            "The ordinary altitude limit is 400 feet AGL, with a defined structure exception.",
            "Flight visibility at the control station must be at least 3 statute miles.",
            "Cloud separation is at least 500 feet below and 2,000 feet horizontally."
          ],
          "gloss": [
            [
              "AGL",
              "Above ground level"
            ],
            [
              "Groundspeed",
              "Speed relative to the ground"
            ],
            [
              "Statute mile",
              "Unit used for the flight-visibility requirement"
            ],
            [
              "Cloud clearance",
              "Required separation from clouds"
            ]
          ],
          "lessons": [
            {
              "t": "Operating limits and units",
              "objectives": [
                "I.B"
              ],
              "refs": [
                {
                  "source": "faaacs",
                  "section": "I.B"
                },
                {
                  "source": "part107",
                  "section": "107.51"
                }
              ],
              "idea": [
                "Without an applicable waiver, groundspeed is limited to 87 knots or 100 mph.",
                "The ordinary altitude limit is 400 feet AGL, with a defined structure exception.",
                "Flight visibility at the control station must be at least 3 statute miles.",
                "Cloud separation is at least 500 feet below and 2,000 feet horizontally."
              ],
              "recipe": [
                "Read the scenario and identify the relevant facts.",
                "Apply the principle to this situation.",
                "Explain why the alternatives do not fit."
              ],
              "oops": [
                "Assuming a practice score proves readiness for an official assessment."
              ],
              "eli": "",
              "steps": [
                {
                  "text": "Assume no waiver and no nearby structure exception."
                },
                {
                  "text": "A proposed altitude of 450 feet AGL exceeds the ordinary ceiling."
                },
                {
                  "text": "A 350-foot AGL flight still requires adequate visibility and cloud clearance."
                },
                {
                  "text": "Meeting one limit does not waive the others."
                }
              ]
            }
          ],
          "bank": [
            {
              "id": "faa107_limits_01",
              "q": "For an ordinary unwaived flight away from structures, what is the altitude ceiling?",
              "c": [
                "400 feet AGL",
                "400 feet above sea level",
                "500 feet AGL",
                "2,000 feet AGL"
              ],
              "why": "Section 107.51 uses ground level for the ordinary ceiling.",
              "objectives": [
                "I.B"
              ],
              "refs": [
                {
                  "source": "faaacs",
                  "section": "I.B"
                },
                {
                  "source": "part107",
                  "section": "107.51"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "faa107_limits_02",
              "q": "What is the standard maximum groundspeed under 107.51?",
              "c": [
                "87 knots (100 mph)",
                "100 knots",
                "87 mph",
                "120 mph"
              ],
              "why": "The regulation states 87 knots or 100 miles per hour.",
              "objectives": [
                "I.B"
              ],
              "refs": [
                {
                  "source": "faaacs",
                  "section": "I.B"
                },
                {
                  "source": "part107",
                  "section": "107.51"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "faa107_limits_03",
              "q": "What is the standard minimum flight visibility at the control station?",
              "c": [
                "3 statute miles",
                "1 statute mile",
                "3 nautical miles",
                "5 nautical miles"
              ],
              "why": "Section 107.51 specifies statute miles.",
              "objectives": [
                "I.B"
              ],
              "refs": [
                {
                  "source": "faaacs",
                  "section": "I.B"
                },
                {
                  "source": "part107",
                  "section": "107.51"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "faa107_limits_04",
              "q": "What is the minimum vertical distance below a cloud for an ordinary unwaived flight?",
              "c": [
                "500 feet",
                "100 feet",
                "200 feet",
                "2,000 feet"
              ],
              "why": "The below-cloud requirement is 500 feet.",
              "objectives": [
                "I.B"
              ],
              "refs": [
                {
                  "source": "faaacs",
                  "section": "I.B"
                },
                {
                  "source": "part107",
                  "section": "107.51"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "faa107_limits_05",
              "q": "What is the minimum horizontal cloud distance for an ordinary unwaived flight?",
              "c": [
                "2,000 feet",
                "400 feet",
                "500 feet",
                "1,000 feet"
              ],
              "why": "Horizontal separation is distinct from the below-cloud distance.",
              "objectives": [
                "I.B"
              ],
              "refs": [
                {
                  "source": "faaacs",
                  "section": "I.B"
                },
                {
                  "source": "part107",
                  "section": "107.51"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            },
            {
              "id": "faa107_limits_06",
              "q": "Which pair matches the structure exception in 107.51?",
              "c": [
                "Within 400 feet of a structure and no more than 400 feet above its top",
                "Within 1 mile and 500 feet above its top",
                "Anywhere above a structure at any altitude",
                "Within 400 feet and 2,000 feet above its top"
              ],
              "why": "Both the radius and height limits of the exception apply. Other restrictions still apply.",
              "objectives": [
                "I.B"
              ],
              "refs": [
                {
                  "source": "faaacs",
                  "section": "I.B"
                },
                {
                  "source": "part107",
                  "section": "107.51"
                }
              ],
              "status": "verified",
              "checked": "2026-11-09"
            }
          ]
        }
      ],
      "exam": {
        "mode": "practice",
        "count": 10,
        "minutes": 10
      },
      "checked": "2026-11-09"
    }
  ]
};
