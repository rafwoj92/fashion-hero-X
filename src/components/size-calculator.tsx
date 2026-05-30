"use client";

import { useState } from "react";
import type { SizeChartCategory } from "@/data/sizeCharts";
import {
  sneakersChart,
  clothingTopChart,
  clothingBottomChart,
  findSneakerRow,
  findClothingRow,
} from "@/data/sizeCharts";

interface SizeCalculatorProps {
  category: SizeChartCategory;
  availableSizes: number[];
  onSizeSelect: (size: number) => void;
}

type SneakerMode = "know" | "measure";

function SneakersCalculator({
  availableSizes,
  onSizeSelect,
  onClose,
}: {
  availableSizes: number[];
  onSizeSelect: (size: number) => void;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<SneakerMode>("measure");
  const [cm, setCm] = useState("");

  const cmNum = parseFloat(cm);
  const row = !isNaN(cmNum) && cm !== "" ? findSneakerRow(cmNum) : null;
  const outOfRange =
    !isNaN(cmNum) &&
    cm !== "" &&
    row === null &&
    cmNum >= sneakersChart[0].cmRange[0];

  // Find the closest matching US size in the product's available sizes
  const matchedSize = row
    ? availableSizes.find((s) => s === row.US_M) ??
      availableSizes.find((s) => s === Math.round(row.US_M)) ??
      null
    : null;

  return (
    <div className="flex flex-col gap-4">
      {/* Mode toggle */}
      <div className="flex gap-4">
        {(["measure", "know"] as SneakerMode[]).map((m) => (
          <label key={m} className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="sneaker-mode"
              checked={mode === m}
              onChange={() => { setMode(m); setCm(""); }}
              className="accent-charcoal"
            />
            <span className="text-[12px]">
              {m === "measure"
                ? "Chcę dobrać po długości stopy"
                : "Znam rozmiar EU"}
            </span>
          </label>
        ))}
      </div>

      {mode === "know" && (
        <p className="text-[12px] text-warm-gray">
          Skorzystaj bezpośrednio z selectorów rozmiaru powyżej.
        </p>
      )}

      {mode === "measure" && (
        <>
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-warm-gray mb-1.5">
              Długość stopy (cm)
            </label>
            <input
              type="number"
              min={sneakersChart[0].cmRange[0]}
              max={sneakersChart[sneakersChart.length - 1].cmRange[1]}
              step={0.5}
              value={cm}
              onChange={(e) => setCm(e.target.value)}
              placeholder="np. 26.5"
              className="w-32 border border-[#EBEBEB] px-3 py-2 text-[13px] outline-none focus:border-charcoal transition-colors"
            />
          </div>

          {outOfRange && (
            <p className="text-[12px] text-warm-gray">
              Rozmiar spoza zakresu tabeli.{" "}
              <a
                href="mailto:hello@fashionhero.pl"
                className="underline hover:text-charcoal"
              >
                Skontaktuj się z nami
              </a>
            </p>
          )}

          {row && (
            <div className="bg-[#F8F8F6] p-4 rounded-sm">
              <p className="text-[13px] font-semibold text-charcoal mb-0.5">
                Twój rozmiar: EU {row.EU}{" "}
                <span className="font-normal text-warm-gray">
                  (UK {row.UK} / US {row.US_M})
                </span>
              </p>
              {matchedSize !== null ? (
                <button
                  onClick={() => {
                    onSizeSelect(matchedSize);
                    onClose();
                  }}
                  className="mt-3 px-4 py-2 bg-charcoal text-white text-[11px] font-medium uppercase tracking-[0.5px] hover:bg-charcoal/90 transition-colors rounded-sm"
                >
                  Wybierz EU {row.EU}
                </button>
              ) : (
                <p className="text-[12px] text-warm-gray mt-2">
                  Ten rozmiar jest niedostępny w tym produkcie.
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ClothingCalculator({
  category,
  availableSizes,
  onSizeSelect,
  onClose,
}: {
  category: "clothing_top" | "clothing_bottom";
  availableSizes: number[];
  onSizeSelect: (size: number) => void;
  onClose: () => void;
}) {
  const [cm, setCm] = useState("");
  const chart =
    category === "clothing_top" ? clothingTopChart : clothingBottomChart;
  const measureLabel =
    category === "clothing_top" ? "Obwód klatki piersiowej (cm)" : "Obwód talii (cm)";

  const cmNum = parseFloat(cm);
  const row = !isNaN(cmNum) && cm !== "" ? findClothingRow(chart, cmNum) : null;
  const outOfRange =
    !isNaN(cmNum) && cm !== "" && row === null && cmNum >= chart[0].measureRange[0];

  const matchedSize = row
    ? availableSizes.find((s) => s === row.productSizeValue) ?? null
    : null;

  const nextSmaller =
    row && chart.indexOf(row) > 0
      ? chart[chart.indexOf(row) - 1].label
      : null;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-[11px] uppercase tracking-wider text-warm-gray mb-1.5">
          {measureLabel}
        </label>
        <input
          type="number"
          min={chart[0].measureRange[0]}
          max={chart[chart.length - 1].measureRange[1]}
          step={1}
          value={cm}
          onChange={(e) => setCm(e.target.value)}
          placeholder="np. 88"
          className="w-32 border border-[#EBEBEB] px-3 py-2 text-[13px] outline-none focus:border-charcoal transition-colors"
        />
      </div>

      {outOfRange && (
        <p className="text-[12px] text-warm-gray">
          Rozmiar spoza zakresu tabeli.{" "}
          <a
            href="mailto:hello@fashionhero.pl"
            className="underline hover:text-charcoal"
          >
            Skontaktuj się z nami
          </a>
        </p>
      )}

      {row && (
        <div className="bg-[#F8F8F6] p-4 rounded-sm">
          <p className="text-[13px] font-semibold text-charcoal mb-0.5">
            Twój rozmiar: {row.label}
            {nextSmaller && (
              <span className="font-normal text-warm-gray text-[12px]">
                {" "}— pasuje Ci też {nextSmaller} jeśli lubisz dopasowany krój
              </span>
            )}
          </p>
          {matchedSize !== null ? (
            <button
              onClick={() => {
                onSizeSelect(matchedSize);
                onClose();
              }}
              className="mt-3 px-4 py-2 bg-charcoal text-white text-[11px] font-medium uppercase tracking-[0.5px] hover:bg-charcoal/90 transition-colors rounded-sm"
            >
              Wybierz {row.label}
            </button>
          ) : (
            <p className="text-[12px] text-warm-gray mt-2">
              Ten rozmiar jest niedostępny w tym produkcie.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function SizeCalculator({
  category,
  availableSizes,
  onSizeSelect,
}: SizeCalculatorProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="text-[12px] text-warm-gray underline underline-offset-2 hover:text-charcoal transition-colors"
      >
        {open ? "Schowaj kalkulator ↑" : "Dobierz rozmiar →"}
      </button>

      {open && (
        <div className="mt-4 border border-[#EBEBEB] p-4 rounded-sm">
          <p className="text-[11px] uppercase tracking-wider font-medium text-charcoal mb-4">
            Kalkulator rozmiaru
          </p>
          {category === "sneakers" && (
            <SneakersCalculator
              availableSizes={availableSizes}
              onSizeSelect={onSizeSelect}
              onClose={() => setOpen(false)}
            />
          )}
          {(category === "clothing_top" || category === "clothing_bottom") && (
            <ClothingCalculator
              category={category}
              availableSizes={availableSizes}
              onSizeSelect={onSizeSelect}
              onClose={() => setOpen(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}
