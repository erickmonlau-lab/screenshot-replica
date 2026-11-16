import type { ReactNode } from "react";

/* Illustrations for the Método cards and the Proceso stage. Pure SVG, SMIL / CSS animated. */

const BLUE = "#3B82F6";
const COBALT = "#0044FF";
const CREAM = "#F4EAD0";
const GREEN = "#10B981";
const CYCLE = 9;

/* ───────────── Método cards (light background, 360 × 150) ───────────── */

function Mini({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 360 160" className="h-auto w-full" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

export function WebMini() {
  return (
    <Mini label="Resultados de búsqueda con tu web en primera posición">
      <rect
        x={10}
        y={8}
        width={340}
        height={144}
        rx={14}
        fill="#FFFFFF"
        stroke="#09090B"
        strokeWidth={3}
      />
      <rect
        x={24}
        y={22}
        width={312}
        height={26}
        rx={13}
        fill="#F1F2F5"
        stroke="#09090B"
        strokeWidth={2}
      />
      <circle cx={42} cy={35} r={6} fill="none" stroke="#09090B" strokeWidth={2.5} />
      <rect x={58} y={31} width={120} height={8} rx={4} fill="#09090B" opacity={0.7} />
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <rect
            x={24}
            y={62 + k * 30}
            width={k === 0 ? 312 : 240}
            height={22}
            rx={7}
            fill={k === 0 ? "#E6EEFF" : "#F6F6F8"}
          />
          {k === 0 ? <rect x={24} y={62} width={6} height={22} rx={3} fill={COBALT} /> : null}
          <rect
            x={40}
            y={69 + k * 30}
            width={k === 0 ? 120 : 100}
            height={8}
            rx={4}
            fill="#09090B"
            opacity={k === 0 ? 0.85 : 0.3}
          />
          <rect
            x={174}
            y={69 + k * 30}
            width={k === 0 ? 70 : 50}
            height={8}
            rx={4}
            fill="#09090B"
            opacity={0.15}
          />
        </g>
      ))}
      <g>
        <rect x={262} y={63} width={64} height={20} rx={10} fill={COBALT}>
          <animate attributeName="opacity" values="1;0.55;1" dur="2s" repeatCount="indefinite" />
        </rect>
        <text x={294} y={77.5} textAnchor="middle" fill="#fff" fontSize={14} fontWeight={800}>
          SEO
        </text>
      </g>
    </Mini>
  );
}

export function ErpMini() {
  const bars = [0.45, 0.7, 0.5, 0.9, 0.62, 0.8];
  return (
    <Mini label="Panel de un ERP con indicadores y gráfico">
      <rect
        x={10}
        y={8}
        width={340}
        height={144}
        rx={14}
        fill="#FFFFFF"
        stroke="#09090B"
        strokeWidth={3}
      />
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <rect
            x={24 + k * 106}
            y={22}
            width={96}
            height={38}
            rx={9}
            fill={k === 1 ? COBALT : "#F1F2F5"}
          />
          <rect
            x={34 + k * 106}
            y={32}
            width={40}
            height={7}
            rx={3.5}
            fill={k === 1 ? "#fff" : "#09090B"}
            opacity={0.6}
          />
          <rect
            x={34 + k * 106}
            y={44}
            width={58}
            height={9}
            rx={4.5}
            fill={k === 1 ? "#fff" : "#09090B"}
            opacity={0.9}
          />
        </g>
      ))}
      {bars.map((h, k) => (
        <rect
          key={k}
          className="bar-grow"
          x={30 + k * 50}
          y={140 - h * 66}
          width={30}
          height={h * 66}
          rx={6}
          fill={k === 3 ? COBALT : "#09090B"}
          opacity={k === 3 ? 1 : 0.85}
          style={{ animationDelay: `${k * 0.18}s` }}
        />
      ))}
    </Mini>
  );
}

