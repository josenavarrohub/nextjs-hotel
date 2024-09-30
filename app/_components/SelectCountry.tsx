import type { Country } from '@/types/country'
import { getCountries } from '@/app/_lib/data-service'

type Props = {
  defaultValue: string
  name: string
  className?: string
}

export default async function SelectCountry({ defaultValue, name, className }: Props) {
  const countries: Country[] = await getCountries()
  const flag = countries.find((country) => country.name === defaultValue)?.flag ?? ''

  return (
    <select name={name} defaultValue={`${defaultValue}%${flag}`} className={className}>
      <option value=''>Select country...</option>
      {countries.map(({ name, flag }) => (
        <option key={name} value={`${name}%${flag}`}>
          {name}
        </option>
      ))}
    </select>
  )
}
