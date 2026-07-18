# Enterprise Data Engineering Showroom — Analytics ETL

A modular, dual-stack repository demonstrating enterprise-grade engineering patterns for high-throughput data pipelines, relational modeling, and historical database accuracy. 

This repository moves past simple data handling to showcase a rigorous, production-ready implementation focused on data isolation, metadata accuracy, and strict test coverage.

---

##  System Architecture Matrix

The system maps a single, high-competency data pipeline layout:

### Project 3: Analytics ETL Pipeline (`src/analytics_etl.py`)
Highlights robust backend data engineering capabilities optimized for analytical processing:
* **Medallion Architecture:** Refines operational streaming data through structured validation passes—moving from **Bronze** (append-only immutable raw landing) to **Silver** (cleaned, cast, and schema-enforced layers) and **Gold** (business-ready dimension layers).
* **Slowly Changing Dimensions (SCD Type 2):** Natively manages time-variant historical traits using explicit transactional windows (`effective_start`, `effective_end`, `is_current`) to guarantee record traceability rather than destructively overwriting data.
* **Point-in-Time (PIT) Correctness:** Enforces absolute relational database consistency when running queries across variable historical user state timestamps.

---

##  Repository File Blueprint

```text
rag-retrieval-evaluation-engine/
├── src/
│   ├── analytics_etl.py          # Production Python ETL Refining Core
│   ├── sync-engine-mvp.tsx       # Medallion & PIT Analytics Presentation Panel
│   ├── App.tsx                   # Main Frontend View Switcher Mount
│   ├── main.tsx                  # React Entry System Mounting Script
│   └── index.css                 # Master Tailwind CSS Engine Styles
├── tests/
│   └── test_analytics_etl.py     # Deterministic PIT History Data Test Vectors
├── package.json                  # Frontend Dependency and Script Blueprint
├── vite.config.ts                # Bundler Asset Compilation Scaffolding
└── README.md                     # Engineering Specification Sheet (This File)