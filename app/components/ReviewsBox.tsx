import React from "react";
import ReviewCard from "./ReviewCard";
import Subtitle from "./Subtitle";

const ReviewsBox = () => {
  return (
    <div>
      <div className="flex flex-col items-center space-y-12 p-12 drop-shadow-2xl">
        <Subtitle text="Latest Reviews" />
        <ReviewCard
          restaurant="Molly's Diner"
          city="San Diego, CA"
          review="The bathroom was so clean! No line and nice decor."
          userImage="/img/avatar-ali.png"
        />
        <ReviewCard
          restaurant="Old Town Cafe"
          city="San Francisco, CA"
          review="No toilet paper. Unbelievable."
          userImage="/img/avatar-richard.png"
        />
        <ReviewCard
          restaurant="Falafel King"
          city="Chicago, IL"
          review="Super appreciate the baby-changing station."
          userImage="/img/avatar-anisha.png"
        />
      </div>
    </div>
  );
};

export default ReviewsBox;
