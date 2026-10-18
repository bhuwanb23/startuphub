import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import data_p1_iic as d

s = d.CORPUS_STATS()
print("=== CORPUS ===")
for k, v in s.items():
    print("  %-22s %s" % (k, v))

print()
print("=== idea -> prototype conversion ===")
rows = []
for r in d.IIC_REPORTS:
    c = d.conversion_rate(r["id"])
    if c is not None:
        rows.append((c, r["short_name"], r["year"]))
for c, n, y in sorted(rows):
    print("  %7.1f%%  %s (%s)" % (c, n, y))

print()
print("=== grant / awareness ===")
for r in d.IIC_REPORTS:
    g = d.grant_to_awareness_ratio(r["id"])
    if g is not None:
        print("  %6.1fx  %s" % (g, r["short_name"]))

print()
print("=== contradictions / self-inconsistency ===")
for r in d.IIC_REPORTS:
    note = r.get("metrics_note") or ""
    if r.get("contradiction_of") or "CONTRADICT" in note:
        print("  %-9s %-28s -> %s" % (r["id"], r["short_name"], r.get("contradiction_of") or "SELF"))

print()
print("=== institutions with no outcome data at all ===")
for r in d.IIC_REPORTS:
    m = r.get("metrics", {})
    if m.get("ips_total") is None and m.get("startups_total") is None and r["parse_status"] == "parsed":
        print("  %-9s %-28s activities=%s spend=%s" % (
            r["id"], r["short_name"], m.get("activities_total"), m.get("amount_inr")))

print()
print("=== missing-value vocabulary ===")
for r in d.IIC_REPORTS:
    m = r.get("metrics", {})
    blanks = [k for k in ("amount_inr", "grant_total_inr") if m.get(k) is None]
    if blanks and r["parse_status"] == "parsed":
        print("  %-9s %-28s blank: %s" % (r["id"], r["short_name"], ", ".join(blanks)))
