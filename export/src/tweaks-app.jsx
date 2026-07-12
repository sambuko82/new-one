/* JVTO homepage tweaks */
const { useEffect } = React;

const PALETTES = {
  default: {
    label: "Brand Default",
    swatches: ['#0D1B2A', '#E8650A', '#8CC63F', '#F6F5F2'],
    vars: {
      '--navy': '#0D1B2A',
      '--navy-mid': '#1C2E40',
      '--orange': '#E8650A',
      '--lime': '#8CC63F',
      '--gold': '#F5A623',
      '--off': '#F6F5F2',
    }
  },
  obsidian: {
    label: "Obsidian Ember",
    swatches: ['#0a0a0c', '#FF5B22', '#D9A86B', '#EFECE6'],
    vars: {
      '--navy': '#0a0a0c',
      '--navy-mid': '#16161b',
      '--orange': '#FF5B22',
      '--lime': '#D9A86B',
      '--gold': '#E9B870',
      '--off': '#EFECE6',
    }
  },
  ash: {
    label: "Volcanic Ash",
    swatches: ['#1F2A2E', '#C77F3A', '#7A9E7E', '#F2EFE9'],
    vars: {
      '--navy': '#1F2A2E',
      '--navy-mid': '#2B3A40',
      '--orange': '#C77F3A',
      '--lime': '#7A9E7E',
      '--gold': '#D9A559',
      '--off': '#F2EFE9',
    }
  },
  paper: {
    label: "Editorial Paper",
    swatches: ['#1A1A1A', '#B23A1A', '#5F7B5E', '#EDE7DA'],
    vars: {
      '--navy': '#1A1A1A',
      '--navy-mid': '#2A2A2A',
      '--orange': '#B23A1A',
      '--lime': '#5F7B5E',
      '--gold': '#C49858',
      '--off': '#EDE7DA',
    }
  }
};

const DENSITIES = {
  airy:        { '--section-py': '10rem', '--section-py-sm': '7rem', '--container-px': '2.5rem', '--gap-card': '2.5rem' },
  comfortable: { '--section-py': '8rem',  '--section-py-sm': '5rem', '--container-px': '2rem',   '--gap-card': '2rem' },
  compact:     { '--section-py': '5.5rem','--section-py-sm': '3.5rem','--container-px': '1.5rem','--gap-card': '1.25rem' }
};

function applyVars(obj) {
  const root = document.documentElement;
  for (const [k, v] of Object.entries(obj)) root.style.setProperty(k, v);
}

function JvtoTweaks() {
  const defaults = window.__JVTO_TWEAKS_DEFAULTS;
  const [t, setTweak] = useTweaks(defaults);

  // apply on every change
  useEffect(() => {
    applyVars(PALETTES[t.palette]?.vars || PALETTES.default.vars);
  }, [t.palette]);

  useEffect(() => {
    applyVars(DENSITIES[t.density] || DENSITIES.comfortable);
  }, [t.density]);

  useEffect(() => {
    const heroHead = document.querySelector('h1.hero-head .italic');
    if (heroHead) {
      heroHead.style.fontStyle = t.displayItalic ? 'italic' : 'normal';
      heroHead.style.fontWeight = t.displayItalic ? '300' : '700';
    }
  }, [t.displayItalic]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Palette" subtitle="Curated color directions">
        <TweakColor
          label="Palette"
          value={PALETTES[t.palette].swatches}
          onChange={(v) => {
            const key = Object.keys(PALETTES).find(k => JSON.stringify(PALETTES[k].swatches) === JSON.stringify(v));
            if (key) setTweak('palette', key);
          }}
          options={Object.values(PALETTES).map(p => p.swatches)}
        />
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B7280', marginTop: 4 }}>
          {PALETTES[t.palette].label}
        </div>
      </TweakSection>

      <TweakSection title="Density" subtitle="Vertical rhythm">
        <TweakRadio
          label="Spacing"
          value={t.density}
          onChange={(v) => setTweak('density', v)}
          options={[
            { value: 'airy', label: 'Airy' },
            { value: 'comfortable', label: 'Comfy' },
            { value: 'compact', label: 'Compact' }
          ]}
        />
      </TweakSection>

      <TweakSection title="Headline" subtitle="Display treatment">
        <TweakToggle
          label="Italic accent word"
          value={t.displayItalic}
          onChange={(v) => setTweak('displayItalic', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<JvtoTweaks />);
