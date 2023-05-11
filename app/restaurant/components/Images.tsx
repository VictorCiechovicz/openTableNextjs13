interface Props {
  images: string[]
}

export default function Images({ images }: Props) {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
        {images.length} photos
      </h1>
      <div className="flex flex-row flex-wrap">
        {images.map(image => (
          <img className="w-40 h-30 mr-1 mb-1" src={image} alt="" />
        ))}
      </div>
    </div>
  )
}
