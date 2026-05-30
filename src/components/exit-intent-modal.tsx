"use client";

import { useEffect, useRef, useState } from "react";
import { useExitIntent } from "@/hooks/useExitIntent";

const COUNTDOWN_SECONDS = 15 * 60;
const DISCOUNT_CODE = "HERO10";

function formatTime(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

export function ExitIntentModal() {
  const { triggered, dismiss } = useExitIntent();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [seconds, setSeconds] = useState(COUNTDOWN_SECONDS);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start/stop countdown based on visibility
  useEffect(() => {
    if (!triggered) return;
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          dismiss();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [triggered]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Podaj poprawny adres email.");
      return;
    }
    setError("");
    // TODO: integrate with ESP (Mailchimp / Klaviyo)
    console.log({ email, timestamp: new Date().toISOString() });
    setSubmitted(true);
    setTimeout(() => dismiss(), 3000);
  }

  if (!triggered) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={dismiss}
    >
      <div
        className="relative bg-white w-full max-w-md mx-4 p-8 rounded-sm shadow-2xl"
        style={{ animation: "exitModalIn 200ms ease-out both" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={dismiss}
          aria-label="Zamknij"
          className="absolute top-4 right-4 text-warm-gray hover:text-charcoal text-xl leading-none"
        >
          ✕
        </button>

        {/* Label */}
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-warm-gray mb-2">
          Tylko teraz
        </p>

        {/* Headline */}
        <h2 className="text-2xl font-medium text-charcoal mb-2 leading-tight">
          -10% na pierwsze zamówienie
        </h2>

        {/* Subtext */}
        <p className="text-[13px] text-warm-gray mb-5">
          Zostaw email — wyślemy kod w ciągu minuty.
        </p>

        {/* Countdown */}
        <div className="text-center mb-6">
          <span className="text-3xl font-medium tabular-nums text-charcoal">
            {formatTime(seconds)}
          </span>
        </div>

        {submitted ? (
          <div className="text-center py-4">
            <p className="text-[14px] font-medium text-charcoal mb-1">Sprawdź skrzynkę!</p>
            <p className="text-[13px] text-warm-gray">
              Kod: <span className="font-semibold text-charcoal">{DISCOUNT_CODE}</span>
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="twoj@email.pl"
                  className="w-full border border-[#EBEBEB] px-4 py-3 text-[13px] outline-none focus:border-charcoal transition-colors"
                  autoFocus
                />
                {error && (
                  <p className="text-[11px] text-red-600 mt-1">{error}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-charcoal text-white text-[12px] font-medium uppercase tracking-[0.6px] hover:bg-charcoal/90 transition-colors"
              >
                Odbierz rabat
              </button>
            </form>

            <button
              onClick={dismiss}
              className="mt-4 w-full text-center text-[11px] text-warm-gray hover:text-charcoal transition-colors underline underline-offset-2"
            >
              Nie, dziękuję — płacę pełną cenę
            </button>
          </>
        )}
      </div>

      <style>{`
        @keyframes exitModalIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
