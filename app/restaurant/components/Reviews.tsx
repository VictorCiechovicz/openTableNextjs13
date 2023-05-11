import { Review } from '@prisma/client'
import ReviewCard from './ReviewCard'

interface ReviewsProps {
  reviews: Review[]
}

export default function Review({ reviews }: ReviewsProps) {
  return (
    <div>
      {!reviews.length ? (
        <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
          There aren't Reviews for this Restaurant
        </h1>
      ) : (
        <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
          What {reviews.length} {reviews.length === 1 ? 'personal' : 'people'} are saying
        </h1>
      )}

      <div>
        <ReviewCard reviews={reviews} />
      </div>
    </div>
  )
}
