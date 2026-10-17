import { Quote } from "lucide-react";
import { Card } from "@/components/app/widgets";

const quotes = [
  { by: "Ravi Sharma · Lumen AI", text: "Priya is the rare mentor whose suggestions carry production scars behind them. We don't follow her blindly — we follow her because she's been at our exact scale wall before." },
  { by: "Daniel Mathew · OrbitalWorks", text: "In one 45-minute call she killed a 6-week architectural investment we'd over-committed. Best deletion we ever made." },
  { by: "Ishaan Verma · GridSense", text: "Honest, direct, never panics. When runway was 3 months, she treated it like a systems problem — not a death sentence." },
];

export function MentorRatings() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {quotes.map((q) => (
        <Card key={q.by}>
          <Quote className="h-4 w-4 text-accent/30" />
          <blockquote className="mt-3 text-[13px] leading-relaxed text-slate-600">“{q.text}”</blockquote>
          <p className="mt-4 text-[11.5px] font-semibold text-slate-400">— {q.by}</p>
        </Card>
      ))}
    </div>
  );
}
