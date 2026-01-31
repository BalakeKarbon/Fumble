"use client";

import ProfileCard from "./ProfileCard";
import PromptCard from "./PromptCard";
import VitalsCard from "./VitalsCard";
import PhotoCard from "./PhotoCard";
import SwipeableCard from "./SwipeableCard";

export default function SwipingView() {
  return (
    <div className="flex flex-col gap-3 p-3 pb-24 overflow-x-hidden">
      {/* 1. Hero Profile Card */}
      <SwipeableCard onLike={() => console.log("Liked Profile Photo")} onNope={() => console.log("Noped Profile Photo")}>
        <ProfileCard
          name="Rylee Johnston"
          imageSrc="/profile-main.png"
          tags={["Looksmaxing", "Trapezing", "Donating to Charity"]}
        />
      </SwipeableCard>

      {/* 2. Prompt */}
      <SwipeableCard onLike={() => console.log("Liked Prompt 1")} onNope={() => console.log("Noped Prompt 1")}>
        <PromptCard
          question="A fun fact about me"
          answer="I once ate a whole pizza in one sitting and didn't regret it."
        />
      </SwipeableCard>

      {/* 3. Vitals */}
      <SwipeableCard onLike={() => console.log("Liked Vitals")} onNope={() => console.log("Noped Vitals")}>
        <VitalsCard
          age={24}
          height="5'7&quot;"
          stereotype="Gamer"
          profession="Product Designer"
          location="Brooklyn, NY"
          relationshipType="Monogamy"
        />
      </SwipeableCard>

      {/* 4. Photo */}
      <SwipeableCard onLike={() => console.log("Liked Photo 1")} onNope={() => console.log("Noped Photo 1")}>
        <PhotoCard />
      </SwipeableCard>

      {/* 5. Photo */}
      <SwipeableCard onLike={() => console.log("Liked Photo 2")} onNope={() => console.log("Noped Photo 2")}>
        <PhotoCard />
      </SwipeableCard>

      {/* 6. Prompt */}
      <SwipeableCard onLike={() => console.log("Liked Prompt 2")} onNope={() => console.log("Noped Prompt 2")}>
        <PromptCard
          question="Dating me is like"
          answer="Finding a needle in a haystack, but the needle is made of chocolate."
        />
      </SwipeableCard>

      {/* 7. Photo */}
      <SwipeableCard onLike={() => console.log("Liked Photo 3")} onNope={() => console.log("Noped Photo 3")}>
        <PhotoCard />
      </SwipeableCard>

      {/* 8. Prompt */}
      <SwipeableCard onLike={() => console.log("Liked Prompt 3")} onNope={() => console.log("Noped Prompt 3")}>
        <PromptCard
          question="My simple pleasures"
          answer="Morning coffee, sunset walks, and the smell of old books."
        />
      </SwipeableCard>

      {/* 9. Photo */}
      <SwipeableCard onLike={() => console.log("Liked Photo 4")} onNope={() => console.log("Noped Photo 4")}>
        <PhotoCard />
      </SwipeableCard>

      {/* 10. Photo */}
      <SwipeableCard onLike={() => console.log("Liked Photo 5")} onNope={() => console.log("Noped Photo 5")}>
        <PhotoCard />
      </SwipeableCard>
    </div>
  );
}
