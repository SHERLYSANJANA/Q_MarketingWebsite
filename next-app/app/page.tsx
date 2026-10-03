import { markup } from "@/components/markup";

// The experience is authored as one self-contained document (markup + /public/q.js).
// Server-rendering the markup keeps first paint instant; q.js hydrates the interactions.
export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
