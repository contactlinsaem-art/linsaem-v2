import { Plus } from "lucide-react";
import type { QuestionReponse } from "@/content/faq";

/**
 * FAQ en <details>/<summary> : état ouvert/fermé annoncé nativement par les lecteurs d'écran,
 * utilisable au clavier, lisible sans JavaScript, réponses présentes dans le HTML.
 */
export function FaqList({ questions }: { questions: QuestionReponse[] }) {
  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {questions.map((q) => (
        <details key={q.question} className="group px-6 py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
            <h3 className="text-base sm:text-lg">{q.question}</h3>
            <Plus
              aria-hidden="true"
              size={20}
              className="shrink-0 text-accent transition-transform group-open:rotate-45"
            />
          </summary>
          <p className="mt-3 leading-relaxed text-slate-700">{q.reponse}</p>
        </details>
      ))}
    </div>
  );
}