export function IaMini() {
  const nodes = [
    { x: 24, label: "Aviso", c: "#FF6D5A" },
    { x: 140, label: "IA", c: COBALT },
    { x: 256, label: "Hecho", c: GREEN },
  ];
  return (
    <Mini label="Flujo automático: aviso, IA y tarea hecha">
      <rect
        x={10}
        y={8}
        width={340}
        height={144}
        rx={14}
        fill="#FFFFFF"
        stroke="#09090B"
        strokeWidth={3}
      />
      {[0, 1].map((k) => (
        <g key={k}>
          <path
            d={`M ${100 + k * 116} 80 L ${140 + k * 116} 80`}
            stroke="#09090B"
            strokeWidth={3}
            strokeDasharray="5 6"
            fill="none"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="22"
              to="0"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
          <circle r={5} fill={COBALT}>
            <animateMotion
              dur="1.6s"
              begin={`${k * 0.5}s`}
              repeatCount="indefinite"
              path={`M ${100 + k * 116} 80 L ${140 + k * 116} 80`}
            />
          </circle>
        </g>
      ))}
      {nodes.map((n, k) => (
        <g key={n.label}>
          <rect
            x={n.x}
            y={46}
            width={76}
            height={68}
            rx={14}
            fill="#fff"
            stroke="#09090B"
            strokeWidth={3}
          />
          <circle cx={n.x + 38} cy={72} r={11} fill={n.c}>
            <animate
              attributeName="r"
              values="10;13;10"
              dur="2.4s"
              begin={`${k * 0.6}s`}
              repeatCount="indefinite"
            />
          </circle>
          <text
            x={n.x + 38}
            y={102}
            textAnchor="middle"
            fill="#09090B"
            fontSize={15}
            fontWeight={800}
          >
            {n.label}
          </text>
        </g>
      ))}
    </Mini>
  );
}

/* ───────────── Proceso stage (dark, 640 × 440) ───────────── */

function Frame({ children, label, on }: { children: ReactNode; label: string; on: boolean }) {
  return (
    <svg
      viewBox="0 0 640 440"
      className="absolute inset-0 h-full w-full transition-all duration-700 ease-out"
      style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(18px) scale(0.98)" }}
      role="img"
      aria-label={label}
      aria-hidden={!on}
    >
      <defs>
        <pattern id="pd" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill="#1C2132" />
        </pattern>
        <filter id="pg" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="640" height="440" fill="url(#pd)" />
      {children}
    </svg>
  );
}

const seq = (a: number, b: number) => ({
  values: "0;0;1;1;0",
  keyTimes: `0;${a};${a + 0.06};${b};1`,
  dur: `${CYCLE}s`,
});

function Fade({ a, b = 0.92, children }: { a: number; b?: number; children: ReactNode }) {
  const s = seq(a, b);
  return (
    <g opacity={0}>
      <animate
        attributeName="opacity"
        values={s.values}
        keyTimes={s.keyTimes}
        dur={s.dur}
        repeatCount="indefinite"
      />
      {children}
    </g>
  );
}

function Listen() {
  return (
    <>
      <Fade a={0.04}>
        <rect x={36} y={50} width={350} height={76} rx={22} fill="#1B2033" />
        <text x={58} y={95} fill="#fff" fontSize={19} fontWeight={600}>
          Quiero vender más por internet
        </text>
      </Fade>
      <Fade a={0.24}>
        <rect x={240} y={150} width={364} height={76} rx={22} fill={COBALT} />
        <text x={262} y={195} fill="#fff" fontSize={19} fontWeight={600}>
          ¿Qué proceso te quita más tiempo?
        </text>
      </Fade>
      <Fade a={0.44}>
        <rect x={36} y={250} width={300} height={76} rx={22} fill="#1B2033" />
        <text x={58} y={295} fill="#fff" fontSize={19} fontWeight={600}>
          Los pedidos, a mano
        </text>
      </Fade>
      <Fade a={0.64}>
        <rect
          x={36}
          y={352}
          width={210}
          height={52}
          rx={26}
          fill="none"
          stroke={GREEN}
          strokeWidth={3}
        />
        <path
          d="M 62 378 L 72 388 L 90 366"
          fill="none"
          stroke={GREEN}
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x={104} y={386} fill={GREEN} fontSize={19} fontWeight={700}>
          Brief claro
        </text>
      </Fade>
    </>
  );
}

