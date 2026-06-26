/** Imagem segura — evita bug do Next/Image fill estourando layout */
export function SafeLessonImage({
  src,
  alt,
  variant = "thumb",
  className = "",
}: {
  src: string;
  alt: string;
  variant?: "thumb" | "banner" | "content";
  className?: string;
}) {
  if (variant === "thumb") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        width={80}
        height={56}
        loading="lazy"
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  if (variant === "banner") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full max-h-40 object-cover object-top opacity-50 ${className}`}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`w-full max-h-[420px] object-contain bg-black/60 ${className}`}
    />
  );
}
