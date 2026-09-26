type Props = {
  title: string
  description?: string
}

export function StepHeading({ title, description }: Props) {
  return (
    <div>
      <h1 className="text-[24px] leading-[1.1] font-bold md:text-[28px]">
        {title}
      </h1>
      {description ? (
        <p className="mt-2.5 max-w-[620px] text-[15px] leading-[1.55] text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  )
}
