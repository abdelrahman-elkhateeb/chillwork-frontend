import { Button } from "@workspace/ui/components/button"

export function Cta() {
  return (
    <section id="demo" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-[720px] px-4 text-center md:px-8">
        <h2 className="font-heading text-[28px] font-bold leading-[1.05] tracking-[-0.024em] md:text-[44px]">
          Bring us last week&apos;s messiest job.
        </h2>
        <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-relaxed text-muted-foreground md:text-[16px]">
          The one with three units, a part nobody wrote down and a customer
          who argued at the end. We will run it through ChillWork in front of
          you and you can tell us where it breaks.
        </p>

        <div className="mx-auto mt-8 flex max-w-[280px] flex-col gap-3">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-[6px] text-[15px] font-semibold md:h-[54px] md:text-base"
          >
            <a href="#demo">Book a demo</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 rounded-[6px] text-[15px] font-semibold md:h-[54px] md:text-base"
          >
            <a href="tel:+00000000000">Call us instead</a>
          </Button>
          <p className="mt-1 text-[12px] text-muted-foreground">
            No card, no trial clock.
          </p>
        </div>
      </div>
    </section>
  )
}
