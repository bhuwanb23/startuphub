#!/usr/bin/env python3
"""StartupHub Phase 1 - institutional IIC annual report corpus.

Every record here was extracted from a document the researcher actually opened
and read. Metrics that could not be confirmed from the retrieved text are left
out of `metrics` and recorded in `pending_extraction` instead. Nothing is
inferred from a comparable institution, and nothing is filled in from memory.

Amounts are stored as plain numbers in `metrics` (amount_inr) so the pipeline
never has to parse a currency symbol or a lakh/crore abbreviation. The display
layer is responsible for formatting.
"""

# Evidence tiers. These MUST match the repository-wide standard defined in
# 00_Research_Index/README.md section 3 - not a private scheme. An earlier
# revision of this file invented its own T2="institutional primary" scale; that
# was wrong and is logged as D-016.
TIERS = {
    "T1": "Primary - the origin of the fact. Government publications and official statistics, "
          "official portals, statutes and tenders, official vendor pricing pages, and documents "
          "an institution publishes about itself (its own IIC annual report, its own submitted "
          "NIRF/ARIIA form). Use for market sizing, compliance claims and pricing.",
    "T2": "High-quality secondary - reputable analysis of primary data. Peer-reviewed academic "
          "work, IIM/IIIT research, established consulting, World Bank/OECD. Use for framing and "
          "triangulation, never as the sole support for a number in the pitch.",
    "T3": "Market intelligence - commercially motivated. Tracxn, Crunchbase, Factly/Dataful, "
          "SaaS directories. Never for market size.",
    "T4": "Community - anecdotal. Vendor case studies, vendor blogs, LinkedIn, Reddit, review-site "
          "excerpts. Sentiment and discovery only; never any number.",
}

# What each Phase 1 corpus class maps to under the repository standard.
CORPUS_TIER_MAP = {
    "Institutional_IIC_Reports": "T1",   # institution's own published report
    "ARIIA_NIRF_Forms": "T1",            # institution's own submitted government form
    "Procurement_Tenders": "T1",         # government tender / GeM / e-procure
    "Academic_Literature": "T2",         # peer-reviewed / institutional research
    "Vendor_Case_Studies_T4": "T4",      # vendor marketing
}

# Parse status vocabulary for the corpus tracker.
PARSE_STATUS = {
    "parsed": "Document retrieved and the cited metrics were read directly from its text.",
    "partial": "Document retrieved; some sections read, others still to be extracted.",
    "header_only": "Document located and identified, but KPI tables not yet read.",
    "unparseable": "Retrieved but text could not be extracted (scanned image, corrupt, login-gated).",
    "access_denied": "URL reachable but content is behind auth, paywall, or removed.",
    "not_found": "Cited URL no longer resolves.",
}

# --------------------------------------------------------------------------
# IIC annual report corpus
# --------------------------------------------------------------------------
# year = reporting year of the document (academic year where applicable).
# star_rating = ARIIA/IIC star band awarded to the institution for that year.
# `metrics` holds ONLY values read from the retrieved text.
# --------------------------------------------------------------------------

# The records live in their own module. This one owns the schema and the helpers.
from data_p1_iic_records import IIC_REPORTS  # noqa: E402,F401  (re-exported)


# --------------------------------------------------------------------------
# Cross-corpus derived comparisons. Recomputed, not hand-maintained.
# --------------------------------------------------------------------------

def conversion_rate(institution_id, key="prototype_rate"):
    """Idea -> prototype conversion, computed from whatever is in the corpus."""
    r = _by_id(institution_id)
    m = r.get("metrics", {})
    ideas = m.get("ideas_generated")
    protos = m.get("prototypes_developed")
    if not ideas or protos is None or ideas == 0:
        return None
    return round(100.0 * protos / ideas, 1)


def grant_to_awareness_ratio(institution_id):
    """How many rupees of support per rupee of awareness spend.

    Returns None where either leg is missing. A high number is not automatically
    good - it can equally mean awareness spend was neglected.
    """
    r = _by_id(institution_id)
    m = r.get("metrics", {})
    aware = m.get("amount_inr")
    grant = m.get("grant_total_inr")
    if not aware or grant is None or aware == 0:
        return None
    return round(float(grant) / float(aware), 1)


def _by_id(rid):
    for r in IIC_REPORTS:
        if r["id"] == rid:
            return r
    raise KeyError(rid)


CORPUS_STATS = lambda: dict(  # noqa: E731 - tiny helper, kept inline for readability
    documents=len(IIC_REPORTS),
    parsed=len([r for r in IIC_REPORTS if r["parse_status"] == "parsed"]),
    partial=len([r for r in IIC_REPORTS if r["parse_status"] == "partial"]),
    header_only=len([r for r in IIC_REPORTS if r["parse_status"] == "header_only"]),
    with_any_amount=len([r for r in IIC_REPORTS
                         if r.get("metrics", {}).get("amount_inr")]),
    with_grant_split=len([r for r in IIC_REPORTS
                          if r.get("metrics", {}).get("grant_total_inr")]),
    named_iic_id=len([r for r in IIC_REPORTS if r.get("iic_id")]),
    with_star_rating=len([r for r in IIC_REPORTS if r.get("star_rating")]),
    target_documents=40,
)
