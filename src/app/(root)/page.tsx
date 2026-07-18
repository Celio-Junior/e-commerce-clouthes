// import Image from 'next/image';

export default async function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      <div
        className="w-full h-100 rounded-xl md:aspect-[2.4/1] aspect-square bg-cover flex justify-center items-center"
        style={{
          backgroundImage: 'url(/images/login-img.jpg)',
        }}
      >
        rapa
      </div>

      <div>Features Products</div>
    </div>
  );
}
