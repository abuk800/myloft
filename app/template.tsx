/**
 * Seitenübergang: nur eine kurze Verschiebung per CSS (kein opacity:0 im ausgelieferten HTML,
 * damit Inhalte auch ohne JavaScript und für die LCP-Messung sofort sichtbar sind).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
