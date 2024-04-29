"use client"

import { OrderingDirection } from "../types";
import { useEffect, useState } from "react"
import RentalInfo from './rental_info';
import { api } from "~/trpc/react";

export default function RentalHistory() {
    const [sort, setSort] = useState<OrderingDirection>(OrderingDirection.DESCENDING)
    const pastRentalsMutation = api.rental.getRentalHistory.useMutation()

    useEffect(() => {
        pastRentalsMutation.mutateAsync({ orderType: sort, page: 0 })
            .then(value => console.log(value))
            .catch(reason => console.error(reason))
            .finally(() => console.log("finally"))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort])

    return <div className="flex flex-col gap-5 items-start">
        <select onChange={e => setSort(e.target.value as OrderingDirection)} name="sort" id="sort" className=" bg-gray-300 hover:bg-white outline outline-1 outline-gray-400 py-2 px-4 text-left rounded-lg grow-0">
            <option value={OrderingDirection.DESCENDING}>Sort by: Newest</option>
            <option value={OrderingDirection.ASCENDING}>Sort by: Oldest</option>
        </select>
        {pastRentalsMutation.isSuccess && pastRentalsMutation.data.map((rental) => {
            return <RentalInfo key={rental.id} rentalId={rental.id} startDate={rental.rentStart} endDate={rental.rentDue} pickupDate={rental.rentPickup} returnDate={rental.rentReturn} items={rental.gearRented.map(gear => `${gear.gear.gearModel.brand} - ${gear.gear.gearModel.model}`)} />
        })}
    </div>
}