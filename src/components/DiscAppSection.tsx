import React, { useMemo, useRef, useState } from 'react';
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
const TABS: { id: AppTab; label: string }[] = [
  { id: 'styles', label: '01. Style Guide' },
  { id: 'team-map', label: '02. Team Culture Map' },
  { id: 'scope-builder', label: '03. Workshop Scope Builder' },
];

const STYLE_SYMBOLS: Record<DiscKey, string> = {
  D: '▲',
  i: '●',
  S: '■',
  C: '◆',
};

export const DiscAppSection: React.FC<DiscAppSectionProps> = ({
  onApplyScope,
  isFocusMode,
  onToggleFocusMode,
}) => {
  const [activeTab, setActiveTab] = useState<AppTab>('styles');
  const [selectedStyle, setSelectedStyle] = useState<DiscKey>('S');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

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

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (index + 1) % TABS.length;
      setActiveTab(TABS[next].id);
      tabRefs.current[next]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (index - 1 + TABS.length) % TABS.length;
      setActiveTab(TABS[prev].id);
      tabRefs.current[prev]?.focus();
    }
  };

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

  const radarPoints = useMemo(() => {
    const maxVal = Math.max(4, teamCounts.D, teamCounts.i, teamCounts.S, teamCounts.C);
    const scale = (val: number) => 22 + (val / maxVal) * 76;
    const dR = scale(teamCounts.D);
    const iR = scale(teamCounts.i);
    const sR = scale(teamCounts.S);
    const cR = scale(teamCounts.C);
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
      className={`border-b-2 border-[#064E3B]/15 bg-[#EDF7F2] ${
        isFocusMode ? 'min-h-[calc(100vh-65px)] py-8 lg:py-10' : 'py-16 lg:py-24'
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-bold tracking-wide text-[#047857]">
              Interactive DiSC® Team App
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#0B1F17] text-balance sm:text-4xl">
              Explore how DiSC® works for your actual team.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#1E3A2F]">
              Compare the four communication styles, simulate your team’s culture map, or build a workshop scope in two minutes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <PWAInstallButton />
            <button
              type="button"
              onClick={onToggleFocusMode}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border-2 border-[#064E3B] bg-white px-4 py-2 text-xs font-semibold text-[#064E3B] hover:bg-[#D1FAE5]/40 transition-colors whitespace-nowrap shrink-0"
            >
              {isFocusMode ? (
                <>
                  <Minimize2 className="h-4 w-4" aria-hidden="true" />
                  <span>Full Website View</span>
                </>
              ) : (
                <>
                  <Maximize2 className="h-4 w-4" aria-hidden="true" />
                  <span>Focus App View</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-xl border-2 border-[#064E3B]/25 bg-white overflow-hidden">
          {/* App Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#064E3B]/15 bg-[#064E3B] px-4 py-3 sm:px-6">
            <div
              className="flex flex-wrap items-center gap-1.5 rounded-lg bg-[#047857]/50 p-1"
              role="tablist"
              aria-label="DiSC Team App sections"
            >
              {TABS.map((tab, idx) => {
                const isSelected = activeTab === tab.id;
                const Icon =
                  tab.id === 'styles' ? Compass : tab.id === 'team-map' ? Users : Sliders;
                return (
                  <button
                    key={tab.id}
                    ref={(el) => {
                      tabRefs.current[idx] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`tab-${tab.id}`}
                    aria-selected={isSelected}
                    aria-controls={`panel-${tab.id}`}
                    tabIndex={isSelected ? 0 : -1}
                    onKeyDown={(e) => handleTabKeyDown(e, idx)}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex min-h-[40px] items-center gap-2 rounded-md px-4 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-[#FBBF24] text-[#0B1F17]'
                        : 'text-white hover:bg-white/15'
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <span className="text-xs font-medium text-[#D1FAE5] hidden sm:inline">
              Use Left/Right arrow keys to switch tabs
            </span>
          </div>

          {/* TAB 1: STYLE GUIDE */}
          {activeTab === 'styles' && (
            <div
              id="panel-styles"
              role="tabpanel"
              aria-labelledby="tab-styles"
              className="p-6 sm:p-8"
            >
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" role="radiogroup" aria-label="Select a DiSC style">
                {DISC_KEYS.map((key) => {
                  const s = DISC_STYLES[key];
                  const isActive = selectedStyle === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      onClick={() => setSelectedStyle(key)}
                      style={{
                        borderColor: isActive ? s.color : '#8CAEA0',
                        backgroundColor: isActive ? s.softBg : '#FFFFFF',
                      }}
                      className="flex min-h-[84px] flex-col items-start justify-between rounded-xl border-2 p-4 text-left transition-colors"
                    >
                      <div className="flex w-full items-center justify-between">
                        <span
                          className="font-display text-2xl font-extrabold tabular-nums"
                          style={{ color: s.color }}
                        >
                          {s.key}
                        </span>
                        <span
                          className="text-sm font-bold"
                          style={{ color: s.color }}
                          aria-label={s.shapeLabel}
                        >
                          {STYLE_SYMBOLS[key]}
                        </span>
                      </div>
                      <span className="mt-1 font-display text-sm font-bold text-[#0B1F17]">
                        {s.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12" aria-live="polite">
                <div className="lg:col-span-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#1E3A2F]">
                    {STYLE_SYMBOLS[styleInfo.key]} {styleInfo.paceAndFocus}
                  </p>
                  <div className="mt-2 flex items-baseline gap-3">
                    <span
                      className="font-display text-4xl font-extrabold"
                      style={{ color: styleInfo.color }}
                    >
                      {styleInfo.key}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-[#0B1F17]">
                      {styleInfo.name}
                    </h3>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-[#1E3A2F]">
                    {styleInfo.tagline}
                  </p>

                  <div className="mt-6 border-t-2 border-[#8CAEA0]/40 pt-5">
                    <p className="text-sm font-bold text-[#0B1F17]">Core Priorities</p>
                    <ul className="mt-3 space-y-2.5">
                      {styleInfo.priorities.map((p) => (
                        <li key={p} className="flex items-center gap-2.5 text-sm font-medium text-[#0B1F17]">
                          <Check className="h-4 w-4 shrink-0 text-[#047857]" aria-hidden="true" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 rounded-xl border-2 border-[#F59E0B] bg-[#FFFBEB] p-4">
                    <p className="text-xs font-bold text-[#9A3412]">Growth Edge</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#0B1F17]">
                      {styleInfo.growthEdge}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
                  <div className="rounded-xl border-2 border-[#8CAEA0]/60 bg-[#EDF7F2]/50 p-5">
                    <h4 className="font-display text-base font-bold text-[#0B1F17]">
                      Team Strengths
                    </h4>
                    <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[#1E3A2F]">
                      {styleInfo.strengths.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border-2 border-[#8CAEA0]/60 bg-[#EDF7F2]/50 p-5">
                    <h4 className="font-display text-base font-bold text-[#0B1F17]">
                      Under Pressure
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-[#1E3A2F]">
                      {styleInfo.underPressure}
                    </p>
                  </div>

                  <div className="rounded-xl border-2 border-[#047857] bg-white p-5">
                    <h4 className="font-display text-base font-bold text-[#047857]">
                      How to Communicate With {styleInfo.key}
                    </h4>
                    <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[#0B1F17]">
                      {styleInfo.workBestWith.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#047857]" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border-2 border-[#8CAEA0]/60 bg-white p-5">
                    <h4 className="font-display text-base font-bold text-[#0B1F17]">
                      What Creates Friction
                    </h4>
                    <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[#1E3A2F]">
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
            <div
              id="panel-team-map"
              role="tabpanel"
              aria-labelledby="tab-team-map"
              className="p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#0B1F17]">
                    Simulate Your Team’s Culture Map
                  </h3>
                  <p className="mt-1 text-sm text-[#1E3A2F]">
                    Pick a common team profile or adjust headcount by style to preview team dynamics.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => applyPreset('balanced-squad')}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border-2 border-[#8CAEA0] bg-white px-3.5 py-2 text-xs font-semibold text-[#0B1F17] hover:bg-[#EDF7F2] transition-colors whitespace-nowrap shrink-0"
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
                    aria-pressed={activePresetId === preset.id}
                    onClick={() => applyPreset(preset.id)}
                    className={`min-h-[40px] rounded-lg border-2 px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      activePresetId === preset.id
                        ? 'border-[#064E3B] bg-[#064E3B] text-white'
                        : 'border-[#8CAEA0] bg-white text-[#0B1F17] hover:bg-[#EDF7F2]'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-12 lg:col-span-7 items-start">
                  <div className="sm:col-span-6 space-y-3">
                    {DISC_KEYS.map((key) => {
                      const s = DISC_STYLES[key];
                      const count = teamCounts[key];
                      return (
                        <div
                          key={key}
                          className="flex items-center justify-between rounded-lg border-2 border-[#8CAEA0]/70 bg-white px-4 py-3"
                        >
                          <div>
                            <span
                              className="mr-1.5 text-xs font-bold"
                              style={{ color: s.color }}
                              aria-hidden="true"
                            >
                              {STYLE_SYMBOLS[key]}
                            </span>
                            <span
                              className="font-display text-sm font-extrabold"
                              style={{ color: s.color }}
                            >
                              {s.key}
                            </span>
                            <span className="ml-2 text-sm font-semibold text-[#0B1F17]">
                              {s.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => adjustCount(key, -1)}
                              aria-label={`Decrease ${s.name} members (currently ${count})`}
                              className="inline-flex h-10 w-10 items-center justify-center rounded-md border-2 border-[#8CAEA0] bg-white text-[#0B1F17] hover:bg-[#EDF7F2] transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-7 text-center font-mono text-sm font-bold text-[#0B1F17] tabular-nums">
                              {count}
                            </span>
                            <button
                              type="button"
                              onClick={() => adjustCount(key, 1)}
                              aria-label={`Increase ${s.name} members (currently ${count})`}
                              className="inline-flex h-10 w-10 items-center justify-center rounded-md border-2 border-[#8CAEA0] bg-white text-[#0B1F17] hover:bg-[#EDF7F2] transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    <div className="flex items-center justify-between px-1 pt-1 text-sm font-medium text-[#1E3A2F]">
                      <span>Simulated Team Headcount</span>
                      <span className="font-mono font-bold text-[#0B1F17] tabular-nums">
                        {totalMembers} {totalMembers === 1 ? 'person' : 'people'}
                      </span>
                    </div>
                  </div>

                  {/* Custom SVG DiSC Circumplex Map + Accessible Text Summary */}
                  <div className="sm:col-span-6 flex flex-col items-center justify-center rounded-xl border-2 border-[#8CAEA0] bg-[#EDF7F2]/40 p-4">
                    <svg
                      viewBox="0 0 280 280"
                      className="w-full max-w-[260px]"
                      role="img"
                      aria-label={`DiSC Team Culture Map showing ${teamCounts.D} Dominance, ${teamCounts.i} Influence, ${teamCounts.S} Steadiness, and ${teamCounts.C} Conscientiousness`}
                    >
                      <circle
                        cx="140"
                        cy="140"
                        r="102"
                        fill="#FFFFFF"
                        stroke="#064E3B"
                        strokeOpacity="0.35"
                        strokeWidth="2"
                      />
                      <circle
                        cx="140"
                        cy="140"
                        r="68"
                        fill="none"
                        stroke="#8CAEA0"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                      <circle
                        cx="140"
                        cy="140"
                        r="34"
                        fill="none"
                        stroke="#8CAEA0"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                      <line x1="140" y1="30" x2="140" y2="250" stroke="#8CAEA0" strokeWidth="1.5" />
                      <line x1="30" y1="140" x2="250" y2="140" stroke="#8CAEA0" strokeWidth="1.5" />

                      {totalMembers > 0 && (
                        <polygon
                          points={radarPoints.polygon}
                          fill="#047857"
                          fillOpacity="0.28"
                          stroke="#064E3B"
                          strokeWidth="2.5"
                        />
                      )}

                      {DISC_KEYS.map((key) => (
                        <circle
                          key={key}
                          cx={radarPoints.coords[key].x}
                          cy={radarPoints.coords[key].y}
                          r="5.5"
                          fill={DISC_STYLES[key].color}
                          stroke="#FFFFFF"
                          strokeWidth="2"
                        />
                      ))}

                      <text x="64" y="54" textAnchor="middle" className="fill-[#B91C1C] font-display text-[13px] font-extrabold">
                        ▲ D ({teamCounts.D})
                      </text>
                      <text x="216" y="54" textAnchor="middle" className="fill-[#9A3412] font-display text-[13px] font-extrabold">
                        ● i ({teamCounts.i})
                      </text>
                      <text x="216" y="236" textAnchor="middle" className="fill-[#047857] font-display text-[13px] font-extrabold">
                        ■ S ({teamCounts.S})
                      </text>
                      <text x="64" y="236" textAnchor="middle" className="fill-[#1D4ED8] font-display text-[13px] font-extrabold">
                        ◆ C ({teamCounts.C})
                      </text>

                      <text x="140" y="20" textAnchor="middle" className="fill-[#0B1F17] text-[10px] font-semibold">
                        Fast-Paced &amp; Outspoken
                      </text>
                      <text x="140" y="268" textAnchor="middle" className="fill-[#0B1F17] text-[10px] font-semibold">
                        Moderate-Paced &amp; Reflective
                      </text>
                    </svg>

                    <div className="mt-3 w-full border-t border-[#8CAEA0]/60 pt-3">
                      <p className="sr-only">Team Distribution Data Summary</p>
                      <div className="grid grid-cols-4 gap-1 text-center font-mono text-xs text-[#0B1F17] tabular-nums">
                        {DISC_KEYS.map((k) => {
                          const pct =
                            totalMembers > 0 ? Math.round((teamCounts[k] / totalMembers) * 100) : 0;
                          return (
                            <div key={k} className="rounded bg-white px-1 py-1 border border-[#8CAEA0]/50">
                              <span className="font-bold">{k}:</span> {pct}%
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Live Analysis */}
                <div className="lg:col-span-5 space-y-4" aria-live="polite">
                  <div className="rounded-xl border-2 border-[#064E3B] bg-[#064E3B] p-5 text-white">
                    <p className="text-xs font-semibold text-[#FBBF24]">Dominant Team Energy</p>
                    <p className="mt-1 font-display text-xl font-bold text-white">
                      {teamAnalysis.dominant}
                    </p>
                  </div>

                  <div className="rounded-xl border-2 border-[#8CAEA0] bg-white p-5 space-y-4">
                    <div>
                      <p className="text-xs font-bold text-[#047857]">Natural Team Strength</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#0B1F17]">
                        {teamAnalysis.strength}
                      </p>
                    </div>
                    <div className="border-t border-[#8CAEA0]/50 pt-4">
                      <p className="text-xs font-bold text-[#9A3412]">Likely Blind Spot</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#0B1F17]">
                        {teamAnalysis.blindSpot}
                      </p>
                    </div>
                    <div className="border-t border-[#8CAEA0]/50 pt-4">
                      <p className="text-xs font-bold text-[#0B1F17]">Workshop Focus</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#1E3A2F]">
                        {teamAnalysis.recommendation}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setScopeSize(Math.max(6, Math.min(45, totalMembers || 12)));
                      setActiveTab('scope-builder');
                    }}
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#047857] px-4 py-3 text-sm font-bold text-white hover:bg-[#064E3B] transition-colors"
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
            <div
              id="panel-scope-builder"
              role="tabpanel"
              aria-labelledby="tab-scope-builder"
              className="p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="team-size-range" className="text-sm font-bold text-[#0B1F17]">
                        Team Size
                      </label>
                      <span className="font-mono text-sm font-bold text-[#047857] tabular-nums">
                        {scopeSize} participants
                      </span>
                    </div>
                    <input
                      id="team-size-range"
                      type="range"
                      min={6}
                      max={45}
                      value={scopeSize}
                      aria-valuetext={`${scopeSize} participants`}
                      onChange={(e) => setScopeSize(Number(e.target.value))}
                      className="mt-3 h-3 w-full accent-[#047857] cursor-pointer"
                    />
                    <div className="mt-1 flex justify-between text-xs font-medium text-[#1E3A2F] tabular-nums">
                      <span>6 people</span>
                      <span>25 people</span>
                      <span>45 people</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#0B1F17]">Preferred Format</p>
                    <div className="mt-2.5 grid grid-cols-3 gap-2.5">
                      {(['In-Person', 'Virtual', 'Hybrid'] as const).map((fmt) => (
                        <button
                          key={fmt}
                          type="button"
                          aria-pressed={scopeFormat === fmt}
                          onClick={() => setScopeFormat(fmt)}
                          className={`min-h-[44px] rounded-lg border-2 px-3 py-2.5 text-xs font-bold transition-colors whitespace-nowrap ${
                            scopeFormat === fmt
                              ? 'border-[#047857] bg-[#047857] text-white'
                              : 'border-[#8CAEA0] bg-white text-[#0B1F17] hover:bg-[#EDF7F2]'
                          }`}
                        >
                          {fmt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#0B1F17]">Primary Team Goal</p>
                    <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
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
                          aria-pressed={scopeGoal === goal}
                          onClick={() => setScopeGoal(goal)}
                          className={`min-h-[44px] rounded-lg border-2 px-3.5 py-2.5 text-left text-xs font-bold transition-colors ${
                            scopeGoal === goal
                              ? 'border-[#047857] bg-[#047857] text-white'
                              : 'border-[#8CAEA0] bg-white text-[#0B1F17] hover:bg-[#EDF7F2]'
                          }`}
                        >
                          {goal}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className="flex flex-col justify-between rounded-xl border-2 border-[#064E3B] bg-[#EDF7F2] p-6 lg:col-span-6"
                  aria-live="polite"
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#047857]">
                      Recommended Scope
                    </p>
                    <h3 className="mt-1.5 font-display text-xl font-bold text-[#0B1F17]">
                      {scopeRecommendation.recommendedSession}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#1E3A2F]">
                      {scopeRecommendation.formatNote}
                    </p>

                    <div className="mt-5 border-t border-[#8CAEA0] pt-4">
                      <p className="text-xs font-bold text-[#0B1F17]">Included Deliverables</p>
                      <ul className="mt-3 space-y-2.5">
                        {scopeRecommendation.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2.5 text-sm text-[#0B1F17]">
                            <Check
                              className="mt-0.5 h-4 w-4 shrink-0 text-[#047857]"
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
                    className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#FBBF24] px-5 py-3 text-sm font-bold text-[#0B1F17] hover:bg-[#FDE047] transition-colors"
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
