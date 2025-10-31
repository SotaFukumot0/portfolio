import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import rehypeSlug from "rehype-slug";
import rehypeRaw from 'rehype-raw';
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { 
    Dialog, 
    DialogContent, 
    DialogDescription,
    DialogHeader,
    DialogTitle 
} from "@/components/ui/dialog";
const markdownModules = import.meta.glob('./markdown/*.md', { as: 'raw' });
import ml from './lib/ml.json'

let openDialogTrigger: (str: string | null | undefined) => void = () => {};

export function OpenDialogUI(str: string | null | undefined) {
  openDialogTrigger(str);
}

export default function DialogUI() {
  const [open, setOpen] = useState(false);
  const [markdown, setMarkdown] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    openDialogTrigger = async (str) => {
      if (str && typeof str === "string") {
        setTitle(str);
        const filePath = `./markdown/${str}.md`;
        const loader = markdownModules[filePath];
        // const processedMarkdown = rawMarkdown.replace("[EMAIL_PLACEHOLDER]", email);
        if (loader) {
          const rawMarkdown = await loader();
          const replacedMarkdown = rawMarkdown.replace(
            "[EMAIL_PLACEHOLDER]",
            ml.ml.join("")
          );
          setMarkdown(replacedMarkdown);
        } else {
          setMarkdown(`⚠️ ${filePath} not found`);
        }
        setOpen(true);
      }
    };
  }, []);
  const components = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    img({ src, alt }: any) {
      if (src && src.endsWith(".mp3")) {
        return (
          <div className="my-3">
            <audio controls preload="none" className="w-full rounded-md">
              <source src={src} type="audio/mpeg" />
              {alt || "Audio playback not supported"}
            </audio>
          </div>
        );
      }
      // default
      return <img src={src} alt={alt} className="rounded-md my-3" />;
    },
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-10/12">
        <DialogHeader>
          <DialogTitle className="font-sans3">{title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="[&>table]:table-auto [&>table]:w-auto [&>th]:whitespace-nowrap [&>td]:whitespace-nowrap prose prose-sm dark:prose-invert text-foreground max-w-none overflow-y-auto max-h-[60vh] font-jp">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings,rehypeRaw]}
            components={components}
          >{markdown}</ReactMarkdown>
        </div>
      </DialogContent>
    </Dialog>
  );
}
