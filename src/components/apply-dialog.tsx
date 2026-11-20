import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { APPLY_URL } from "@/lib/apply";
import { track } from "@/lib/track";

// "Подать заявку" never goes straight to Telegram: first a short note on what the application has to be.
// Wrap the button that should open it: <ApplyDialog><button>…</button></ApplyDialog>
export function ApplyDialog({ children }: { children: ReactNode }) {
  return (
    <Dialog onOpenChange={(open) => open && track("apply_open")}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl border-[#1a1612]/15 bg-[#f3ece1] p-6 text-[#1a1612] sm:p-8">
        <DialogTitle className="font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
          Заявка – видеосообщением
        </DialogTitle>
        <DialogDescription asChild>
          <div className="space-y-3 text-[15px] leading-relaxed text-[#1a1612]/80 sm:text-base">
            <p>Заявку можно отправить только видеосообщением в Telegram.</p>
            <div className="space-y-1">
              <p>Расскажи в нем:</p>
              <p>или: какой проект хочешь запустить и что уже сделал(-а) для этого</p>
              <p>или: в команду какого проекта хотел(-а) бы попасть и в какой роли</p>
              <p>или: кто ты, каких людей ищешь и для чего</p>
            </div>
            <p>От этого зависит, пригласят ли тебя на встречу.</p>
          </div>
        </DialogDescription>
        <a
          href={APPLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("apply_click")}
          className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#1a1612] px-8 text-base font-bold text-[#f3ece1] transition-colors hover:bg-black"
        >
          Подать заявку <ArrowRight aria-hidden="true" className="size-4" />
        </a>
      </DialogContent>
    </Dialog>
  );
}
