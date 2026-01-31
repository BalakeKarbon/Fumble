"use client";

import ProfileCard from "./ProfileCard";
import PromptCard from "./PromptCard";
import VitalsCard from "./VitalsCard";
import PhotoCard from "./PhotoCard";

export default function SelfProfileView() {
  return (
    <div className="flex flex-col gap-3 p-3 pb-24 overflow-x-hidden">
      {/* Header */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-zinc-100 mb-2">
        <h1 className="text-xl font-bold text-center">My Profile</h1>
        <p className="text-center text-zinc-500 text-sm">Preview mode</p>
      </div>

      {/* 1. Hero Profile Card - Static */}
      <ProfileCard
        name="User One"
        imageSrc="/profile-main.png"
        tags={["Coding", "Design", "Coffee"]}
      />

      {/* 2. Prompt */}
      <PromptCard
        question="I'm looking for"
        answer="Someone who can center a div without Googling it."
      />

      {/* 3. Vitals */}
      <VitalsCard
        age={28}
        height="6'1&quot;"
        stereotype="Developer"
        profession="Software Engineer"
        location="San Francisco, CA"
        relationshipType="Long-term"
      />

      {/* 4. Photo */}
      <PhotoCard />

      {/* 5. Prompt */}
      <PromptCard
        question="Worst idea I've ever had"
        answer="Thinking I could finish this side project in one weekend."
      />

      {/* 6. Photo */}
      <PhotoCard />
    </div>
  );
}
