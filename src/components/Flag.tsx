export function Flag({ code }: { code: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 30 20"
      className="h-[22px] w-[33px] shrink-0 rounded-[3px] border-[1.5px] border-[#09090B]"
    >
      {code === "es" ? (
        <>
          <rect width="30" height="20" fill="#C8102E" />
          <rect y="5" width="30" height="10" fill="#FCD116" />
        </>
      ) : code === "ca" ? (
        <>
          <rect width="30" height="20" fill="#FCD116" />
          <g fill="#C8102E">
            <rect y="2.22" width="30" height="2.22" />
            <rect y="6.67" width="30" height="2.22" />
            <rect y="11.11" width="30" height="2.22" />
            <rect y="15.56" width="30" height="2.22" />
          </g>
        </>
      ) : (
        <>
          <rect width="30" height="20" fill="#1F3A8A" />
          <path d="M0 0L30 20M30 0L0 20" stroke="#fff" strokeWidth="3.4" />
          <path d="M0 0L30 20M30 0L0 20" stroke="#C8102E" strokeWidth="1.2" />
          <path d="M15 0V20M0 10H30" stroke="#fff" strokeWidth="6" />
          <path d="M15 0V20M0 10H30" stroke="#C8102E" strokeWidth="3.4" />
        </>
      )}
    </svg>
  );
}
