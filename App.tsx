import { useState, useEffect, useRef } from "react";
import "./index.css";

// ============================================================
// CONFIGURE YOUR OFFERS HERE
// ============================================================
const OFFERS: { title: string; description: string; imageUrl: string; url: string }[] = [
  {
    title: "Download & Play FreeCash",
    description: "Download + install the app",
    imageUrl: "https://freecash.com/favicon.ico",
    url: "https://rainawards.com/r/eyJ0IjoiZnJlZWNhc2gtY3BpIiwidSI6IjY4Nzk4ZjVmNjEwYzJiN2YyOTlhYmFmMSIsInRzIjoxNzczOTkwMDEzNTIwfQ",
  },
  {
    title: "FreeCash Bonus Offer",
    description: "Complete with valid information",
    imageUrl: "https://freecash.com/favicon.ico",
    url: "https://rainawards.com/r/eyJ0IjoiZnJlZWNhc2gtY3BpLWIiLCJ1IjoiNjg3OThmNWY2MTBjMmI3ZjI5OWFiYWYxIiwidHMiOjE3NzM5OTAwMTM1MjB9",
  },
  {
    title: "Complete the Quester Survey",
    description: "Complete the survey",
    imageUrl: "https://www.google.com/s2/favicons?sz=64&domain=quester.io",
    url: "https://rainawards.com/r/eyJ0IjoicXVlc3RlciIsInUiOiI2ODc5OGY1ZjYxMGMyYjdmMjk5YWJhZjEiLCJ0cyI6MTc3Mzk5MDAxMzUyMH0",
  },
  {
    title: "Join Playful Rewards",
    description: "Sign up and complete the offer",
    imageUrl: "https://www.google.com/s2/favicons?sz=64&domain=playfulrewards.com",
    url: "https://rainawards.com/r/eyJ0IjoicGxheWZ1bC1yZXdhcmRzLXJldnNoYXJlIiwidSI6IjY4Nzk4ZjVmNjEwYzJiN2YyOTlhYmFmMSIsInRzIjoxNzc0MTYyOTc5MDI1LCJ0aWt0b2siOjB9",
  },
];

const MIN_SECONDS = 30 * 60;
const MAX_SECONDS = 30 * 60;
const REQUIRED_OFFERS = 3;
const STORAGE_KEY = "robux_offer_state";
// ============================================================

interface OfferState {
  clickedAt: number | null;
  requiredMs: number;
  completed: boolean;
}

function randomDuration() {
  return (MIN_SECONDS + Math.floor(Math.random() * (MAX_SECONDS - MIN_SECONDS))) * 1000;
}

function formatTime(ms: number) {
  const totalSec = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function loadState(count: number): OfferState[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length === count) return parsed;
    }
  } catch {}
  return Array.from({ length: count }, () => ({
    clickedAt: null,
    requiredMs: randomDuration(),
    completed: false,
  }));
}

