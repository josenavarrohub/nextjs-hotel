import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

// Components
import Section from '@/app/_components/Section'
import Logo from '@/app/_components/Logo'

// Metadata
export const metadata: Metadata = { title: 'About' }

export default async function Page() {
  const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME

  return (
    <>
      <Section bgColor='grey'>
        <h1 className='heading-2 text-center lg:mb-14'>About The {projectName}</h1>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-24'>
          <div className='relative aspect-video'>
            <Image
              src='/about/1.jpg'
              alt='Luxurious hotel lobby'
              fill
              className='rounded-lg object-cover shadow-md'
              priority
            />
          </div>

          <div>
            <h2 className='heading-3'>Discover Our Legacy</h2>
            <div className='space-y-4'>
              <p>
                At {projectName}, we are dedicated to providing an unparalleled experience nestled
                in the heart of luxury. Our meticulously crafted rooms and world-class amenities are
                designed to offer a stay that&apos;s both unforgettable and uniquely refined.
              </p>
              <p>
                Our storied heritage is steeped in tradition and elegance, ensuring every guest
                enjoys exceptional comfort and attentive service. Whether you seek relaxation or
                adventure, our passionate team is committed to crafting a memorable experience
                tailored to your desires.
              </p>
              <p>
                Immerse yourself in our rich history and discover why {projectName} stands as a
                symbol of timeless sophistication and grace.
              </p>
            </div>
          </div>

          <div className='relative aspect-video lg:order-2'>
            <Image
              src='/about/2.jpg'
              alt='Elegant room with a view'
              fill
              className='rounded-lg object-cover shadow-md'
            />
          </div>

          <div className='lg:order-1'>
            <h2 className='heading-3'>Experience Unmatched Comfort</h2>
            <div className='space-y-4'>
              <p>
                Our rooms are a haven of comfort and sophistication, meticulously designed to
                provide an ideal retreat. Each space blends modern amenities with classic style,
                creating an ambiance of refined luxury.
              </p>
              <p>
                Enjoy stunning vistas, plush furnishings, and thoughtful details that enhance every
                moment of your stay. Every aspect of our accommodations is crafted to surpass your
                expectations and offer an unparalleled level of relaxation.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className='flex flex-col lg:flex-row lg:gap-x-20'>
          <div className='mb-4 flex flex-col items-center justify-center lg:mb-20'>
            <Logo />
          </div>

          <div className='space-y-6'>
            <h2 className='heading-2 text-center lg:text-left'>Discover More About Us</h2>
            <p>
              At {projectName}, every visit is a journey into unparalleled luxury and comfort. We
              invite you to delve deeper into the exceptional offerings that define our unique
              accommodations. From our elegantly designed rooms to our bespoke amenities, each
              aspect of our hotel is crafted to deliver an unforgettable experience.
            </p>
            <p>
              Whether you are seeking a serene escape or a vibrant adventure, {projectName} promises
              to exceed your expectations with our attentive service and refined elegance. Our
              commitment to excellence ensures that every moment of your stay is met with the
              highest standards of hospitality and care.
            </p>
            <p>
              Explore our diverse range of rooms and discover the perfect retreat that suits your
              needs. Learn more about what makes {projectName} a premier destination for those who
              appreciate the finer things in life.
            </p>
            <div className='pt-10 text-center'>
              <Link href='/rooms' className='button'>
                See Our Rooms
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
