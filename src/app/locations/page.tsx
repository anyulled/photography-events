import { Metadata } from "next";
import { title } from "@/components/constants";
import { faker } from "@faker-js/faker";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: title + " Location List",
};

const products = Array.from({ length: 12 }, () => {
  return {
    city: faker.location.city(),
    country: faker.location.country(),
    id: faker.string.uuid(),
    imageSrc() {
      return faker.image.urlLoremFlickr({
        category: this.country.toLowerCase().replaceAll(" ", "-"),
      });
    },
  };
});

export default function LocationList() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only text-orange-500 text-2xl">Locations</h2>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/locations/${product.city}`}
            className="group"
          >
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <Image
                alt={product.city}
                src={product.imageSrc()}
                fill={true}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.country}</h3>
            <p className="mt-1 text-lg font-medium text-orange-900">
              {product.city}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
