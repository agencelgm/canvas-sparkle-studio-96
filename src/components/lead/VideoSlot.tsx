import { PlayCircle } from "lucide-react";

interface VideoSlotProps {
  url?: string;
  title: string;
  /** Texte affiche tant que la video n'est pas en ligne. */
  placeholder?: string;
}

const toEmbedUrl = (url: string) => {
  const youtube = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/);
  if (youtube) return `https://www.youtube.com/embed/${youtube[1]}`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return url;
};

const VideoSlot = ({ url, title, placeholder }: VideoSlotProps) => {
  const trimmed = url?.trim();

  if (!trimmed) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-md border border-dashed border-[rgba(240,217,150,0.35)] bg-[#0b1220] p-6 text-center">
        <PlayCircle className="h-10 w-10 text-[#f0d996]" aria-hidden="true" />
        <p className="text-sm font-semibold text-platinum">{title}</p>
        <p className="max-w-md text-xs leading-6 text-platinum/60">
          {placeholder ?? "La video sera disponible ici tres bientot."}
        </p>
      </div>
    );
  }

  const isFile = /\.(mp4|webm|ogg)(\?|$)/i.test(trimmed);

  return (
    <div className="aspect-video w-full overflow-hidden rounded-md border border-[rgba(240,217,150,0.24)] bg-black">
      {isFile ? (
        <video src={trimmed} controls playsInline className="h-full w-full" title={title} />
      ) : (
        <iframe
          src={toEmbedUrl(trimmed)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="h-full w-full border-0"
        />
      )}
    </div>
  );
};

export default VideoSlot;
