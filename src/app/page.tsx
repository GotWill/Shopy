import { Cards } from '@/components/Cards'
import { Products } from '@/components/Products'
import { Slider } from '@/components/Slider'
import { Topics } from '@/components/Topics'

export default function Home() {
  return (
   <main>
    <Slider/>
    <Topics/>
    <Cards/>
    <Products/>
   </main>
  )
}
