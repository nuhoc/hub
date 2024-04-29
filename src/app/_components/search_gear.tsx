"use client"

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { useModal } from "../_hooks/use-modal";
import NoResults from "./no_results";
import Link from "next/link";
import { OrderingDirection } from "../types";

export default function SearchGear() {
    const [category, setCategory] = useState('');
    const [orderType, setOrderType] = useState<OrderingDirection>(OrderingDirection.DESCENDING);
    const [searchTerms, setSearchTerms] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [startDate, setStartDate] = useState<string>(new Date(Date.now()).toISOString().split('T')[0] ?? '')
    const [endDate, setEndDate] = useState<string>(new Date(Date.now()).toISOString().split('T')[0] ?? '')
    const [cart, setCart] = useState<{ id: number, label: string }[]>([])

    const { setOpen, addSimpleInfo, addInfo } = useModal()

    const gearMutation = api.gear.getFiltered.useMutation();
    const checkoutMutation = api.gear.checkoutGear.useMutation();

    const handleParameterizedGearQuery = () => {
        gearMutation.mutateAsync({
            orderType: orderType,
            page: currentPage,
            category: category,
            searchTerms: searchTerms,
            startDate: startDate,
            endDate: endDate,
        })
            .then(() => console.log("success"))
            .catch((reason) => {
                console.error(reason)
                addSimpleInfo("Uh oh, an error happened", "Error querying gear", true)
                setOpen(true)

            })
    }

    useEffect(() => {
        handleParameterizedGearQuery()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, orderType, searchTerms, currentPage, startDate, endDate])

    const FilterCheckbox = (props: { id: string, label: string }) => {
        return <div className=" flex flex-row gap-2">
            <input type="checkbox" id={props.id} className=" accent-primary" />
            <label htmlFor={props.id}><p>{props.label}</p></label>
        </div>
    }

    const handleSetOrderType = (newOrderType: OrderingDirection) => {
        setCurrentPage(0);
        setOrderType(newOrderType)
    }

    const handleSetCategory = (newCategory: string) => {
        setCurrentPage(0);
        setCategory(newCategory === category ? '' : newCategory)
    }

    const handleSetSearchTerms = (newSearchTerms: string) => {
        setCurrentPage(0);

        newSearchTerms = newSearchTerms.trim().split(" ").join(" | ")
        console.log(newSearchTerms)
        setSearchTerms(newSearchTerms)
    }

    const handleSetCurrentPage = (deltaPage: number) => {
        if (currentPage + deltaPage >= 0) {
            setCurrentPage(currentPage + deltaPage)
        }
    }

    const handleAddToCart = (itemId: number, itemLabel: string) => {
        setCart([...cart, { id: itemId, label: itemLabel }])
    }

    const handleRemoveFromCart = (itemId: number) => {
        setCart(cart.filter(item => item.id != itemId))
    }

    const handleSetStartDate = (newStartDate: string) => {
        setCurrentPage(0);
        setCart([])

        if (newStartDate > endDate) {
            setEndDate(newStartDate)
        }

        setStartDate(newStartDate)
    }

    const handleSetEndDate = (newEndDate: string) => {
        setCurrentPage(0);
        setCart([])

        if (startDate > newEndDate) {
            setEndDate(newEndDate)
        }

        setEndDate(newEndDate)
    }

    const handleCheckout = () => {
        console.log('checking out')
        checkoutMutation.mutateAsync({ gearIds: cart.map(item => item.id), startDate: startDate, endDate: endDate })
            .then(value => {
                console.log(value)
                addSimpleInfo("Checkout successful!", `Reservation #${value.id}. Return by ${value.rentDue.toDateString()}`)
                setOpen(true)

            })
            .catch(reason => {
                console.error(reason)
                addSimpleInfo("Uh oh, an error happened", `${reason}`, true)
                setOpen(true)
                // TODO: Remove unavailable items from cart instead of all
            })
            .finally(() => {
                handleParameterizedGearQuery()
                // Clear cart
                setCart([])
            })
    }

    const handleViewCart = () => {
        if (gearMutation.isSuccess) {
            const cartItems = cart.map(value => {
                return <li key={value.id}>{value.label}</li>
            })

            addInfo(
                <div className="pt-10 p-4 rounded-lg flex flex-col gap-4 ">
                    <h4>Current Cart</h4>
                    {cartItems.length != 0 ?
                        <ol className="list-disc">{...cartItems}</ol> :
                        <p>Looks like you havent added anything yet, try pressing the plus sign!</p>
                    }
                </div>)
            setOpen(true)
        }
    }

    const CategoryCheckbox = (props: { category: string, label: string }) => {
        return <button onClick={() => handleSetCategory(props.category)} key={props.category}
            className={` rounded-full outline outline-1 py-2 px-4
            ${category === props.category ?
                    "outline-primary bg-primary hover:text-secondary text-white" :
                    "outline-gray-400 bg-gray-300 hover:bg-white text-black"}`}>
            <p>{props.label}</p>
        </button>
    }

    const todayDate = new Date(Date.now())
    const todayDateString = todayDate.toISOString().split('T')[0]
    // Reserve max one weeks in advance
    // TODO: Allow overrides for admins
    const maxStartDate = new Date(Date.now());
    maxStartDate.setDate(todayDate.getDate() + 7);
    const maxStartDateString = maxStartDate.toISOString().split('T')[0]

    const maxEndDate = new Date(startDate);
    maxEndDate.setDate(maxEndDate.getDate() + 7);
    const maxEndDateString = maxEndDate.toISOString().split('T')[0]


    return <div className=" flex flex-col lg:flex-row gap-5">
        <div className=" bg-white rounded-lg outline outline-1 outline-gray-400 p-6 flex flex-col gap-5">
            <input onChange={e => handleSetSearchTerms(e.target.value)} className=" rounded-md outline outline-1 outline-gray-400 px-4 py-2" type="text" placeholder="Search for cool gear" />
            <div className=" flex flex-col gap-1">
                <label htmlFor="start"><strong>Start date:</strong></label>
                <input id="start" onChange={e => handleSetStartDate(e.target.value)} className=" rounded-md outline outline-1 outline-gray-400 px-4 py-2" value={startDate} min={todayDateString} max={maxStartDateString} type="date" />
            </div>
            <div className=" flex flex-col gap-1">
                <label htmlFor="end"><strong>End date:</strong></label>
                <input id="end" onChange={e => handleSetEndDate(e.target.value)} className=" rounded-md outline outline-1 outline-gray-400 px-4 py-2" value={endDate} min={startDate} max={maxEndDateString} type="date" />
            </div>
            <u>Note: The rental period is one week</u>
            <h4>Filters</h4>
            <div>
                <strong className=" text-xl">Size</strong>
                <ul>
                    <FilterCheckbox id="small" label="Small" />
                    <FilterCheckbox id="medium" label="Medium" />
                    <FilterCheckbox id="large" label="Large" />
                </ul>
            </div>
            <div>
                <strong className=" text-xl">Temperature Rating</strong>
                <ul>
                    <FilterCheckbox id="0below" label="Below 0 Degrees" />
                    <FilterCheckbox id="0to19" label="0 to 19 Degrees" />
                    <FilterCheckbox id="20to39" label="20 to 39 degrees" />
                    <FilterCheckbox id="40above" label="40 degrees and above" />
                </ul>
            </div>
            <div>
                <strong className=" text-xl">Capacity</strong>
                <ul>
                    <FilterCheckbox id="1person" label="1 Person" />
                    <FilterCheckbox id="2person" label="2 Person" />
                    <FilterCheckbox id="3person" label="3 Person" />
                    <FilterCheckbox id="4plusperson" label="4+ Person" />
                </ul>
            </div>
        </div>
        <div className=" bg-white rounded-lg outline outline-1 outline-gray-400 p-6 grow flex flex-col gap-4 items-start justify-between">
            <div className=' w-full flex flex-col gap-4 items-start min-h-[900px]'>
                <div className=" w-full flex flex-row justify-center gap-4 flex-wrap">
                    <CategoryCheckbox category="tents" label="Tents" />
                    <CategoryCheckbox category="sleep" label="Sleep" />
                    <CategoryCheckbox category="bags" label="Bags" />
                    <CategoryCheckbox category="climb" label="Climb" />
                    <CategoryCheckbox category="snow" label="Snow" />
                </div>
                <div className=" w-full flex flex-row justify-between">
                    <select onChange={e => handleSetOrderType(e.target.value as OrderingDirection)} name="sort" id="sort" className=" bg-gray-300 hover:bg-white outline outline-1 outline-gray-400 py-2 px-4 text-left rounded-lg">
                        <option value={OrderingDirection.DESCENDING}>Most Relevant</option>
                        <option value={OrderingDirection.ASCENDING}>Least Relevant</option>
                    </select>
                    <Link href="/account/history" className=" bg-primary hover:text-secondary text-white py-2 px-4 text-left rounded-lg">Past Rentals</Link>
                </div>
                <div>{gearMutation?.data ? gearMutation.data.length : '0'} Results</div>
                <div className=" w-full overflow-x-auto">
                    <table className='w-full table-auto divide-y-2 divide-gray-200 text-pretty'>
                        <thead>
                            <tr className=' text-left'>
                                <th className=' p-1'>Brand</th>
                                <th className=' p-1'>Model</th>
                                <th className=' p-1'>Quantity</th>
                                <th className=' p-1'>Categories</th>
                                <th className=' p-1'></th>
                            </tr>
                        </thead>
                        <tbody className=' divide-y-2 divide-gray-200'>
                            {gearMutation.isSuccess && gearMutation.data.length != 0 ? gearMutation.data.map((item) =>
                                <tr key={`${item.brand}-${item.model}`} className={`h-full ${item._count.instances === 0 ? " text-gray-400" : "text-black"}`}>
                                    <td className=' p-1 w-2/12'>{item.brand}</td>
                                    <td className=' p-1 w-3/12'>{item.model}</td>
                                    <td className=' p-1 w-2/12'>{item._count.instances}</td>
                                    <td className=' p-1 w-3/12'>{item.categories.map(category => category.category.name)}</td>
                                    <td className=' p-1 w-1/12 m-auto gap-4 text-primary'>
                                        {item._count.instances != 0 ? <div className=" h-full">
                                            {cart.map(item => item.id).includes(item.id) ?
                                                <button onClick={() => handleRemoveFromCart(item.id)} className=' bg-secondary w-10 h-10 sm:w-8 sm:h-8 md:w-6 md:h-6 rounded-sm text-white'>-</button> :
                                                <button onClick={() => handleAddToCart(item.id, `${item.brand} - ${item.model}`)} className=' bg-primary w-10 h-10 sm:w-8 sm:h-8 md:w-6 md:h-6 rounded-sm text-white'>+</button>
                                            }
                                        </div> : <div></div>}
                                    </td>
                                </tr>) :
                                <tr>
                                    <td className=" p-1 w-2/12"></td>
                                    <td className=" p-1 w-3/12"></td>
                                    <td className=" p-1 w-2/12"></td>
                                    <td className=" p-1 w-3/12"></td>
                                    <td className=" p-1 w-1/12"></td>
                                </tr>}
                        </tbody>
                    </table>
                    {gearMutation.isSuccess && gearMutation.data.length == 0 && <NoResults />}
                </div>
            </div>
            <div className=" w-full flex flex-row justify-center gap-4">
                <button onClick={() => handleSetCurrentPage(-1)}>&lt;</button>
                <p>{currentPage + 1}</p>
                <button onClick={() => handleSetCurrentPage(1)}>&gt;</button>
            </div>
            <div className=" flex flex-row justify-between w-full justify-self-end">
                <button onClick={() => handleViewCart()} className=" bg-gray-300 hover:bg-white outline outline-1 outline-gray-400 py-2 px-4 text-left rounded-lg">View Cart</button>
                <button onClick={() => handleCheckout()} className=" bg-primary hover:text-secondary text-white py-2 px-4 text-left rounded-lg">Reserve Gear</button>
            </div>
        </div>
    </div>
}