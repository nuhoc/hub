// TODO: Make client component with 'use-client'

import { PrismaClient } from '@prisma/client'

export default async function Rent() {
    const prisma = new PrismaClient()

    const FilterCheckbox = (props: { id: string, label: string }) => {
        return <div className=" flex flex-row gap-2">
            <input type="checkbox" id={props.id} className=" accent-primary" />
            <label htmlFor={props.id}><p>{props.label}</p></label>
        </div>
    }

    // Query gear item database
    // TODO: Wrap with API since this page will be a client component
    const items = await prisma.gear.groupBy({
        by: ['brand', 'model'],
        where: {
            rentable: true
        },
        // TODO: Use state to change sorting method
        // TODO: Paginate/limit results
        orderBy: {
            model: 'asc'
        },
        _count: true
    })

    console.log(items)

    return <main>
        <div className=" flex flex-col gap-16">
            <h2 className=" text-primary pt-7">
                Gear Rentals
            </h2>
            <div className=" flex flex-row gap-5">
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
                            <div className=" rounded-full bg-gray-300 outline outline-1 outline-gray-400 py-2 px-4">Tents</div>
                            <div className=" rounded-full bg-gray-300 outline outline-1 outline-gray-400 py-2 px-4">Sleep</div>
                            <div className=" rounded-full bg-gray-300 outline outline-1 outline-gray-400 py-2 px-4">Bags</div>
                            <div className=" rounded-full bg-gray-300 outline outline-1 outline-gray-400 py-2 px-4">Climb</div>
                            <div className=" rounded-full bg-gray-300 outline outline-1 outline-gray-400 py-2 px-4">Snow</div>
                        </div>
                        <select name="sort" id="sort" className=" bg-gray-300 outline outline-1 outline-gray-400 py-2 px-4 text-left rounded-lg">
                            <option value="asc">Sort by: Ascending</option>
                            <option value="desc">Sort by: Descending</option>
                        </select>
                        <div>{items.length} Results</div>
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
                                {items ? items.map((item) =>
                                    <tr key={`${item.brand}-${item.model}`}>
                                        <td className=' p-1'>{item.brand}</td>
                                        <td className=' p-1'>{item.model}</td>
                                        <td className=' p-1'>{item._count}</td>
                                        <td className=' p-1'>Sleeping, 0 degree, etc</td>
                                        <td className=' p-1 flex flex-row gap-4 text-primary'>
                                            <button className=' bg-primary px-2 rounded-sm text-white'>-</button>1<button className=' bg-primary px-2 rounded-sm text-white'>+</button>
                                        </td>
                                    </tr>) : <tr>No results</tr>}
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
        </div>
    </main>
}