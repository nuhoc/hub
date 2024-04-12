export default async function Rent() {
    const FilterCheckbox = (props: { id: string, label: string }) => {
        return <div className=" flex flex-row gap-2">
            <input type="checkbox" id={props.id} className=" accent-primary" />
            <label htmlFor={props.id}><p>{props.label}</p></label>
        </div>
    }

    return <main>
        <div className=" flex flex-col gap-16">
            <h2 className=" text-primary">
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
                <div className=" bg-white rounded-lg outline outline-1 outline-gray-400 p-6 grow flex flex-col gap-4 items-start">
                    <div className=" w-full flex flex-row justify-center gap-4">
                        <div className=" rounded-full bg-gray-300 outline outline-1 outline-gray-400 py-2 px-4">Tents</div>
                        <div className=" rounded-full bg-gray-300 outline outline-1 outline-gray-400 py-2 px-4">Sleep</div>
                        <div className=" rounded-full bg-gray-300 outline outline-1 outline-gray-400 py-2 px-4">Bags</div>
                        <div className=" rounded-full bg-gray-300 outline outline-1 outline-gray-400 py-2 px-4">Climb</div>
                        <div className=" rounded-full bg-gray-300 outline outline-1 outline-gray-400 py-2 px-4">Snow</div>
                    </div>
                    <select name="sort" id="sort" className=" bg-gray-300 outline outline-1 outline-gray-400 py-2 px-4 text-left rounded-lg">
                        <option value="name-ascend">Sort by: Name Asc.</option>
                        <option value="name-descend">Sort by: Name Des.</option>
                        <option value="brand-ascend">Sort by: Brand Asc.</option>
                        <option value="brand-descend">Sort by: Brand Des.</option>
                    </select>
                    <div>56 Results</div>
                    <table></table>
                    <div className=" w-full flex flex-row justify-center">
                        <div>&lt;</div>
                        <div>&gt;</div>
                    </div>
                    <div className=" flex flex-row justify-between w-full">
                        <button>View Items</button>
                        <button>Reserve Gear</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
}