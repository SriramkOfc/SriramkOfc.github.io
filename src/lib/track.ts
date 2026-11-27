// GoatCounter custom events (https://www.goatcounter.com/help/events). No-op if the script is blocked or not loaded yet.
type GoatCounter = { count?: (vars: { path: string; title: string; event: boolean }) => void };

export const track = (path: string, title: string) => {
  (window as unknown as { goatcounter?: GoatCounter }).goatcounter?.count?.({ path, title, event: true });
};
