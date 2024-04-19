"use client"

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";

export default function SearchGear() {
    const [category, setCategory] = useState('');
    const [orderType, setOrderType] = useState('asc');
    const gearMutation = api.gear.getFiltered.useMutation();

    useEffect(() => {
        gearMutation.mutate({ orderType: orderType === 'asc' ? 'asc' : 'desc', category: category })
    }, [category, orderType])

    const FilterCheckbox = (props: { id: string, label: string }) => {
        return <div className=" flex flex-row gap-2">
            <input type="checkbox" id={props.id} className=" accent-primary" />
            <label htmlFor={props.id}><p>{props.label}</p></label>
        </div>
    }

    const handleSetOrderType = (newOrderType: string) => {
        setOrderType(newOrderType)
    }

    const handleSetCategory = (newCategory: string) => {
        setCategory(newCategory === category ? '' : newCategory)
    }

    const CategoryCheckbox = (props: { category: string, label: string }) => {
        return <button onClick={() => handleSetCategory(props.category)} key={props.category}
            className={` rounded-full outline outline-1 py-2 px-4
            ${category === props.category ?
                    "outline-primary bg-primary hover:bg-secondary hover:outline-secondary text-white" :
                    "outline-gray-400 bg-gray-300 hover:bg-white text-black"}`}>
            <p>{props.label}</p>
        </button>
    }

    return <div className=" flex flex-row gap-5">
        <div className=" bg-white rounded-lg outline outline-1 outline-gray-400 p-6 flex flex-col gap-5">
            <input className=" rounded-md outline outline-1 outline-gray-400 px-4 py-2" type="text" placeholder="Search for cool gear" />
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
            <div className=' w-full flex flex-col gap-4 items-start'>
                <div className=" w-full flex flex-row justify-center gap-4">
                    <CategoryCheckbox category="tents" label="Tents" />
                    <CategoryCheckbox category="sleep" label="Sleep" />
                    <CategoryCheckbox category="bags" label="Bags" />
                    <CategoryCheckbox category="climb" label="Climb" />
                    <CategoryCheckbox category="snow" label="Snow" />
                </div>
                <select onChange={e => handleSetOrderType(e.target.value)} name="sort" id="sort" className=" bg-gray-300 hover:bg-white outline outline-1 outline-gray-400 py-2 px-4 text-left rounded-lg">
                    <option value="asc">Sort by: Ascending</option>
                    <option value="desc">Sort by: Descending</option>
                </select>
                <div>{gearMutation?.data ? gearMutation.data.length : '0'} Results</div>
                <table className=' w-full table-auto divide-y-2 divide-gray-200'>
                    <thead>
                        <tr className=' text-left'>
                            <th className=' p-1'>Brand</th>
                            <th className=' p-1'>Model</th>
                            <th className=' p-1'>Available</th>
                            <th className=' p-1'>Tags</th>
                            <th className=' p-1'></th>
                        </tr>
                    </thead>
                    <tbody className=' divide-y-2 divide-gray-200'>
                        {gearMutation.isSuccess ? gearMutation.data.map((item) =>
                            <tr key={`${item.brand}-${item.model}`}>
                                <td className=' p-1'>{item.brand}</td>
                                <td className=' p-1'>{item.model}</td>
                                <td className=' p-1'>{item._count}</td>
                                <td className=' p-1'>placeholder</td>
                                <td className=' p-1 flex flex-row gap-4 text-primary'>
                                    <button className=' bg-primary px-2 rounded-sm text-white'>-</button>1<button className=' bg-primary px-2 rounded-sm text-white'>+</button>
                                </td>
                            </tr>) :
                            <tr>
                                <td></td>
                                <td></td>
                                <td>No results</td>
                                <td></td>
                                <td></td>
                            </tr>}
                    </tbody>
                </table>
                <div className=" w-full flex flex-row justify-center">
                    <div>&lt;</div>
                    <div>&gt;</div>
                </div>
            </div>
            <div className=" flex flex-row justify-between w-full justify-self-end">
                <button>View Cart</button>
                <button>Reserve Gear</button>
            </div>
        </div>
    </div>
}