function saveState(state: OfferState[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ── Redeem Page ──────────────────────────────────────────────
function RedeemPage({ onRedeem }: { onRedeem: (username: string) => void }) {
  const [code, setCode] = useState("");
  const [username, setUsername] = useState("");
  const [codeError, setCodeError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code !== "ROBUXMEDIA") {
      setCodeError("Invalid code. Please enter ROBUXMEDIA.");
      return;
    }
    if (!username.trim()) return;
    onRedeem(username.trim());
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#080c18] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-900/20 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm px-4 flex flex-col items-center gap-6">
        <div className="w-full bg-green-700 rounded-md px-4 py-3 flex items-center gap-3">
          <span className="text-xl">🎁</span>
          <div>
            <p className="text-white text-sm font-medium">
              25,000 Robux Code: <span className="font-bold">ROBUXMEDIA</span>
            </p>
            <p className="text-green-200 text-xs mt-0.5">
              Only <span className="font-bold text-white">11</span> codes remaining.
            </p>
          </div>
        </div>

        <h1 className="text-white text-5xl font-bold tracking-tight">redeem</h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <div className="w-full">
            <input
              type="text"
              placeholder="Code"
              value={code}
              onChange={(e) => { setCode(e.target.value); setCodeError(""); }}
              className="w-full bg-[#0a0d1a] border border-[#2a2d40] text-white placeholder-gray-500 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
            {codeError && <p className="text-red-400 text-xs mt-1">{codeError}</p>}
          </div>

          <input
            type="text"
            placeholder="Roblox Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full bg-[#0a0d1a] border border-[#2a2d40] text-white placeholder-gray-500 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />

          <button
            type="submit"
            className="w-full bg-[#5b3cdd] hover:bg-[#6e4ef0] active:bg-[#4a2fc9] text-white font-semibold rounded-md px-4 py-3 text-sm transition-colors cursor-pointer"
          >
            Redeem
          </button>
        </form>

        <div className="flex items-center gap-5 mt-2">
          <a
            href="https://x.com/extvify"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="X (Twitter)"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Processing / Offerwall Page ──────────────────────────────
function ProcessingPage({ username }: { username: string }) {
  const [offerStates, setOfferStates] = useState<OfferState[]>(() =>
    loadState(OFFERS.length)
  );
  const [now, setNow] = useState(Date.now());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setNow(Date.now());
      setOfferStates((prev) => {
        const updated = prev.map((s) => {
          if (!s.completed && s.clickedAt !== null) {
            if (Date.now() - s.clickedAt >= s.requiredMs) {
              return { ...s, completed: true };
            }
          }
          return s;
        });
        const changed = updated.some((s, i) => s.completed !== prev[i].completed);
        if (changed) { saveState(updated); return updated; }
        return prev;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        setOfferStates((prev) => {
          const updated = prev.map((s) => {
            if (!s.completed && s.clickedAt !== null && Date.now() - s.clickedAt >= s.requiredMs) {
              return { ...s, completed: true };
            }
            return s;
          });
          saveState(updated);
          return updated;
        });
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  function handleStart(index: number) {
    const updated = offerStates.map((s, i) => {
      if (i === index && s.clickedAt === null && !s.completed) {
        return { ...s, clickedAt: Date.now(), requiredMs: randomDuration() };
      }
      return s;
    });
    setOfferStates(updated);
    saveState(updated);
    window.open(OFFERS[index].url, "_blank", "noopener,noreferrer");
  }

  const completedCount = offerStates.filter((s) => s.completed).length;
  const progressPct = Math.min((completedCount / REQUIRED_OFFERS) * 100, 100);

  return (
    <div className="min-h-screen bg-[#080c18] flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-purple-900/15 blur-[120px]" />
      </div>

      <div className="offerwall-container relative z-10 w-full max-w-2xl bg-[#0f1220] border border-[#1e2240] rounded-2xl overflow-hidden shadow-2xl">
        <div className="offerwall-header px-6 pt-7 pb-4 text-center border-b border-[#1e2240]">
          <h1 className="text-2xl font-bold text-white mb-2">🎉 You're Almost Done! 🎉</h1>
          <p className="text-gray-400 text-sm">
            Your code is valid! Complete {REQUIRED_OFFERS} of our sponsor activities below to instantly receive{" "}
            <span className="text-white font-semibold">25,000 ROBUX!</span>
          </p>
        </div>

        <div className="px-6 py-4 border-b border-[#1e2240]">
          <div className="progress-container w-full bg-[#1a1f35] rounded-full h-2 mb-2 overflow-hidden">
            <div
              className="progress-bar bg-green-500 h-2 rounded-full transition-all duration-700"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-center text-gray-400 text-xs">
            {completedCount}/{REQUIRED_OFFERS} offers completed
          </p>
        </div>

        <div className="offer-list divide-y divide-[#1e2240]">
          {OFFERS.map((offer, i) => {
            const state = offerStates[i];
            const isCompleted = state?.completed ?? false;
            const isClicked = !isCompleted && (state?.clickedAt ?? null) !== null;

            let offerPct = 0;
            if (isCompleted) {
              offerPct = 100;
            } else if (isClicked && state.clickedAt) {
              const elapsed = now - state.clickedAt;
              offerPct = Math.min(25 + (elapsed / state.requiredMs) * 75, 99);
            }

            const remaining = isClicked && state.clickedAt
              ? state.requiredMs - (now - state.clickedAt)
              : null;

            return (
              <div key={i} className="offer-item px-6 py-4 hover:bg-[#131628] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#1a1f35] flex-shrink-0 flex items-center justify-center">
                    {offer.imageUrl ? (
                      <img src={offer.imageUrl} alt={offer.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-600 text-xs text-center px-1">IMG</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="offer-name text-white font-semibold text-sm leading-snug">{offer.title}</p>
                    <p className="offer-description text-gray-400 text-xs mt-0.5">{offer.description}</p>
                  </div>

                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <span className="flex items-center gap-1.5 text-green-400 font-semibold text-sm px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        Complete
                      </span>
                    ) : isClicked ? (
                      <button
                        onClick={() => window.open(offer.url, "_blank", "noopener,noreferrer")}
                        className="offer-button bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-bold px-5 py-2 rounded-lg transition-colors"
                      >
                        Reopen
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStart(i)}
                        className="start-button bg-green-500 hover:bg-green-400 active:bg-green-600 text-white text-sm font-bold px-5 py-2 rounded-lg transition-colors"
                      >
                        Start
                      </button>
                    )}
                  </div>
                </div>

                {(isClicked || isCompleted) && (
                  <div className="mt-3 pl-[4.5rem]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">
                        {isCompleted
                          ? "Offer verified"
                          : remaining !== null && remaining > 0
                          ? `Verifying... ${formatTime(remaining)} remaining`
                          : "Finalizing..."}
                      </span>
                      <span className={`text-xs font-semibold ${isCompleted ? "text-green-400" : "text-yellow-400"}`}>
                        {Math.round(offerPct)}%
                      </span>
                    </div>
                    <div className="w-full bg-[#1a1f35] rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-1000 ${isCompleted ? "bg-green-500" : "bg-yellow-400"}`}
                        style={{ width: `${offerPct}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="px-6 py-4 text-center border-t border-[#1e2240]">
          <p className="text-gray-600 text-xs">
            Robux will be sent to <span className="text-gray-400">{username}</span> after completing {REQUIRED_OFFERS} offers.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Root App ─────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<"redeem" | "processing">("redeem");
  const [username, setUsername] = useState("");

  function handleRedeem(user: string) {
    setUsername(user);
    setPage("processing");
  }

  if (page === "processing") {
    return <ProcessingPage username={username} />;
  }
  return <RedeemPage onRedeem={handleRedeem} />;
}
