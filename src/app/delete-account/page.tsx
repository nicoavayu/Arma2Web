import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
    title: "Eliminación de cuenta | Arma2",
    description:
        "Información pública para solicitar la eliminación de tu cuenta de Arma2 desde la app o por email.",
    alternates: {
        canonical: "/delete-account",
    },
};

const deletionOptions = [
    {
        title: "1. Desde la aplicación",
        items: [
            "Abrí Arma2.",
            "Ingresá a tu perfil o configuración.",
            "Seleccioná la opción para eliminar tu cuenta.",
        ],
    },
    {
        title: "2. Desde la web",
        items: [
            "Enviá una solicitud a arma2app@gmail.com.",
            "Asunto sugerido: Eliminar cuenta Arma2.",
            "Incluí el correo electrónico asociado a tu cuenta para poder identificarla.",
        ],
    },
];

const deletedData = [
    "Tu cuenta de usuario.",
    "Los datos de perfil asociados a la cuenta.",
    "Los datos vinculados al uso de la aplicación, salvo aquellos que debamos conservar temporalmente por motivos legales, seguridad, prevención de fraude o cumplimiento normativo.",
];

export default function DeleteAccountPage() {
    return (
        <main className="min-h-screen bg-background pt-20 md:pt-24">
            <Section className="py-12 md:py-16">
                <div className="container mx-auto max-w-4xl">
                    <div className="rounded-3xl border border-white/10 bg-surface/60 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-sm md:p-10">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-primary">
                            Arma2
                        </p>
                        <h1 className="mb-4 text-3xl font-bold text-white md:text-5xl">
                            Eliminación de cuenta - Arma2
                        </h1>
                        <p className="max-w-3xl text-base leading-7 text-text-secondary md:text-lg">
                            Si deseás solicitar la eliminación de tu cuenta de Arma2 y los datos asociados,
                            podés hacerlo directamente desde la app o por fuera de la aplicación por email.
                            También podés eliminar tu cuenta desde la propia app, sin necesidad de escribirnos.
                            Esta página pública está disponible para que puedas iniciar el proceso por cualquiera de esos medios.
                        </p>
                        <p className="mt-4 text-sm text-text-secondary">
                            Última actualización: abril de 2026
                        </p>
                    </div>

                    <div className="mt-8 grid gap-6 md:grid-cols-2">
                        {deletionOptions.map((option) => (
                            <section
                                key={option.title}
                                className="rounded-3xl border border-white/8 bg-surface/40 p-6 md:p-8"
                            >
                                <h2 className="mb-4 text-2xl font-semibold text-white">
                                    {option.title}
                                </h2>
                                <ul className="space-y-3 text-base leading-7 text-text-secondary">
                                    {option.items.map((item) => (
                                        <li key={item} className="flex gap-3">
                                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}
                    </div>

                    <div className="mt-8 space-y-6">
                        <section className="rounded-3xl border border-white/8 bg-surface/40 p-6 md:p-8">
                            <h2 className="mb-4 text-2xl font-semibold text-white">
                                Qué datos se eliminan
                            </h2>
                            <ul className="space-y-3 text-base leading-7 text-text-secondary">
                                {deletedData.map((item) => (
                                    <li key={item} className="flex gap-3">
                                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="rounded-3xl border border-white/8 bg-surface/40 p-6 md:p-8">
                            <h2 className="mb-4 text-2xl font-semibold text-white">
                                Retención de datos
                            </h2>
                            <p className="text-base leading-7 text-text-secondary">
                                Algunos datos pueden conservarse durante un período limitado cuando sea necesario
                                por motivos legales, de seguridad, prevención de fraude o cumplimiento normativo.
                            </p>
                        </section>

                        <section className="rounded-3xl border border-white/8 bg-surface/40 p-6 md:p-8">
                            <h2 className="mb-4 text-2xl font-semibold text-white">
                                Contacto
                            </h2>
                            <p className="text-base leading-7 text-text-secondary">
                                Si necesitás ayuda adicional con la eliminación de tu cuenta de Arma2, escribinos a:
                            </p>
                            <a
                                href="mailto:arma2app@gmail.com?subject=Eliminar%20cuenta%20Arma2"
                                className="mt-5 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                            >
                                arma2app@gmail.com
                            </a>
                        </section>
                    </div>
                </div>
            </Section>
        </main>
    );
}