function Design() {
  const dash = { strokeDasharray: "8 8" } as const;
  return (
    <>
      <rect
        x={50}
        y={40}
        width={540}
        height={360}
        rx={18}
        fill="#0D1018"
        stroke="#2A3042"
        strokeWidth={2}
      />
      <rect x={50} y={40} width={540} height={36} rx={18} fill="#161B2A" />
      <Fade a={0.02}>
        <rect
          x={76}
          y={96}
          width={170}
          height={20}
          rx={10}
          fill="none"
          stroke={BLUE}
          strokeWidth={2.5}
          {...dash}
        />
        <rect
          x={470}
          y={96}
          width={90}
          height={20}
          rx={10}
          fill="none"
          stroke={BLUE}
          strokeWidth={2.5}
          {...dash}
        />
      </Fade>
      <Fade a={0.18}>
        <rect
          x={76}
          y={140}
          width={300}
          height={104}
          rx={14}
          fill="none"
          stroke={CREAM}
          strokeWidth={2.5}
          {...dash}
        />
        <rect
          x={400}
          y={140}
          width={160}
          height={104}
          rx={14}
          fill="none"
          stroke={CREAM}
          strokeWidth={2.5}
          {...dash}
        />
      </Fade>
      <Fade a={0.36}>
        {[0, 1, 2].map((k) => (
          <rect
            key={k}
            x={76 + k * 166}
            y={272}
            width={150}
            height={104}
            rx={14}
            fill="none"
            stroke={BLUE}
            strokeWidth={2.5}
            {...dash}
          />
        ))}
      </Fade>
      <Fade a={0.54}>
        <text x={90} y={198} fill={CREAM} fontSize={19} fontWeight={700}>
          Estructura
        </text>
        <text x={90} y={330} fill="#9CC2FF" fontSize={19} fontWeight={700}>
          Contenido
        </text>
        <path d="M 478 340 L 478 340" stroke={CREAM} />
      </Fade>
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="120 100;340 190;180 330;120 100"
          dur={`${CYCLE}s`}
          repeatCount="indefinite"
        />
        <path
          d="M 0 0 L 0 26 L 7 20 L 12 32 L 17 30 L 12 18 L 21 18 Z"
          fill="#fff"
          stroke="#09090B"
          strokeWidth={2}
        />
      </g>
    </>
  );
}

function Build() {
  const lines: [string, string][] = [
    ["$ npm run build", CREAM],
    ["✓ Componentes tipados", GREEN],
    ["✓ APIs conectadas", GREEN],
    ["✓ Base de datos lista", GREEN],
    ["✓ Integraciones activas", GREEN],
  ];
  return (
    <>
      <rect
        x={40}
        y={40}
        width={560}
        height={360}
        rx={18}
        fill="#0D1018"
        stroke="#2A3042"
        strokeWidth={2}
      />
      <circle cx={68} cy={66} r={7} fill="#FF5F57" />
      <circle cx={92} cy={66} r={7} fill="#FEBC2E" />
      <circle cx={116} cy={66} r={7} fill="#28C840" />
      {lines.map(([t, c], i) => (
        <Fade key={t} a={0.04 + i * 0.13}>
          <text
            x={68}
            y={124 + i * 44}
            fill={c}
            fontSize={21}
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontWeight={600}
          >
            {t}
          </text>
        </Fade>
      ))}
      <rect x={68} y={350} width={504} height={16} rx={8} fill="#1B2033" />
      <rect x={68} y={350} width={0} height={16} rx={8} fill={BLUE} filter="url(#pg)">
        <animate
          attributeName="width"
          values="0;504;504;0"
          keyTimes="0;0.7;0.95;1"
          dur={`${CYCLE}s`}
          repeatCount="indefinite"
        />
      </rect>
    </>
  );
}

function Publish() {
  const rings = ["Rendimiento", "SEO", "Accesibilidad"];
  const C = 2 * Math.PI * 38;
  return (
    <>
      <rect
        x={50}
        y={30}
        width={540}
        height={230}
        rx={18}
        fill="#0D1018"
        stroke="#2A3042"
        strokeWidth={2}
      />
      <rect x={50} y={30} width={540} height={46} rx={18} fill="#161B2A" />
      <rect x={72} y={42} width={330} height={22} rx={11} fill="#0D1018" />
      <circle cx={90} cy={53} r={5} fill={GREEN} />
      <text x={104} y={59} fill="#C9CFE0" fontSize={16} fontWeight={600}>
        tuweb.com
      </text>
      <rect x={76} y={100} width={250} height={26} rx={13} fill="#1B2033" />
      <rect x={76} y={142} width={400} height={14} rx={7} fill="#1B2033" />
      <rect x={76} y={166} width={340} height={14} rx={7} fill="#1B2033" />
      <g>
        <rect x={388} y={96} width={190} height={42} rx={21} fill={GREEN} opacity={0.18}>
          <animate
            attributeName="opacity"
            values="0.18;0.4;0.18"
            dur="2s"
            repeatCount="indefinite"
          />
        </rect>
        <circle cx={410} cy={117} r={7} fill={GREEN} />
        <text x={426} y={124} fill={GREEN} fontSize={18} fontWeight={800}>
          En producción
        </text>
      </g>
      {rings.map((r, i) => (
        <g key={r} transform={`translate(${112 + i * 208} 340)`}>
          <circle r={38} fill="none" stroke="#1B2033" strokeWidth={9} />
          <circle
            r={38}
            fill="none"
            stroke={GREEN}
            strokeWidth={9}
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C}
            transform="rotate(-90)"
            filter="url(#pg)"
          >
            <animate
              attributeName="stroke-dashoffset"
              values={`${C};${C};0;0;${C}`}
              keyTimes={`0;${0.05 + i * 0.12};${0.3 + i * 0.12};0.92;1`}
              dur={`${CYCLE}s`}
              repeatCount="indefinite"
            />
          </circle>
          <path
            d="M -12 2 L -4 10 L 13 -9"
            fill="none"
            stroke="#fff"
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x={0} y={68} textAnchor="middle" fill="#C9CFE0" fontSize={17} fontWeight={700}>
            {r}
          </text>
        </g>
      ))}
    </>
  );
}

