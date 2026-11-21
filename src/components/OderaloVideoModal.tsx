import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const SRC = {
  pc: { video: "/video/oderalo-pc.mp4", poster: "/video/oderalo-pc-poster.jpg" },
  movil: { video: "/video/oderalo-movil.mp4", poster: "/video/oderalo-movil-poster.jpg" },
};

/** Vídeo de Oderalo en una ventana: horizontal en pantallas grandes y vertical en móvil.
 *  No descarga nada hasta que se abre (el vídeo solo existe en el DOM con la ventana abierta). */
export function OderaloVideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { tr } = useLanguage();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [vertical, setVertical] = useState(false);

  useEffect(() => {
    if (!open) return;
    setVertical(window.matchMedia("(max-width: 767px)").matches);
    const previous = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;
  const src = vertical ? SRC.movil : SRC.pc;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={tr("Vídeo de Oderalo")}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#09090B] p-6 sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[min(1280px,calc((100vh_-_7rem)*1.7778))] rounded-[22px] border-[3px] border-white bg-[#09090B] p-2 shadow-[6px_6px_0_#6D28D9] sm:p-3 sm:shadow-[10px_10px_0_#6D28D9]"
        style={
          vertical ? { maxWidth: "min(calc(100vw - 4rem), calc((100vh - 7rem) * 0.8))" } : undefined
        }
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={tr("Cerrar vídeo")}
          className="absolute -top-3 -right-3 z-10 sm:-top-4 sm:-right-4 inline-flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-[#09090B] bg-white text-[#09090B] shadow-[3px_3px_0_#6D28D9] focus-visible:ring-[3px] focus-visible:ring-[#A78BFA] focus-visible:outline-none transition-transform hover:scale-105 hover:bg-[#F4F4F5]"
        >
          <X size={20} strokeWidth={3} />
        </button>
        <video
          key={src.video}
          src={src.video}
          poster={src.poster}
          controls
          autoPlay
          playsInline
          preload="auto"
          className={`block w-full rounded-xl bg-black ${vertical ? "aspect-[4/5]" : "aspect-video"}`}
        />
      </div>
    </div>
  );
}
