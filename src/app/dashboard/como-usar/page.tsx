import { ComoUsarGuide } from "@/components/ComoUsarGuide";

export const metadata = {
  title: "Como Usar · 171 ScreenS",
  description: "Guia passo a passo: login, curso, aulas e download do app scanner",
};

export default function ComoUsarPage() {
  return (
    <div className="p-6 md:p-10">
      <ComoUsarGuide />
    </div>
  );
}