function Grow() {
  const line =
    "M 70 360 C 130 350 160 320 210 290 C 260 260 280 270 320 220 C 360 170 380 190 420 120 L 440 100";
  return (
    <>
      <text x={60} y={50} fill={CREAM} fontSize={19} fontWeight={700}>
        Visitas orgánicas
      </text>
      <path d="M 60 80 V 370 H 450" stroke="#2A3042" strokeWidth={3} fill="none" />
      {[140, 220, 300].map((y) => (
        <line key={y} x1={60} y1={y} x2={450} y2={y} stroke="#1C2132" strokeWidth={2} />
      ))}
      <path d={`${line} L 440 370 L 70 370 Z`} fill={BLUE} opacity={0.12} />
      <path
        d={line}
        fill="none"
        stroke={BLUE}
        strokeWidth={6}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        filter="url(#pg)"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="1;1;0;0;1"
          keyTimes="0;0.05;0.6;0.92;1"
          dur={`${CYCLE}s`}
          repeatCount="indefinite"
        />
      </path>
      <circle r={9} fill={CREAM} filter="url(#pg)">
        <animateMotion
          dur={`${CYCLE}s`}
          keyPoints="0;0;1;1;0"
          keyTimes="0;0.05;0.6;0.92;1"
          calcMode="linear"
          repeatCount="indefinite"
          path={line}
        />
      </circle>

      <g>
        <rect
          x={476}
          y={78}
          width={140}
          height={128}
          rx={16}
          fill="#12151F"
          stroke="#2A3042"
          strokeWidth={2}
        />
        <rect x={490} y={94} width={66} height={26} rx={13} fill={COBALT} />
        <text x={523} y={113} textAnchor="middle" fill="#fff" fontSize={16} fontWeight={800}>
          SEO
        </text>
        <rect x={490} y={136} width={106} height={10} rx={5} fill="#2A3042" />
        <rect x={490} y={156} width={80} height={10} rx={5} fill="#2A3042" />
        <rect x={490} y={176} width={96} height={10} rx={5} fill="#2A3042" />
      </g>
      <g>
        <rect
          x={476}
          y={236}
          width={140}
          height={74}
          rx={16}
          fill="#12151F"
          stroke={GREEN}
          strokeWidth={2.5}
        />
        <circle cx={502} cy={273} r={8} fill={GREEN}>
          <animate attributeName="r" values="7;11;7" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <text x={522} y={269} fill="#fff" fontSize={16} fontWeight={700}>
          Flujo
        </text>
        <text x={522} y={290} fill="#9AA3B8" fontSize={15}>
          activo
        </text>
      </g>
    </>
  );
}

export function ProcessStage({ active }: { active: number }) {
  const scenes: [string, ReactNode][] = [
    ["Conversación para entender el negocio", <Listen key="l" />],
    ["Boceto de la estructura de la web", <Design key="d" />],
    ["Compilación del proyecto", <Build key="b" />],
    ["Web publicada y comprobada", <Publish key="p" />],
    ["Crecimiento orgánico y automatización", <Grow key="g" />],
  ];
  return (
    <div className="relative aspect-[640/440] w-full overflow-hidden rounded-[24px] border-2 border-white/80 bg-[#080A10] shadow-[8px_8px_0_#0044FF]">
      {scenes.map(([label, node], i) => (
        <Frame key={label} label={label} on={i === active}>
          {node}
        </Frame>
      ))}
    </div>
  );
}
