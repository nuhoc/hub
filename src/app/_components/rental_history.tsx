"use client"

import { useState } from "react"
import RentalInfo from './rental_info';

const sampleData = [
    "REI Sleeping Bag - 1x",
    "Therma-a-Rest Sleeping Pad - 1x",
    "MicroSPIKES Foot Traction - 1x",
    "Random - 1x",
    "Filler - 1x",
    "Idk - 1x",
]

export default function RentalHistory() {
    const [sort, setSort] = useState('desc')
    return <div className="flex flex-col gap-5 items-start">
        <select onChange={e => setSort(e.target.value)} name="sort" id="sort" className=" bg-gray-300 hover:bg-white outline outline-1 outline-gray-400 py-2 px-4 text-left rounded-lg grow-0">
            <option value="desc">Sort by: Newest</option>
            <option value="asc">Sort by: Oldest</option>
        </select>
        <RentalInfo startDate={new Date("2024-05-21")} endDate={new Date("2024-05-28")} items={sampleData} />
        <RentalInfo startDate={new Date("2024-04-23")} endDate={new Date("2024-04-30")} items={sampleData} />
        <RentalInfo startDate={new Date("2024-02-23")} endDate={new Date("2024-02-28")} items={sampleData} />
        <RentalInfo startDate={new Date("2024-02-21")} endDate={new Date("2024-02-28")} pickupDate={new Date("2024-02-21")} items={sampleData} />
        <RentalInfo startDate={new Date("2024-02-21")} endDate={new Date("2024-02-28")} pickupDate={new Date("2024-02-21")} returnDate={new Date("2024-02-27")} items={sampleData} />
        <RentalInfo startDate={new Date("2024-02-21")} endDate={new Date("2024-02-28")} cancelDate={new Date("2024-02-20")} items={sampleData} />
    </div>
}