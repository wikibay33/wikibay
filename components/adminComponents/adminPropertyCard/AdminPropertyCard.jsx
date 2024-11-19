import DeleteUpdateButtons from "@/components/update-software/DeleteUpdateButtons";
import Link from "next/link";
import Image from "next/image";
export default function AdminPropertyCard({ property, showAs, setData }) {
  return (
      <div className='flex flex-col border-2 border-gray-600 p-2 rounded-lg'>
          <Link href={`/softwares/${software._id}`}>
              <div className={`relative z-1 ${showAs === 'table' ? 'flex justify-start items-center gap-4' : ''}`}>
                  <Image
                      width={1000} height={1000}
                      src={property.images[0]?.secure_url}
                      alt="image"
                      className={`min-h-60 max-h-60 ${showAs === 'table' ? 'w-1/4' : 'w-full'} h-auto object-cover rounded-lg `}
                  />
                  <div className='flex flex-col justify-start items-start gap-4'>
                      <div className='font-semibold'>الاسم: {property.generalInfo.name}</div>
                      <div className='font-semibold'>الموقع: {property.generalInfo.location}</div>
                      <div className='font-semibold'>المطور: {property.generalInfo.developer}</div>
                  </div>
              </div>
          </Link>
          <DeleteUpdateButtons id={property._id} setData={setData} />
      </div>
  );
}
