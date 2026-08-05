"use client";

import { useState } from "react";

/**
 * Click-to-load YouTube. Keeps the page fast and stops YouTube from
 * tracking every visitor who never presses play.
 */
export default function VideoEmbed({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden border border-bone/15 bg-slate">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full cursor-pointer"
          aria-label={`Play the video: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            alt=""
            className="h-full w-full object-cover opacity-70 transition-opacity duration-500 group-hover:opacity-90"
          />
          <span className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/25 to-transparent" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-20 items-center justify-center rounded-full bg-rose transition-transform duration-300 group-hover:scale-110 md:size-24">
              <svg viewBox="0 0 24 24" className="ml-1 size-7 fill-bone md:size-8" aria-hidden="true">
                <path d="M5 3.5v17l15-8.5z" />
              </svg>
            </span>
          </span>
          <span className="absolute inset-x-0 bottom-0 p-5 text-left md:p-7">
            <span className="eyebrow block !text-bone/70">Watch</span>
            <span className="display d3 mt-2 block text-bone">{title}</span>
          </span>
        </button>
      )}
    </div>
  );
}
