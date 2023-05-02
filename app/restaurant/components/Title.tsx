interface Props{
  title:string
}

export default function Title({title}:Props) {
  return (
    <div className="mt-4 border-b pb-6">
      <h1 className="font-bold text-6xl">{title}</h1>
    </div>
  )
}
