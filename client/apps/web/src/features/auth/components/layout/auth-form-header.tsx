type Props = {
  title: string
  description: string
}

export function AuthFormHeader({ title, description }: Props) {
  return (
    <div>
      <h1 className="text-[27px] leading-[1.1] font-bold">{title}</h1>
      <p className="mt-2.5 text-[15px] leading-[1.55] text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
