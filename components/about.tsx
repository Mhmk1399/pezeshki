import Image from "next/image";


export default function AboutPage() {
  return (
    <>
      {/* parent div */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-20 justify-center items-center shadow-md rounded-lg max-w-7xl mx-auto mt-20" dir="rtl">
        {/* div image */}
        <div className="flex flex-col gap-8">
          <Image
            src="/image1.jpg"
            width={500}
            height={500}
            alt="Picture of the author"
            className="rounded-lg h-92 w-92"
          />
          <div></div>
          <div></div>
          <div></div>
        </div>

        {/* div text */}
        <div className="flex flex-col gap-8 text-right">
          <h1 className="text-4xl text-pink-300">درباره ما</h1>
          <p className="text-gray-500 max-w-md">
            سالن جادویی صورتی با تیمی مجرب و متخصص در زمینه خدمات زیبایی، به شما
            تجربه‌ای متفاوت از زیبایی و آرامش را ارائه می‌دهد. با استفاده از
            بهترین متریال و تکنیک‌های روز دنیا، هدف ما ایجاد فضایی آرام و مدرن
            است که در آن شما می‌توانید از خدمات میکاپ، کراتینه، طراحی ناخن و
            دیگر خدمات زیبایی بهره‌مند شوید.
          </p>
          <div className="flex justify-start">
          <button className="py-2 px-8 bg-pink-400 text-white rounded-full w-fit text-xl">رزرو نوبت</button>
          </div>
        </div>
      </div>
    </>
  );
}