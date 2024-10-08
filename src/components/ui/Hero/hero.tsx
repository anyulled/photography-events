export function Hero({
  description,
  title,
}: Readonly<{
  title: string;
  description: string;
}>) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-teal-500 to-orange-500">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
              {title}
            </h1>
            <p className="mx-auto max-w-[700px] text-white md:text-xl">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
