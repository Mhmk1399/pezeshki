import Gallery from "@/components/Gallery"
import Link from "next/link"

export default function Page() {
  // Sidebar data
  const sidebarCategories = [
    {
      title: "دسته‌بندی مقالات",
      links: [
        { text: "سلامت و زیبایی", href: "/blog/health-beauty" },
        { text: "تغذیه", href: "/blog/nutrition" },
        { text: "مراقبت پوست", href: "/blog/skin-care" },
        { text: "مراقبت مو", href: "/blog/hair-care" },
        { text: "آرایش", href: "/blog/makeup" }
      ]
    },
    {
      title: "مقالات پربازدید",
      links: [
        { text: "راهنمای انتخاب محصولات مراقبت پوست", href: "/blog/skin-care-guide" },
        { text: "بهترین روش‌های آرایش صورت", href: "/blog/makeup-tips" },
        { text: "تغذیه مناسب برای پوست سالم", href: "/blog/nutrition-for-skin" },
        { text: "روش‌های طبیعی تقویت مو", href: "/blog/natural-hair-care" },
        { text: "اصول پایه آرایش چشم", href: "/blog/eye-makeup-basics" }
      ]
    },
    {
      title: "آخرین مطالب",
      links: [
        { text: "ترندهای آرایشی سال ۱۴۰۲", href: "/blog/makeup-trends-2023" },
        { text: "محصولات جدید مراقبت پوست", href: "/blog/new-skincare-products" },
        { text: "راهنمای خرید لوازم آرایش", href: "/blog/makeup-buying-guide" },
        { text: "روش‌های درمان خانگی مشکلات پوستی", href: "/blog/home-remedies-skin" },
        { text: "مراقبت از پوست در فصل تابستان", href: "/blog/summer-skincare" }
      ]
    }
  ];

  return(
    <>
      {/* parent container */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="w-full lg:w-3/4 order-2 lg:order-1">
            <h1 className="text-3xl font-bold text-pink-500 mb-6 text-center lg:text-right">مجله آموزشی</h1>
            <p className="text-gray-600 mb-8 text-center lg:text-right">
              آخرین مقالات و راهنماهای تخصصی در حوزه سلامت و زیبایی را در اینجا مطالعه کنید
            </p>
            <Gallery />
          </div>
          
          {/* Sidebar - using map function */}
          <div className="w-full lg:w-1/4 order-1 lg:order-2">
            <div className="flex flex-col gap-6 sticky top-4">
              {sidebarCategories.map((category, index) => (
                <div key={index} className="flex flex-col gap-5 p-5 border-2 border-pink-200 rounded-lg shadow-md bg-white">
                  <div className="py-3 px-8 bg-pink-200 rounded-full shadow-md">
                    <h3 className="text-pink-500 text-center font-bold">{category.title}</h3>
                  </div>
                  <div className="flex flex-col gap-3" dir="rtl">
                    {category.links.map((link, linkIndex) => (
                      <Link 
                        key={linkIndex} 
                        href={link.href}
                        className="hover:text-pink-500 transition-colors py-1 border-b border-gray-100 last:border-0"
                      >
                        {link.text}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Newsletter subscription box */}
              <div className="flex flex-col gap-5 p-5 border-2 border-pink-200 rounded-lg shadow-md bg-white">
                <div className="py-3 px-8 bg-pink-200 rounded-full shadow-md">
                  <h3 className="text-pink-500 text-center font-bold">عضویت در خبرنامه</h3>
                </div>
                <p className="text-gray-600 text-sm text-center">
                  برای دریافت آخرین مقالات و اخبار، در خبرنامه ما عضو شوید
                </p>
                <form className="flex flex-col gap-3">
                  <input 
                    type="email" 
                    placeholder="ایمیل خود را وارد کنید" 
                    className="border border-gray-300 rounded-md p-2 text-right"
                    dir="rtl"
                  />
                  <button 
                    type="submit" 
                    className="bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition-colors"
                  >
                    عضویت
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
