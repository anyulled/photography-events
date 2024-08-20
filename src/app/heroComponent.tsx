import OrangeTextButton from "@/components/ui/Button/OrangeTextButton";

export function HeroComponent() {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-yellow-500 py-20 px-10 rounded-2xl">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-4">
          📸 Photography Events
        </h1>
        <p className="text-lg text-white mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
          justo ac massa malesuada, vel bibendum velit bibendum.
        </p>
        <OrangeTextButton text="Register" url={"/register"} />
      </div>
    </div>
  );
}
