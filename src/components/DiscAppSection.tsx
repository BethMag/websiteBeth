import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  Compass,
  Maximize2,
  Minimize2,
  Minus,
  Plus,
  RotateCcw,
  Sliders,
  Users,
} from 'lucide-react';
import { DISC_STYLES, DiscKey, TEAM_PRESETS } from '../data/siteContent';
import { PWAInstallButton } from './PWAInstallButton';

interface DiscAppSectionProps {
  onApplyScope: (scopeSummary: string, teamSize: number) => void;
  isFocusMode: boolean;
  onToggleFocusMode: () => void;
}

type AppTab = 'styles' | 'team-map' | 'scope-builder';

const DISC_KEYS: DiscKey[] = ['D', 'i', 'S', 'C'];

export const DiscAppSection: React.FC<DiscAppSectionProps> = ({
  onApplyScope,
  isFocusMode,
  onToggleFocusMode,
}) => {
  const [activeTab, setActiveTab] = useState<AppTab>('styles');
  const [selectedStyle, setSelectedStyle] = useState<DiscKey>('S');

  // Team Map Simulator state
  const [teamCounts, setTeamCounts] = useState<Record<DiscKey, number>>({
    D: 3,
    i: 3,
    S: 1,
    C: 4,
  });
  const [activePresetId, setActivePresetId] = useState<string>('product-launch');

  // Scope Builder state
  const [scopeSize, setScopeSize] = useState<number>(12);
  const [scopeFormat, setScopeFormat] = useState<'In-Person' | 'Virtual' | 'Hybrid'>('In-Person');
  const [scopeGoal, setScopeGoal] = useState<
    'Communication & Trust' | 'New Team / Fast-Forming' | 'Leadership Alignment' | 'Navigating Change'
  >('Communication & Trust');

  const styleInfo = DISC_STYLES[selectedStyle];

  const totalMembers = useMemo(
    () => teamCounts.D + teamCounts.i + teamCounts.S + teamCounts.C,
    [teamCounts]
  );

  const adjustCount = (key: DiscKey, delta: number) => {
    setActivePresetId('custom');
    setTeamCounts((prev) => ({
      ...prev,
      [key]: Math.max(0, Math.min(20, prev[key] + delta)),
    }));
  };

  const applyPreset = (presetId: string) => {
    const found = TEAM_PRESETS.find((p) => p.id === presetId);
    if (!found) return;
    setActivePresetId(found.id);
    setTeamCounts({ ...found.counts });
  };

  const teamAnalysis = useMemo(() => {
    if (totalMembers === 0) {
      return {
        dominant: 'None yet',
        strength: 'Add at least one team member to view live team dynamics.',
        blindSpot: 'No team distribution selected.',
        recommendation: 'Use the + controls or pick a preset team above.',
      };
    }

    const sorted = [...DISC_KEYS].sort((a, b) => teamCounts[b] - teamCounts[a]);
    const top = sorted[0];
    const lowest = sorted[sorted.length - 1];
    const fastPaced = teamCounts.D + teamCounts.i;
    const moderatePaced = teamCounts.S + teamCounts.C;
    const peopleFocused = teamCounts.i + teamCounts.S;
    const taskFocused = teamCounts.D + teamCounts.C;

    let strength = '';
    if (fastPaced > moderatePaced + 1) {
      strength =
        'High natural momentum. This group initiates quickly, generates energy, and rarely hesitates to move forward.';
    } else if (moderatePaced > fastPaced + 1) {
      strength =
        'Steady, thoughtful execution. This group values reliability, careful risk checks, and sustainable follow-through.';
    } else if (peopleFocused > taskFocused + 1) {
      strength =
        'Strong relational trust. People feel supported, heard, and connected across collaborative work.';
    } else {
      strength =
        'Balanced pace and perspective. Your team combines decisive action with thoughtful planning and collaboration.';
    }

    const blindSpotMap: Record<DiscKey, string> = {
      D: 'Low Dominance representation can delay tough trade-off calls or lead to polite consensus when direct ownership is needed.',
      i: 'Low Influence representation can make updates feel dry or transactional, with fewer moments to celebrate progress together.',
      S: 'Low Steadiness representation increases burnout risk—people may rush into new initiatives without checking team capacity.',
      C: 'Low Conscientiousness representation means details, edge cases, and written documentation can get overlooked in fast sprints.',
    };

    const recMap: Record<DiscKey, string> = {
      D: 'Focus workshop Module 2 on clear decision ownership and constructive disagreement.',
      i: 'Build regular energy check-ins and cross-team storytelling into your 90-day playbook.',
      S: 'Create explicit pacing agreements and protected feedback space for quieter contributors.',
      C: 'Establish pre-read norms and clear quality definitions before locking sprint commitments.',
    };

    return {
      dominant: `${DISC_STYLES[top].name} (${top})`,
      strength,
      blindSpot:
        teamCounts[lowest] === 0
          ? `Zero ${DISC_STYLES[lowest].name} (${lowest}) presence. ${blindSpotMap[lowest]}`
          : `Lightest representation in ${DISC_STYLES[lowest].name} (${lowest}). ${blindSpotMap[lowest]}`,
      recommendation: recMap[lowest],
    };
  }, [teamCounts, totalMembers]);

  // SVG Radar geometry (center 140, 140)
  const radarPoints = useMemo(() => {
    const maxVal = Math.max(4, teamCounts.D, teamCounts.i, teamCounts.S, teamCounts.C);
    const scale = (val: number) => 22 + (val / maxVal) * 76;
    const dR = scale(teamCounts.D); // top-left (-x, -y)
    const iR = scale(teamCounts.i); // top-right (+x, -y)
    const sR = scale(teamCounts.S); // bottom-right (+x, +y)
    const cR = scale(teamCounts.C); // bottom-left (-x, +y)
    const diag = Math.SQRT1_2;

    const pD = `${140 - dR * diag},${140 - dR * diag}`;
    const pI = `${140 + iR * diag},${140 - iR * diag}`;
    const pS = `${140 + sR * diag},${140 + sR * diag}`;
    const pC = `${140 - cR * diag},${140 + cR * diag}`;

    return {
      polygon: `${pD} ${pI} ${pS} ${pC}`,
      coords: {
        D: { x: 140 - dR * diag, y: 140 - dR * diag },
        i: { x: 140 + iR * diag, y: 140 - iR * diag },
        S: { x: 140 + sR * diag, y: 140 + sR * diag },
        C: { x: 140 - cR * diag, y: 140 + cR * diag },
      },
    };
  }, [teamCounts]);

  const scopeRecommendation = useMemo(() => {
    const isLarge = scopeSize > 18;
    const recommendedSession =
      scopeGoal === 'New Team / Fast-Forming'
        ? 'Fast-Forming & Leadership Alignment'
        : scopeGoal === 'Leadership Alignment'
        ? 'Executive & Manager DiSC® Alignment Day'
        : isLarge
        ? 'Full-Day Interactive Everything DiSC® Team Workshop'
        : 'Half-Day or Full-Day Everything DiSC® Team Workshop';

    const formatNote =
      scopeFormat === 'Virtual'
        ? 'Delivered as two high-energy 2.5-hour live virtual modules with breakout rooms.'
        : scopeFormat === 'Hybrid'
        ? 'Core facilitation in-person with live Catalyst digital collaboration for remote teammates.'
        : 'On-site facilitation at your office or offsite venue with printed workbooks and team wall map.';

    const deliverables = [
      `${scopeSize} individual Everything DiSC® Workplace assessments & 20-page reports`,
      'Facilitated Team Culture Map & blind-spot dialogue',
      `Custom 90-day playbook tailored for ${scopeGoal.toLowerCase()}`,
      '30-day manager follow-up check-in',
    ];

    const summaryText = `${recommendedSession} · ${scopeSize} people · ${scopeFormat} · Goal: ${scopeGoal}`;

    return { recommendedSession, formatNote, deliverables, summaryText };
  }, [scopeSize, scopeFormat, scopeGoal]);

  return (
    <section
      id="disc-app"
      className={`border-b border-[#DCE5DF] bg-[#F8FAF8] ${
        isFocusMode ? 'min-h-[calc(100vh-65px)] py-8 lg:py-10' : 'py-16 lg:py-24'
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[#1B6B50]">
              Interactive DiSC® Team App
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#14241E] text-balance sm:text-4xl">
              Explore how DiSC® works for your actual team.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#4B5E55] sm:text-base">
              Use the app below to compare the four communication styles, map your team’s mix, or scope a workshop in two minutes. Install it to keep the reference guide offline.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <PWAInstallButton />
            <button
              type="button"
              onClick={onToggleFocusMode}
              className="inline-flex items-center gap-2 rounded-lg border border-[#DCE5DF] bg-white px-3.5 py-2 text-xs font-medium text-[#14241E] hover:bg-[#EFF4F0] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B6B50]"
            >
              {isFocusMode ? (
                <>
                  <Minimize2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Full Website View</span>
                </>
              ) : (
                <>
                  <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Focus App View</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-[#DCE5DF] bg-white overflow-hidden">
          {/* App Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE5DF] bg-[#EFF4F0]/70 px-4 py-3 sm:px-6">
            <div className="flex flex-wrap items-center gap-1 rounded-lg bg-[#DCE5DF]/50 p-1" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'styles'}
                onClick={() => setActiveTab('styles')}
                className={`inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'styles'
                    ? 'bg-white text-[#14241E] shadow-xs'
                    : 'text-[#4B5E55] hover:text-[#14241E]'
                }`}
              >
                <Compass className="h-3.5 w-3.5" aria-hidden="true" />
                <span>01. Style Guide</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'team-map'}
                onClick={() => setActiveTab('team-map')}
                className={`inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'team-map'
                    ? 'bg-white text-[#14241E] shadow-xs'
                    : 'text-[#4B5E55] hover:text-[#14241E]'
                }`}
              >
                <Users className="h-3.5 w-3.5" aria-hidden="true" />
                <span>02. Team Culture Map</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'scope-builder'}
                onClick={() => setActiveTab('scope-builder')}
                className={`inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'scope-builder'
                    ? 'bg-white text-[#14241E] shadow-xs'
                    : 'text-[#4B5E55] hover:text-[#14241E]'
                }`}
              >
                <Sliders className="h-3.5 w-3.5" aria-hidden="true" />
                <span>03. Workshop Scope Builder</span>
              </button>
            </div>

            <span className="text-xs text-[#4B5E55] hidden sm:inline">
              Based on the Everything DiSC® model
            </span>
          </div>

          {/* TAB 1: STYLE GUIDE */}
          {activeTab === 'styles' && (
            <div className="p-6 sm:p-8" role="tabpanel">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {DISC_KEYS.map((key) => {
                  const s = DISC_STYLES[key];
                  const isActive = selectedStyle === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedStyle(key)}
                      className={`flex flex-col items-start rounded-xl border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B6B50] ${
                        isActive
                          ? 'border-[#1B6B50] bg-[#E3F1EB]/55'
                          : 'border-[#DCE5DF] bg-white hover:bg-[#F8FAF8]'
                      }`}
                    >
                      <span
                        className="font-display text-2xl font-bold tabular-nums"
                        style={{ color: s.color }}
                      >
                        {s.key}
                      </span>
                      <span className="mt-1 font-display text-sm font-semibold text-[#14241E]">
                        {s.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <p className="text-xs font-medium text-[#4B5E55]">Selected Style</p>
                  <div className="mt-2 flex items-baseline gap-3">
                    <span
                      className="font-display text-4xl font-bold"
                      style={{ color: styleInfo.color }}
                    >
                      {styleInfo.key}
                    </span>
                    <h3 className="font-display text-2xl font-semibold text-[#14241E]">
                      {styleInfo.name}
                    </h3>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-[#4B5E55]">
                    {styleInfo.tagline}
                  </p>

                  <div className="mt-6 border-t border-[#DCE5DF] pt-5">
                    <p className="text-xs font-medium text-[#14241E]">Core Priorities</p>
                    <ul className="mt-3 space-y-2">
                      {styleInfo.priorities.map((p) => (
                        <li key={p} className="flex items-center gap-2.5 text-sm text-[#4B5E55]">
                          <Check className="h-4 w-4 shrink-0 text-[#1B6B50]" aria-hidden="true" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 rounded-lg bg-[#EFF4F0] p-4">
                    <p className="text-xs font-semibold text-[#14241E]">Growth Edge</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#4B5E55]">
                      {styleInfo.growthEdge}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
                  <div className="rounded-xl border border-[#DCE5DF] bg-[#F8FAF8] p-5">
                    <h4 className="font-display text-sm font-semibold text-[#14241E]">
                      Team Strengths
                    </h4>
                    <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[#4B5E55]">
                      {styleInfo.strengths.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-[#DCE5DF] bg-[#F8FAF8] p-5">
                    <h4 className="font-display text-sm font-semibold text-[#14241E]">
                      Under Pressure
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-[#4B5E55]">
                      {styleInfo.underPressure}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#DCE5DF] bg-white p-5">
                    <h4 className="font-display text-sm font-semibold text-[#1B6B50]">
                      How to Communicate With {styleInfo.key}
                    </h4>
                    <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[#4B5E55]">
                      {styleInfo.workBestWith.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1B6B50]" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-[#DCE5DF] bg-white p-5">
                    <h4 className="font-display text-sm font-semibold text-[#14241E]">
                      What Creates Friction
                    </h4>
                    <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[#4B5E55]">
                      {styleInfo.avoidDoing.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TEAM CULTURE MAP */}
          {activeTab === 'team-map' && (
            <div className="p-6 sm:p-8" role="tabpanel">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-semibold text-[#14241E]">
                    Simulate Your Team’s Culture Map
                  </h3>
                  <p className="mt-1 text-sm text-[#4B5E55]">
                    Pick a common team profile or adjust headcount by style to preview team dynamics.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => applyPreset('balanced-squad')}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCE5DF] bg-white px-3 py-1.5 text-xs font-medium text-[#4B5E55] hover:bg-[#EFF4F0] hover:text-[#14241E] transition-colors whitespace-nowrap shrink-0"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Reset Balanced</span>
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {TEAM_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyPreset(preset.id)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      activePresetId === preset.id
                        ? 'border-[#1B6B50] bg-[#1B6B50] text-white'
                        : 'border-[#DCE5DF] bg-[#F8FAF8] text-[#4B5E55] hover:text-[#14241E]'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                {/* Left: Interactive Team Counts + Radar */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-12 lg:col-span-7 items-center">
                  <div className="sm:col-span-6 space-y-3">
                    {DISC_KEYS.map((key) => {
                      const s = DISC_STYLES[key];
                      const count = teamCounts[key];
                      return (
                        <div
                          key={key}
                          className="flex items-center justify-between rounded-lg border border-[#DCE5DF] bg-[#F8FAF8] px-4 py-3"
                        >
                          <div>
                            <span
                              className="font-display text-sm font-bold"
                              style={{ color: s.color }}
                            >
                              {s.key}
                            </span>
                            <span className="ml-2 text-sm font-medium text-[#14241E]">
                              {s.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => adjustCount(key, -1)}
                              aria-label={`Decrease ${s.name} members`}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#DCE5DF] bg-white text-[#14241E] hover:bg-[#EFF4F0] transition-colors"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-7 text-center font-mono text-sm font-medium text-[#14241E] tabular-nums">
                              {count}
                            </span>
                            <button
                              type="button"
                              onClick={() => adjustCount(key, 1)}
                              aria-label={`Increase ${s.name} members`}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#DCE5DF] bg-white text-[#14241E] hover:bg-[#EFF4F0] transition-colors"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    <div className="flex items-center justify-between px-1 pt-1 text-xs text-[#4B5E55]">
                      <span>Simulated Team Headcount</span>
                      <span className="font-mono font-medium text-[#14241E] tabular-nums">
                        {totalMembers} {totalMembers === 1 ? 'person' : 'people'}
                      </span>
                    </div>
                  </div>

                  {/* Custom SVG DiSC Circumplex Map */}
                  <div className="sm:col-span-6 flex flex-col items-center justify-center rounded-xl border border-[#DCE5DF] bg-[#F8FAF8] p-4">
                    <svg
                      viewBox="0 0 280 280"
                      className="w-full max-w-[260px]"
                      role="img"
                      aria-label="DiSC Team Culture Map radar showing distribution across D, i, S, and C"
                    >
                      <circle
                        cx="140"
                        cy="140"
                        r="102"
                        fill="#FFFFFF"
                        stroke="#DCE5DF"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="140"
                        cy="140"
                        r="68"
                        fill="none"
                        stroke="#DCE5DF"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                      <circle
                        cx="140"
                        cy="140"
                        r="34"
                        fill="none"
                        stroke="#DCE5DF"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                      <line x1="140" y1="30" x2="140" y2="250" stroke="#DCE5DF" strokeWidth="1" />
                      <line x1="30" y1="140" x2="250" y2="140" stroke="#DCE5DF" strokeWidth="1" />

                      {totalMembers > 0 && (
                        <polygon
                          points={radarPoints.polygon}
                          fill="#1B6B50"
                          fillOpacity="0.18"
                          stroke="#1B6B50"
                          strokeWidth="2"
                        />
                      )}

                      {DISC_KEYS.map((key) => (
                        <circle
                          key={key}
                          cx={radarPoints.coords[key].x}
                          cy={radarPoints.coords[key].y}
                          r="4.5"
                          fill={DISC_STYLES[key].color}
                          stroke="#FFFFFF"
                          strokeWidth="1.5"
                        />
                      ))}

                      <text x="64" y="54" textAnchor="middle" className="fill-[#B45309] font-display text-[13px] font-bold">
                        D ({teamCounts.D})
                      </text>
                      <text x="216" y="54" textAnchor="middle" className="fill-[#0F766E] font-display text-[13px] font-bold">
                        i ({teamCounts.i})
                      </text>
                      <text x="216" y="236" textAnchor="middle" className="fill-[#1B6B50] font-display text-[13px] font-bold">
                        S ({teamCounts.S})
                      </text>
                      <text x="64" y="236" textAnchor="middle" className="fill-[#1D4ED8] font-display text-[13px] font-bold">
                        C ({teamCounts.C})
                      </text>

                      <text x="140" y="20" textAnchor="middle" className="fill-[#4B5E55] text-[10px]">
                        Fast-Paced &amp; Outspoken
                      </text>
                      <text x="140" y="268" textAnchor="middle" className="fill-[#4B5E55] text-[10px]">
                        Moderate-Paced &amp; Reflective
                      </text>
                    </svg>
                  </div>
                </div>

                {/* Right: Live Analysis */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="rounded-xl border border-[#DCE5DF] bg-[#F8FAF8] p-5">
                    <p className="text-xs text-[#4B5E55]">Dominant Team Energy</p>
                    <p className="mt-1 font-display text-lg font-semibold text-[#14241E]">
                      {teamAnalysis.dominant}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#DCE5DF] bg-white p-5 space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-[#1B6B50]">Natural Team Strength</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#4B5E55]">
                        {teamAnalysis.strength}
                      </p>
                    </div>
                    <div className="border-t border-[#DCE5DF] pt-4">
                      <p className="text-xs font-semibold text-[#14241E]">Likely Blind Spot</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#4B5E55]">
                        {teamAnalysis.blindSpot}
                      </p>
                    </div>
                    <div className="border-t border-[#DCE5DF] pt-4">
                      <p className="text-xs font-semibold text-[#14241E]">Workshop Focus</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#4B5E55]">
                        {teamAnalysis.recommendation}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setScopeSize(Math.max(6, Math.min(50, totalMembers || 12)));
                      setActiveTab('scope-builder');
                    }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#1B6B50] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#14533E] transition-colors"
                  >
                    <span>Scope a Workshop for This Team</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WORKSHOP SCOPE BUILDER */}
          {activeTab === 'scope-builder' && (
            <div className="p-6 sm:p-8" role="tabpanel">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="team-size-range" className="text-sm font-semibold text-[#14241E]">
                        Team Size
                      </label>
                      <span className="font-mono text-sm font-medium text-[#1B6B50] tabular-nums">
                        {scopeSize} participants
                      </span>
                    </div>
                    <input
                      id="team-size-range"
                      type="range"
                      min={6}
                      max={45}
                      value={scopeSize}
                      onChange={(e) => setScopeSize(Number(e.target.value))}
                      className="mt-3 w-full accent-[#1B6B50] cursor-pointer"
                    />
                    <div className="mt-1 flex justify-between text-xs text-[#4B5E55] tabular-nums">
                      <span>6 people</span>
                      <span>25 people</span>
                      <span>45 people</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#14241E]">Preferred Format</p>
                    <div className="mt-2.5 grid grid-cols-3 gap-2.5">
                      {(['In-Person', 'Virtual', 'Hybrid'] as const).map((fmt) => (
                        <button
                          key={fmt}
                          type="button"
                          onClick={() => setScopeFormat(fmt)}
                          className={`rounded-lg border px-3 py-2.5 text-xs font-medium transition-colors whitespace-nowrap ${
                            scopeFormat === fmt
                              ? 'border-[#1B6B50] bg-[#E3F1EB] text-[#14241E]'
                              : 'border-[#DCE5DF] bg-white text-[#4B5E55] hover:bg-[#F8FAF8]'
                          }`}
                        >
                          {fmt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#14241E]">Primary Team Goal</p>
                    <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {(
                        [
                          'Communication & Trust',
                          'New Team / Fast-Forming',
                          'Leadership Alignment',
                          'Navigating Change',
                        ] as const
                      ).map((goal) => (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => setScopeGoal(goal)}
                          className={`rounded-lg border px-3.5 py-2.5 text-left text-xs font-medium transition-colors ${
                            scopeGoal === goal
                              ? 'border-[#1B6B50] bg-[#E3F1EB] text-[#14241E]'
                              : 'border-[#DCE5DF] bg-white text-[#4B5E55] hover:bg-[#F8FAF8]'
                          }`}
                        >
                          {goal}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between rounded-xl border border-[#DCE5DF] bg-[#F8FAF8] p-6 lg:col-span-6">
                  <div>
                    <p className="text-xs font-medium text-[#1B6B50]">Recommended Scope</p>
                    <h3 className="mt-1.5 font-display text-xl font-semibold text-[#14241E]">
                      {scopeRecommendation.recommendedSession}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#4B5E55]">
                      {scopeRecommendation.formatNote}
                    </p>

                    <div className="mt-5 border-t border-[#DCE5DF] pt-4">
                      <p className="text-xs font-semibold text-[#14241E]">
                        Included Deliverables
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {scopeRecommendation.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2.5 text-sm text-[#4B5E55]">
                            <Check
                              className="mt-0.5 h-4 w-4 shrink-0 text-[#1B6B50]"
                              aria-hidden="true"
                            />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onApplyScope(scopeRecommendation.summaryText, scopeSize)}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#1B6B50] px-5 py-3 text-sm font-medium text-white hover:bg-[#14533E] transition-colors"
                  >
                    <span>Book Discovery Call With This Scope</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
