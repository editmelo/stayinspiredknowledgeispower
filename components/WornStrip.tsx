import Image from "next/image";

/**
 * Real customers, real families. These photos are the most convincing thing
 * on the site, so they get a full-bleed strip that drifts on its own.
 * With reduced motion the animation stops and the row simply scrolls by hand.
 */
const shots = [
  { src: "/photos/family-aprons.jpg", alt: "Three family members wearing Master Chef aprons" },
  { src: "/photos/two-wearers.jpg", alt: "Two people in winged-guitar tees" },
  { src: "/photos/miriam-portrait.jpg", alt: "A supporter wearing the winged-guitar tee" },
  { src: "/photos/elder-wearer.jpg", alt: "An older woman at home in a winged-guitar tee" },
  { src: "/photos/vendor-booth.jpg", alt: "The Rock Out for Mental Health vendor booth at a community event" },
  { src: "/photos/red-apron-grill.jpg", alt: "A supporter in a red apron at the grill" },
  { src: "/photos/stay-well-tee.jpg", alt: "A young person wearing a Stay Well tee" },
  { src: "/photos/apron-utensils.jpg", alt: "A supporter in an apron holding kitchen utensils" },
  { src: "/photos/studio-tee.jpg", alt: "Studio shot of the winged-guitar tee" },
];

export default function WornStrip() {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[0, 1].map((pass) => (
          <div className="marquee-group" key={pass} aria-hidden={pass === 1}>
            {shots.map((s) => (
              <figure key={`${pass}-${s.src}`} className="marquee-item">
                <Image
                  src={s.src}
                  alt={pass === 1 ? "" : s.alt}
                  width={640}
                  height={800}
                  sizes="320px"
                  className="h-full w-full object-cover"
                />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
