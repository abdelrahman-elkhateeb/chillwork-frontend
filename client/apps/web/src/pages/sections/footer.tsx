const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Why jobs lose money", href: "#leaks" },
      { label: "How it works", href: "#flow" },
      { label: "The day board", href: "#dispatch" },
    ],
  },
  {
    heading: "Sign in",
    links: [
      { label: "Customers", href: "#signin" },
      { label: "Your team", href: "#signin" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Contact", href: "#contact" },
      { label: "Privacy", href: "#privacy" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-[#14181A] py-14 text-white">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="/" className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-[3px] bg-primary" aria-hidden="true" />
              <span className="font-heading text-[15px] font-bold tracking-[-0.02em]">
                CHILLWORK
              </span>
            </a>
            <p className="mt-3 max-w-[280px] text-[13px] leading-relaxed text-white/60">
              Job management for AC, refrigeration and appliance repair
              companies.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="font-mono text-[12px] font-medium uppercase tracking-[-0.01em] text-white/50">
                {col.heading}
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] text-white/75 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
