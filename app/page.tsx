import Image from 'next/image'
import { CardCar, CustomFilter, Hero, SearchBar, ShowMore } from '@/components'
import { getCars } from '@/utils'
import { fuels, yearsOfProduction } from '@/constants';

export default async function Home({ searchParams }) {

  const fetchCars = await getCars({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
  });
  
  
  const isDataEmpty = !Array.isArray(fetchCars) || fetchCars.length < 1 || !fetchCars;
  

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

      <div className='home__filters'>
        <SearchBar />

        <div className='home__filter-container'>
          <CustomFilter title="fuel" options={fuels} />
          <CustomFilter title="year" options={yearsOfProduction} />
        </div>
      </div>

      {!isDataEmpty ? (
        <section>
          <div className='home__cars-wrapper'>
            {fetchCars?.map((car) => (
              <CardCar key={car.id} car={car} />
            ))}
          </div>

          <ShowMore pageNumber={(searchParams.limit || 10) / 10} isNext={(searchParams.limit || 10) > fetchCars.length} />
        </section>
      ): (
        <div className='home__error-container'>
          <h2 className='text-black text-xl font-bold'>Oops, no results...</h2>
          <p>{fetchCars?.message}</p>
        </div>
      )}
      </div>

    </main>
  )
}
